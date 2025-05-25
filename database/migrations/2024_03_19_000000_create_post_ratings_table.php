<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('post_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('tailor_post_id')->constrained()->onDelete('cascade');
            $table->integer('rating');
            $table->text('comment')->nullable();
            $table->timestamps();

            // Add unique constraint to prevent multiple ratings from same user for same post
            $table->unique(['user_id', 'tailor_post_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('post_ratings');
    }
}; 