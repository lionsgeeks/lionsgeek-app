<?php

use App\Http\Controllers\ContactController;
use App\Models\Contact;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Route;
use App\Models\Blog;
use App\Models\Coworking;
use App\Models\Event;
use App\Models\General;
use Inertia\Inertia;

use App\Models\Newsletter;
use App\Models\Participant;
use App\Models\User;

use App\Http\Controllers\CustomEmailController;
use App\Http\Controllers\GeneralController;
use App\Models\InfoSession;
use Carbon\Carbon;
use Illuminate\Support\Facades\Request;
use App\Http\Controllers\UserController;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('dashboard', [GeneralController::class, 'dashboardData'])->name('dashboard');

    Route::post('/reset-password', [UserController::class, 'resetPassword'])->name('admin.reset-password');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('user.delete');

    Route::put('/email/markread/{message}', [ContactController::class, 'toggleRead'])->name('email.markread');
    Route::get('/getChartData/{id?}', [GeneralController::class , 'getChartData'])->name('dashboard.chart');
    Route::get('/search', [GeneralController::class, 'search'])->name('admin.search');
});
