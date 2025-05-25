<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tailor_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('title')->nullable();
            $table->text('description');
            $table->string('image')->nullable();
            $table->datetime('date')->default(now());
            $table->string('author')->default('System');
            $table->string('email')->nullable();
            $table->enum('category', ['Cloths', 'Uniform', 'Kortai', 'Sadrai']);
            $table->integer('comments')->default(0);
            $table->integer('views')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tailor_posts');
    }
}; 