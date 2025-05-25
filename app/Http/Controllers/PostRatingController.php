<?php

namespace App\Http\Controllers;

use App\Models\PostRating;
use App\Models\TailorPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PostRatingController extends Controller
{
    public function store(Request $request, TailorPost $tailorPost)
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return back()->with('error', 'You must be logged in to rate a post');
        }

        // Check if user has already rated this post
        $existingRating = PostRating::where('user_id', Auth::id())
            ->where('tailor_post_id', $tailorPost->id)
            ->first();

        if ($existingRating) {
            return back()->with('error', 'You have already rated this post. You can only rate each post once.');
        }

        // Validate the request
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->with('error', 'Please provide a valid rating between 1 and 5 and a comment with at least 10 characters.');
        }

        try {
            // Create new rating
            $rating = PostRating::create([
                'user_id' => Auth::id(),
                'tailor_post_id' => $tailorPost->id,
                'rating' => $request->rating,
                'comment' => $request->comment
            ]);

            // Load relationships for response
            $rating->load(['user', 'tailorPost']);

            return back()->with('success', 'Thank you for your rating!');

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to submit rating. Please try again.');
        }
    }

    public function getTestimonials()
    {
        $testimonials = PostRating::with(['user', 'tailorPost'])
            ->whereNotNull('comment')
            ->latest()
            ->get()
            ->map(function ($rating) {
                return [
                    'id' => $rating->id,
                    'postId' => $rating->tailor_post_id,
                    'user_name' => $rating->user->name,
                    'user_image' => $rating->user->profile_image ? asset('storage/' . $rating->user->profile_image) : null,
                    'rating' => $rating->rating,
                    'comment' => $rating->comment,
                    'created_at' => $rating->created_at->format('Y-m-d')
                ];
            });

        return response()->json($testimonials);
    }
} 