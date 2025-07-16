<?php

use App\Http\Controllers\ParticipantController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::patch('/participant/current-step/{participant}', [ParticipantController::class, 'step'])->name('participant.step');
    Route::post('/participant/questions/{participant}', [ParticipantController::class, 'frequentQuestions'])->name('participant.questions');
    Route::post('/participant/satisfaction/{participant}', [ParticipantController::class, 'updateSatisfaction'])->name('participant.satisfaction');
    Route::post('/participant/notes/{participant}', [ParticipantController::class, 'notes'])->name('participant.notes');
    Route::get('/participant/export', [ParticipantController::class, 'export'])->name('participant.export');
    Route::get('/questions/export', [ParticipantController::class, 'questionsExport'])->name('questions.export');
    Route::post('/invite/interview', action: [ParticipantController::class, 'toInterview'])->name('invite.interview');
    Route::post('/invite/jungle', action: [ParticipantController::class, 'toJungle'])->name('invite.jungle');
    Route::post('/invite/school', action: [ParticipantController::class, 'toSchool'])->name('invite.school');
    Route::resource('participants', ParticipantController::class);
});;
