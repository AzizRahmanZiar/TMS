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
        Schema::table('notifications', function (Blueprint $table) {
            if (!Schema::hasColumn('notifications', 'user_id')) {
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
            }
            if (!Schema::hasColumn('notifications', 'type')) {
                $table->string('type');
            }
            if (!Schema::hasColumn('notifications', 'title')) {
                $table->string('title');
            }
            if (!Schema::hasColumn('notifications', 'message')) {
                $table->text('message');
            }
            if (!Schema::hasColumn('notifications', 'data')) {
                $table->json('data')->nullable();
            }
            if (!Schema::hasColumn('notifications', 'read')) {
                $table->boolean('read')->default(false);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropColumn(['user_id', 'type', 'title', 'message', 'data', 'read']);
        });
    }
};
