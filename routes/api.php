<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\InfoSessionController;
use App\Http\Controllers\Api\ParticipantController;
use App\Models\General;
use Illuminate\Support\Facades\Route;

$active = config('active-routes');

// Toggle helper (returns closure when inactive)
$nullRoute = fn() => response()->json(null);

// Track visit
Route::post('/track-visit', $active['track_visit']
    ? function () {
        General::trackVisit();
        return response()->json(['ok' => true]);
    }
    : $nullRoute
);

// Events
Route::get("events/{event}", $active['events'] ? [EventController::class,'show'] : $nullRoute);
Route::get('/events', $active['events'] ? [EventController::class,'index'] : $nullRoute);

// InfoSessions
Route::get('/infosessions', $active['infosessions'] ? [InfoSessionController::class, 'index'] : $nullRoute);
Route::put('/validate-invitation', $active['validate_invitation'] ? [InfoSessionController::class, 'validateParticipant'] : $nullRoute);
Route::put('/validate-event-invitation', $active['validate_event_invitation'] ? [EventController::class, 'validateParticipant'] : $nullRoute);
Route::put('/manual-checking', $active['manual_checking'] ? [InfoSessionController::class, 'manualChecking'] : $nullRoute);
Route::get('/session-data', $active['session_data'] ? [InfoSessionController::class, 'infoData'] : $nullRoute);
Route::get('/profile-data', $active['profile_data'] ? [InfoSessionController::class, 'profileData'] : $nullRoute);
Route::post('/session-photo', $active['session_photo'] ? [ParticipantController::class, 'setPhoto'] : $nullRoute);

// Lionsgate
Route::get('/lionsgate/infosessions', $active['lionsgate'] ? [InfoSessionController::class, 'indexLionsgate'] : $nullRoute);

// Participants
Route::post('/participants/{participant}/progress', $active['participants'] ? [ParticipantController::class, 'storeProgress'] : $nullRoute);

// Toggle route
Route::put('/toggle/{name}', function ($name) {
    $path = config_path('active-routes.php');
    $routes = require $path;

    if (!array_key_exists($name, $routes)) {
        return response()->json(['error' => 'Route not found'], 404);
    }

    $routes[$name] = !$routes[$name]; // flip true/false

    $content = "<?php\n\nreturn " . var_export($routes, true) . ";\n";
    file_put_contents($path, $content);

    return response()->json([
        'message' => "Route [$name] is now " . ($routes[$name] ? 'active' : 'inactive')
    ]);
});
