<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ResetTestUserPasswordSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'testuser@example.com')->first();

        if ($user) {
            $user->password = Hash::make('password123');
            $user->save();
            $this->command->info("Password reset for user: {$user->email}");
        } else {
            $this->command->error("User not found");
        }
    }
}
