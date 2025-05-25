<?php

namespace App\Http\Controllers;

use App\Models\Uniform;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UniformController extends Controller
{
    // List all uniforms for the system
    public function index()
    {
        // Only get uniforms for the authenticated user
        $uniforms = Uniform::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('System/Uniform', [
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

        // Add user_id to the validated data
        $validated['user_id'] = auth()->id();

        $uniform = Uniform::create($validated);

        return back()->with('success', 'Uniform created successfully');
    }

    // Show a single uniform
    public function show(Uniform $uniform)
    {
        // Check if the uniform belongs to the authenticated user
        if ($uniform->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Uniforms/Show', [
            'uniform' => $uniform
        ]);
    }

    // Show the edit form
    public function edit(Uniform $uniform)
    {
        // Check if the uniform belongs to the authenticated user
        if ($uniform->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Uniforms/Edit', [
            'uniform' => $uniform
        ]);
    }

    // Update a uniform
    public function update(Request $request, Uniform $uniform)
    {
        // Check if the uniform belongs to the authenticated user
        if ($uniform->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

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

        return back()->with('success', 'Uniform updated successfully');
    }

    // Delete a uniform
    public function destroy(Uniform $uniform)
    {
        // Check if the uniform belongs to the authenticated user
        if ($uniform->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $uniform->delete();
        return back()->with('success', 'Uniform deleted successfully');
    }
}
