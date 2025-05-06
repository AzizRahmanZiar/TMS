<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function admin()
    {
        $users = User::select('id', 'name', 'email', 'role', 'created_at')->get();

        return Inertia::render('System/Admin', [
            'users' => $users
        ]);
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

    public function destroy(User $user)
    {
        // Prevent deleting the last admin
        if ($user->role === 'admin' && User::where('role', 'admin')->count() <= 1) {
            return back()->with('error', 'Cannot delete the last admin user.');
        }

        $user->delete();
        return back()->with('message', 'User deleted successfully.');
    }
}
