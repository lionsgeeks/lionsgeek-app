<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {

    Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
    Route::get('/contactus', [ContactController::class, 'show'])->name('admin.contacts.show');
    Route::delete('/contactus/{contact}', [ContactController::class, 'destroy'])->name('contact.destroy');
});


Route::get('/contact', function () {
    return Inertia::render('client/ContactUs/contactUs');
})->name('contact');
