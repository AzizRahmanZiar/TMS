<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function admin()
    {
        return Inertia::render('System/Admin');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|string|in:User,Tailor,Admin',
        ]);

        $user->update($validated);

        return redirect()->back()->with('message', 'User updated successfully.');
    }
}
