<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();

            // User's comment
            $table->text('comment');

            // Numeric rating (e.g., 1 to 5 stars)
            $table->unsignedTinyInteger('rating')->nullable(); // values like 1–5 or 0–10

            // Optional uploaded image
            $table->string('user_image')->nullable();

            // Uncomment if you want to track which user submitted the feedback
            // $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
};
