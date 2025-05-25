<?php

namespace App\Http\Controllers;

use App\Models\TailorPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class TailorPostController extends Controller
{
    public function index()
    {
        try {
            $user = auth()->user();
            
            // If user is admin, show all posts
            if ($user->role->value === 'admin') {
                $posts = TailorPost::with('user')->latest()->get();
            } else {
                // For tailors, only show their own posts
                $posts = TailorPost::with('user')->where('user_id', $user->id)->latest()->get();
            }
            
            return Inertia::render('System/TailorPost', [
                'posts' => $posts
            ]);
        } catch (\Exception $e) {
            Log::error('Error in TailorPost index: ' . $e->getMessage());
            return back()->with('error', 'Failed to load posts');
        }
    }

    public function store(Request $request)
    {
        // Check if user has reached the post limit
        $postCount = TailorPost::where('user_id', auth()->id())->count();
        if ($postCount >= 4) {
            return back()->with('error', 'You needed posts not allowed other');
        }

        $request->validate([
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category' => 'required|string',
        ]);

        $imagePath = $request->file('image')->store('posts', 'public');

        $post = TailorPost::create([
            'user_id' => auth()->id(),
            'description' => $request->description,
            'image' => $imagePath,
            'category' => $request->category,
            'date' => now(),
            'author' => auth()->user()->name,
            'email' => auth()->user()->email,
        ]);

        return redirect()->route('tailor-posts.index')->with('success', 'Post created successfully.');
    }

    public function update(Request $request, TailorPost $tailorPost)
    {
        try {
            $validated = $request->validate([
                'description' => 'required|min:10|max:2000',
                'category' => 'required|in:Cloths,Uniform,Kortai,Sadrai',
                'image' => 'nullable|image|max:2048'
            ]);

            $data = [
                'description' => $validated['description'],
                'category' => $validated['category']
            ];

            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($tailorPost->image) {
                    Storage::disk('public')->delete($tailorPost->image);
                }
                $path = $request->file('image')->store('tailor-posts', 'public');
                $data['image'] = $path;
            }

            $tailorPost->update($data);

            return redirect()->back()->with('success', 'Post updated successfully');
        } catch (\Exception $e) {
            Log::error('Error in TailorPost update: ' . $e->getMessage());
            return back()->with('error', 'Failed to update post');
        }
    }

    public function destroy(TailorPost $tailorPost)
    {
        try {
            if ($tailorPost->image) {
                Storage::disk('public')->delete($tailorPost->image);
            }
            
            $tailorPost->delete();
            return redirect()->back()->with('success', 'Post deleted successfully');
        } catch (\Exception $e) {
            Log::error('Error in TailorPost destroy: ' . $e->getMessage());
            return back()->with('error', 'Failed to delete post');
        }
    }
}
