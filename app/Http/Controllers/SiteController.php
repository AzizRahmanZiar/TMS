<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SiteController extends Controller
{
    public function tailors()
    {
        // Get all tailors regardless of whether they have a shop or not
        $tailors = User::where('role', 'Tailor')
            ->select([
                'id',
                'name',
                'email',
                'profile_image',
                'experience',
                'career',
                'previous_work',
                'certifications',
                'skills',
                'work_availability',
                'tailoring_name',
                'created_at'
            ])
            ->get()
            ->map(function ($tailor) {
                // Debug profile image path
                $profileImagePath = $tailor->profile_image;
                $profileImageExists = $profileImagePath ? Storage::disk('public')->exists($profileImagePath) : false;
                
                return [
                    'id' => $tailor->id,
                    'name' => $tailor->name,
                    'email' => $tailor->email,
                    'profile_photo_url' => $profileImagePath ? asset('storage/' . $profileImagePath) : null,
                    'profile_image_debug' => [
                        'path' => $profileImagePath,
                        'exists' => $profileImageExists,
                        'full_path' => $profileImagePath ? storage_path('app/public/' . $profileImagePath) : null
                    ],
                    'experience' => $tailor->experience,
                    'career' => $tailor->career,
                    'previous_work' => $tailor->previous_work,
                    'certifications' => $tailor->certifications,
                    'skills' => $tailor->skills,
                    'work_availability' => $tailor->work_availability,
                    'has_shop' => !empty($tailor->tailoring_name),
                    'created_at' => $tailor->created_at->format('Y-m-d')
                ];
            });

        return Inertia::render('Site/Tailors', [
            'tailors' => $tailors
        ]);
    }

    public function shops()
    {
        // Get only tailors who have shops
        $shops = User::where('role', 'Tailor')
            ->whereNotNull('tailoring_name')
            ->select([
                'id',
                'name',
                'email',
                'profile_image',
                'tailoring_name',
                'tailoring_address',
                'contact_number',
                'shop_email',
                'working_hours',
                'services',
                'payment_methods',
                'social_links',
                'shop_images',
                'published_year',
                'created_at'
            ])
            ->get()
            ->map(function ($shop) {
                // Debug profile image path
                $profileImagePath = $shop->profile_image;
                $profileImageExists = $profileImagePath ? Storage::disk('public')->exists($profileImagePath) : false;
                
                // Ensure shop_images is properly formatted
                $shopImages = $shop->shop_images;
                if (is_string($shopImages)) {
                    try {
                        $shopImages = json_decode($shopImages, true);
                    } catch (\Exception $e) {
                        // If JSON decode fails, treat as a single image path
                        $shopImages = [$shopImages];
                    }
                }
                
                return [
                    'id' => $shop->id,
                    'name' => $shop->name,
                    'email' => $shop->email,
                    'profile_image' => $profileImageExists ? $profileImagePath : null,
                    'tailoring_name' => $shop->tailoring_name,
                    'tailoring_address' => $shop->tailoring_address,
                    'contact_number' => $shop->contact_number,
                    'shop_email' => $shop->shop_email,
                    'working_hours' => $shop->working_hours,
                    'services' => $shop->services,
                    'payment_methods' => $shop->payment_methods,
                    'social_links' => $shop->social_links,
                    'shop_images' => $shopImages,
                    'published_year' => $shop->published_year,
                    'created_at' => $shop->created_at
                ];
            });

        return Inertia::render('Site/Shop', [
            'shops' => $shops
        ]);
    }
} 