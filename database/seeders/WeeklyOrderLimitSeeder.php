<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\CustomerOrder;
use Carbon\Carbon;

class WeeklyOrderLimitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Update all existing tailors to have the default weekly limit of 200
        User::where('role', 'Tailor')->update([
            'weekly_order_limit' => 200,
            'current_week_orders' => 0,
            'week_start_date' => Carbon::now()->startOfWeek(),
        ]);

        // Create a test tailor with limited capacity for testing
        $testTailor = User::where('role', 'Tailor')->first();
        
        if ($testTailor) {
            // Set this tailor to have only 5 orders limit for easy testing
            $testTailor->update([
                'weekly_order_limit' => 5,
                'current_week_orders' => 0,
                'week_start_date' => Carbon::now()->startOfWeek(),
            ]);

            // Create 4 orders for this tailor (leaving 1 remaining)
            $customer = User::where('role', 'Customer')->first();
            
            if ($customer) {
                for ($i = 0; $i < 4; $i++) {
                    CustomerOrder::create([
                        'user_id' => $customer->id,
                        'tailor_id' => $testTailor->id,
                        'phone' => '0701234567',
                        'address' => 'Test Address ' . ($i + 1),
                        'status' => 'pending',
                        'is_visible' => false,
                        'created_at' => Carbon::now()->startOfWeek()->addHours($i),
                    ]);
                }
            }
        }

        $this->command->info('Weekly order limits have been set for all tailors.');
        $this->command->info('Test tailor created with 4/5 orders used.');
    }
}
