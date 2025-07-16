<?php

use App\Http\Controllers\CoworkingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('coworking', CoworkingController::class)->except('store');
});


Route::get('/coworking', [CoworkingController::class, 'clientIndex']);
Route::get('/coworking/form', [CoworkingController::class, 'clientForm']);
Route::post('/coworking', [CoworkingController::class, 'store'])->name('coworking.store');
