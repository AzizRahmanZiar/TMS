<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => Roles::ADMIN,
            'email_verified_at' => now(),
        ]);

        // Create tailor user with complete profile
        User::create([
            'name' => 'Professional Tailor',
            'email' => 'tailor@example.com',
            'password' => Hash::make('password'),
            'role' => Roles::TAILOR,
            'email_verified_at' => now(),
            'experience' => 10,
            'career' => 'Master tailor specializing in formal wear',
            'previous_work' => 'Worked at high-end fashion houses',
            'certifications' => 'Certified Master Tailor',
            'skills' => 'Pattern making, alterations, custom designs',
            'tailoring_name' => 'Premium Stitches',
            'tailoring_address' => '123 Fashion Street, Tailor City',
            'tailor_count' => 3,
            'published_year' => 2015,
            'contact_number' => '+1234567890',
            'shop_email' => 'info@premiumstitches.com',
            'working_hours' => '9AM-6PM, Mon-Sat',
            'services' => json_encode(['Custom Suits', 'Dress Alterations', 'Bridal Wear']),
            'payment_methods' => json_encode(['Cash', 'Credit Card', 'Bank Transfer']),
            'weekly_order_limit' => 15,
            'current_week_orders' => 5,
        ]);

        // Create shopkeeper user
        User::create([
            'name' => 'Fabric Shop Owner',
            'email' => 'shopkeeper@example.com',
            'password' => Hash::make('password'),
            'role' => Roles::SHOPKEEPER,
            'email_verified_at' => now(),
            'tailoring_name' => 'Fabric Haven',
            'tailoring_address' => '456 Textile Road, Fabric City',
            'contact_number' => '+9876543210',
            'shop_email' => 'sales@fabric-haven.com',
            'working_hours' => '10AM-7PM, Mon-Sat',
            'payment_methods' => json_encode(['Cash', 'Credit Card']),
        ]);

        // Create regular customer user
        User::create([
            'name' => 'Regular Customer',
            'email' => 'customer@example.com',
            'password' => Hash::make('password'),
            'role' => Roles::CUSTOMER,
            'email_verified_at' => now(),
        ]);

        // Create basic user
        User::create([
            'name' => 'Basic User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => Roles::USER,
            'email_verified_at' => now(),
        ]);

        // Create multiple tailors for testing
        User::factory()->count(5)->create([
            'role' => Roles::TAILOR,
            'weekly_order_limit' => 10,
            'current_week_orders' => rand(0, 8),
        ]);

        // Create multiple customers
        User::factory()->count(10)->create([
            'role' => Roles::CUSTOMER
        ]);
    }
}