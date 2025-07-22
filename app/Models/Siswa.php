<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Siswa extends Model
{
    use HasFactory;

    protected $table = 'siswas';
 
 
 
       protected $fillable = [
         'name',
         'kelas_id',
         'user_id',
     ];
 
 
    
     protected $casts = [
         'name' => 'string',
       
       
     ];
 
  
 
 
   public function user(): BelongsTo
     {
         return $this->belongsTo(User::class);
     }
 
 

   public function kelas(): BelongsTo
     {
       return $this->belongsTo(Kelas::class, 'kelas_id');
     }
}
