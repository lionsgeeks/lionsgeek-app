<?php

use App\Http\Controllers\InfosessionController;
use App\Http\Middleware\InfoSessionMiddleware;
use App\Models\InfoSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('infosessions', InfosessionController::class);
    Route::patch('infosessions/change-availabilty/{id}', [InfosessionController::class, 'availabilityStatus'])->name('infosession.availability');
    Route::patch('infosessions/change-status/{id}', [InfosessionController::class, 'completeStatus'])->name('infosession.status');
    Route::post('infosessions/{infosession}/regenerate-token', [InfosessionController::class, 'regenerateToken'])->name('infosession.regenerate-token');
});

// Grant access to postuler route
// Route::post('/grant-postuler-access', function (Request $request) {
//     $formationField = $request->input('type'); // 'coding' or 'media'
    
//     // Redirect to postuler with formation field as URL parameter
//     return redirect()->route('postuler', ['type' => $formationField]);
// })->name('grant.postuler.access');

Route::get('/postuler', function (Request $request) {
    $formationField = $request->type;
    // dd($formationField);
    
    // Check if type parameter is present and valid
    // if (!$formationField || !in_array($formationField, ['coding', 'media'])) {
    //     return redirect('/');
    // }
    
    return Inertia::render('client/infoSession/index', [
        'sessions' => InfoSession::where('isAvailable', true)
            ->where('is_private', false)
            ->where('isFinish', false)
            ->where('isFull', false)
            ->get(),
        'formation_field' => $formationField, // Pass formation field to frontend
    ]);
})->name('postuler')->middleware("infoSession");
// Summary page after finishing the game
Route::get('/postuler/summary', function () {
    return Inertia::render('client/infoSession/summary');
})->name('postuler.summary');
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
