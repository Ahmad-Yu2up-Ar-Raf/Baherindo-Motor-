<?php

use App\Enums\KategoriMobil;
use App\Enums\MobilMerek;
use App\Enums\Status;
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
        Schema::create('mobils', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name', 255)->unique()->nullable();
            $table->string('status', 255)->default(Status::Tersedia->value);
            $table->year('tahun')->nullable();
            $table->string('merek', 255)->default(MobilMerek::Other->value);
            $table->string('kategori', 255)->default(KategoriMobil::Other->value);
                $table->string('url')->unique()->nullable();
                $table->decimal('odometer', 10, 1)->nullable();
                $table->json('files')->nullable();
                $table->decimal('dp_minimum', 15, 2)->nullable();
                $table->dateTime('masa_berlaku_pajak')->nullable();
                $table->decimal('harga', 15, 2);
                $table->text('deskripsi' )->nullable();
                $table->string('plat_nomor' , 255)->unique();
                $table->string('warna' , 255)->nullable();
         
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mobils');
    }
};
