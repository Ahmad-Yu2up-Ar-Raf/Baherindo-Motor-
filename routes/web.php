<?php

use App\Http\Controllers\OverviewController;

// use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\MotorController;
use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {



 Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('/', OverviewController::class);

        // Elections routes
        // Route::resource('about', AboutController::class);
        Route::resource('motor', MotorController::class);

   
    });



});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
