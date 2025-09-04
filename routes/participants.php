<?php

use App\Http\Controllers\ParticipantController;
use App\Models\Participant;
use App\Models\ParticipantConfirmation;
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

    // Approval routes
    Route::post('/participants/{participant}/approve', [ParticipantController::class, 'approve'])->name('participants.approve');
    Route::post('/participants/{participant}/reject', [ParticipantController::class, 'reject'])->name('participants.reject');

    Route::resource('participants', ParticipantController::class)->except(['store']);
});;
Route::post('/participants/store', [ParticipantController::class, 'store'])->name('participants.store');
Route::get('/participant/confirmation/jungle/{full_name}/{id}', [ParticipantController::class, 'confirmationJungle']);
Route::get('/participant/confirmation/school/{full_name}/{id}', [ParticipantController::class, 'confirmationSchool']);

Route::get('/participant/associate-confirmation', function () {
    $participants = Participant::all();
    foreach ($participants as $participant) {
        if (!$participant->confirmation) {
            ParticipantConfirmation::create([
                'participant_id' => $participant->id,
            ]);
        }
    }

    return response()->json(['message' => 'Participant Confirmation associations created Successfully!']);
});
