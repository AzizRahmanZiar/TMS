<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdvertisementRequest;
use App\Http\Requests\UpdateAdvertisementRequest;
use App\Models\Advertisement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdvertisementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $advertisements = Advertisement::with('shopkeeper')
            ->where('shopkeeper_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('System/Advertisements', [
            'advertisements' => $advertisements
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdvertisementRequest $request): RedirectResponse
    {
        $imagePath = $request->file('image')->store('advertisements', 'public');

        Advertisement::create([
            'title' => $request->validated('title'),
            'description' => $request->validated('description'),
            'image' => $imagePath,
            'shopkeeper_id' => Auth::id(),
        ]);

        return back()->with('success', 'اعلان په بریالیتوب سره اضافه شو');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdvertisementRequest $request, Advertisement $advertisement): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($advertisement->image) {
                Storage::disk('public')->delete($advertisement->image);
            }
            // Store new image and update the path
            $data['image'] = $request->file('image')->store('advertisements', 'public');
        } else {
            unset($data['image']);
        }

        $advertisement->update($data);

        return back()->with('success', 'اعلان په بریالیتوب سره تازه شو');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Advertisement $advertisement): RedirectResponse
    {
        // Check if the user is authorized to delete this advertisement
        abort_if($advertisement->shopkeeper_id !== auth()->id(), 403, 'Unauthorized action.');

        // Delete the image file if it exists
        if ($advertisement->image) {
            Storage::disk('public')->delete($advertisement->image);
        }

        // Delete the advertisement
        $advertisement->delete();

        return redirect()->route('advertisements.index')
            ->with('success', 'اعلان په بریالیتوب سره حذف شو');
    }

    /**
     * Get advertisements for site display
     */
    public function getForSite(): Response
    {
        $advertisements = Advertisement::with('shopkeeper')
            ->latest()
            ->get()
            ->map(fn ($ad) => [
                'id' => $ad->id,
                'title' => $ad->title,
                'description' => $ad->description,
                'image' => $ad->image ? asset('storage/' . $ad->image) : null,
                'shopkeeper_name' => $ad->shopkeeper->name,
                'created_at' => $ad->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Site/Adv', [
            'advertisements' => $advertisements
        ]);
    }
}
