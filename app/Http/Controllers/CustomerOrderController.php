<?php

namespace App\Http\Controllers;

use App\Models\CustomerOrder;
use App\Http\Requests\CustomerOrderRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CustomerOrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        Log::info('CustomerOrder index accessed:', [
            'user_id' => $user->id,
            'user_role' => $user->role
        ]);

        // Get only visible orders for the tailor
        $orders = CustomerOrder::with(['user', 'tailor'])
            ->where('tailor_id', $user->id)
            ->where('is_visible', true)
            ->latest()
            ->get();

        Log::info('Orders retrieved for tailor:', [
            'tailor_id' => $user->id,
            'count' => $orders->count(),
            'orders' => $orders->toArray()
        ]);

        return Inertia::render('System/CustomerOrder', [
            'orders' => $orders
        ]);
    }

    public function store(CustomerOrderRequest $request)
    {
        Log::info('Order creation request started:', [
            'request_data' => $request->all(),
            'auth_user' => Auth::user() ? [
                'id' => Auth::user()->id,
                'name' => Auth::user()->name,
                'role' => Auth::user()->role
            ] : null
        ]);

        try {
            Log::info('Validating request data');
            $validated = $request->validated();
            Log::info('Request validation passed', ['validated_data' => $validated]);

            // Verify the tailor exists and is a Tailor
            Log::info('Checking tailor details', ['tailor_id' => $validated['tailor_id']]);
            $tailor = \App\Models\User::where('id', $validated['tailor_id'])
                                   ->where('role', 'Tailor')
                                   ->first();

            if (!$tailor) {
                Log::error('Invalid tailor ID or role:', ['tailor_id' => $validated['tailor_id']]);
                return back()->with('error', 'Invalid tailor selected');
            }
            Log::info('Tailor verification passed', ['tailor' => $tailor->toArray()]);

            // Check if user has already placed an order this week
            if (Auth::user()->hasOrderedThisWeek()) {
                Log::warning('User has already placed an order this week', [
                    'user_id' => Auth::user()->id,
                    'user_name' => Auth::user()->name
                ]);
                return back()->with('error', 'تاسو د دغه اونۍ لپاره دمخه یو فرمایش ورکړی دی. هره اونۍ یوازې یو فرمایش ورکولی شئ.');
            }

            // Check if tailor can accept more orders this week
            if (!$tailor->canAcceptMoreOrders()) {
                Log::warning('Tailor has reached weekly order limit', [
                    'tailor_id' => $tailor->id,
                    'weekly_limit' => $tailor->weekly_order_limit,
                    'current_week_orders' => $tailor->getCurrentWeekOrderCount()
                ]);
                return back()->with('error', 'دا خیاط د دغه اونۍ لپاره خپل حد ته رسیدلی. مهرباني وکړئ بل خیاط وټاکئ یا راتلونکې اونۍ هڅه وکړئ.');
            }

            // Create the order and not visible initially
            Log::info('Creating order');
            $startOfWeek = now()->startOfWeek();
            $endOfWeek = now()->endOfWeek();

            $order = CustomerOrder::create([
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'tailor_id' => $validated['tailor_id'],
                'user_id' => Auth::id(),
                'is_visible' => false,
                'order_week_start' => $startOfWeek,
                'order_week_end' => $endOfWeek,
                'created_at' => now(),
            ]);
            Log::info('Order created successfully', ['order' => $order->toArray()]);

            // Update the tailor's weekly tracking dates first
            $tailor->updateWeeklyOrderTracking();

            // Then increment the current week orders count
            $tailor->increment('current_week_orders');

            // Send notification to the tailor
            \App\Models\Notification::createForUser(
                $tailor->id,
                'نوی آرډر',
                'تاسو ته د ' . Auth::user()->name . ' لخوا نوی آرډر راغلی دی',
                'order',
                [
                    'order_id' => $order->id,
                    'customer_name' => Auth::user()->name,
                    'customer_phone' => $order->phone,
                    'customer_address' => $order->address,
                    'icon' => 'shopping-cart',
                ]
            );

            return redirect()->route('home')->with('success', 'فرمایش مو په بریالیتوب سره درکړل شو. د خیاط د تایید انتظار کول');
        } catch (\Exception $e) {
            Log::error('Error in order creation:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            return back()->with('error', 'Error creating order: ' . $e->getMessage());
        }
    }

    public function update(Request $request, CustomerOrder $order)
    {
        $user = Auth::user();

        // Check if the user has permission to update this order
        if ($user->role === 'Tailor' && $order->tailor_id !== $user->id) {
            return redirect()->back()->with('error', 'Unauthorized');
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,completed'
        ]);

        $order->update($validated);

        return redirect()->back()->with('message', 'Order status updated successfully');
    }

    public function customerorder()
    {
        $user = Auth::user();
        Log::info('CustomerOrder page accessed:', [
            'user_id' => $user->id,
            'user_role' => $user->role
        ]);

        // Get all orders assigned to this tailor
        $orders = CustomerOrder::with(['user', 'tailor'])
            ->where('tailor_id', $user->id)
            ->latest()
            ->get();

        Log::info('Orders retrieved for tailor:', [
            'tailor_id' => $user->id,
            'count' => $orders->count(),
            'orders' => $orders->toArray()
        ]);

        return Inertia::render('System/CustomerOrder', [
            'orders' => $orders
        ]);
    }

    public function destroy(CustomerOrder $order)
    {
        // Check if the user has permission to delete this order
        $user = Auth::user();
        if ($user->role === 'Tailor' && $order->tailor_id !== $user->id) {
            return redirect()->back()->with('error', 'Unauthorized');
        }

        try {
            $order->delete();
            return redirect()->back()->with('message', 'Order deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error deleting order');
        }
    }

    public function show(CustomerOrder $order)
    {
        $user = Auth::user();

        // Check if the user has permission to view this order
        if ($user->role === 'Tailor' && $order->tailor_id !== $user->id) {
            return redirect()->back()->with('error', 'Unauthorized');
        }

        // Load the relationships
        $order->load(['user', 'tailor']);

        return Inertia::render('System/CustomerOrder', [
            'order' => $order
        ]);
    }
}
