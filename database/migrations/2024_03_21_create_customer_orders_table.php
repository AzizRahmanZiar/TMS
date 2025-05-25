<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('customer_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('tailor_id')->constrained('users')->onDelete('cascade');
            $table->string('phone');
            $table->text('address');
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('customer_orders');
    }
}; 