<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class PostRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tailor_post_id',
        'rating',
        'comment'
    ];

    protected $casts = [
        'rating' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Relationship with User (rater)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with TailorPost
    public function tailorPost()
    {
        return $this->belongsTo(TailorPost::class);
    }

    // Get the tailor who owns the post
    public function tailor()
    {
        return $this->belongsTo(User::class, 'tailor_id');
    }

    // Boot method to handle model events
    protected static function boot()
    {
        parent::boot();

        static::created(function ($rating) {
            $rating->updateTailorRating();
            $rating->updatePostCommentsCount();
        });

        static::updated(function ($rating) {
            $rating->updateTailorRating();
            $rating->updatePostCommentsCount();
        });

        static::deleted(function ($rating) {
            $rating->updateTailorRating();
            $rating->updatePostCommentsCount();
        });
    }

    /**
     * Calculate Amazon-style weight for this rating
     */
    public function calculateWeight()
    {
        $weight = 1.0;

        // 1. Time decay factor (recent ratings get more weight)
        $daysOld = $this->created_at ? $this->created_at->diffInDays(now()) : 0;
        $timeDecay = exp(-0.1 * $daysOld / 365); // Decay over a year
        $weight *= $timeDecay;

        // 2. User credibility factor
        $userCredibility = $this->getUserCredibilityScore();
        $weight *= $userCredibility;

        // 3. Comment bonus (ratings with comments get slight boost)
        if (!empty($this->comment) && strlen($this->comment) > 20) {
            $weight *= 1.1;
        }

        return round($weight, 3);
    }

    /**
     * Get user credibility score based on their rating history
     */
    public function getUserCredibilityScore()
    {
        $user = $this->user;
        if (!$user) return 0.5;

        // Base credibility
        $credibility = 0.7;

        // Increase credibility based on total ratings given
        $totalRatingsGiven = PostRating::where('user_id', $user->id)->count();
        $credibility += min(0.3, $totalRatingsGiven / 20); // Max 0.3 bonus

        // Reduce credibility for users who only give extreme ratings
        $userRatings = PostRating::where('user_id', $user->id)->pluck('rating');
        if ($userRatings->count() > 3) {
            $variance = $userRatings->variance();
            if ($variance < 0.5) { // Only gives 1s, 5s, etc.
                $credibility *= 0.8;
            }
        }

        return min(1.5, max(0.3, $credibility)); // Between 0.3 and 1.5
    }

    /**
     * Update the tailor's cached rating after any rating change
     */
    public function updateTailorRating()
    {
        $tailorPost = $this->tailorPost;
        if (!$tailorPost || !$tailorPost->user_id) return;

        $tailorId = $tailorPost->user_id;

        // Clear cache
        Cache::forget("tailor_rating_{$tailorId}");

        // Update tailor's rating using the service
        $ratingService = new \App\Services\TailorRatingService();
        $ratingService->updateTailorRating($tailorId);
    }

    /**
     * Update the post's comments count in tailor_posts table
     */
    public function updatePostCommentsCount()
    {
        $tailorPost = $this->tailorPost;
        if (!$tailorPost) return;

        // Count only ratings with actual comment text
        $commentsCount = PostRating::where('tailor_post_id', $tailorPost->id)
            ->whereNotNull('comment')
            ->where('comment', '!=', '')
            ->count();

        // Update the tailor_posts table
        $tailorPost->update(['comments' => $commentsCount]);
    }

    // Validation rules
    public static function rules()
    {
        return [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'tailor_post_id' => 'required|exists:tailor_posts,id'
        ];
    }
}
