<?php

namespace App\Services;

use App\Models\User;
use App\Models\PostRating;
use App\Models\TailorPost;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class TailorRatingService
{
    /**
     * Update a tailor's cached rating using Amazon-style Bayesian average
     */
    public function updateTailorRating($tailorId)
    {
        try {
            $tailor = User::find($tailorId);
            if (!$tailor || !$tailor->isTailor()) {
                return false;
            }

            // Get all ratings for this tailor's posts
            $ratings = $this->getTailorRatings($tailorId);
            
            if ($ratings->isEmpty()) {
                $this->setDefaultRating($tailor);
                return true;
            }

            // Calculate Amazon-style weighted rating
            $ratingData = $this->calculateAmazonStyleRating($ratings);
            
            // Update tailor's cached rating fields
            $tailor->update([
                'cached_rating' => $ratingData['bayesian_average'],
                'raw_rating' => $ratingData['raw_average'],
                'total_ratings' => $ratingData['total_ratings'],
                'rating_percentage' => $ratingData['percentage'],
                'credibility_score' => $ratingData['credibility_score'],
                'rating_weight_sum' => $ratingData['weight_sum'],
                'weighted_rating_sum' => $ratingData['weighted_sum'],
                'rating_last_updated' => now()
            ]);

            // Clear cache
            Cache::forget("tailor_rating_{$tailorId}");
            
            Log::info("Updated tailor rating", [
                'tailor_id' => $tailorId,
                'rating_data' => $ratingData
            ]);

            return true;

        } catch (\Exception $e) {
            Log::error("Failed to update tailor rating", [
                'tailor_id' => $tailorId,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Get all ratings for a tailor's posts
     */
    private function getTailorRatings($tailorId)
    {
        return PostRating::whereHas('tailorPost', function ($query) use ($tailorId) {
            $query->where('user_id', $tailorId);
        })
        ->with(['user', 'tailorPost'])
        ->orderBy('created_at', 'desc')
        ->get();
    }

    /**
     * Calculate Amazon-style rating with Bayesian average and weighting
     */
    private function calculateAmazonStyleRating($ratings)
    {
        $totalRatings = $ratings->count();
        
        // Calculate raw average
        $rawSum = $ratings->sum('rating');
        $rawAverage = $rawSum / $totalRatings;

        // Calculate weighted ratings
        $weightedSum = 0;
        $weightSum = 0;

        foreach ($ratings as $rating) {
            $weight = $rating->calculateWeight();
            $weightedSum += $rating->rating * $weight;
            $weightSum += $weight;
        }

        $weightedAverage = $weightSum > 0 ? $weightedSum / $weightSum : $rawAverage;

        // Get global statistics
        $globalMean = $this->getGlobalStatistic('global_mean_rating', 3.5);
        $minimumRatings = $this->getGlobalStatistic('minimum_ratings_threshold', 5);

        // Calculate Bayesian average (Amazon's approach)
        $bayesianAverage = (
            ($totalRatings * $weightedAverage) + ($minimumRatings * $globalMean)
        ) / ($totalRatings + $minimumRatings);

        // Calculate credibility score
        $credibilityThreshold = $this->getGlobalStatistic('credibility_threshold', 10);
        $credibilityScore = min(100, ($totalRatings / $credibilityThreshold) * 100);

        // Calculate percentage
        $percentage = ($bayesianAverage / 5) * 100;

        return [
            'raw_average' => round($rawAverage, 2),
            'weighted_average' => round($weightedAverage, 2),
            'bayesian_average' => round($bayesianAverage, 2),
            'percentage' => round($percentage, 2),
            'total_ratings' => $totalRatings,
            'credibility_score' => round($credibilityScore),
            'weight_sum' => round($weightSum, 3),
            'weighted_sum' => round($weightedSum, 3)
        ];
    }

    /**
     * Set default rating for tailors with no ratings
     */
    private function setDefaultRating($tailor)
    {
        $tailor->update([
            'cached_rating' => 0.00,
            'raw_rating' => 0.00,
            'total_ratings' => 0,
            'rating_percentage' => 0.00,
            'credibility_score' => 0,
            'rating_weight_sum' => 0.000,
            'weighted_rating_sum' => 0.000,
            'rating_last_updated' => now()
        ]);
    }

    /**
     * Get global statistic value
     */
    private function getGlobalStatistic($key, $default = 0)
    {
        return Cache::remember("rating_stat_{$key}", 3600, function () use ($key, $default) {
            $stat = DB::table('rating_statistics')->where('key', $key)->first();
            return $stat ? $stat->value : $default;
        });
    }

    /**
     * Update all tailors' ratings (for batch processing)
     */
    public function updateAllTailorRatings()
    {
        $tailors = User::where('role', 'tailor')->get();
        
        foreach ($tailors as $tailor) {
            $this->updateTailorRating($tailor->id);
        }
        
        Log::info("Updated all tailor ratings", ['count' => $tailors->count()]);
    }

    /**
     * Get cached tailor rating with fallback calculation
     */
    public function getTailorRating($tailorId)
    {
        return Cache::remember("tailor_rating_{$tailorId}", 1800, function () use ($tailorId) {
            $tailor = User::find($tailorId);
            
            if (!$tailor || !$tailor->isTailor()) {
                return null;
            }

            // If cached rating is outdated, recalculate
            if (!$tailor->rating_last_updated || 
                $tailor->rating_last_updated->diffInHours(now()) > 24) {
                $this->updateTailorRating($tailorId);
                $tailor->refresh();
            }

            return [
                'cached_rating' => $tailor->cached_rating,
                'raw_rating' => $tailor->raw_rating,
                'total_ratings' => $tailor->total_ratings,
                'rating_percentage' => $tailor->rating_percentage,
                'credibility_score' => $tailor->credibility_score,
                'credibility_level' => $this->getCredibilityLevel($tailor->credibility_score),
                'performance_level' => $this->getPerformanceLevel($tailor->rating_percentage),
                'last_updated' => $tailor->rating_last_updated
            ];
        });
    }

    /**
     * Get credibility level text
     */
    private function getCredibilityLevel($score)
    {
        if ($score >= 80) return 'ډیر باوري'; // Very Reliable
        if ($score >= 60) return 'باوري'; // Reliable
        if ($score >= 40) return 'منځنی'; // Medium
        if ($score >= 20) return 'لږ باوري'; // Less Reliable
        return 'جدید'; // New
    }

    /**
     * Get performance level based on percentage
     */
    private function getPerformanceLevel($percentage)
    {
        if ($percentage >= 90) return ['level' => 'غوره', 'color' => 'green', 'badge' => '🌟'];
        if ($percentage >= 80) return ['level' => 'ډیر ښه', 'color' => 'blue', 'badge' => '⭐'];
        if ($percentage >= 70) return ['level' => 'ښه', 'color' => 'yellow', 'badge' => '👍'];
        if ($percentage >= 60) return ['level' => 'منځنی', 'color' => 'orange', 'badge' => '👌'];
        return ['level' => 'کمزوری', 'color' => 'red', 'badge' => '⚠️'];
    }

    /**
     * Get top rated tailors
     */
    public function getTopRatedTailors($limit = 10)
    {
        return User::where('role', 'tailor')
            ->where('total_ratings', '>', 0)
            ->orderByDesc('cached_rating')
            ->orderByDesc('total_ratings')
            ->limit($limit)
            ->get()
            ->map(function ($tailor) {
                return array_merge($tailor->toArray(), [
                    'rating_data' => $this->getTailorRating($tailor->id)
                ]);
            });
    }
}
