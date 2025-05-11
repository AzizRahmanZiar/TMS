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
        Schema::create('uniforms', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // نوم
            $table->string('mobile'); // مبایل نمبر
            $table->decimal('money', 10, 2); // پیسې
    
            // Measurements and order details
            $table->string('yakhun_qak')->nullable(); // یخن قاک
            $table->string('patlun')->nullable(); // پتلون
            $table->string('ghara')->nullable(); // غاړه
            $table->string('zegar')->nullable(); // ځګر
            $table->string('lstoony')->nullable(); // لسټوڼي
            $table->integer('tidad')->nullable(); // تعداد
    
            // Dates
            $table->date('rawrul_tareekh')->nullable(); // د راوړلو تاریخ
            $table->date('tasleem_tareekh')->nullable(); // د تسلیمولو تاریخ
    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uniforms');
    }
};
