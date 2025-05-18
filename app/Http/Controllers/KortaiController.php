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
        $kortais = Kortai::orderBy('created_at', 'desc')->get();
        return Inertia::render('Kortais', [
            'kortais' => $kortais
        ]);
    }

    // Show create form (React side handles form UI)
    public function create()
    {
        return Inertia::render('Kortais/Create');
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
            'tasleem_tareekh' => 'required|date',
        ]);

        Kortai::create($validated);

        return redirect()->route('kortais.index')->with('success', 'Kortai created successfully.');
    }

    // Show a specific kortai
    public function show(Kortai $kortai)
    {
        return Inertia::render('Kortais/Show', [
            'kortai' => $kortai
        ]);
    }

    // Show edit form
    public function edit(Kortai $kortai)
    {
        return Inertia::render('Kortais/Edit', [
            'kortai' => $kortai
        ]);
    }

    // Update kortai
    public function update(Request $request, Kortai $kortai)
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
            'tasleem_tareekh' => 'required|date',
        ]);

        $kortai->update($validated);

        return redirect()->route('kortais.index')->with('success', 'Kortai updated successfully.');
    }

    // Delete kortai
    public function destroy(Kortai $kortai)
    {
        $kortai->delete();

        return redirect()->route('kortais.index')->with('success', 'Kortai deleted successfully.');
    }
}
