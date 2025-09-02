<?php

use App\Models\Gallery;

use App\Models\InfoSession;
use App\Models\Press;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\MessagesExport;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    $galleries = Gallery::with('images')->get();
    return Inertia::render('client/home/home', [
        'galleries' => $galleries
    ]);
})->name('home');


Route::get('/coding', function () {
    return Inertia::render('client/coding/coding', [
        'sessions' => InfoSession::where('isAvailable', 1)->where('formation', 'Coding')->where('isFinish', 0)->get(),
    ]);
})->name('coding');
Route::get('/media', function () {
    return Inertia::render('client/media/media', [
        'sessions' => InfoSession::where('isAvailable', 1)->where('formation', 'Media')->where('isFinish', 0)->get(),
    ]);
})->name('media');
Route::get('/pro', function () {
    $projects = Project::all();
    return Inertia::render('client/Pro/Pro', [
        'projects' => $projects,
    ]);
})->name('pro');


Route::get('/about', function () {
    $presses = Press::all();
    return Inertia::render('client/about/about', [
        'presses' => $presses
    ]);
});
Route::get('/whatislionsgeek', function () {
    return Inertia::render('client/about/partials/whatis');
});
Route::get('/attendance/confirmation', function () {
    return Inertia::render('client/attendanceConfirmation/attendanceConfirmation');
});
Route::get('/export-messages', function () {
    return Excel::download(new MessagesExport, 'messages.xlsx');
})->name('messages.export');

Route::post('/add-admin', [UserController::class, 'AddAdmin'])->name('add.admin');
Route::fallback(function () {
    return Inertia::render('errors/NotFound')->toResponse(request())->setStatusCode(404);
});

Route::get('/policy', function () {
    return Inertia::render('policy/policy');
})->name('home');
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/infosession.php';
require __DIR__ . '/gallery.php';
require __DIR__ . '/blogs.php';
require __DIR__ . '/participants.php';
require __DIR__ . '/event.php';
require __DIR__ . '/projects.php';
require __DIR__ . '/press.php';
require __DIR__ . '/coworking.php';
require __DIR__ . '/newsletter.php';
require __DIR__ . '/contact.php';
require __DIR__ . '/dashboard.php';

