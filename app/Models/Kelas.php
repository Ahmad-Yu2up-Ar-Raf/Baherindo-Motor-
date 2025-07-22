<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kelas extends Model
{
    use HasFactory;

    protected $table = 'kelas';
 
 
 
       protected $fillable = [
         
         'name',
       
       
          'user_id',
       
     ];
 
 
    
     protected $casts = [
         'name' => 'string',
       
       
     ];
 
  
 
 
   public function user(): BelongsTo
     {
         return $this->belongsTo(User::class);
     }
 
 

     public function siswa(): HasMany
     {
        return $this->hasMany(Siswa::class, 'kelas_id');
     }
}
