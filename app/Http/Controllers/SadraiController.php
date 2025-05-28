<?php

namespace App\Http\Controllers;

use App\Models\Sadrai;
use App\Http\Requests\SadraiRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SadraiController extends Controller
{
    // Display all sadrais
    public function index()
    {
        $sadrais = Sadrai::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('System/Sadrai', [
            'sadrais' => $sadrais
        ]);
    }

    // Show create form (React side handles form UI)
    public function create()
    {
        return Inertia::render('System/Sadrai/Create');
    }

    // Store a new sadrai
    public function store(SadraiRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        Sadrai::create($validated);

        return redirect()->route('sadrai.index')->with('success', 'Sadrai created successfully.');
    }

    // Show a specific sadrai
    public function show(Sadrai $sadrai)
    {
       if ($sadrai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('System/Sardai/Show', [
            'sadrai' => $sadrai
        ]);
    }

    // Show edit form
    public function edit(Sadrai $sadrai)
    {
         if ($sadrai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('System/Sardai/Edit', [
            'sadrai' => $sadrai
        ]);
    }

    // Update sadrai
    public function update(SadraiRequest $request, Sadrai $sadrai)
    {
         if ($sadrai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validated();
        $sadrai->update($validated);

        return redirect()->route('sadrai.index')->with('success', 'Sadrai updated successfully.');
    }

    // Delete sadrai
    public function destroy(Sadrai $sadrai)
    {
       if ($sadrai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        $sadrai->delete();

        return redirect()->route('sadrai.index')->with('success', 'Sadrai deleted successfully.');
    }
}
