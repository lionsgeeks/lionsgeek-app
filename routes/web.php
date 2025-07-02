<?php

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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
