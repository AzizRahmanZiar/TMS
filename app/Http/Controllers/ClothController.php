<?php

namespace App\Http\Controllers;

use App\Models\Cloth;
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'qadd' => 'required|numeric',
            'shana' => 'required|numeric',
            'ghara' => 'required|numeric',
            'zegar' => 'required|numeric',
            'lstoony' => 'required|numeric',
            'partog' => 'required|numeric',
            'pai_tsa' => 'required|numeric',
            'lastoni' => 'required|boolean',
            'lastoni_goti' => 'required|boolean',
            'bin' => 'required|boolean',
            'bin_kat' => 'required|boolean',
            'makh_jib' => 'required|boolean',
            'tarikhzi' => 'required|boolean',
            'kalari' => 'required|boolean',
            'shabazi' => 'required|boolean',
            'arabi' => 'required|boolean',
            'lemen' => 'required|boolean',
            'lastoni_2' => 'required|boolean',
            'rawrul_tareekh' => 'required|date',
            'tasleem_tareekh' => 'nullable|date|after_or_equal:rawrul_tareekh',
            'tidad' => 'required|integer',
            'money' => 'required|numeric',
        ]);

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
    public function update(Request $request, Cloth $cloth)
    {
        $this->authorizeCloth($cloth);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'qadd' => 'required|numeric',
            'shana' => 'required|numeric',
            'ghara' => 'required|numeric',
            'zegar' => 'required|numeric',
            'lstoony' => 'required|numeric',
            'partog' => 'required|numeric',
            'pai_tsa' => 'required|numeric',
            'lastoni' => 'required|boolean',
            'lastoni_goti' => 'required|boolean',
            'bin' => 'required|boolean',
            'bin_kat' => 'required|boolean',
            'makh_jib' => 'required|boolean',
            'tarikhzi' => 'required|boolean',
            'kalari' => 'required|boolean',
            'shabazi' => 'required|boolean',
            'arabi' => 'required|boolean',
            'lemen' => 'required|boolean',
            'lastoni_2' => 'required|boolean',
            'rawrul_tareekh' => 'required|date',
            'tasleem_tareekh' => 'nullable|date|after_or_equal:rawrul_tareekh',
            'tidad' => 'required|integer',
            'money' => 'required|numeric',
        ]);

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
