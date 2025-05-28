<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdvertisementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get current user (middleware already ensures they are a shopkeeper)
        $user = Auth::user();

        $advertisements = Advertisement::with('shopkeeper')
            ->where('shopkeeper_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('System/Advertisements', [
            'advertisements' => $advertisements
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'title.required' => 'سرلیک اړین دی',
            'title.string' => 'سرلیک باید متن وي',
            'title.max' => 'سرلیک باید د 255 توریو څخه کم وي',
            'description.string' => 'تفصیل باید متن وي',
            'image.required' => 'انځور اړین دی',
            'image.image' => 'دا باید انځور وي',
            'image.mimes' => 'انځور باید jpeg, png, jpg یا gif وي',
            'image.max' => 'انځور باید د 2MB څخه کم وي',
        ]);

        $imagePath = $request->file('image')->store('advertisements', 'public');

        Advertisement::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image' => $imagePath,
            'shopkeeper_id' => Auth::user()->id,
        ]);

        return back()->with('success', 'اعلان په بریالیتوب سره اضافه شو');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Advertisement $advertisement)
    {
        // Check if user owns this advertisement
        if ($advertisement->shopkeeper_id !== Auth::user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'title.required' => 'سرلیک اړین دی',
            'title.string' => 'سرلیک باید متن وي',
            'title.max' => 'سرلیک باید د 255 توریو څخه کم وي',
            'description.string' => 'تفصیل باید متن وي',
            'image.image' => 'دا باید انځور وي',
            'image.mimes' => 'انځور باید jpeg, png, jpg یا gif وي',
            'image.max' => 'انځور باید د 2MB څخه کم وي',
        ]);

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'],
        ];

        if ($request->hasFile('image')) {
            // Delete old image
            if ($advertisement->image) {
                Storage::disk('public')->delete($advertisement->image);
            }
            $data['image'] = $request->file('image')->store('advertisements', 'public');
        }

        $advertisement->update($data);

        return back()->with('success', 'اعلان په بریالیتوب سره تازه شو');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Advertisement $advertisement)
    {
        // Check if user owns this advertisement
        if ($advertisement->shopkeeper_id !== Auth::user()->id) {
            abort(403, 'Unauthorized action.');
        }

        // Delete image file
        if ($advertisement->image) {
            Storage::disk('public')->delete($advertisement->image);
        }

        $advertisement->delete();

        return redirect()->route('advertisements.index')
            ->with('success', 'اعلان په بریالیتوب سره حذف شو');
    }

    /**
     * Get advertisements for site display
     */
    public function getForSite()
    {
        $advertisements = Advertisement::with('shopkeeper')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($ad) {
                return [
                    'id' => $ad->id,
                    'title' => $ad->title,
                    'description' => $ad->description,
                    'image' => $ad->image ? asset('storage/' . $ad->image) : null,
                    'shopkeeper_name' => $ad->shopkeeper->name,
                    'created_at' => $ad->created_at->format('Y-m-d'),
                ];
            });

        return Inertia::render('Site/Adv', [
            'advertisements' => $advertisements
        ]);
    }
}
