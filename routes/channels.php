<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('kelas', function ($user) {
    // Return true jika user boleh listen ke channel ini
    // Anda bisa tambah logic authorization sesuai kebutuhan
    return $user !== null; // Semua authenticated user bisa listen
    
    // Atau bisa lebih spesifik:
    // return $user->hasRole('admin') || $user->hasRole('teacher');
});