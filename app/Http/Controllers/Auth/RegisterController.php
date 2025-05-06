<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
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
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required|string',
            'experience' => 'nullable|integer',
            'career' => 'nullable|string',
            'previous_work' => 'nullable|string',
            'certifications' => 'nullable|string',
            'skills' => 'nullable|string',
            'work_availability' => 'nullable|string',
            'tailoring_name' => 'nullable|string',
            'tailoring_address' => 'nullable|string',
            'tailor_count' => 'nullable|integer',
            'published_year' => 'nullable|integer',
            'contact_number' => 'nullable|string',
            'shop_email' => 'nullable|email',
            'working_hours' => 'nullable|string',
            'services' => 'nullable|string',
            'payment_methods' => 'nullable|string',
            'social_links' => 'nullable|string',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'shop_images' => 'nullable|array',
            'shop_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

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
            $user->payment_methods = $validated['payment_methods'] ?? null;
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

        event(new Registered($user));

        // Instead of auto-login, redirect to login page with success message
        return redirect()->route('login')->with('success', 'Registration successful! Please login with your credentials.');
    }
}
