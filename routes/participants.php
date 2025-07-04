<?php

use App\Http\Controllers\InfosessionController;
use App\Http\Controllers\ParticipantController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('participants', ParticipantController::class);
});
