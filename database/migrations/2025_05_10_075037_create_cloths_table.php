<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClothsTable extends Migration
{
    public function up()
    {
        Schema::create('cloths', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('mobile')->nullable();
            $table->decimal('money', 10, 2)->nullable();

            // Measurements
            $table->string('qadd')->nullable();     // قد
            $table->string('shana')->nullable();    // شانه
            $table->string('ghara')->nullable();    // غاړه
            $table->string('zegar')->nullable();    // ځګر
            $table->string('lstoony')->nullable();  // لستوڼي اندازه
            $table->string('partog')->nullable();   // پرتوګ
            $table->string('pai_tsa')->nullable();  // پایڅه

            $table->integer('tidad')->nullable();   // تعداد

            $table->date('rawrul_tareekh')->nullable();     // د راوړلو تاریخ
            $table->date('tasleem_tareekh')->nullable();    // د تسلیمولو تاریخ

            // Checkbox group fields (example)
            $table->boolean('kamees')->default(false);
            $table->boolean('shalwar')->default(false);
            $table->boolean('sadri')->default(false);
            $table->boolean('jeb')->default(false);
            // Add more boolean fields as needed

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cloths');
    }
}
