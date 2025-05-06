<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CreateNewUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => Hash::make('password123'),
            'role' => Roles::ADMIN->value
        ]);
    }
}
