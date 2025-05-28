<?php

namespace App\Http\Controllers;

use App\Models\Cloth;
use App\Models\Uniform;
use App\Models\Kortai;
use App\Models\Sadrai;
use App\Models\Advertisement;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $userRole = Auth::user()->role->value;

        $data = [];

        if ($userRole === 'shopkeeper') {
            // For shopkeepers, show comprehensive advertisement analytics
            $advertisements = Advertisement::where('shopkeeper_id', $userId)->latest()->get();

            // Basic statistics
            $advertisementStats = [
                'total' => $advertisements->count(),
                'thisMonth' => $advertisements->where('created_at', '>=', now()->startOfMonth())->count(),
                'thisWeek' => $advertisements->where('created_at', '>=', now()->startOfWeek())->count(),
                'today' => $advertisements->where('created_at', '>=', now()->startOfDay())->count(),
                'lastMonth' => $advertisements->where('created_at', '>=', now()->subMonth()->startOfMonth())
                    ->where('created_at', '<=', now()->subMonth()->endOfMonth())->count(),
                'lastWeek' => $advertisements->where('created_at', '>=', now()->subWeek()->startOfWeek())
                    ->where('created_at', '<=', now()->subWeek()->endOfWeek())->count(),
            ];

            // Monthly data for the last 6 months
            $monthlyData = [];
            for ($i = 5; $i >= 0; $i--) {
                $month = now()->subMonths($i);
                $monthlyData[] = [
                    'month' => $month->format('M Y'),
                    'monthPashto' => $this->getMonthNamePashto($month->format('n')) . ' ' . $month->format('Y'),
                    'count' => $advertisements->where('created_at', '>=', $month->startOfMonth())
                        ->where('created_at', '<=', $month->endOfMonth())->count(),
                ];
            }

            // Weekly data for the last 4 weeks
            $weeklyData = [];
            for ($i = 3; $i >= 0; $i--) {
                $week = now()->subWeeks($i);
                $weeklyData[] = [
                    'week' => 'Week ' . ($i + 1),
                    'weekPashto' => 'اونۍ ' . ($i + 1),
                    'count' => $advertisements->where('created_at', '>=', $week->startOfWeek())
                        ->where('created_at', '<=', $week->endOfWeek())->count(),
                ];
            }

            // Growth calculations
            $growthStats = [
                'monthlyGrowth' => $advertisementStats['lastMonth'] > 0
                    ? (($advertisementStats['thisMonth'] - $advertisementStats['lastMonth']) / $advertisementStats['lastMonth']) * 100
                    : ($advertisementStats['thisMonth'] > 0 ? 100 : 0),
                'weeklyGrowth' => $advertisementStats['lastWeek'] > 0
                    ? (($advertisementStats['thisWeek'] - $advertisementStats['lastWeek']) / $advertisementStats['lastWeek']) * 100
                    : ($advertisementStats['thisWeek'] > 0 ? 100 : 0),
            ];

            $data = [
                'advertisementStats' => $advertisementStats,
                'monthlyData' => $monthlyData,
                'weeklyData' => $weeklyData,
                'growthStats' => $growthStats,
                'recentAds' => $advertisements->take(5)->map(function ($ad) {
                    return [
                        'id' => $ad->id,
                        'title' => $ad->title,
                        'description' => $ad->description,
                        'image' => $ad->image ? asset('storage/' . $ad->image) : null,
                        'created_at' => $ad->created_at->format('Y-m-d'),
                        'created_at_human' => $ad->created_at->diffForHumans(),
                    ];
                }),
                'userRole' => $userRole,
            ];
        } else {
            // For tailors and admins, show existing data
            $cloths = Cloth::where('user_id', $userId)->latest()->get();
            $uniforms = Uniform::where('user_id', $userId)->latest()->get();
            $kortais = Kortai::where('user_id', $userId)->latest()->get();
            $sadrais = Sadrai::where('user_id', $userId)->latest()->get();

            // Calculate statistics
            $statistics = $this->calculateStatistics($cloths, $uniforms, $kortais, $sadrais);

            $data = [
                'cloths' => $cloths,
                'uniforms' => $uniforms,
                'kortais' => $kortais,
                'sadrais' => $sadrais,
                'statistics' => $statistics,
                'userRole' => $userRole,
            ];
        }

        return Inertia::render('System/Dashboard', $data);
    }

    private function getMonthNamePashto($monthNumber)
    {
        $months = [
            1 => 'جنوري',
            2 => 'فبروري',
            3 => 'مارچ',
            4 => 'اپریل',
            5 => 'می',
            6 => 'جون',
            7 => 'جولای',
            8 => 'اګست',
            9 => 'سپتمبر',
            10 => 'اکتوبر',
            11 => 'نومبر',
            12 => 'دسمبر',
        ];

        return $months[$monthNumber] ?? 'نامعلوم';
    }

    private function calculateStatistics($cloths, $uniforms, $kortais, $sadrais)
    {
        // Calculate totals for each category
        $clothsStats = $this->calculateCategoryStats($cloths, 'جامې');
        $uniformsStats = $this->calculateCategoryStats($uniforms, 'درشی');
        $kortaisStats = $this->calculateCategoryStats($kortais, 'کورتی');
        $sadraisStats = $this->calculateCategoryStats($sadrais, 'صدری');

        // Calculate overall totals
        $totalRevenue = $clothsStats['totalMoney'] + $uniformsStats['totalMoney'] +
                       $kortaisStats['totalMoney'] + $sadraisStats['totalMoney'];

        $totalQuantity = $clothsStats['totalQuantity'] + $uniformsStats['totalQuantity'] +
                        $kortaisStats['totalQuantity'] + $sadraisStats['totalQuantity'];

        $totalOrders = $cloths->count() + $uniforms->count() + $kortais->count() + $sadrais->count();

        // Calculate completed vs pending orders
        $completedOrders = $this->getCompletedOrdersCount($cloths, $uniforms, $kortais, $sadrais);
        $pendingOrders = $totalOrders - $completedOrders;

        return [
            'categories' => [
                'cloths' => $clothsStats,
                'uniforms' => $uniformsStats,
                'kortais' => $kortaisStats,
                'sadrais' => $sadraisStats,
            ],
            'totals' => [
                'revenue' => $totalRevenue,
                'quantity' => $totalQuantity,
                'orders' => $totalOrders,
                'completed' => $completedOrders,
                'pending' => $pendingOrders,
            ],
            'timeBasedRevenue' => [
                'daily' => $totalRevenue,
                'weekly' => $totalRevenue * 7,
                'monthly' => $totalRevenue * 30,
                'yearly' => $totalRevenue * 365,
            ]
        ];
    }

    private function calculateCategoryStats($items, $categoryName)
    {
        $totalMoney = $items->sum('money');
        $totalQuantity = $items->sum('tidad');
        $totalOrders = $items->count();

        $completed = $items->where('tasleem_tareekh', '!=', null)->count();
        $pending = $totalOrders - $completed;

        return [
            'name' => $categoryName,
            'totalMoney' => $totalMoney,
            'totalQuantity' => $totalQuantity,
            'totalOrders' => $totalOrders,
            'completed' => $completed,
            'pending' => $pending,
            'averageOrderValue' => $totalOrders > 0 ? $totalMoney / $totalOrders : 0,
        ];
    }

    private function getCompletedOrdersCount($cloths, $uniforms, $kortais, $sadrais)
    {
        return $cloths->where('tasleem_tareekh', '!=', null)->count() +
               $uniforms->where('tasleem_tareekh', '!=', null)->count() +
               $kortais->where('tasleem_tareekh', '!=', null)->count() +
               $sadrais->where('tasleem_tareekh', '!=', null)->count();
    }
}
