<?php

use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('/gallery', GalleryController::class);

    // destroy image
    Route::delete("images/{image}", [ImageController::class, 'destroy'])->name('images.destroy');
});
