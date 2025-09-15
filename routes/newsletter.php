<?php

use App\Http\Controllers\NewsletterController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    
    Route::get('newsletter', [NewsletterController::class, 'index'])->name('newsletter.index');
    Route::get('newsletter/{id}', [NewsletterController::class, 'preview'])->name('newsletter.preview');
    Route::post('newsletter', [NewsletterController::class, 'store'])->name('newsletter.store');
    Route::get('/kill', [NewsletterController::class, 'fakeUsers']);
});

Route::post('subscribe', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');
Route::get('newsletter/unsubscribe/{id}', [NewsletterController::class, 'unsubscribeFromUrl'])->name('newsletter.unsubscribe');
