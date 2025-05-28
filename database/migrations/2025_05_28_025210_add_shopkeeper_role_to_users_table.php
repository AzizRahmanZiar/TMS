<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // For MySQL, we need to use raw SQL to modify ENUM
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'tailor', 'shopkeeper', 'user', 'customer') DEFAULT 'user'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove shopkeeper from ENUM
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'tailor', 'user', 'customer') DEFAULT 'user'");
    }
};
