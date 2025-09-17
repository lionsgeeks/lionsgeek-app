<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use App\Models\Coworking;
use App\Models\Event;
use App\Models\General;
// use Inertia\Inertia;

use App\Models\Newsletter;
use App\Models\Participant;
use App\Models\User;
use App\Models\Contact;
use App\Models\InfoSession;
use App\Models\Subscriber;
use Carbon\Carbon;

use Illuminate\Support\Facades\DB;

class GeneralController extends Controller
{
    public function dashboardData()
    {

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
      
        $users = User::query()
            ->leftJoin('sessions', 'sessions.user_id', '=', 'users.id')
            ->groupBy('users.id')
            ->orderBy('users.created_at', 'asc')
            ->get([
                'users.id',
                'users.name',
                'users.email',
                'users.created_at',
                'users.last_login_at',
                DB::raw('CASE WHEN MAX(sessions.last_activity) IS NULL THEN 0 ELSE 1 END as is_online')
            ]);

        return Inertia::render('dashboard', [
            'totalContacts' => $totalContacts,
            'members' => $members,
            'sessions' => $sessions,
            'upcomingEvents' => $upcomingEvents,
            'blogs' => $blogs,
            'views' => $views,
            'unreadMessages' => $unreadMessages,
            'allsessions' => $allSessions,
            'coworkingsRequest' => $coworkingsRequest,
            'newsLetter' => $newsLetter,
            'participants' => $participants,
            'users' => $users
        ]);
    }
    public function getChartData($id = null)
    {
        $session = $id
            ? InfoSession::findOrFail($id)
            : InfoSession::latest('start_date')->firstOrFail();

        // Use allParticipants() to include all participants regardless of status
        $successInfoSession = $session->allParticipants()->whereNot('current_step', 'info_session')->count();
        $absenceInfoSession = $session->allParticipants()->where('current_step', 'info_session')->count();
        $successInterview = $session->allParticipants()->whereNotIn('current_step', ['info_session', 'interview', 'interview_failed'])->count();
        $failedInterview = $session->allParticipants()->where('current_step', 'interview_failed')->count();
        $absenceInterview = $session->allParticipants()->where('current_step', 'interview')->count();
        $successJungle = $session->allParticipants()->where('current_step', 'LIKE', '%school%')->count();
        $failedJungle = $session->allParticipants()->where('current_step', 'jungle_failed')->count();
        $absenceJungle = $session->allParticipants()->where('current_step', 'jungle')->count();
        $confirmedSchool = $session->allParticipants()->whereHas('confirmation', function ($query) {
            $query->where('school', true);
        })->count();
        $infoSessionFemale = $session->allParticipants()
            ->where('gender', 'female')
            ->where('current_step', 'info_session')
            ->count();
        $interviewFemale = $session->allParticipants()
            ->where('gender', 'female')
            ->whereNotIn('current_step', ['info_session', 'interview', 'interview_failed'])
            ->count();
        $jungleFemale = $session->allParticipants()
            ->where('gender', 'female')
            ->where('current_step', 'LIKE', '%school%')
            ->count();
        $schoolFemale = $session->allParticipants()
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
        // Calculate male counts properly
        $infoSessionMale = $session->allParticipants()
            ->where('gender', 'male')
            ->where('current_step', 'info_session')
            ->count();
        $interviewMale = $session->allParticipants()
            ->where('gender', 'male')
            ->whereNotIn('current_step', ['info_session', 'interview', 'interview_failed'])
            ->count();
        $jungleMale = $session->allParticipants()
            ->where('gender', 'male')
            ->where('current_step', 'LIKE', '%school%')
            ->count();
        $schoolMale = $session->allParticipants()
            ->where('gender', 'male')
            ->whereHas('confirmation', function ($query) {
                $query->where('school', true);
            })->count();
        $PieChart = [
            [
                'step' => 'Info Session',
                'total' => $successInfoSession + $absenceInfoSession,
                'female' => $infoSessionFemale,
                'male' => $infoSessionMale
            ],
            [
                'step' => 'Interview',
                'total' => $successInterview + $absenceInterview + $failedInterview,
                'female' => $interviewFemale,
                'male' => $interviewMale,
            ],
            [
                'step' => 'Jungle',
                'total' => $successJungle + $absenceJungle + $failedJungle,
                'female' => $jungleFemale,
                'male' => $jungleMale,
            ],
            [
                'step' => 'School',
                'total' => ($successJungle - $confirmedSchool) + $confirmedSchool,
                'female' => $schoolFemale,
                'male' => $schoolMale,
            ],
        ];
        return response()->json([
            'sessionId' => $session->id, // send back which session was used
            'BarChart'  => $BarChart,
            'PieChart'  => $PieChart,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->get('q', '');
        
        if (strlen($query) < 2) {
            return response()->json([
                'participants' => [],
                'infoSessions' => []
            ]);
        }

        // Search participants
        $participants = Participant::where('full_name', 'like', "%{$query}%")
            ->orWhere('email', 'like', "%{$query}%")
            ->orWhere('phone', 'like', "%{$query}%")
            ->with('infoSession')
            ->limit(10)
            ->get(['id', 'full_name', 'email', 'phone', 'current_step', 'status', 'info_session_id']);

        // Search info sessions
        $infoSessions = InfoSession::where('name', 'like', "%{$query}%")
            ->orWhere('formation', 'like', "%{$query}%")
            ->limit(10)
            ->get(['id', 'name', 'formation', 'start_date']);

        return response()->json([
            'participants' => $participants,
            'infoSessions' => $infoSessions
        ]);
    }
}
