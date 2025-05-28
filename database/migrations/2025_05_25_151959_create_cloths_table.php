<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cloths', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('nom');
            $table->string('mobile');
            $table->float('qadd');
            $table->float('shana');
            $table->float('ghara');
            $table->float('zegar');
            $table->float('lstoony');
            $table->float('partog');
            $table->float('pai_tsa');

            $table->boolean('lastoni');
            $table->boolean('lastoni_goti');
            $table->boolean('bin');
            $table->boolean('bin_kat');
            $table->boolean('makh_jib');
            $table->boolean('tarikhzi');
            $table->boolean('kalari');
            $table->boolean('shabazi');
            $table->boolean('arabi');
            $table->boolean('lemen');
            $table->boolean('lastoni_2');

            $table->date('rawrul_tareekh');
            $table->date('tasleem_tareekh')->nullable();

            $table->integer('tidad');
            $table->float('money');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cloths');
    }
};
