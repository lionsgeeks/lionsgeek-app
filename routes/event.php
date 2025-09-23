<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');

// Booking routes
Route::post('/booking/store', [BookingController::class, 'store'])->name('booking.store');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/events', [EventController::class, 'adminIndex'])->name('events.index');
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::get('/events/{event}', [EventController::class, 'adminShow'])->name('events.show');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::post('/events/{event}', [EventController::class, 'update'])->name('events.update');
    Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('events.destroy');
    Route::patch('events/change-privacy/{id}', [EventController::class, 'privacyStatus'])->name('event.privacy');
    Route::post('events/{event}/regenerate-token', [EventController::class, 'regenerateToken'])->name('event.regenerate-token');
});

Route::get('/event', function () {
    return Inertia::render('client/events/events');
})->name('event');
Route::get('/event/{event}', function () {
    return Inertia::render('client/EventDetails/eventdetail');
})->name('event');