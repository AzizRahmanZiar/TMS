<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;

class NotificationController extends Controller
{
    /**
     * Get all notifications for the authenticated user
     */
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            if (request()->wantsJson()) {
                return response()->json([
                    'notifications' => [],
                    'unread_count' => 0,
                ], 401);
            }
            return redirect()->route('login');
        }

        $notifications = Notification::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get()
            ->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'data' => [
                        'title' => $notification->title,
                        'message' => $notification->message,
                        'type' => $notification->type,
                        'icon' => $notification->data['icon'] ?? 'bell',
                        'created_at' => $notification->created_at,
                    ],
                    'read_at' => $notification->read_at,
                    'created_at' => $notification->created_at,
                    'time_ago' => $notification->created_at->diffForHumans(),
                ];
            });

        $unreadCount = Notification::where('user_id', $user->id)->where('read', false)->count();

        // Return JSON for AJAX requests
        if (request()->wantsJson()) {
            return response()->json([
                'notifications' => $notifications,
                'unread_count' => $unreadCount,
            ]);
        }

        // Return Inertia response for regular requests
        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $unreadCount,
        ]);
    }

    /**
     * Mark a specific notification as read
     */
    public function markAsRead(Request $request, $id): JsonResponse
    {
        $user = Auth::user();

        $notification = Notification::where('user_id', $user->id)->find($id);

        if ($notification) {
            $notification->markAsRead();
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false], 404);
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead(): JsonResponse
    {
        $user = Auth::user();

        Notification::where('user_id', $user->id)
            ->where('read', false)
            ->update(['read' => true, 'read_at' => now()]);

        return response()->json(['success' => true]);
    }

    /**
     * Get unread notification count
     */
    public function getUnreadCount(): JsonResponse
    {
        $user = Auth::user();
        $unreadCount = Notification::where('user_id', $user->id)->where('read', false)->count();

        return response()->json(['unread_count' => $unreadCount]);
    }
}
