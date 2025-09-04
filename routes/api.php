<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\InfoSessionController;
use App\Http\Controllers\Api\ParticipantController ;

use Illuminate\Support\Facades\Route;





Route::get('/infosessions', [InfoSessionController::class, 'index']);
Route::put('/validate-invitation', [InfoSessionController::class, 'validateParticipant']);
Route::put('/validate-event-invitation', [EventController::class, 'validateParticipant']);
Route::put('/manual-checking', [InfoSessionController::class, 'manualChecking']);
Route::get('/session-data', [InfoSessionController::class, 'infoData']);
Route::get('/profile-data', [InfoSessionController::class, 'profileData']);
Route::post('/session-photo', [ParticipantController::class, 'setPhoto']);

Route::get('/lionsgate/infosessions', [InfoSessionController::class, 'indexLionsgate']);

Route::post('/participants/{participant}/progress', [ParticipantController::class, 'storeProgress']);