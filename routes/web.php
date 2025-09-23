<?php

use App\Models\Gallery;
use App\Models\InfoSession;
use App\Models\Press;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\MessagesExport;
use App\Http\Controllers\InfosessionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use App\Models\Participant;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    $galleries = Gallery::with('images')->get();
    return Inertia::render('client/home/home', [
        'galleries' => $galleries
    ]);
})->name('home');


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

// Private session access route
Route::get('/private-session/{token}', [InfosessionController::class, 'showByToken'])
    ->name('private-session.show');
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




Route::get('/apiactive', function () {
    $user = Auth::user();

    if (!$user || !in_array($user->email, ['forkanimahdi@gmail.com', 'boujjarr@gmail.com'])) {
        return redirect('/error');
    }
    $routes = config('active-routes');
    return Inertia::render('apiactive', compact('routes'));
});


// ghir bach ntesti wash private session kadoz ola la hhhhhhhhhh
Route::get("/teeeetete" , function () {

                // Robust, timezone-aware, case-insensitive session fetch for emails
       $sessions = \App\Models\InfoSession::query()
                    ->where('isAvailable', true)
                    ->where('isFinish', false)
                    ->where('isFull', false)
                    // ->where('is_private' , false)
                    ->orderBy('start_date', 'asc')
                    ->get();
                dd($sessions);
});

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
            $attempts[] = [ 'id' => $p->id, 'path' => $candidate, 'exists' => $exists ];
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

    return back();
})->name('infosessions.clear-photos');

