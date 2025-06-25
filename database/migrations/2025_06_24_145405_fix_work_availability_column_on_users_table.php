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
        // Drop the ENUM column
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('work_availability');
        });
        // Add it back as a string
        Schema::table('users', function (Blueprint $table) {
            $table->string('work_availability', 255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the string column
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('work_availability');
        });
        // Add it back as ENUM (Pashto)
        Schema::table('users', function (Blueprint $table) {
            $table->enum('work_availability', ['مکمل وخت', 'نیم وخت'])->nullable();
        });
    }
};
