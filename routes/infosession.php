<?php

use App\Http\Controllers\InfosessionController;
use App\Http\Middleware\InfoSessionMiddleware;
use App\Models\InfoSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Participant;


Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('infosessions', InfosessionController::class);
    Route::patch('infosessions/change-availabilty/{id}', [InfosessionController::class, 'availabilityStatus'])->name('infosession.availability');
    Route::patch('infosessions/change-status/{id}', [InfosessionController::class, 'completeStatus'])->name('infosession.status');
    Route::patch('infosessions/change-privacy/{id}', [InfosessionController::class, 'privacyStatus'])->name('infosession.privacy');
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
 
    return Inertia::render('client/game/intro');
})->name('game.intro');

// Game route for post-submission flow
Route::get('/game', function () {
  
    return Inertia::render('client/game/game');
})->name('game');

// Clear gate after finishing
Route::post('/game/finish', function () {
    session()->forget('can_play_game');
    return redirect('/');
})->name('game.finish');



// Private session access route
Route::get('/private-session/{token}', [InfosessionController::class, 'showByToken'])
    ->name('private-session.show');

Route::get('/attendance/confirmation', function () {
    return Inertia::render('client/attendanceConfirmation/attendanceConfirmation');
});

// clear participant's photos only for a specific promo(info_session_id) when their step is not jungle, jungle_failed, coding_school, or media_school.
Route::middleware(['auth', 'verified'])->get('/admin/infosessions/{info_session_id}/clear-photos', function (int $info_session_id) {
    $protectedSteps = ['jungle', 'jungle_failed', 'coding_school', 'media_school'];

    $toClear = Participant::where('info_session_id', $info_session_id)
        ->whereNotIn('current_step', $protectedSteps)
        ->whereNotNull('image')
        ->get(['id', 'image']);

    $affectedIds = [];
    $deletedFiles = 0;
    $attempts = [];
    foreach ($toClear as $p) {
        $paths = [
            storage_path('app/public/images/participants/' . $p->image),
            public_path('storage/images/participants/' . $p->image),
        ];
        $deletedThis = false;
        foreach ($paths as $candidate) {
            $exists = file_exists($candidate);
            $attempts[] = ['id' => $p->id, 'path' => $candidate, 'exists' => $exists];
            if ($exists) {
                @unlink($candidate);
                $deletedThis = true;
            }
        }
        if ($deletedThis) {
            $deletedFiles++;
        }
        $affectedIds[] = $p->id;
    }

    Participant::where('info_session_id', $info_session_id)
        ->whereNotIn('current_step', $protectedSteps)
        ->update(['image' => null]);

    return redirect('/admin/infosessions');
})->name('infosessions.clear-photos');
