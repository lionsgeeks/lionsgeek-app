<?php

use App\Http\Controllers\InfosessionController;
use App\Models\InfoSession;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('infosessions', InfosessionController::class);
    Route::patch('infosessions/change-availabilty/{id}', [InfosessionController::class, 'availabilityStatus'])->name('infosession.availability');
    Route::patch('infosessions/change-status/{id}', [InfosessionController::class, 'completeStatus'])->name('infosession.status');
});
Route::get('/postuler', function () {
    return Inertia::render('client/infoSession/index', [
        'sessions' => InfoSession::where('isAvailable', true)
            ->where('name', '!=', 'private session')
            ->where('isFinish', false)
            ->where('isFull', false)
            ->get(),
    ]);
})->name('postuler');
Route::get('/private-session', function () {
    return Inertia::render('client/infoSession/privatesession');
})->name('privateSession');

// Intro page before the game
Route::get('/game/intro', function () {
    // if (!session('can_play_game')) {
    //     return redirect('/');
    // }
    return Inertia::render('client/game/intro');
})->name('game.intro');

// Game route for post-submission flow
Route::get('/game', function () {
    // if (!session('can_play_game')) {
    //     return redirect('/');
    // }
    return Inertia::render('client/game/game');
})->name('game');

// Clear gate after finishing
Route::post('/game/finish', function () {
    session()->forget('can_play_game');
    return redirect('/');
})->name('game.finish');
