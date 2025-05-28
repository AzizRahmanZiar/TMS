<?php

namespace App\Http\Controllers;

use App\Models\Kortai;
use App\Http\Requests\KortaiRequest;
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
    public function store(KortaiRequest $request)
    {
        $validated = $request->validated();
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
    public function update(KortaiRequest $request, Kortai $kortai)
    {
        if ($kortai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validated();
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
