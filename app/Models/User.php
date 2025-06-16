<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\Roles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\DatabaseNotification;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'profile_image',
        'experience',
        'career',
        'previous_work',
        'certifications',
        'skills',
        'work_availability',
        'tailoring_name',
        'tailoring_address',
        'tailor_count',
        'published_year',
        'contact_number',
        'shop_email',
        'working_hours',
        'services',
        'payment_methods',
        'shop_images',
        'social_links',
        'weekly_order_limit',
        'current_week_orders',
        'week_start_date',
        'week_end_date',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => Roles::class,
            'payment_methods' => 'array',
            'shop_images' => 'array',
            'social_links' => 'array',
            'week_start_date' => 'date',
            'week_end_date' => 'date',
        ];
    }

    public function hasRole(Roles $role): bool
    {
        return $this->role === $role;
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(Roles::ADMIN);
    }

    public function isTailor(): bool
    {
        return $this->hasRole(Roles::TAILOR);
    }

    public function isShopkeeper(): bool
    {
        return $this->hasRole(Roles::SHOPKEEPER);
    }

    public function isUser(): bool
    {
        return $this->hasRole(Roles::USER);
    }

    public function isCustomer(): bool
    {
        return $this->hasRole(Roles::CUSTOMER);
    }

    public function posts()
    {
        return $this->hasMany(TailorPost::class, 'user_id');
    }

    public function customerOrders()
    {
        return $this->hasMany(CustomerOrder::class, 'tailor_id');
    }

    /**
     * Get the current week's order count for this tailor
     */
    public function getCurrentWeekOrderCount()
    {
        if (!$this->week_start_date || !$this->week_end_date) {
            return 0;
        }

        return $this->customerOrders()
            ->where('created_at', '>=', $this->week_start_date)
            ->where('created_at', '<=', $this->week_end_date)
            ->count();
    }

    /**
     * Get remaining order capacity for this week
     */
    public function getRemainingOrderCapacity()
    {
        $currentWeekOrders = $this->getCurrentWeekOrderCount();
        return max(0, $this->weekly_order_limit - $currentWeekOrders);
    }

    /**
     * Check if tailor can accept more orders this week
     */
    public function canAcceptMoreOrders()
    {
        return $this->getRemainingOrderCapacity() > 0;
    }

    /**
     * Update weekly order tracking
     */
    public function updateWeeklyOrderTracking()
    {
        $currentDate = now()->startOfDay();
        $endOfWeek = $currentDate->copy()->addDays(6)->endOfDay();

        // Reset if it's a new week or if week_start_date is not set
        if (!$this->week_start_date || $this->week_start_date->lt($currentDate)) {
            // Calculate current week orders before resetting
            $currentWeekOrders = $this->customerOrders()
                ->where('created_at', '>=', $currentDate)
                ->where('created_at', '<=', $endOfWeek)
                ->count();

            $this->update([
                'week_start_date' => $currentDate,
                'week_end_date' => $endOfWeek,
                'current_week_orders' => $currentWeekOrders
            ]);
        }
    }

    /**
     * Check if user has already placed an order this week
     */
    public function hasOrderedThisWeek()
    {
        if (!$this->week_start_date || !$this->week_end_date) {
            return false;
        }

        return CustomerOrder::where('user_id', $this->id)
            ->whereBetween('created_at', [$this->week_start_date, $this->week_end_date])
            ->exists();
    }

    /**
     * Get order statistics for this tailor
     */
    public function getOrderStatistics()
    {
        $this->updateWeeklyOrderTracking();

        return [
            'total_orders' => $this->customerOrders()->count(),
            'current_week_orders' => $this->getCurrentWeekOrderCount(),
            'weekly_limit' => $this->weekly_order_limit,
            'remaining_capacity' => $this->getRemainingOrderCapacity(),
            'can_accept_orders' => $this->canAcceptMoreOrders(),
            'total_visible_orders' => $this->customerOrders()->where('is_visible', true)->count(),
            'week_start_date' => $this->week_start_date?->format('Y-m-d'),
            'week_end_date' => $this->week_end_date?->format('Y-m-d'),
        ];
    }

    /**
     * Get all ratings received by this tailor (through their posts)
     */
    public function receivedRatings()
    {
        return \App\Models\PostRating::whereHas('tailorPost', function ($query) {
            $query->where('user_id', $this->id);
        });
    }

    /**
     * Get Amazon-style rating data for this tailor
     */
    public function getRatingData()
    {
        if (!$this->isTailor()) {
            return null;
        }

        $ratingService = new \App\Services\TailorRatingService();
        return $ratingService->getTailorRating($this->id);
    }

    /**
     * Get rating summary for display
     */
    public function getRatingSummary()
    {
        if (!$this->isTailor()) {
            return [
                'rating' => 0,
                'percentage' => 0,
                'total_ratings' => 0,
                'credibility' => 'نامعلوم'
            ];
        }

        return [
            'rating' => $this->cached_rating ?? 0,
            'percentage' => $this->rating_percentage ?? 0,
            'total_ratings' => $this->total_ratings ?? 0,
            'credibility_score' => $this->credibility_score ?? 0,
            'credibility' => $this->getCredibilityText(),
            'performance' => $this->getPerformanceLevel()
        ];
    }

    /**
     * Get credibility text based on score
     */
    private function getCredibilityText()
    {
        $score = $this->credibility_score ?? 0;

        if ($score >= 80) return 'ډیر باوري';
        if ($score >= 60) return 'باوري';
        if ($score >= 40) return 'منځنی';
        if ($score >= 20) return 'لږ باوري';
        return 'جدید';
    }

    /**
     * Get performance level based on rating percentage
     */
    private function getPerformanceLevel()
    {
        $percentage = $this->rating_percentage ?? 0;

        if ($percentage >= 90) return ['level' => 'غوره', 'color' => 'green'];
        if ($percentage >= 80) return ['level' => 'ډیر ښه', 'color' => 'blue'];
        if ($percentage >= 70) return ['level' => 'ښه', 'color' => 'yellow'];
        if ($percentage >= 60) return ['level' => 'منځنی', 'color' => 'orange'];
        return ['level' => 'کمزوری', 'color' => 'red'];
    }

    /**
     * Check if tailor has sufficient ratings for credibility
     */
    public function hasCredibleRating()
    {
        return $this->total_ratings >= 5 && $this->credibility_score >= 50;
    }
}
