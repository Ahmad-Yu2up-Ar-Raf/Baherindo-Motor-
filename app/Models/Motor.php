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
 'kategori',
 'odometer',
 'tahun',
 'url',
     ];
 
 
    
     protected $casts = 
     [  
         'name' => 'string',
         'harga' => 'decimal:2',
         'odometer' => 'decimal:1',
         'warna' => 'string',
         'tahun' => 'string',
         'plat_nomor' => 'string',
    'dp_minimum' => 'decimal:2',
    'masa_berlaku_pajak' => 'datetime',
   'deskripsi' => 'string',
   'url' => 'string',
   'files' => 'array',
   'merek' => Merek::class,
   'kategori' => Kategori::class,
     ]; 
 
  
 
 
   public function user(): BelongsTo
     {
         return $this->belongsTo(User::class);
     }
 
 

   public function getFormattedPriceAttribute()
    {
        return 'Rp ' . number_format($this->harga, 0, ',', '.');
    }

    /**
     * Method untuk format DP minimum
     */
    public function getFormattedDpAttribute()
    {
        if (!$this->dp_minimum) {
            return null;
        }
        
        return 'Rp ' . number_format($this->dp_minimum, 0, ',', '.');
    }
}
