<?php

namespace App\Http\Controllers;

use App\Exports\ParticipantExport;
use App\Exports\QuestionsExport;
use App\Mail\InterviewMail;
use App\Mail\JungleMail;
use App\Mail\SchoolMail;
use App\Models\InfoSession;
use App\Models\Participant;
use App\Models\ParticipantConfirmation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use LaravelQRCode\Facades\QRCode;
use App\Mail\CodeMail;
use App\Mail\RegistrationReceived;
use App\Mail\RegistrationApproved;
use App\Mail\RegistrationRejected;
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
    public function index(Request $request)
    {
        // Always load all participants for frontend filtering
        $participants = Participant::with(['infoSession', 'confirmation', 'approvedBy'])->get();
        $infosessions = InfoSession::all();

        // Get counts for each status
        $statusCounts = [
            'approved' => Participant::approved()->count(),
            'pending' => Participant::pending()->count(),
            'rejected' => Participant::rejected()->count(),
            'all' => Participant::count(),
        ];

        return Inertia::render('admin/participants/index', [
            'participants' => $participants,
            'infosessions' => $infosessions,
            'statusCounts' => $statusCounts,
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
        // Debug: Log the incoming request data
        \Log::info('Participants.store: incoming', $request->all());

        // Note: Do not force JSON responses for Inertia requests. Inertia expects redirects.

        $messages = [
            'email.unique' => 'This email already exist',
            'why_join_formation.min' => 'Your motivation must be at least 50 characters long.',
        ];
        $request->validate([
            'full_name' => 'required|string',
            'email' => 'required|string|email|unique:participants',
            'birthday' => 'required|date|before_or_equal:' . now()->subYears(18)->format('Y-m-d') . '|after_or_equal:' . now()->subYears(65)->format('Y-m-d'),
            'phone' => 'required|string',
            'city' => 'required|string',
            'region' => 'nullable|string',
            'other_city' => 'nullable|string',
            'info_session_id' => 'nullable|integer|exists:info_sessions,id',

            // New form fields validation - made more flexible
            'education_level' => 'required|string',
            'diploma_institution' => 'nullable|string',
            'diploma_specialty' => 'nullable|string',
            'current_situation' => 'required|string',
            'other_status' => 'nullable|string',
            'has_referring_organization' => 'required|string|in:yes,no',
            'referring_organization' => 'nullable|string',
            'other_organization' => 'nullable|string',
            'has_training' => 'required|string|in:yes,no',
            'previous_training_details' => 'nullable|string',
            'why_join_formation' => 'required|string', // Reduced from 100 to 50
            'participated_lionsgeek' => 'required|string|in:yes,no',
            'lionsgeek_activity' => 'nullable|string',
            'other_activity' => 'nullable|string',
            'objectives_after_formation' => 'required|string',
            'priority_learning_topics' => 'required|string',
            'last_self_learned' => 'required|string',
            'arabic_level' => 'required|string|in:beginner,intermediate,advanced,fluent',
            'french_level' => 'required|string|in:beginner,intermediate,advanced,fluent',
            'english_level' => 'required|string|in:beginner,intermediate,advanced,fluent',
            'other_language' => 'nullable|string',
            'other_language_level' => 'nullable|string|in:beginner,intermediate,advanced,fluent',
            'how_heard_about_formation' => 'required|string',
            'current_commitments' => 'required|string',
            'cv_file' => 'nullable|file|mimes:pdf,doc,docx', // 5MB max
        ], $messages);
        try {
            // Handle CV file upload
            // $cvFileName = null;
            // if ($request->hasFile('cv_file')) {
            //     $cvFile = $request->file('cv_file');
            //     $cvFileName = time() . '_' . $cvFile->getClientOriginalName();
            //     $cvFile->storeAs('public/cvs', $cvFileName);
            // }

            $cvFileName = $request->file('cv_file')->store('cvs', 'public');

            // Check if session has available places (only when provided)
            $infosession = null;
            if ($request->filled('info_session_id')) {
                $parts = Participant::where('info_session_id', $request->info_session_id)->count();
                $infosession = InfoSession::where('id', $request->info_session_id)->first();
                if ($infosession && ($parts + 1 > $infosession->places)) {
                    if ($request->expectsJson()) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Sorry, places are full for this session.'
                        ], 422);
                    }
                    return back()->with('error', 'Sorry places are full');
                }
            }

            $time = Carbon::now();
            $code = $request->full_name . $time->format('h:i:s');

            // Calculate age from birthday
            $birthObj = new DateTime($request->birthday);
            $currentDay = new DateTime();
            $age = $birthObj->diff($currentDay)->y;

            // create the participant
            $participant = Participant::create([
                'info_session_id' => $request->info_session_id,
                'formation_field' => $request->formation_field,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'birthday' => $request->birthday,
                'age' => $age,
                'phone' => $request->phone,
                'city' => $request->city,
                'region' => $request->region,
                'other_city' => $request->other_city,
                'prefecture' => $request->prefecture ?? '',
                'gender' => $request->gender ?? '',
                'source' => $request->source ?? $request->how_heard_about_formation,
                'motivation' => $request->motivation ?? $request->why_join_formation,
                'code' => $code,

                // New detailed form fields - use null for empty values
                'education_level' => $request->education_level,
                'diploma_institution' => $request->diploma_institution ?: null,
                'diploma_specialty' => $request->diploma_specialty ?: null,
                'current_situation' => $request->current_situation,
                'other_status' => $request->other_status ?: null,
                'has_referring_organization' => $request->has_referring_organization,
                'referring_organization' => $request->referring_organization ?: null,
                'other_organization' => $request->other_organization ?: null,
                'has_training' => $request->has_training,
                'previous_training_details' => $request->previous_training_details ?: null,
                'why_join_formation' => $request->why_join_formation,
                'participated_lionsgeek' => $request->participated_lionsgeek,
                'lionsgeek_activity' => $request->lionsgeek_activity ?: null,
                'other_activity' => $request->other_activity ?: null,
                'objectives_after_formation' => $request->objectives_after_formation,
                'priority_learning_topics' => $request->priority_learning_topics,
                'last_self_learned' => $request->last_self_learned,
                'arabic_level' => $request->arabic_level,
                'french_level' => $request->french_level,
                'english_level' => $request->english_level,
                'other_language' => $request->other_language ?: null,
                'other_language_level' => $request->other_language_level ?: null,
                'how_heard_about_formation' => $request->how_heard_about_formation,
                'current_commitments' => $request->current_commitments,
                'cv_file' => $cvFileName,

                // Game metrics
                'game_completed' => $request->boolean('game_completed'),
                'final_score' => $request->input('final_score'),
                'correct_answers' => $request->input('correct_answers'),
                'levels_completed' => $request->input('levels_completed'),
                'total_attempts' => $request->input('total_attempts'),
                'wrong_attempts' => $request->input('wrong_attempts'),
                'time_spent' => $request->input('time_spent'),
                'time_spent_formatted' => $request->input('time_spent_formatted'),

                // Set status as pending for approval workflow
                'status' => Participant::STATUS_PENDING,
            ]);
            \Log::info('Participants.store: created', ['id' => $participant->id, 'email' => $participant->email]);

            // Send "thank you" email immediately after registration
            try {
                Mail::to($participant->email)->send(new RegistrationReceived($participant));
            } catch (\Exception $emailError) {
                // Log email error but don't fail the registration
                \Log::error('Failed to send registration confirmation email: ' . $emailError->getMessage());
            }

            // one to one relationships
            ParticipantConfirmation::create([
                'participant_id' => $participant->id,
            ]);
            $questions = FrequentQuestion::create([
                'participant_id' => $participant->id,
            ]);
            $satisfaction = Satisfaction::create([
                'participant_id' => $participant->id,
            ]);
            // PDF and email generation commented out - will be sent after approval
            /*
            $data['full_name'] = $participant->full_name;
            $data['email'] = $participant->email;
            $data['code'] = $participant->code;

            // Send email with session data only when a session is linked
            if ($participant->infoSession) {
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
                $pdf = Pdf::loadView('pdf.code', compact(['image', 'data']));
                $data['pdf'] = $pdf;
                Mail::to($participant->email)->send(new CodeMail($data, $image));
            }

            // Session capacity will be checked only for approved participants
            */

            // Return JSON response only for explicit API/AJAX requests (not Inertia)
            if ($request->expectsJson() && !$request->header('X-Inertia')) {
                return response()->json([
                    'success' => true,
                    'message' => 'Participant created successfully!',
                    'participant' => $participant
                ], 201);
            }
            return redirect('/');
        } catch (\Throwable $th) {
            \Log::error('Participants.store: error', ['error' => $th->getMessage()]);

            if ($request->expectsJson() && !$request->header('X-Inertia')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Something went wrong!',
                    'error' => $th->getMessage()
                ], 500);
            }

            flash()
                ->option('position', 'bottom-right')
                ->error('Something went wrong!');
            return back();
        }
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
    public function edit(Participant $participant)
    {
        $sessions = InfoSession::all();
        return Inertia::render('admin/participants/partials/participants-edit', [
            'participant' => $participant->load('infoSession'),
            'sessions' => $sessions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant)
    {
        $messages = [
            'email.unique' => 'This email already exists',
        ];

        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:participants,email,' . $participant->id,
            'birthday' => 'required|date',
            'phone' => 'required|string|',
            'city' => 'required|string|max:255',
            'prefecture' => 'required|string|max:255',
            'session' => 'required|exists:info_sessions,id',
            'step' => 'required|string|in:info_session,interview,interview_pending,interview_failed,jungle,jungle_failed,coding_school,media_school',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|48',
        ], $messages);

        try {
            $updateData = [
                'full_name' => $request->full_name,
                'email' => $request->email,
                'birthday' => $request->birthday,
                'phone' => $request->phone,
                'city' => $request->city,
                'prefecture' => $request->prefecture,
                'info_session_id' => $request->session,
                'current_step' => $request->step,
            ];

            // Calculate age from birthday
            $birthObj = new \DateTime($request->birthday);
            $currentDay = new \DateTime();
            $age = $birthObj->diff($currentDay)->y;
            $updateData['age'] = $age;

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($participant->image && file_exists(public_path('storage/images/participants/' . $participant->image))) {
                    unlink(public_path('storage/images/participants/' . $participant->image));
                }

                $image = $request->file('image');
                $imageName = time() . '_' . $participant->id . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('storage/images/participants'), $imageName);
                $updateData['image'] = $imageName;
            }

            $participant->update($updateData);

            flash()
                ->option('position', 'bottom-right')
                ->success('Participant updated successfully!');

            return redirect()->route('participants.show', $participant->id);
        } catch (\Throwable $th) {
            flash()
                ->option('position', 'bottom-right')
                ->error('Something went wrong while updating the participant!');

            return back()->withInput();
        }
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
        return Excel::download(new ParticipantExport, $date . '_participants.xlsx');
    }
    public function questionsExport()
    {
        $date = (new DateTime())->format('F_d_Y');
        return Excel::download(new QuestionsExport, $date . '_questions.xlsx');
    }
    public function toInterview(Request $request)
    {
        $request->validate([
            'dates' => 'required|array',
            'infosession_id' => 'required',
        ]);
        try {
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
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('error', 'An Error Has Occurred!');
        }
    }
    public function toJungle(Request $request)
    {
        $traning = InfoSession::where('id', $request->query('infosession_id'))->first()->formation;
        if ($traning == 'Media') {
            $emailRecipient = 'Media';
        } elseif ($traning == 'Coding') {
            $emailRecipient = 'Coding';
        }
        $candidats = Participant::where('current_step', 'jungle')->where('info_session_id', $request->query('infosession_id'))->get();
        $day = $request->query('date');
        foreach ($candidats as $candidat) {
            $id = Crypt::encryptString($candidat->id);
            Mail::mailer($emailRecipient)->to($candidat->email)->send(new JungleMail($candidat->full_name, $id, $day, $traning));
        }
        return back()->with('success', 'The Invitation Has Been Sent Successfully!');
    }
    public function toSchool(Request $request)
    {
        $candidats = Participant::where('info_session_id', $request->query('infosession_id'))->where('current_step', 'coding_school')->orWhere('current_step', 'media_school')->get();
        // If "Send" button is clicked, validate that a date is provided
        // If "Send Without Date" button is clicked, set date to null
        $day = $request->query('submit_without_date') ? null : $request->query('date');
        foreach ($candidats as $key => $candidat) {
            $school = $candidat->current_step == "coding_school" ? "Coding" : "Media";
            $id = Crypt::encryptString($candidat->id);
            Mail::to($candidat->email)->send(new SchoolMail($candidat->full_name, $id, $day, $school));
        }
        return back()->with('success', 'The Invitation Has Been Sent Successfully!');
    }
    public function confirmationJungle($full_name, $id)
    {
        if ($full_name) {
            $participant_id = Crypt::decryptString($id);
            $participant = Participant::where('full_name', $full_name)->where('id', $participant_id)->first();
            $confirmation = $participant->confirmation;
            $confirmation->update([
                'jungle' => 1
            ]);
            return redirect()->away('/attendance/confirmation');
        }
    }


    public function confirmationSchool($full_name, $id)
    {
        if ($full_name) {
            $participant_id = Crypt::decryptString($id);
            $participant = Participant::where('full_name', $full_name)->where('id', $participant_id)->first();
            $confirmation = $participant->confirmation;
            $confirmation->update([
                'school' => 1
            ]);

            return redirect()->away('/attendance/confirmation');
        }
    }

    /**
     * Approve a participant
     */
    public function approve(Participant $participant)
    {
        try {
            $participant->update([
                'status' => Participant::STATUS_APPROVED,
                'approved_by' => auth()->id(),
                'approved_at' => now()
            ]);

            // Send simple approval email (no PDF for now)
            try {
                Mail::to($participant->email)->send(new RegistrationApproved($participant));
                $emailStatus = 'and email sent';
            } catch (\Exception $emailError) {
                // Log email error but don't fail the approval
                \Log::error('Failed to send approval email: ' . $emailError->getMessage());
                $emailStatus = 'but email failed to send';
            }

            // Check if session is now full (only count approved participants)
            if ($participant->info_session_id) {
                $infosession = InfoSession::find($participant->info_session_id);
                $newApprovedCount = Participant::where('info_session_id', $participant->info_session_id)
                                             ->where('status', Participant::STATUS_APPROVED)
                                             ->count();

                if ($newApprovedCount >= $infosession->places) {
                    $infosession->update(['isFull' => true]);
                }
            }

            flash()
                ->option('position', 'bottom-right')
                ->success("Participant approved successfully {$emailStatus}.");

            return back();

        } catch (\Throwable $th) {
            flash()
                ->option('position', 'bottom-right')
                ->error('Something went wrong while approving the participant.');
            return back();
        }
    }

    /**
     * Reject a participant
     */
    public function reject(Participant $participant)
    {
        try {
            $participant->update([
                'status' => Participant::STATUS_REJECTED,
                'approved_by' => auth()->id(),
                'approved_at' => now()
            ]);

            // Send rejection email
            try {
                Mail::to($participant->email)->send(new RegistrationRejected($participant));
                $emailStatus = 'and email sent';
            } catch (\Exception $emailError) {
                // Log email error but don't fail the rejection
                \Log::error('Failed to send rejection email: ' . $emailError->getMessage());
                $emailStatus = 'but email failed to send';
            }

            flash()
                ->option('position', 'bottom-right')
                ->success("Participant rejected successfully {$emailStatus}.");

            return back();

        } catch (\Throwable $th) {
            flash()
                ->option('position', 'bottom-right')
                ->error('Something went wrong while rejecting the participant.');
            return back();
        }
    }
}
