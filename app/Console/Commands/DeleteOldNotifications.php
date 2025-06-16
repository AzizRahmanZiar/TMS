<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Notification;
use Carbon\Carbon;

class DeleteOldNotifications extends Command
{
    protected $signature = 'notifications:delete-old';
    protected $description = 'Delete notifications older than 12 hours';

    public function handle()
    {
        $cutoffTime = Carbon::now()->subHours(12);

        $deletedCount = Notification::where('created_at', '<', $cutoffTime)->delete();

        $this->info("Deleted {$deletedCount} notifications older than 12 hours.");
    }
}
