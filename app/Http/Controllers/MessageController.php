<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Http\Requests\MessageRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::with('user')->latest()->get();
        return Inertia::render('System/Messages', [
            'messages' => $messages
        ]);
    }

    public function store(MessageRequest $request)
    {
        $validated = $request->validated();

        $message = Message::create([
            'user_id' => Auth::id(),
            'phone' => $validated['phone'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
        ]);

        // Send notification to all admin users
        $adminUsers = User::where('role', 'admin')->get();

        if ($adminUsers->count() > 0) {
            foreach ($adminUsers as $admin) {
                try {
                    \App\Models\Notification::createForUser(
                        $admin->id,
                        'نوی پیغام',
                        'تاسو ته د ' . Auth::user()->name . ' لخوا نوی پیغام راغلی دی: ' . $message->subject,
                        'message',
                        [
                            'message_id' => $message->id,
                            'sender_name' => Auth::user()->name,
                            'subject' => $message->subject,
                            'icon' => 'message',
                        ]
                    );
                } catch (\Exception $e) {
                    Log::error('Failed to send notification to admin: ' . $e->getMessage());
                }
            }
        } else {
            Log::warning('No admin users found to send notification');
        }

        return back()->with('success', 'پیغام په بریالیتوب سره ولېږل شو');
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return back()->with('success', 'پیغام په بریالیتوب سره حذف شو');
    }
}
