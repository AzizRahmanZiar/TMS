<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sadrais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('nom');
            $table->string('mobile');
            $table->decimal('money', 10, 2);

            $table->string('shana');
            $table->string('tenna');
            $table->string('ghara_dol');
            $table->string('zegar');
            $table->integer('tidad');

            $table->date('rawrul_tareekh');
            $table->date('tasleem_tareekh')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sadrai');
    }
};

