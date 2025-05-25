<?php

namespace App\Http\Controllers;

use App\Models\Kortai;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KortaiController extends Controller
{
    // Display all kortais
    public function index()
    {
        $kortais = Kortai::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('System/Kortai', [
            'kortais' => $kortais
        ]);
    }

    // Show create form (React side handles form UI)
    public function create()
    {
        return Inertia::render('System/Kortai/Create');
    }

    // Store a new kortai
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'money' => 'required|numeric',
            'shana' => 'required|string',
            'tenna' => 'required|string',
            'lstoony_ojd' => 'required|string',
            'lstoony_browali' => 'required|string',
            'ghara_dol' => 'required|string',
            'zegar' => 'required|string',
            'tidad' => 'required|integer',
            'rawrul_tareekh' => 'required|date',
            'tasleem_tareekh' => 'nullable|date|after:rawrul_tareekh',
        ]);

        $validated['user_id'] = auth()->id();
        Kortai::create($validated);

        return redirect()->route('kortai.index')->with('success', 'Kortai created successfully.');
    }

    // Show a specific kortai
    public function show(Kortai $kortai)
    {
        if ($kortai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('System/Kortai/Show', [
            'kortai' => $kortai
        ]);
    }

    // Show edit form
    public function edit(Kortai $kortai)
    {
        if ($kortai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('System/Kortai/Edit', [
            'kortai' => $kortai
        ]);
    }

    // Update kortai
    public function update(Request $request, Kortai $kortai)
    {
        if ($kortai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'money' => 'required|numeric',
            'shana' => 'required|string',
            'tenna' => 'required|string',
            'lstoony_ojd' => 'required|string',
            'lstoony_browali' => 'required|string',
            'ghara_dol' => 'required|string',
            'zegar' => 'required|string',
            'tidad' => 'required|integer',
            'rawrul_tareekh' => 'required|date',
            'tasleem_tareekh' => 'nullable|date|after:rawrul_tareekh',
        ]);

        $kortai->update($validated);

        return redirect()->route('kortai.index')->with('success', 'Kortai updated successfully.');
    }

    // Delete kortai
    public function destroy(Kortai $kortai)
    {
        if ($kortai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        $kortai->delete();

        return redirect()->route('kortai.index')->with('success', 'Kortai deleted successfully.');
    }
}
