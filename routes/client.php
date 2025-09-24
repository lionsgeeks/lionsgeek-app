<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use App\Models\InfoSession;
use App\Models\Press;
use App\Models\Project;
use Inertia\Inertia;
use App\Models\Gallery;


Route::get('/', function () {
    $galleries = Gallery::with('images')->get();
    return Inertia::render('client/home/home', [
        'galleries' => $galleries
    ]);
})->name('home');



Route::get('/policy', function () {
    return Inertia::render('policy/policy');
})->name('home');

Route::get('/whatislionsgeek', function () {
    return Inertia::render('client/about/partials/whatis');
});

Route::get('/about', function () {
    $presses = Press::all();
    return Inertia::render('client/about/about', [
        'presses' => $presses
    ]);
});


Route::get('/coding', function () {
    return Inertia::render('client/coding/coding', [
        'sessions' => InfoSession::where('isAvailable', 1)->where('formation', 'Coding')->where('isFinish', 0)->where('is_private', false)->get(),
    ]);
})->name('coding');

Route::get('/media', function () {
    return Inertia::render('client/media/media', [
        'sessions' => InfoSession::where('isAvailable', 1)->where('formation', 'Media')->where('isFinish', 0)->where('is_private', false)->get(),
    ]);
})->name('media');


Route::get('/pro', function () {
    $projects = Project::all();
    return Inertia::render('client/Pro/Pro', [
        'projects' => $projects,
    ]);
})->name('pro');

Route::fallback(function () {
    return Inertia::render('errors/NotFound')->toResponse(request())->setStatusCode(404);
});


