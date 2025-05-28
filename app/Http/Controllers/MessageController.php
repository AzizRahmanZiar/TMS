<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Http\Requests\MessageRequest;
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

    public function store(MessageRequest $request)
    {
        $validated = $request->validated();

        Message::create([
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
