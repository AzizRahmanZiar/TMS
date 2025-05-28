<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function create()
    {
        // Always regenerate CSRF token when showing login page
        request()->session()->regenerateToken();

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

        if ($user->role === 'admin' || $user->role === 'tailor') {
            return redirect()->intended(route('dashboard'));
        } elseif ($user->role === 'customer') {
            return redirect()->intended(route('home'));
        }

        return redirect()->intended(route('home'));
    }

    public function destroy()
    {
        Auth::logout();

        // Don't regenerate token or invalidate session to prevent CSRF issues
        // Just logout the user and redirect

        return redirect('/')->with('status', 'You have been successfully logged out.');
    }
}
