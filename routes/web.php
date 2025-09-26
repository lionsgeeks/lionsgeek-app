<?php


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;




Route::post('/add-admin', [UserController::class, 'AddAdmin'])->name('add.admin');









require __DIR__ . '/client.php';
require __DIR__ . '/token.php';

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
