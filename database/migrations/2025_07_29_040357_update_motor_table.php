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
        Schema::table('motors', function (Blueprint $table) {
            $table->dateTime('masa_berlaku_pajak')->nullable();
            $table->string('plat_nomor' , 5)->unique()->nullable();
            $table->string('warna' , 5)->nullable();
            $table->text('deskripsi' , 5)->nullable();
            $table->decimal('dp_minimum', 15, 2)->nullable();
            $table->json('files')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('motors', function (Blueprint $table) {
           
        });
    }
};
