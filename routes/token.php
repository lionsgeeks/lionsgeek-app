
<?php

use App\Models\General;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/apiactive', function () {
    $user = Auth::user();

    if (!$user || !in_array($user->email, ['forkanimahdi@gmail.com', 'boujjarr@gmail.com'])) {
        return redirect('/error');
    }
    $routes = config('active-routes');
    return Inertia::render('apiactive', compact('routes'));
});



Route::get('/current-token', function () {
    $general = General::first();
    return response()->json([
        'token' => $general?->token ?? null,
    ]);
});
