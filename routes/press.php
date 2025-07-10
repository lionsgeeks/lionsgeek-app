<?php

use App\Http\Controllers\PressController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('/press', PressController::class);

});

