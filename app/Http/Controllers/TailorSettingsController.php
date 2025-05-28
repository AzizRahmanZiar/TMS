<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class TailorSettingsController extends Controller
{
    /**
     * Display the tailor settings page.
     */
    public function index()
    {
        $user = auth()->user();

        // Ensure only tailors can access this
        if (!$user->isTailor()) {
            return redirect()->route('dashboard')->with('error', 'Unauthorized access');
        }

        // Get current order statistics
        $orderStatistics = $user->getOrderStatistics();

        return Inertia::render('System/Settings', [
            'user' => $user,
            'orderStatistics' => $orderStatistics,
            'availableLimits' => [5, 10, 20, 30, 50, 100, 120, 150, 200, 230, 300, 400, 500, 600]
        ]);
    }

    /**
     * Update the tailor's weekly order limit.
     */
    public function updateOrderLimit(Request $request)
    {
        $user = auth()->user();

        // Ensure only tailors can access this
        if (!$user->isTailor()) {
            return redirect()->route('dashboard')->with('error', 'Unauthorized access');
        }

        $validated = $request->validate([
            'weekly_order_limit' => 'required|integer|min:1|max:1000'
        ]);

        // Update the user's weekly order limit
        $user->update([
            'weekly_order_limit' => $validated['weekly_order_limit']
        ]);

        // Update weekly tracking to reflect new limit
        $user->updateWeeklyOrderTracking();

        return redirect()->back()->with('success', 'ستاسو د اونۍ د فرمایشونو حد په بریالیتوب سره تغیر شو.');
    }

    /**
     * Reset weekly order count (for testing purposes or manual reset)
     */
    public function resetWeeklyCount(Request $request)
    {
        $user = auth()->user();

        // Ensure only tailors can access this
        if (!$user->isTailor()) {
            return redirect()->route('dashboard')->with('error', 'Unauthorized access');
        }

        // Reset the weekly count
        $user->update([
            'current_week_orders' => 0,
            'week_start_date' => now()->startOfWeek()
        ]);

        return redirect()->back()->with('success', 'د اونۍ د فرمایشونو شمیرنه بیا تنظیم شوه.');
    }
}
