<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Message;

class NewMessageNotification extends Notification
{
    use Queueable;

    protected $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $senderName = $this->message->user ? $this->message->user->name : 'Unknown User';

        return [
            'title' => 'نوی پیغام',
            'message' => 'تاسو ته د ' . $senderName . ' لخوا نوی پیغام راغلی دی: ' . $this->message->subject,
            'message_id' => $this->message->id,
            'sender_name' => $senderName,
            'subject' => $this->message->subject,
            'type' => 'message',
            'icon' => 'message',
            'created_at' => now(),
        ];
    }
}
