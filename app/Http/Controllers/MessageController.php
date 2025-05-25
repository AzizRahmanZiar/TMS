<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'required|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'user_id' => auth()->id(),
            'phone' => $validated['phone'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
        ]);

        return back()->with('success', 'پیغام په بریالیتوب سره ولېږل شو');
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return back()->with('success', 'پیغام په بریالیتوب سره حذف شو');
    }
}
