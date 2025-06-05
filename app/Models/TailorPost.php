<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TailorPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'description',
        'image',
        'category',
        'author',
        'email',
        'comments'
    ];

    protected $casts = [
        'date' => 'date',
        'comments' => 'integer'
    ];

    /**
     * Boot method to handle model events
     */
    protected static function boot()
    {
        parent::boot();

        // Automatically set author and email when creating a post
        static::creating(function ($post) {
            if (!$post->author && $post->user_id) {
                $user = User::find($post->user_id);
                if ($user) {
                    $post->author = $user->name;
                    $post->email = $user->email;
                }
            }
        });

        // Update author and email when updating a post if user_id changes
        static::updating(function ($post) {
            if ($post->isDirty('user_id') && $post->user_id) {
                $user = User::find($post->user_id);
                if ($user) {
                    $post->author = $user->name;
                    $post->email = $user->email;
                }
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ratings()
    {
        return $this->hasMany(PostRating::class);
    }

    public function getAverageRatingAttribute()
    {
        return $this->calculateAmazonStyleRating()['display_rating'];
    }

    public function getTotalRatingsAttribute()
    {
        return $this->ratings()->count();
    }

    /**
     * Calculate Amazon-style Bayesian average rating
     */
    public function calculateAmazonStyleRating()
    {
        $ratings = $this->ratings;

        if ($ratings->isEmpty()) {
            return [
                'display_rating' => 0,
                'raw_average' => 0,
                'percentage' => 0,
                'credibility_score' => 0,
                'total_ratings' => 0
            ];
        }

        $totalRatings = $ratings->count();
        $rawSum = $ratings->sum('rating');
        $rawAverage = $rawSum / $totalRatings;

        // Amazon-style Bayesian average
        $globalMean = 3.5; // Global average across all posts
        $minimumRatings = 5; // Minimum ratings for full credibility

        $bayesianAverage = (
            ($totalRatings * $rawAverage) + ($minimumRatings * $globalMean)
        ) / ($totalRatings + $minimumRatings);

        // Credibility score (0-100)
        $credibilityScore = min(100, ($totalRatings / 10) * 100);

        // Percentage
        $percentage = ($bayesianAverage / 5) * 100;

        return [
            'display_rating' => round($bayesianAverage, 1),
            'raw_average' => round($rawAverage, 1),
            'percentage' => round($percentage, 1),
            'credibility_score' => round($credibilityScore),
            'total_ratings' => $totalRatings
        ];
    }

    /**
     * Get credibility level text
     */
    public function getCredibilityLevel()
    {
        $score = $this->calculateAmazonStyleRating()['credibility_score'];

        if ($score >= 80) return 'ډیر باوري'; // Very Reliable
        if ($score >= 60) return 'باوري'; // Reliable
        if ($score >= 40) return 'منځنی'; // Medium
        if ($score >= 20) return 'لږ باوري'; // Less Reliable
        return 'جدید'; // New
    }

    public function hasUserRated($userId)
    {
        return $this->ratings()->where('user_id', $userId)->exists();
    }
}
