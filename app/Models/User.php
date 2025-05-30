<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\Roles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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
        $startOfWeek = now()->startOfWeek();

        return $this->customerOrders()
            ->where('created_at', '>=', $startOfWeek)
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
        $startOfWeek = now()->startOfWeek();

        // Reset if it's a new week
        if (!$this->week_start_date || $this->week_start_date->lt($startOfWeek)) {
            $this->update([
                'current_week_orders' => $this->getCurrentWeekOrderCount(),
                'week_start_date' => $startOfWeek,
            ]);
        }
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
            'accepted_orders' => $this->customerOrders()->where('status', 'accepted')->count(),
            'pending_orders' => $this->customerOrders()->where('status', 'pending')->count(),
        ];
    }
}
