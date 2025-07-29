<?php

namespace App\Models;

use App\Enums\Kategori;
use App\Enums\Merek;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Motor extends Model
{
    use HasFactory;

    protected $table = 'motors';
 
 
 
       protected $fillable = [   
        'name',
        'harga',
        'user_id',
        'warna' ,
        'plat_nomor',
   'dp_minimum' ,
   'masa_berlaku_pajak',
 'deskripsi' ,
 'files' ,
 'merek',
     ];
 
 
    
     protected $casts = 
     [  
         'name' => 'string',
         'harga' => 'decimal:2',
         'warna' => 'string',
         'plat_nomor' => 'string',
    'dp_minimum' => 'decimal:2',
    'masa_berlaku_pajak' => 'datetime',
   'deskripsi' => 'text',
   'files' => 'array',
   'merek' => Merek::class,
   'kategori' => Kategori::class,
     ]; 
 
  
 
 
   public function user(): BelongsTo
     {
         return $this->belongsTo(User::class);
     }
 
 


}
