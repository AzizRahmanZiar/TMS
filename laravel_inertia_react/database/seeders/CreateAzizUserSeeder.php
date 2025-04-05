<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CreateAzizUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Aziz',
            'email' => 'azizziar1401@gmail.com',
            'password' => Hash::make('12345'),
            'role' => Roles::USER->value
        ]);
    }
}
