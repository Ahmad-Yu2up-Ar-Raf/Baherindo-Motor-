<?php

use App\Http\Controllers\MobilController;
use App\Http\Controllers\OverviewController;


use App\Http\Controllers\MotorController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {



 Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('/', OverviewController::class);


        Route::resource('motor', MotorController::class);
    
    

        Route::resource('mobil', MobilController::class);
    });



});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
