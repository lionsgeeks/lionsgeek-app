<?php

use App\Models\Gallery;
use App\Models\Blog;
use App\Models\Contact;
use App\Models\Coworking;
use App\Models\Event;
use App\Models\General;
use App\Models\InfoSession;
use App\Models\Project;
use App\Models\Subscriber;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $galleries = Gallery::with('images')->get();
    return Inertia::render('client/home/home', [
        'galleries' => $galleries
    ]);
})->name('home');

// Event routes moved to routes/event.php


Route::get('/coding', function () {
    return Inertia::render('client/coding/coding');
})->name('coding');
Route::get('/media', function () {
    return Inertia::render('client/media/media');
})->name('media');
Route::get('/pro', function () {
    $projects = Project::all();
    return Inertia::render('client/Pro/Pro', [
        'projects' => $projects,
    ]);
})->name('pro');
Route::get('/contact', function () {
    return Inertia::render('client/ContactUs/contactUs');
})->name('contact');
Route::get('/postuler', function () {
    return Inertia::render('client/infoSession/infoSession');
})->name('postuler');
Route::get('/private-session', function () {
    return Inertia::render('client/infoSession/privatesession');
})->name('privateSession');

Route::get('/about', function () {
    return Inertia::render('client/about/about');
});
Route::get('/whatislionsgeek', function () {
    return Inertia::render('client/about/partials/whatis');
});

Route::middleware(['auth', 'verified'])->group(function () {
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
        $pendingCoworkings = Coworking::where('status', 0)->take(4)->get();
        $blogs = Blog::latest()->with('user')->take(4)->get();
        $views = General::where('id', 1)->first();
        $unreadMessages = Contact::where('mark_as_read', '0')->orderby("created_at", "desc")->take(4)->get();

        return Inertia::render('dashboard', [
            'totalContacts' => $totalContacts,
            'members' => $members,
            'sessions' => $sessions,
            'upcomingEvents' => $upcomingEvents,
            'pendingCoworkings' => $pendingCoworkings,
            'blogs' => $blogs,
            'views' => $views,
            'unreadMessages' => $unreadMessages
        ]);
    })->name('dashboard');
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
