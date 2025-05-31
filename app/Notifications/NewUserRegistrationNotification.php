<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use App\Models\User;

class NewUserRegistrationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'نوی کارکوونکی',
            'message' => 'نوی کارکوونکی ' . $this->user->name . ' د ' . $this->getRoleInPashto($this->user->role) . ' په توګه ثبت شوی دی',
            'user_id' => $this->user->id,
            'user_name' => $this->user->name,
            'user_email' => $this->user->email,
            'user_role' => $this->user->role,
            'type' => 'registration',
            'icon' => 'user',
            'created_at' => now(),
        ];
    }

    private function getRoleInPashto($role)
    {
        switch ($role) {
            case 'admin':
                return 'اډمین';
            case 'tailor':
                return 'خیاط';
            case 'shopkeeper':
                return 'شرکت';
            default:
                return 'کارکوونکی';
        }
    }
}
