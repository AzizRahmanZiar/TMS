<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Notifications\NewUserRegistrationNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    public function create(): Response
    {
        $hasAdmin = User::where('role', 'admin')->exists();
        return Inertia::render('Auth/Register', [
            'hasAdmin' => $hasAdmin
        ]);
    }

    public function store(RegisterRequest $request): RedirectResponse
    {
        // Check if trying to register as admin when one already exists
        if ($request->role === 'admin' && User::where('role', 'admin')->exists()) {
            return back()->withErrors(['role' => 'یوازې یو مدیر د سیسټم کې اجازه لري.']);
        }

        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'experience' => $validated['experience'] ?? null,
            'career' => $validated['career'] ?? null,
            'previous_work' => $validated['previous_work'] ?? null,
            'certifications' => $validated['certifications'] ?? null,
            'skills' => $validated['skills'] ?? null,
            'work_availability' => $validated['work_availability'] ?? null,
        ]);

        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image = $path;
            $user->save(); // Save immediately after setting the profile image
        }

        // Handle shop information if provided
        if (isset($validated['tailoring_name']) && !empty($validated['tailoring_name'])) {
            $user->tailoring_name = $validated['tailoring_name'];
            $user->tailoring_address = $validated['tailoring_address'] ?? null;
            $user->tailor_count = $validated['tailor_count'] ?? null;
            $user->published_year = $validated['published_year'] ?? null;
            $user->contact_number = $validated['contact_number'] ?? null;
            $user->shop_email = $validated['shop_email'] ?? null;
            $user->working_hours = $validated['working_hours'] ?? null;
            $user->services = $validated['services'] ?? null;
            $user->social_links = $validated['social_links'] ?? null;

            // Handle shop images upload
            if ($request->hasFile('shop_images')) {
                $shopImages = [];
                foreach ($request->file('shop_images') as $image) {
                    $path = $image->store('shop_images', 'public');
                    $shopImages[] = $path;
                }
                $user->shop_images = json_encode($shopImages);
            }
        }

        $user->save();

        // Send notification to all admin users
        $adminUsers = User::where('role', 'admin')->get();
        foreach ($adminUsers as $admin) {
            $admin->notify(new NewUserRegistrationNotification($user));
        }

        event(new Registered($user));

        // Instead of auto-login, redirect to login page with success message
        return redirect()->route('login')->with('success', 'Registration successful! Please login with your credentials.');
    }
}
