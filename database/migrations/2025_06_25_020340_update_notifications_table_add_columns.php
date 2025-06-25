<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateNotificationsTableAddColumns extends Migration
{
    public function up()
    {
        Schema::table('notifications', function (Blueprint $table) {
            if (!Schema::hasColumn('notifications', 'user_id')) {
                $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            }
            if (!Schema::hasColumn('notifications', 'type')) {
                $table->string('type')->nullable();
            }
            if (!Schema::hasColumn('notifications', 'title')) {
                $table->string('title')->nullable();
            }
            if (!Schema::hasColumn('notifications', 'message')) {
                $table->text('message')->nullable();
            }
            if (!Schema::hasColumn('notifications', 'data')) {
                $table->json('data')->nullable();
            }
            if (!Schema::hasColumn('notifications', 'read')) {
                $table->boolean('read')->default(false);
            }
        });
    }

    public function down()
    {
        Schema::table('notifications', function (Blueprint $table) {
            if (Schema::hasColumn('notifications', 'user_id')) {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            }
            if (Schema::hasColumn('notifications', 'type')) {
                $table->dropColumn('type');
            }
            if (Schema::hasColumn('notifications', 'title')) {
                $table->dropColumn('title');
            }
            if (Schema::hasColumn('notifications', 'message')) {
                $table->dropColumn('message');
            }
            if (Schema::hasColumn('notifications', 'data')) {
                $table->dropColumn('data');
            }
            if (Schema::hasColumn('notifications', 'read')) {
                $table->dropColumn('read');
            }
        });
    }
}
