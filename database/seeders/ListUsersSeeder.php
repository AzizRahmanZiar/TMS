<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class ListUsersSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all(['name', 'email']);
        foreach ($users as $user) {
            $this->command->info("Name: {$user->name}, Email: {$user->email}");
        }
    }
}
