<?php

namespace App\Http\Controllers\Auth;

use App\Enums\Roles;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register', [
            'roles' => Roles::labels()
        ]);
    }

    public function store(RegisterRequest $request)
    {
        $validated = $request->validated();

        $user = new User();
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->password = Hash::make($validated['password']);
        $user->role = $validated['role'];

        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image = $path;
        }

        // Set tailor-specific fields if role is tailor
        if ($validated['role'] === Roles::TAILOR->value) {
            $user->experience = $validated['experience'];
            $user->career = $validated['career'];
            $user->previous_work = $validated['previous_work'];
            $user->certifications = $validated['certifications'];
            $user->skills = $validated['skills'];
            $user->work_availability = $validated['work_availability'];

            // Set shop information if provided
            if ($request->has('tailoring_name')) {
                $user->tailoring_name = $validated['tailoring_name'];
                $user->tailoring_address = $validated['tailoring_address'];
                $user->tailor_count = $validated['tailor_count'];
                $user->published_year = $validated['published_year'];
                $user->contact_number = $validated['contact_number'];
                $user->shop_email = $validated['shop_email'];
                $user->working_hours = $validated['working_hours'];
                $user->services = $validated['services'];
                $user->payment_methods = $validated['payment_methods'];

                // Handle shop images upload
                if ($request->hasFile('shop_images')) {
                    $shopImages = [];
                    foreach ($request->file('shop_images') as $image) {
                        $path = $image->store('shop_images', 'public');
                        $shopImages[] = $path;
                    }
                    $user->shop_images = $shopImages;
                }

                $user->social_links = $validated['social_links'];
            }
        }

        $user->save();

        // Redirect based on role
        if ($user->role === Roles::ADMIN->value) {
            return redirect()->route('admin.dashboard');
        } elseif ($user->role === Roles::TAILOR->value) {
            return redirect()->route('tailor.dashboard');
        }

        return redirect()->route('home');
    }
}
