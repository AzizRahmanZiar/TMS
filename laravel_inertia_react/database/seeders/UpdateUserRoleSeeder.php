<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;

class UpdateUserRoleSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'testuser@example.com')->first();

        if ($user) {
            $user->role = Roles::ADMIN;
            $user->save();
            $this->command->info("User role updated to admin for: {$user->email}");
        } else {
            $this->command->error("User not found");
        }
    }
}
