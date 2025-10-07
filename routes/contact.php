<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use App\Exports\MessagesExport;
use Maatwebsite\Excel\Facades\Excel;

use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {

    Route::get('/contactus', [ContactController::class, 'show'])->name('admin.contacts.show');
    Route::post('/messages/send', [ContactController::class, 'send'])->name('messages.send');
    Route::delete('/contactus/{contact}', [ContactController::class, 'destroy'])->name('contact.destroy');

    Route::patch('/contactus/{message}/toggle-read', [ContactController::class, 'toggleRead'])
    ->name('contact.toggleRead');

    Route::post('/messages/mark-all-read', [ContactController::class, 'markAllAsRead'])
        ->name('messages.markAllRead');
    
    // Test flash message route
    Route::get('/test-flash', function () {
        flash()->success('Test flash message working!');
        return redirect()->route('admin.contacts.show');
    })->name('test.flash');
    
    Route::get('/export-messages', function () {
        return Excel::download(new MessagesExport, 'messages.xlsx');
    })->name('messages.export');
});
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');


Route::get('/contact', function () {
    return Inertia::render('client/ContactUs/contactUs');
})->name('contact');
