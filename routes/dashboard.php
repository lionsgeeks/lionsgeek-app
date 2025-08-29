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

use App\Http\Controllers\CustomEmailController;
use App\Models\InfoSession;
use Carbon\Carbon;
use Illuminate\Support\Facades\Request;

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
        $blogs = Blog::latest()->with('user')->take(4)->get();
        $views = General::where('id', 1)->first();
        $unreadMessages = Contact::where('mark_as_read', '0')->orderby("created_at", "desc")->take(3)->get();
        // yahya add this
        $participants = Participant::all()->count();
        $allSessions = InfoSession::all();
        $coworkingsRequest = Coworking::all();
        $newsLetter = Newsletter::all();
        return Inertia::render('dashboard', [
            'totalContacts' => $totalContacts,
            'members' => $members,
            'sessions' => $sessions,
            'upcomingEvents' => $upcomingEvents,
            'blogs' => $blogs,
            'views' => $views,
            'unreadMessages' => $unreadMessages,
            // yahya add this
            'allsessions' => $allSessions,
            'coworkingsRequest' => $coworkingsRequest,
            'newsLetter' => $newsLetter,
            'participants' => $participants
        ]);
    })->name('dashboard');

    Route::put('/email/markread/{message}', [ContactController::class, 'toggleRead'])->name('email.markread');
    Route::post('/messages/send', [CustomEmailController::class, 'store'])->name('messages.send');
});
// /////////////////////////////////////////
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {


    Route::get('/getChartData/{id?}', function ($id = null) {
        // If no id is provided, fallback to the latest session
        $session = $id
            ? InfoSession::findOrFail($id)
            : InfoSession::latest('start_date')->firstOrFail();

        $successInfoSession = $session->participants()->whereNot('current_step', 'info_session')->count();
        $absenceInfoSession = $session->participants()->where('current_step', 'info_session')->count();
        $successInterview = $session->participants()->whereNotIn('current_step', ['info_session', 'interview', 'interview_failed'])->count();
        $failedInterview = $session->participants()->where('current_step', 'interview_failed')->count();
        $absenceInterview = $session->participants()->where('current_step', 'interview')->count();
        $successJungle = $session->participants()->where('current_step', 'like', '%school%')->count();
        $failedJungle = $session->participants()->where('current_step', 'jungle_failed')->count();
        $absenceJungle = $session->participants()->where('current_step', 'jungle')->count();
        $confirmedSchool = $session->participants()->whereHas('confirmation', function ($query) {
            $query->where('school', true);
        })->count();
        $infoSessionFemale = $session->participants()
            ->where('gender', 'female')
            ->where('current_step', 'info_session')
            ->count();
        $interviewFemale = $session->participants()
            ->where('gender', 'female')
            ->whereNotIn('current_step', ['info_session', 'interview', 'interview_failed'])
            ->count();
        $jungleFemale = $session->participants()
            ->where('gender', 'female')
            ->where('current_step', 'like', '%school%')
            ->count();
        $schoolFemale = $session->participants()
            ->where('gender', 'female')
            ->whereHas('confirmation', function ($query) {
                $query->where('school', true);
            })->count();

        $BarChart = [
            [
                'step' => 'Info Session',
                'success' => $successInfoSession,
                'absence' => $absenceInfoSession,
            ],
            [
                'step' => 'Interview',
                'success' => $successInterview,
                'failed' => $failedInterview,
                'absence' => $absenceInterview,
            ],
            [
                'step' => 'Jungle',
                'success' => $successJungle,
                'failed' => $failedJungle,
                'absence' => $absenceJungle,
            ],
            [
                'step' => 'School',
                'success' => $confirmedSchool,
                'absence' => $successJungle - $confirmedSchool,
            ],
        ];
        $PieChart = [
            [
                'step' => 'Info Session',
                'total' => $successInfoSession + $absenceInfoSession,
                'female' => $infoSessionFemale,
                'male' => $successInfoSession - $infoSessionFemale
            ],
            [
                'step' => 'Interview',
                'total' => $successInterview + $absenceInterview + $failedInterview,
                'female' => $interviewFemale,
                'male' => $successInterview - $interviewFemale,
            ],
            [
                'step' => 'Jungle',
                'total' => $successJungle + $absenceJungle + $failedJungle,
                'female' => $jungleFemale,
                'male' => $successJungle - $jungleFemale,
            ],
            [
                'step' => 'School',
                'total' => ($successJungle - $confirmedSchool) + $confirmedSchool,
                'female' => $schoolFemale,
                'male' => $successJungle - $schoolFemale,
            ],
        ];
        return response()->json([
            'sessionId' => $session->id, // send back which session was used
            'BarChart'  => $BarChart,
            'PieChart'  => $PieChart,
        ]);
    });
});
