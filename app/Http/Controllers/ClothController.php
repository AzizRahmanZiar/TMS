<?php

namespace App\Http\Controllers;

use App\Models\Cloth;
use App\Http\Requests\ClothRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClothController extends Controller
{
    // Show all cloths for authenticated user
    public function index()
    {
        $cloths = Cloth::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('System/Cloths', [
            'cloths' => $cloths
        ]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('System/Cloths/Create');
    }

    // Store a new cloth
    public function store(ClothRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id(); // Add current user ID
        Cloth::create($validated);

        return redirect()->route('cloths.index')->with('success', 'Cloth created successfully.');
    }

    // Show a specific cloth
    public function show(Cloth $cloth)
    {
        $this->authorizeCloth($cloth);

        return Inertia::render('System/Cloths/Show', [
            'cloth' => $cloth
        ]);
    }

    // Show edit form
    public function edit(Cloth $cloth)
    {
        $this->authorizeCloth($cloth);

        return Inertia::render('System/Cloths/Edit', [
            'cloth' => $cloth
        ]);
    }

    // Update the cloth
    public function update(ClothRequest $request, Cloth $cloth)
    {
        $this->authorizeCloth($cloth);

        $validated = $request->validated();
        $cloth->update($validated);

        return redirect()->route('cloths.index')->with('success', 'Cloth updated successfully.');
    }

    // Delete cloth
    public function destroy(Cloth $cloth)
    {
        $this->authorizeCloth($cloth);
        $cloth->delete();

        return redirect()->route('cloths.index')->with('success', 'Cloth deleted successfully.');
    }

    // Private method for user authorization
    private function authorizeCloth(Cloth $cloth)
    {
        if ($cloth->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
    }
}
