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
        Schema::table('sadrais', function (Blueprint $table) {
            // Make tasleem_tareekh nullable
            $table->date('tasleem_tareekh')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sadrais', function (Blueprint $table) {
            // Revert tasleem_tareekh to NOT NULL (only if all values are not null)
            $table->date('tasleem_tareekh')->nullable(false)->change();
        });
    }
};
