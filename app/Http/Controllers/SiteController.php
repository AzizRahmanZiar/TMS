<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\TailorPost;
use App\Models\PostRating;

class SiteController extends Controller
{
    public function tailors()
    {
        // Get all tailors regardless of whether they have a shop or not
        $tailors = User::where('role', 'Tailor')
            ->select([
                'id',
                'name',
                'email',
                'profile_image',
                'experience',
                'career',
                'previous_work',
                'certifications',
                'skills',
                'work_availability',
                'tailoring_name',
                'created_at'
            ])
            ->with(['posts' => function($query) {
                $query->withAvg('ratings', 'rating');
            }])
            ->get()
            ->map(function ($tailor) {
                // Calculate average rating from all posts
                $totalRating = 0;
                $totalPosts = 0;
                
                foreach ($tailor->posts as $post) {
                    if ($post->ratings_avg_rating) {
                        $totalRating += $post->ratings_avg_rating;
                        $totalPosts++;
                    }
                }
                
                $averageRating = $totalPosts > 0 ? ($totalRating / $totalPosts) : 0;
                $ratingPercentage = ($averageRating / 5) * 100;
                
                return [
                    'id' => $tailor->id,
                    'name' => $tailor->name,
                    'email' => $tailor->email,
                    'profile_photo_url' => $tailor->profile_image ? Storage::url($tailor->profile_image) : null,
                    'experience' => $tailor->experience,
                    'career' => $tailor->career,
                    'previous_work' => $tailor->previous_work,
                    'certifications' => $tailor->certifications,
                    'skills' => $tailor->skills,
                    'work_availability' => $tailor->work_availability,
                    'tailoring_name' => $tailor->tailoring_name,
                    'created_at' => $tailor->created_at,
                    'rating_percentage' => round($ratingPercentage, 1)
                ];
            });

        return Inertia::render('Site/Tailors', [
            'tailors' => $tailors
        ]);
    }

    public function shops()
    {
        // Get only tailors who have shops
        $shops = User::where('role', 'Tailor')
            ->whereNotNull('tailoring_name')
            ->select([
                'id',
                'name',
                'email',
                'profile_image',
                'tailoring_name',
                'tailoring_address',
                'contact_number',
                'shop_email',
                'working_hours',
                'services',
                'payment_methods',
                'social_links',
                'shop_images',
                'published_year',
                'created_at'
            ])
            ->get()
            ->map(function ($shop) {
                // Debug profile image path
                $profileImagePath = $shop->profile_image;
                $profileImageExists = $profileImagePath ? Storage::disk('public')->exists($profileImagePath) : false;
                
                // Ensure shop_images is properly formatted
                $shopImages = $shop->shop_images;
                if (is_string($shopImages)) {
                    try {
                        $shopImages = json_decode($shopImages, true);
                    } catch (\Exception $e) {
                        // If JSON decode fails, treat as a single image path
                        $shopImages = [$shopImages];
                    }
                }
                
                return [
                    'id' => $shop->id,
                    'name' => $shop->name,
                    'email' => $shop->email,
                    'profile_image' => $profileImageExists ? $profileImagePath : null,
                    'tailoring_name' => $shop->tailoring_name,
                    'tailoring_address' => $shop->tailoring_address,
                    'contact_number' => $shop->contact_number,
                    'shop_email' => $shop->shop_email,
                    'working_hours' => $shop->working_hours,
                    'services' => $shop->services,
                    'payment_methods' => $shop->payment_methods,
                    'social_links' => $shop->social_links,
                    'shop_images' => $shopImages,
                    'published_year' => $shop->published_year,
                    'created_at' => $shop->created_at
                ];
            });

        return Inertia::render('Site/Shop', [
            'shops' => $shops
        ]);
    }

    public function posts()
    {
        $posts = TailorPost::with(['user', 'ratings'])
            ->latest()
            ->get()
            ->map(function ($post) {
                $averageRating = $post->ratings->avg('rating') ?? 0;
                $commentsCount = $post->ratings->whereNotNull('comment')->count();
                
                return [
                    'id' => $post->id,
                    'description' => $post->description,
                    'image' => $post->image ? asset('storage/' . $post->image) : null,
                    'date' => $post->date,
                    'author' => $post->user->name ?? $post->author,
                    'email' => $post->email,
                    'category' => $post->category,
                    'comments' => $commentsCount,
                    'views' => $post->views,
                    'rating' => $averageRating,
                    'created_at' => $post->created_at
                ];
            });
        
        \Log::info('Fetched TailorPosts:', ['count' => $posts->count(), 'posts' => $posts->toArray()]);
        
        return Inertia::render('Site/Posts', [
            'tailorPosts' => $posts
        ]);
    }

    public function home()
    {
        // Get top 10 rated posts
        $topDesigns = TailorPost::with(['ratings'])
            ->get()
            ->map(function ($post) {
                $averageRating = $post->ratings->avg('rating') ?? 0;
                
                return [
                    'id' => $post->id,
                    'title' => $post->description, // Using description as title
                    'image' => $post->image ? asset('storage/' . $post->image) : null,
                    'category' => $post->category,
                    'averageRating' => (float)$averageRating, // Ensure it's a number
                    'ratings' => $post->ratings->map(function($rating) {
                        return [
                            'id' => $rating->id,
                            'rating' => (float)$rating->rating // Ensure it's a number
                        ];
                    })
                ];
            })
            ->filter(function ($post) {
                return $post['averageRating'] > 0 && $post['image']; // Only show posts with ratings and images
            })
            ->sortByDesc('averageRating')
            ->take(10)
            ->values();

        // Debug logging
        \Log::info('Top Designs Data:', [
            'count' => $topDesigns->count(),
            'designs' => $topDesigns->toArray()
        ]);

        // Get testimonials (ratings with comments)
        $testimonialsWithComments = PostRating::with(['user', 'post'])
            ->whereNotNull('comment')
            ->orderByDesc('created_at')
            ->take(15)
            ->get()
            ->map(function ($rating) {
                return [
                    'id' => $rating->id,
                    'username' => $rating->user->name ?? 'Anonymous',
                    'userImage' => $rating->user->profile_photo_url ?? null,
                    'rating' => $rating->rating,
                    'comment' => $rating->comment,
                    'postId' => $rating->post_id,
                    'created_at' => $rating->created_at->format('Y-m-d')
                ];
            });

        return Inertia::render('Site/Home', [
            'topDesigns' => $topDesigns,
            'testimonialsWithComments' => $testimonialsWithComments,
        ]);
    }
} 