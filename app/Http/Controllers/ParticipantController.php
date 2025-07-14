<?php

namespace App\Http\Controllers;

use App\Exports\ParticipantExport;
use App\Exports\QuestionsExport;
use App\Mail\InterviewMail;
use App\Mail\JungleMail;
use App\Mail\SchoolMail;
use App\Models\InfoSession;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use LaravelQRCode\Facades\QRCode;
use App\Mail\CodeMail;
use App\Models\FrequentQuestion;
use App\Models\Note;
use App\Models\Satisfaction;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $participants = Participant::with(['infoSession', 'confirmation'])->get();
        $infosessions = InfoSession::all();
        return Inertia::render('admin/participants/participants', [
            'participants' => $participants,
            'infosessions' => $infosessions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string',
            'email' => 'required|string|email|unique:participants',
            'birthday' => 'required|string',
            'phone' => 'required|string',
            'city' => 'required|string',
            'prefecture' => 'required|string',
            'info_session_id' => 'required',
            'gender' => 'required|string',
            'motivation' => 'required|string',
            'source' => 'required|string',
        ]);

        $parts = Participant::where('info_session_id', $request->info_session_id)->count();
        $infosession = InfoSession::where('id', $request->info_session_id)->first();
        if ($parts + 1 > $infosession->places) {
            return back()->with('error', 'Sorry places are full');
        }

        $checkUser = Participant::where('info_session_id', $request->info_session_id)
            ->where('email', $request->email)->first();
        if ($checkUser) {
            return back()->with('error', 'This email already exist');
        }

        $time = Carbon::now();
        $code = $request->full_name . $time->format('h:i:s');
        $birthObj = new DateTime($request->birthday);
        $currentDay = new DateTime();
        $age = $birthObj->diff($currentDay)->y;

        // create the participant
        $participant = Participant::create([
            'info_session_id' => $request->info_session_id,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'birthday' => $request->birthday,
            'age' => $age,
            'phone' => $request->phone,
            'city' => $request->city,
            'prefecture' => $request->prefecture,
            'gender' => $request->gender,
            'source' => $request->source,
            'motivation' => $request->motivation,
            'code' => $code
        ]);

        // one to one relationships
        $questions = FrequentQuestion::create([
            'participant_id' => $participant->id,
        ]);
        $satisfaction = Satisfaction::create([
            'participant_id' => $participant->id,
        ]);

        $data['full_name'] = $participant->full_name;
        $data['email'] = $participant->email;
        $data['code'] = $participant->code;
        $data['infosession'] = $participant->infoSession->name;
        $data['formation'] = $participant->infoSession->formation;
        $data['time'] = $participant->infoSession->start_date;
        $data['created_at'] = $participant->created_at;

        $jsonData = json_encode([
            'email' => $data['email'],
            'code' => $data['code']
        ]);

        ob_start();
        QRCode::text($jsonData)
            ->setErrorCorrectionLevel('H')
            ->png();

        $qrImage = ob_get_clean();
        $image = base64_encode($qrImage);
        $pdf = Pdf::loadView('mail.partials.code', compact(['image', 'data']));
        $data['pdf'] = $pdf;
        //!!!!!! add mail 
        Mail::to($participant->email)->send(new CodeMail($data, $image));

        if ($parts + 1 == $infosession->places) {
            $infosession->update([
                'isFull' => true
            ]);
        }
        return back()->with('success', 'Registration successful! Check your email for your info session invite and QR code.
 ');
    }

    /**
     * Display the specified resource.
     */
    public function show(Participant $participant)
    {
        // dd($participant);
        return Inertia::render('admin/participants/[id]', [
            'participant' => $participant->load([
                'infoSession',
                'notes',
                'questions',
                'satisfaction',
                'confirmation'
            ])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    // Change participant current step 
    public function step(Request $request, Participant $participant)
    {
        $request->validate([
            'action' => 'required'
        ]);
        // the action value of the submit buttons in the form
        $action = $request->input("action");
        // this is for determining either coding/media
        $formation = strtolower($participant->infoSession->formation);
        $school = $formation . "_school";
        // dd($school);

        if ($action == "daz") {
            $participant->update([
                'current_step' => 'interview_pending'
            ]);
            return back()->with('success', 'Participant in Pending Interview');
        }

        if ($participant->current_step == "interview" || $participant->current_step == "interview_pending") {
            $participant->update([
                "current_step" => $action == "next" ? "jungle" : "interview_failed",
            ]);
            return back()->with('success', $action == "next" ? "Move To Jungle" : "Participant Has Failed");
        } elseif ($participant->current_step == "jungle") {
            $participant->update([
                "current_step" => $action == "next" ? $school : "jungle" . "_failed",
            ]);
            return back()->with('success', $action == "next" ? "Move To School" : "Participant Has Failed");
        }
    }
    public function frequentQuestions(Request $request, Participant $participant)
    {

        $frequents = $participant->questions;
        foreach ($request->all() as $field => $value) {
            if ($field != "_token") {
                $frequents->update([
                    $field => $value ?? $frequents->$field,
                ]);
            }
        }

        return redirect()->back()->with("success", "Form submitted successfully!");
    }



    public function updateSatisfaction(Request $request, Participant $participant)
    {
        foreach ($request->all() as $key => $column) {
            $participant->satisfaction->{$key} = $request->$key;
        }
        $participant->satisfaction->save();
        return back()->with("success", "Satisfaction data saved successfully!");
    }
    public function notes(Request $request, Participant $participant)
    {
        // dd($request);
        $request->validate([
            'note' => 'required|string',
        ]);
        $user = Auth::user();
        Note::create([
            'note' => $request->note,
            'participant_id' => $participant->id,
            'author' => $user->name,
        ]);
        return back()->with("success", "Note Has Been Added successfully!");
    }

    // export participants
    public function export()
    {
        // dd();
        $date = (new DateTime())->format('F_d_Y');
        return (new ParticipantExport())->download($date . '_participants.xlsx');
    }
    public function questionsExport()
    {
        $date = (new DateTime())->format('F_d_Y');
        return Excel::download(new QuestionsExport, $date . '_questions.xlsx');
    }
     public function toInterview(Request $request)
    {
        $candidats = Participant::where('info_session_id', $request->infosession_id)->where('current_step', 'interview')->get();
        $info = InfoSession::where('id', $request->infosession_id)->first();
        $formationType = $info->formation;
        if ($formationType == 'Media') {
            $emailRecipient = 'Media';
        } elseif ($formationType == 'Coding') {
            $emailRecipient = 'Coding';
        }
        $divided = ceil($candidats->count() / count($request->dates));
        foreach ($request->dates as $time) {
            // dd($time);
            $group = $candidats->splice(0, $divided);
            foreach ($group as $candidat) {
                $full_name = $candidat->full_name;
                $day = $request->date;
                $timeSlot = $time;
                $course = $emailRecipient;
                Mail::mailer($emailRecipient)->to($candidat->email)->send(new InterviewMail($full_name, $day, $timeSlot, $course));
            }
        }
        return back()->with('success', 'The Invitation Has Been Sent Successfully!');
    }
    public function toJungle(Request $request)
    {
        $sessionId = $request->sessionId;
        $traning = InfoSession::where('id', $sessionId)->first()->formation;
        if ($traning == 'Media') {
            $emailRecipient = 'Media';
        } elseif ($traning == 'Coding') {
            $emailRecipient = 'Coding';
        }
        $candidats = Participant::where('current_step', 'jungle')->where('info_session_id', $request->infosession_id)->get();
        $day = $request->date;
        foreach ($candidats as $candidat) {
            Mail::mailer($emailRecipient)->to($candidat->email)->send(new JungleMail($candidat->full_name, $candidat->id, $day, $traning));
        }
        return back()->with('success', 'The Invitation Has Been Sent Successfully!');
    }
    public function toSchool(Request $request)
    {
        $candidats = Participant::where('info_session_id', $request->infosession_id)->where('current_step', 'coding_school')->orWhere('current_step', 'media_school')->get();
         // If "Send" button is clicked, validate that a date is provided
        if ($request->has('submit_with_date')) {
            $request->validate([
                'date' => 'required|date'
            ]);
        }
   	    // If "Send Without Date" button is clicked, set date to null
        $day = $request->has('submit_without_date') ? null : $request->date;
        $info = InfoSession::where('id', $request->infosession_id)->first();
        $formationType = $info->formation;
        foreach ($candidats as $key => $candidat) {
            if ($formationType == 'Media' && $candidat->current_step == "media_school") {
                $emailRecipient = 'Media';
            } elseif ($formationType == 'Coding' && $candidat->current_step == "coding_school") {
                $emailRecipient = 'Coding';
            }
            $school = $candidat->current_step == "coding_school" ? "Coding" : "Media";
            // Mail::mailer($emailRecipient)->to($candidat->email)->send(new SchoolMail($candidat->full_name, $day, $candidat->current_step));
            Mail::to($candidat->email)->send(new SchoolMail($candidat->full_name, $candidat->id, $day, $school));
        }
        return back()->with('success', 'The Invitation Has Been Sent Successfully!');
    }
}
