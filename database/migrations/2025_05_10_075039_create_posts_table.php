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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();

            // File path for the uploaded image
            $table->string('image')->nullable(); // ډیزان
    
            // Description with a max of 2000 characters
            $table->text('description')->nullable(); // تفصیل
    
            // Category field with a limited set of known values
            $table->enum('category', ['Cloths', 'Uniform', 'Kortai', 'Sadrai'])->nullable(); // کټګورۍ
    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
