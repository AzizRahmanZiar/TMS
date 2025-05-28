<?php

namespace App\Http\Controllers;

use App\Models\PostRating;
use App\Models\TailorPost;
use App\Http\Requests\PostRatingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PostRatingController extends Controller
{
    public function store(PostRatingRequest $request, TailorPost $tailorPost)
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return back()->with('error', 'د ریټنګ ورکولو لپاره لومړی لاګ ان شئ');
        }

        // Check if user has already rated this post
        $existingRating = PostRating::where('user_id', Auth::id())
            ->where('tailor_post_id', $tailorPost->id)
            ->first();

        if ($existingRating) {
            return back()->with('error', 'تاسو دمخه دا پوست ریټ کړی. هر پوست یوازې یو ځل ریټ کولی شئ.');
        }

        try {
            $validated = $request->validated();

            // Create new rating
            PostRating::create([
                'user_id' => Auth::id(),
                'tailor_post_id' => $tailorPost->id,
                'rating' => $validated['rating'],
                'comment' => $validated['comment']
            ]);

            return back()->with('success', 'ستاسو د ریټنګ لپاره مننه!');

        } catch (\Exception $e) {
            return back()->with('error', 'د ریټنګ ثبت کولو کې ستونزه رامنځته شوه. بیا هڅه وکړئ.');
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
