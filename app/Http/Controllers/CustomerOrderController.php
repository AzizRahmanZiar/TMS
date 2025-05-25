<?php

namespace App\Http\Controllers;

use App\Models\CustomerOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerOrderController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        \Log::info('CustomerOrder index accessed:', [
            'user_id' => $user->id,
            'user_role' => $user->role
        ]);

        // Get only accepted and visible orders for the tailor
        $orders = CustomerOrder::with(['user', 'tailor'])
            ->where('tailor_id', $user->id)
            ->where('status', 'accepted')
            ->where('is_visible', true)
            ->latest()
            ->get();

        \Log::info('Orders retrieved for tailor:', [
            'tailor_id' => $user->id,
            'count' => $orders->count(),
            'orders' => $orders->toArray()
        ]);

        return Inertia::render('System/CustomerOrder', [
            'orders' => $orders
        ]);
    }

    public function store(Request $request)
    {
        \Log::info('Order creation request started:', [
            'request_data' => $request->all(),
            'auth_user' => auth()->user() ? [
                'id' => auth()->user()->id,
                'name' => auth()->user()->name,
                'role' => auth()->user()->role
            ] : null
        ]);

        try {
            \Log::info('Validating request data');
            $validated = $request->validate([
                'phone' => 'required|string',
                'address' => 'required|string',
                'tailor_id' => 'required|exists:users,id',
            ]);
            \Log::info('Request validation passed', ['validated_data' => $validated]);

            // Verify the tailor exists and is a Tailor
            \Log::info('Checking tailor details', ['tailor_id' => $validated['tailor_id']]);
            $tailor = \App\Models\User::where('id', $validated['tailor_id'])
                                   ->where('role', 'Tailor')
                                   ->first();

            if (!$tailor) {
                \Log::error('Invalid tailor ID or role:', ['tailor_id' => $validated['tailor_id']]);
                return back()->with('error', 'Invalid tailor selected');
            }
            \Log::info('Tailor verification passed', ['tailor' => $tailor->toArray()]);

            // Create the order with pending status and not visible
            \Log::info('Creating order');
            $order = CustomerOrder::create([
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'tailor_id' => $validated['tailor_id'],
                'user_id' => auth()->id(),
                'status' => 'pending',
                'is_visible' => false,
                'created_at' => now(),
            ]);
            \Log::info('Order created successfully', ['order' => $order->toArray()]);

            return redirect()->route('home')->with('success', 'فرمایش مو په بریالیتوب سره درکړل شو. د خیاط د تایید انتظار کول');
        } catch (\Exception $e) {
            \Log::error('Error in order creation:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            return back()->with('error', 'Error creating order: ' . $e->getMessage());
        }
    }

    public function update(Request $request, CustomerOrder $order)
    {
        $user = auth()->user();
        
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
        $user = auth()->user();
        \Log::info('CustomerOrder page accessed:', [
            'user_id' => $user->id,
            'user_role' => $user->role
        ]);

        // Get all orders assigned to this tailor
        $orders = CustomerOrder::with(['user', 'tailor'])
            ->where('tailor_id', $user->id)
            ->latest()
            ->get();

        \Log::info('Orders retrieved for tailor:', [
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
        $user = auth()->user();
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
        $user = auth()->user();
        
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
