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
        Schema::create('sadrais', function (Blueprint $table) {
            $table->id();

            $table->string('nom');               // نوم
            $table->string('mobile');            // مبایل نمبر
            $table->decimal('money', 10, 2);     // پیسې

            $table->string('shana');             // شانه
            $table->string('tenna');             // تنه
            $table->string('ghara_dol');         // د غاړي ډول
            $table->string('zegar');             // ځګر
            $table->integer('tidad');            // تعداد

            $table->date('rawrul_tareekh');      // د راوړلو تاریخ
            $table->date('tasleem_tareekh');     // د تسلیمولو تاریخ

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sadrais');
    }
};
