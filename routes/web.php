<?php


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;




Route::post('/add-admin', [UserController::class, 'AddAdmin'])->name('add.admin');



Route::get('/apiactive', function () {
    $user = Auth::user();

    if (!$user || !in_array($user->email, ['forkanimahdi@gmail.com', 'boujjarr@gmail.com'])) {
        return redirect('/error');
    }
    $routes = config('active-routes');
    return Inertia::render('apiactive', compact('routes'));
});




require __DIR__ . '/client.php';

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/infosession.php';
require __DIR__ . '/gallery.php';
require __DIR__ . '/blogs.php';
require __DIR__ . '/participants.php';
require __DIR__ . '/event.php';
require __DIR__ . '/jobs.php';
require __DIR__ . '/projects.php';
require __DIR__ . '/press.php';
require __DIR__ . '/coworking.php';
require __DIR__ . '/newsletter.php';
require __DIR__ . '/contact.php';
require __DIR__ . '/dashboard.php';





use App\Models\Participant;

Route::get('/assign', function () {
    // IDs <= 441 => promo = 4
    Participant::where('id', '<=', 441)->update(['promo' => 4]);

    // IDs > 441 => promo = 5
    Participant::where('id', '>', 441)->update(['promo' => 5]);

    return "Promo assigned successfully!";
});
