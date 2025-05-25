<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cloths', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->after('id');
        });

        // Update existing records with the first user's ID
        DB::table('cloths')->update(['user_id' => 1]);

        // Now make the column non-nullable and add the foreign key constraint
        Schema::table('cloths', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable(false)->change();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cloths', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};
