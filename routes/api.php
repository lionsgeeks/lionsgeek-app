<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\InfoSessionController;
use App\Http\Controllers\Api\ParticipantController ;
use App\Models\General;
use Illuminate\Support\Facades\Route;

// Track visit endpoint (stateless)
Route::post('/track-visit', function () {
    General::trackVisit();
    return response()->json(['ok' => true]);
});


Route::get("events/{event}",[EventController::class,'show']);
Route::get('/events',[EventController::class,'index']);

Route::get('/infosessions', [InfoSessionController::class, 'index']);
Route::put('/validate-invitation', [InfoSessionController::class, 'validateParticipant']);
Route::put('/validate-event-invitation', [EventController::class, 'validateParticipant']);
Route::put('/manual-checking', [InfoSessionController::class, 'manualChecking']);
Route::get('/session-data', [InfoSessionController::class, 'infoData']);
Route::get('/profile-data', [InfoSessionController::class, 'profileData']);
Route::post('/session-photo', [ParticipantController::class, 'setPhoto']);

Route::get('/lionsgate/infosessions', [InfoSessionController::class, 'indexLionsgate']);

Route::post('/participants/{participant}/progress', [ParticipantController::class, 'storeProgress']);
