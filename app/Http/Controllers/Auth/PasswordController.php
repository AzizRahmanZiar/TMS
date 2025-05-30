<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ], [
            'current_password.required' => 'اوسنی پټنوم ضروری دی',
            'current_password.current_password' => 'اوسنی پټنوم سم نه دی',
            'password.required' => 'نوی پټنوم ضروری دی',
            'password.confirmed' => 'د پټنوم تصدیق سره سمون نلري',
            'password.min' => 'پټنوم باید لږترلږه :min توري ولري',
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('status', 'password-updated');
    }
}
