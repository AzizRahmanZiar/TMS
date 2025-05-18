<?php

namespace App\Http\Controllers;

use App\Models\Uniform;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UniformController extends Controller
{
    // List all uniforms
    public function index()
    {
        $uniforms = Uniform::orderBy('created_at', 'desc')->get();
        return Inertia::render('Uniforms/Index', [
            'uniforms' => $uniforms
        ]);
    }

    // Show the create form
    public function create()
    {
        return Inertia::render('Uniforms/Create');
    }

    // Store a new uniform
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'money' => 'required|numeric',

            'yakhun_qak' => 'nullable|string',
            'patlun' => 'nullable|string',
            'ghara' => 'nullable|string',
            'zegar' => 'nullable|string',
            'lstoony' => 'nullable|string',
            'tidad' => 'nullable|integer',

            'rawrul_tareekh' => 'nullable|date',
            'tasleem_tareekh' => 'nullable|date',
        ]);

        Uniform::create($validated);

        return redirect()->route('uniforms.index')->with('success', 'Uniform created successfully.');
    }

    // Show a single uniform
    public function show(Uniform $uniform)
    {
        return Inertia::render('Uniforms/Show', [
            'uniform' => $uniform
        ]);
    }

    // Show the edit form
    public function edit(Uniform $uniform)
    {
        return Inertia::render('Uniforms/Edit', [
            'uniform' => $uniform
        ]);
    }

    // Update a uniform
    public function update(Request $request, Uniform $uniform)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'money' => 'required|numeric',

            'yakhun_qak' => 'nullable|string',
            'patlun' => 'nullable|string',
            'ghara' => 'nullable|string',
            'zegar' => 'nullable|string',
            'lstoony' => 'nullable|string',
            'tidad' => 'nullable|integer',

            'rawrul_tareekh' => 'nullable|date',
            'tasleem_tareekh' => 'nullable|date',
        ]);

        $uniform->update($validated);

        return redirect()->route('uniforms.index')->with('success', 'Uniform updated successfully.');
    }

    // Delete a uniform
    public function destroy(Uniform $uniform)
    {
        $uniform->delete();

        return redirect()->route('uniforms.index')->with('success', 'Uniform deleted successfully.');
    }
}
