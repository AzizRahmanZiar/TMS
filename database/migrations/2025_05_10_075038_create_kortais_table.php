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
        Schema::create('kortais', function (Blueprint $table) {
            $table->id();

            $table->string('nom');                         // نوم
            $table->string('mobile');                      // مبایل نمبر
            $table->decimal('money', 10, 2);               // پیسې

            $table->string('shana');                       // شانه
            $table->string('tenna');                       // تنه
            $table->string('lstoony_ojd');                 // لستوڼی اوږدوالی
            $table->string('lstoony_browali');             // لستوڼی بروالی
            $table->string('ghara_dol');                   // د غاړي ډول
            $table->string('zegar');                       // ځګر
            $table->integer('tidad');                      // تعداد

            $table->date('rawrul_tareekh');                // د راوړلو تاریخ
            $table->date('tasleem_tareekh');               // د تسلیمولو تاریخ

            $table->timestamps();    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kortais');
    }
};
