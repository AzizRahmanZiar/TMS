<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;

class CheckUserRoleSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'testuser@example.com')->first();

        if ($user) {
            $this->command->info("User: {$user->email}");
            $this->command->info("Role value: " . ($user->role ? $user->role->value : 'No role assigned'));
            $this->command->info("Raw role attribute: " . $user->getRawOriginal('role'));

            // If no role is assigned, set it to ADMIN
            if (!$user->role) {
                $user->role = Roles::ADMIN;
                $user->save();
                $this->command->info("Role set to: " . Roles::ADMIN->value);
            }
        } else {
            $this->command->error("User not found");
        }
    }
}
