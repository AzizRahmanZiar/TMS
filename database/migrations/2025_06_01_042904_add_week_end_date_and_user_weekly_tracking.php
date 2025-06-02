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
            // Add week end date for tailors
            $table->date('week_end_date')->nullable()->after('week_start_date');
        });

        Schema::table('customer_orders', function (Blueprint $table) {
            // Add week tracking for customer orders
            $table->date('order_week_start')->nullable()->after('is_visible');
            $table->date('order_week_end')->nullable()->after('order_week_start');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('week_end_date');
        });

        Schema::table('customer_orders', function (Blueprint $table) {
            $table->dropColumn(['order_week_start', 'order_week_end']);
        });
    }
};
