<?php

use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('blogs', BlogController::class);

});

Route::get('/blogs', [BlogController::class, 'clientIndex']);
Route::get('/blogs/{blog}', [BlogController::class, 'clientShow']);
