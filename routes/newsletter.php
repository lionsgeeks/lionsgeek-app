<?php

use App\Http\Controllers\NewsletterController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('newsletter', NewsletterController::class);
    Route::get('/kill', [NewsletterController::class, 'fakeUsers']);
});

Route::post('subscribe', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');
