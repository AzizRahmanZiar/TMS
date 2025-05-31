<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\CustomerOrder;

class NewOrderNotification extends Notification
{
    use Queueable;

    protected $order;

    public function __construct(CustomerOrder $order)
    {
        $this->order = $order;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'نوی آرډر',
            'message' => 'تاسو ته د ' . $this->order->user->name . ' لخوا نوی آرډر راغلی دی',
            'order_id' => $this->order->id,
            'customer_name' => $this->order->user->name,
            'customer_phone' => $this->order->phone,
            'customer_address' => $this->order->address,
            'type' => 'order',
            'icon' => 'shopping-cart',
            'created_at' => now(),
        ];
    }
}
