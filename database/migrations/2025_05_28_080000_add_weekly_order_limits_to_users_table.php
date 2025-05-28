<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('weekly_order_limit')->default(200)->after('social_links');
            $table->integer('current_week_orders')->default(0)->after('weekly_order_limit');
            $table->date('week_start_date')->nullable()->after('current_week_orders');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['weekly_order_limit', 'current_week_orders', 'week_start_date']);
        });
    }
};
