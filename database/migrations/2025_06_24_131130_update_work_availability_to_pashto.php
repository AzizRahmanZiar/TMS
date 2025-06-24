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
        // First, update existing data from English to Pashto
        DB::table('users')
            ->where('work_availability', 'Full-time')
            ->update(['work_availability' => 'مکمل وخت']);

        DB::table('users')
            ->where('work_availability', 'Part-time')
            ->update(['work_availability' => 'نیم وخت']);

        // Then modify the column to use Pashto enum values
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('work_availability');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->enum('work_availability', ['مکمل وخت', 'نیم وخت'])->nullable()->after('skills');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // First, update existing data from Pashto to English
        DB::table('users')
            ->where('work_availability', 'مکمل وخت')
            ->update(['work_availability' => 'Full-time']);

        DB::table('users')
            ->where('work_availability', 'نیم وخت')
            ->update(['work_availability' => 'Part-time']);

        // Then modify the column to use English enum values
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('work_availability');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->enum('work_availability', ['Full-time', 'Part-time'])->nullable()->after('skills');
        });
    }
};
