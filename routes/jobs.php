<?php

use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin/jobs')->group(function () {
    Route::get('/', [JobController::class, 'index'])->name('jobs.index');
    Route::post('/start', [JobController::class, 'startWorker'])->name('jobs.start');
    Route::post('/stop', [JobController::class, 'stopWorker'])->name('jobs.stop');
    Route::post('/retry/{id}', [JobController::class, 'retryFailed'])->name('jobs.retry');
    Route::delete('/delete/{id}', [JobController::class, 'deleteFailed'])->name('jobs.delete');
    Route::post('/reset-all', [JobController::class, 'resetAll'])->name('jobs.resetAll');
});
