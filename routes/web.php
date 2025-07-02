<?php

use App\Http\Controllers\CoworkingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('client/home/home');
})->name('home');
Route::get('/events', function () {
    return Inertia::render('events/events');
})->name('events');
Route::get('/event/{event}', function () {
    return Inertia::render('EventDetails/eventdetail');
})->name('event');
Route::get('/coding', function () {
    return Inertia::render('client/coding/coding');
})->name('coding');
Route::get('/media', function () {
    return Inertia::render('client/media/media');
})->name('media');
Route::get('/pro', function () {
    return Inertia::render('client/Pro/Pro');
})->name('pro');
Route::get('/contact', function () {
    return Inertia::render('client/ContactUs/contactUs');
})->name('contact');
Route::get('/postuler', function () {
    return Inertia::render('client/infoSession/infoSession');
})->name('postuler');

Route::get('/about', function () {
    return Inertia::render('client/about/about');
});
Route::get('/whatislionsgeek', function () {
    return Inertia::render('client/about/partials/whatis');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
});
Route::get('/coworking', [CoworkingController::class, 'index']);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
