<?php

use App\Models\Gallery;
use App\Models\Blog;
use App\Models\Contact;
use App\Models\Coworking;
use App\Models\Event;
use App\Models\General;
use App\Models\InfoSession;
use App\Models\Press;
use App\Models\Project;
use App\Models\Subscriber;
use Carbon\Carbon;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\MessagesExport;
use App\Http\Controllers\CustomEmailController;
use App\Http\Controllers\UserController;
use App\Models\Newsletter;

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

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('dashboard', function () {

        $totalContacts = Contact::all()->count();
        $members = Subscriber::all()->count();

        //* order sessions by the nearest date between now and one month from now
        $sessions = InfoSession::where('isAvailable', 1)
            ->whereBetween('start_date', [Carbon::now(), Carbon::now()->addMonth()])
            ->orderByRaw('ABS(julianday(start_date) - julianday(?))', [Carbon::now()])
            ->get();
        $upcomingEvents = Event::whereBetween('date', [Carbon::now(), Carbon::now()->addMonth()])
            ->orderByRaw('ABS(julianday(date) - julianday(?))', [Carbon::now()])
            ->take(4)
            ->get();
        $coworkingsRequest = Coworking::all();
        $newsLetter = Newsletter::all();
        $blogs = Blog::latest()->with('user')->take(4)->get();
        $views = General::where('id', 1)->first();
        $unreadMessages = Contact::where('mark_as_read', '0')->orderby("created_at", "desc")->take(3)->get();
        return Inertia::render('dashboard', [
            'totalContacts' => $totalContacts,
            'members' => $members,
            'sessions' => $sessions,
            'upcomingEvents' => $upcomingEvents,
            'coworkingsRequest' => $coworkingsRequest,
            'newsLetter' => $newsLetter,
            'blogs' => $blogs,
            'views' => $views,
            'unreadMessages' => $unreadMessages
        ]);
    })->name('dashboard');

    Route::put('/email/markread/{message}', [ContactController::class, 'toggleRead'])->name('email.markread');
    Route::post('/messages/send', [CustomEmailController::class, 'store'])->name('messages.send');
});

Route::post('/add-admin', [UserController::class, 'AddAdmin'])->name('add.admin');


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
