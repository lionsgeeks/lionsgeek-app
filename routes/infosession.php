<?php

use App\Http\Controllers\InfosessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('infosessions', InfosessionController::class);
    Route::patch('infosessions/change-availabilty/{id}', [InfosessionController::class,'availabilityStatus'])->name('infosession.availability');
    Route::patch('infosessions/change-status/{id}', [InfosessionController::class,'completeStatus'])->name('infosession.status');
});