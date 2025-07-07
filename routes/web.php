<?php

use App\Http\Controllers\CoworkingController;
use App\Http\Controllers\PressController;
use App\Models\Gallery;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $galleries = Gallery::with('images')->get();
    return Inertia::render('client/home/home', [
        'galleries' => $galleries
    ]);
})->name('home');

Route::get('/event', function () {
    return Inertia::render('client/events/events');
})->name('event');
Route::get('/event/{event}', function () {
    return Inertia::render('client/EventDetails/eventdetail');
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
Route::get('/private-session', function () {
    return Inertia::render('client/infoSession/privatesession');
})->name('privateSession');

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
    Route::get('/press', [PressController::class, 'index']);
    Route::post('/press', [PressController::class, 'store'])->name('press.store');
    Route::get('/admin/presses/{press}', [PressController::class, 'show'])->name('press.show');
    Route::put('/presses/{press}', [PressController::class, 'update'])->name('press.update');
    Route::delete('/presses/{press}', [PressController::class, 'destroy'])->name('press.destroy');
});
Route::get('/coworking', [CoworkingController::class, 'index']);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/infosession.php';
require __DIR__ . '/gallery.php';
require __DIR__ . '/blogs.php';
require __DIR__ . '/participants.php';
