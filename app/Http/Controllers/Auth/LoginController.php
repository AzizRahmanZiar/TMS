<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Enums\Roles;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => true,
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request)
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();

        if ($user->role === Roles::ADMIN || $user->role === Roles::TAILOR || $user->role === Roles::SHOPKEEPER) {
            return redirect()->intended(route('dashboard'));
        } elseif ($user->role === Roles::CUSTOMER) {
            return redirect()->intended(route('home'));
        }

        return redirect()->intended(route('home'));
    }

    public function destroy()
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/')->with('status', 'You have been successfully logged out.');
    }
}
