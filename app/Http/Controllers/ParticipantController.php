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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use LaravelQRCode\Facades\QRCode;
use App\Mail\CodeMail;
use App\Mail\RegistrationReceived;
use App\Mail\RegistrationApproved;
use App\Mail\RegistrationApprovedCoding;
use App\Mail\RegistrationApprovedMedia;
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
     * Store a newly created participant in storage.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        Log::info('Participants.store: Processing registration request', [
            'email' => $request->email,
            'formation_field' => $request->formation_field,
            'has_cv' => $request->hasFile('cv_file'),
            'all_request_data' => $request->all()
        ]);

        try {
            // 1. Validate request data
            $this->validateParticipantData($request);

            // 2. Handle CV file upload
            $cvFileName = $this->handleCvFileUpload($request);

            // 3. Check session capacity if applicable
            $this->checkSessionCapacity($request);

            // 4. Create participant record
            $participant = $this->createParticipant($request, $cvFileName);

            // 5. Create related records
            $this->createRelatedRecords($participant);

            // 6. Send confirmation email
            $this->sendConfirmationEmail($participant);

            Log::info('Participants.store: Registration completed successfully', [
                'participant_id' => $participant->id,
                'email' => $participant->email
            ]);

            // 7. Return appropriate response
            return $this->handleSuccessResponse($request, $participant);
        } catch (\Illuminate\Validation\ValidationException $validationException) {
            Log::error('Participants.store: Validation failed', [
                'errors' => $validationException->errors(),
                'message' => $validationException->getMessage()
            ]);

            // Check if this is an email validation error (already exists)
            $errors = $validationException->errors();
            $isEmailError = isset($errors['email']) && (
                str_contains($errors['email'][0], 'already registered') ||
                str_contains($errors['email'][0], 'recently') ||
                str_contains($errors['email'][0], '180 days')
            );

            // For Inertia requests, return back with errors
            if ($request->header('X-Inertia')) {
                return back()->withErrors($validationException->errors())->withInput();
            }

            // For AJAX/JSON requests (like from the game component)
            if ($request->expectsJson() || $request->ajax()) {
                if ($isEmailError) {
                    // Show specific email error message
                    return response()->json([
                        'success' => false,
                        'message' => 'Validation failed',
                        'errors' => $validationException->errors()
                    ], 422);
                } else {
                    // Show generic submission failed message for other validation errors
                    return response()->json([
                        'success' => false,
                        'message' => 'Submission failed. Please try again.',
                        'errors' => ['general' => 'Submission failed. Please try again.']
                    ], 422);
                }
            }

            return back()->withErrors($validationException->errors())->withInput();
        } catch (\Throwable $th) {
            Log::error('Participants.store: Registration failed', [
                'error' => $th->getMessage(),
                'trace' => $th->getTraceAsString()
            ]);

            return $this->handleErrorResponse($request, $th);
        }
    }

    /**
     * Validate participant registration data.
     */
    private function validateParticipantData(Request $request): void
    {
        // Trim all string inputs for security
        $this->trimStringInputs($request);

        $messages = [
            'email.unique' => 'This email already exists',
            'email.recent_registration' => 'This email was registered recently. Please wait 180 days before registering again.',
            'formation_field.required' => 'Formation field is required. Please apply from the coding or media page.',
            'formation_field.in' => 'Formation field must be either coding or media.',
            'why_join_formation.min' => 'Your motivation must be at least 50 characters long.',
            'cv_file.max' => 'The CV file size must not exceed 5MB.',
            'cv_file.mimes' => 'The CV file must be a PDF, DOC, or DOCX file.',
            'full_name.regex' => 'Name can only contain letters and spaces.',
            'email.regex' => 'Please enter a valid email address.',
            'phone.regex' => 'Please enter a valid phone number.',
            'city.regex' => 'City name can only contain letters and spaces.',
            'why_join_formation.regex' => 'Motivation contains invalid characters.',
            'objectives_after_formation.regex' => 'Objectives contain invalid characters.',
        ];

        // Custom email validation with 180-day check
        $this->validateEmailWithTimeRestriction($request);

        $request->validate([
            // Session and Formation Information
            'info_session_id' => 'nullable|integer|exists:info_sessions,id',
            'formation_field' => 'required|string|in:coding,media',

            // Personal Information - with trim and sanitization
            'full_name' => 'required|string',
            'email' => 'required|string|email',
            'birthday' => 'required|date|before_or_equal:' . now()->subYears(18)->format('Y-m-d') . '|after_or_equal:' . now()->subYears(65)->format('Y-m-d'),
            'phone' => 'required|string',
            'city' => 'required|string',
            'region' => 'nullable|string',
            'other_city' => 'nullable|string',

            // Education & Background - with trim and sanitization
            'education_level' => 'required|string|in:no_diploma,baccalaureate,technician,deug_dut_dts_bts,licence,master,doctorate,other',
            'diploma_institution' => 'nullable|string',
            'diploma_specialty' => 'nullable|string',
            'current_situation' => 'required|string|in:job_seeking,student,employee,freelancer,apprenticeship,internship,entrepreneur,other',
            'other_status' => 'nullable|string',

            // Organization & Training - with trim and sanitization
            'has_referring_organization' => 'required|string|in:yes,no',
            'referring_organization' => 'nullable|string',
            'other_organization' => 'nullable|string',
            'has_training' => 'required|string|in:yes,no',
            'previous_training_details' => 'nullable|string',

            // Motivation & Goals - with trim and enhanced validation
            'why_join_formation' => 'required|string',
            'participated_lionsgeek' => 'required|string|in:yes,no',
            'lionsgeek_activity' => 'nullable|string',
            'other_activity' => 'nullable|string',
            'objectives_after_formation' => 'required|string',
            'priority_learning_topics' => 'nullable|string',
            'last_self_learned' => 'required|string',

            // Language Skills - with strict validation
            'arabic_level' => 'required|string|in:beginner,intermediate,advanced,fluent',
            'french_level' => 'required|string|in:beginner,intermediate,advanced,fluent',
            'english_level' => 'required|string|in:beginner,intermediate,advanced,fluent',

            // Additional Information - with trim and sanitization
            'how_heard_about_formation' => 'required|string',
            'current_commitments' => 'required|string',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:5120', // 5MB max

            // Game Metrics (optional) - with strict validation
            'game_completed' => 'nullable|boolean',
            'final_score' => 'nullable|integer|min:0|max:100',
            'correct_answers' => 'nullable|integer|min:0|max:1000',
            'levels_completed' => 'nullable|integer|min:0|max:100',
            'total_attempts' => 'nullable|integer|min:0|max:10000',
            'wrong_attempts' => 'nullable|integer|min:0|max:10000',
            'time_spent' => 'nullable|integer|min:0|max:86400', // Max 24 hours
            'time_spent_formatted' => 'nullable|string|max:20',
        ], $messages);
    }

    /**
     * Trim and sanitize all string inputs for security and data consistency.
     */
    private function trimStringInputs(Request $request): void
    {
        $stringFields = [
            'formation_field', 'full_name', 'email', 'phone', 'city', 'region', 'other_city',
            'diploma_institution', 'diploma_specialty', 'other_status',
            'referring_organization', 'other_organization', 'previous_training_details',
            'why_join_formation', 'lionsgeek_activity', 'other_activity',
            'objectives_after_formation', 'priority_learning_topics', 'last_self_learned',
            'how_heard_about_formation', 'current_commitments', 'time_spent_formatted'
        ];

        foreach ($stringFields as $field) {
            if ($request->has($field) && is_string($request->input($field))) {
                // Trim whitespace and sanitize input
                $value = trim($request->input($field));
                
                // Remove potentially dangerous characters
                $value = strip_tags($value);
                $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                
                $request->merge([$field => $value]);
            }
        }
    }

    /**
     * Validate email with 180-day time restriction.
     */
    private function validateEmailWithTimeRestriction(Request $request)
    {
        $email = $request->email;
        $currentFormationField = $request->formation_field;

        Log::info('validateEmailWithTimeRestriction called', [
            'email' => $email,
            'current_formation_field' => $currentFormationField,
            'request_data' => $request->all()
        ]);

        // Check if email already exists - get the MOST RECENT registration
        $existingParticipant = \App\Models\Participant::where('email', $email)
            ->orderBy('created_at', 'desc')
            ->first();

        if ($existingParticipant) {
            $previousFormationField = $existingParticipant->formation_field;

            // Calculate days between existing registration and today
            $registrationDate = $existingParticipant->created_at;
            $today = now();
            $daysDifference = $registrationDate->diffInDays($today);

            Log::info('Email validation check', [
                'email' => $email,
                'existing_participant_id' => $existingParticipant->id,
                'previous_formation_field' => $previousFormationField,
                'current_formation_field' => $currentFormationField,
                'registration_date' => $registrationDate,
                'today' => $today,
                'days_difference' => $daysDifference
            ]);

            // Check if formation fields are different (coding <-> media)
            $isDifferentFormation = ($previousFormationField === 'coding' && $currentFormationField === 'media') ||
                ($previousFormationField === 'media' && $currentFormationField === 'coding');

            if ($isDifferentFormation) {
                // Allow cross-registration between coding and media regardless of time
                Log::info('Allowing cross-formation registration', [
                    'email' => $email,
                    'from' => $previousFormationField,
                    'to' => $currentFormationField
                ]);
                return; // Allow registration
            }

            // Same formation field - apply 180-day rule
            if ($daysDifference <= 180) {
                Log::info('Blocking registration - same formation field registered recently', [
                    'email' => $email,
                    'formation_field' => $currentFormationField,
                    'days_since_registration' => $daysDifference
                ]);

                $validator = Validator::make($request->all(), [
                    'email' => 'required'
                ], [
                    'email.recent_registration' => "You have already registered for {$currentFormationField} recently. Please wait 180 days before registering again for the same formation."
                ]);

                $validator->after(function ($validator) use ($currentFormationField) {
                    $validator->errors()->add('email', "You have already registered for {$currentFormationField} recently. Please wait 180 days before registering again for the same formation.");
                });

                if ($validator->fails()) {
                    throw new \Illuminate\Validation\ValidationException($validator);
                }
            } else {
                Log::info('Allowing registration - same formation field but registered long ago', [
                    'email' => $email,
                    'formation_field' => $currentFormationField,
                    'days_since_registration' => $daysDifference
                ]);
            }
        } else {
            Log::info('Email not found in database - allowing registration', [
                'email' => $email
            ]);
        }
    }

    /**
     * Validate email with 180-day time restriction for updates.
     */
    private function validateEmailWithTimeRestrictionForUpdate(Request $request, Participant $participant): void
    {
        $email = $request->email;
        $currentFormationField = $request->formation_field ?? $participant->formation_field;

        // Check if email already exists (excluding current participant) - get the MOST RECENT registration
        $existingParticipant = \App\Models\Participant::where('email', $email)
            ->where('id', '!=', $participant->id)
            ->orderBy('created_at', 'desc')
            ->first();

        if ($existingParticipant) {
            $previousFormationField = $existingParticipant->formation_field;

            // Calculate days between existing registration and today
            $registrationDate = $existingParticipant->created_at;
            $today = now();
            $daysDifference = $registrationDate->diffInDays($today);

            // Check if formation fields are different (coding <-> media)
            $isDifferentFormation = ($previousFormationField === 'coding' && $currentFormationField === 'media') ||
                ($previousFormationField === 'media' && $currentFormationField === 'coding');

            if ($isDifferentFormation) {
                // Allow cross-registration between coding and media regardless of time
                return; // Allow update
            }

            // Same formation field - apply 180-day rule
            if ($daysDifference <= 180) {
                $validator = Validator::make($request->all(), [
                    'email' => 'required'
                ], [
                    'email.recent_registration' => "You have already registered for {$currentFormationField} recently. Please wait 180 days before registering again for the same formation."
                ]);

                $validator->after(function ($validator) use ($currentFormationField) {
                    $validator->errors()->add('email', "You have already registered for {$currentFormationField} recently. Please wait 180 days before registering again for the same formation.");
                });

                if ($validator->fails()) {
                    throw new \Illuminate\Validation\ValidationException($validator);
                }
            }
        }
    }

    /**
     * Handle CV file upload with validation.
     */
    private function handleCvFileUpload(Request $request): string
    {
        if (!$request->hasFile('cv_file')) {
            $this->returnCvError($request, 'CV file is required.');
        }

        $cvFile = $request->file('cv_file');

        // Validate file size (5MB max)
        if ($cvFile->getSize() > 5 * 1024 * 1024) {
            $this->returnCvError($request, 'CV file size must not exceed 5MB.');
        }

        // Generate unique filename with timestamp
        $cvFileName = time() . '_' . $cvFile->getClientOriginalName();

        // Store the file
        $cvFile->storeAs('public/cvs', $cvFileName);

        return $cvFileName;
    }

    /**
     * Return CV file error response.
     */
    private function returnCvError(Request $request, string $message): void
    {
        if ($request->header('X-Inertia')) {
            flash()->option('position', 'bottom-right')->error($message);
            throw new \Exception($message);
        }

        throw new \Exception($message);
    }

    /**
     * Check if session has available capacity.
     */
    private function checkSessionCapacity(Request $request): void
    {
        if (!$request->filled('info_session_id')) {
            return;
        }

        $currentParticipants = Participant::where('info_session_id', $request->info_session_id)->count();
        $infoSession = InfoSession::where('id', $request->info_session_id)->first();

        if ($infoSession && ($currentParticipants + 1 > $infoSession->places)) {
            $message = 'Sorry, places are full for this session.';

            if ($request->header('X-Inertia')) {
                flash()->option('position', 'bottom-right')->error($message);
                throw new \Exception($message);
            }

            throw new \Exception($message);
        }
    }

    /**
     * Create participant record.
     */
    private function createParticipant(Request $request, string $cvFileName): Participant
    {
        // Calculate age from birthday
        $birthDate = new DateTime($request->birthday);
        $currentDate = new DateTime();
        $age = $birthDate->diff($currentDate)->y;

        // Generate unique code
        $code = $request->full_name . Carbon::now()->format('h:i:s');

        return Participant::create([
            // Basic Information
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

            // Education & Background
            'education_level' => $request->education_level,
            'diploma_institution' => $request->diploma_institution ?: null,
            'diploma_specialty' => $request->diploma_specialty ?: null,
            'current_situation' => $request->current_situation,
            'other_status' => $request->other_status ?: null,

            // Organization & Training
            'has_referring_organization' => $request->has_referring_organization,
            'referring_organization' => $request->referring_organization ?: null,
            'other_organization' => $request->other_organization ?: null,
            'has_training' => $request->has_training,
            'previous_training_details' => $request->previous_training_details ?: null,

            // Motivation & Goals
            'why_join_formation' => $request->why_join_formation,
            'participated_lionsgeek' => $request->participated_lionsgeek,
            'lionsgeek_activity' => $request->lionsgeek_activity ?: null,
            'other_activity' => $request->other_activity ?: null,
            'objectives_after_formation' => $request->objectives_after_formation,
            'priority_learning_topics' => $request->priority_learning_topics ?: null,
            'last_self_learned' => $request->last_self_learned,

            // Language Skills
            'arabic_level' => $request->arabic_level,
            'french_level' => $request->french_level,
            'english_level' => $request->english_level,

            // Additional Information
            'how_heard_about_formation' => $request->how_heard_about_formation,
            'current_commitments' => $request->current_commitments,
            'cv_file' => $cvFileName,

            // Game Metrics
            'game_completed' => $request->boolean('game_completed'),
            'final_score' => $request->input('final_score'),
            'correct_answers' => $request->input('correct_answers'),
            'levels_completed' => $request->input('levels_completed'),
            'total_attempts' => $request->input('total_attempts'),
            'wrong_attempts' => $request->input('wrong_attempts'),
            'time_spent' => $request->input('time_spent'),
            'time_spent_formatted' => $request->input('time_spent_formatted'),

            // Status
            'status' => Participant::STATUS_PENDING,
        ]);
    }

    /**
     * Create related records for the participant.
     */
    private function createRelatedRecords(Participant $participant): void
    {
        ParticipantConfirmation::create(['participant_id' => $participant->id]);
        FrequentQuestion::create(['participant_id' => $participant->id]);
        Satisfaction::create(['participant_id' => $participant->id]);
    }

    /**
     * Send confirmation email to participant.
     */
    private function sendConfirmationEmail(Participant $participant): void
    {
        try {
            Mail::to($participant->email)->send(new RegistrationReceived($participant));
        } catch (\Exception $emailError) {
            Log::error('Failed to send registration confirmation email', [
                'participant_id' => $participant->id,
                'email' => $participant->email,
                'error' => $emailError->getMessage()
            ]);
            // Don't fail the registration if email fails
        }
    }

    /**
     * Handle successful response.
     */
    private function handleSuccessResponse(Request $request, Participant $participant)
    {
            if ($request->expectsJson() && !$request->header('X-Inertia')) {
                return response()->json([
                    'success' => true,
                    'message' => 'Participant created successfully!',
                    'participant' => $participant
                ], 201);
            }

        return back();
    }

    /**
     * Handle error response.
     */
    private function handleErrorResponse(Request $request, \Throwable $th)
    {
            // For Inertia requests, return back with error
            if ($request->header('X-Inertia')) {
                return back()->withErrors(['general' => 'Submission failed. Please try again.']);
            }

            // For AJAX/JSON requests (like from the game component)
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Submission failed. Please try again.',
                    'errors' => ['general' => 'Submission failed. Please try again.']
                ], 500);
            }

            return back();
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
            'email.recent_registration' => 'This email was registered recently. Please wait 180 days before registering again.',
        ];

        // Custom email validation with 180-day check for updates
        $this->validateEmailWithTimeRestrictionForUpdate($request, $participant);

        $request->validate([
            'full_name' => 'required|string',
            'email' => 'required|email',
            'birthday' => 'required|date',
            'phone' => 'required|string|',
            'city' => 'required|string',
            'prefecture' => 'required|string',
            'session' => 'required|exists:info_sessions,id',
            'step' => 'required|string|in:info_session,interview,interview_pending,interview_failed,jungle,jungle_failed,coding_school,media_school',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif48',
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
            return back();
        }

        if ($participant->current_step == "interview" || $participant->current_step == "interview_pending") {
            $participant->update([
                "current_step" => $action == "next" ? "jungle" : "interview_failed",
            ]);
            return back();
        } elseif ($participant->current_step == "jungle") {
            $participant->update([
                "current_step" => $action == "next" ? $school : "jungle" . "_failed",
            ]);
            return back();
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

        return redirect()->back();
    }



    public function updateSatisfaction(Request $request, Participant $participant)
    {
        foreach ($request->all() as $key => $column) {
            $participant->satisfaction->{$key} = $request->$key;
        }
        $participant->satisfaction->save();
        return back();
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
        return back();
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
            return back();
        } catch (\Throwable $th) {
            //throw $th;
            return back();
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
        return back();
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
        return back();
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
                'approved_by' => Auth::id(),
                'approved_at' => now()
            ]);

            // Send formation-specific approval email
            try {
                // Normalize formation field
                $formation = strtolower((string) $participant->formation_field);

                // Fetch all available upcoming sessions for the participant's track
                $sessions = \App\Models\InfoSession::where('formation', $formation === 'coding' ? 'Coding' : 'Media')
                    ->where('isFull', false)
                    ->where('isFinish', false)
                    ->where('isAvailable', true)
                    ->where('start_date', '>=', now())
                    ->orderBy('start_date')
                    ->get();

                if ($formation === 'coding') {
                    Mail::to($participant->email)->send(new RegistrationApprovedCoding($participant, $sessions));
                } elseif ($formation === 'media') {
                    Mail::to($participant->email)->send(new RegistrationApprovedMedia($participant, $sessions));
                } else {
                    // Fallback to generic approval email
                    Mail::to($participant->email)->send(new RegistrationApproved($participant));
                }
                $emailStatus = 'and email sent';
            } catch (\Exception $emailError) {
                // Log email error but don't fail the approval
                Log::error('Failed to send approval email: ' . $emailError->getMessage());
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
                'approved_by' => Auth::id(),
                'approved_at' => now()
            ]);

            // Send rejection email
            try {
                Mail::to($participant->email)->send(new RegistrationRejected($participant));
                $emailStatus = 'and email sent';
            } catch (\Exception $emailError) {
                // Log email error but don't fail the rejection
                Log::error('Failed to send rejection email: ' . $emailError->getMessage());
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

    /**
     * Reserve an info session for an approved participant via signed link
     */
    public function reserve(Request $request, Participant $participant, \App\Models\InfoSession $session)
    {
        try {
            // Ensure participant is approved
            if ($participant->status !== Participant::STATUS_APPROVED) {
                return Inertia::render('client/infoSession/ReservationResult', [
                    'type' => 'error',
                    'title' => [
                        'en' => 'Reservation unavailable',
                        'fr' => 'Réservation indisponible',
                        'ar' => 'الحجز غير متاح',
                    ],
                    'message' => [
                        'en' => 'Your application is not approved yet.',
                        'fr' => 'Votre candidature n\'est pas encore approuvée.',
                        'ar' => 'لم تتم الموافقة على طلبك بعد.'
                    ],
                    'redirectUrl' => config('app.url')
                ]);
            }

            // One-choice-only: if already reserved a session, block
            if ($participant->info_session_id && $participant->info_session_id !== $session->id) {
                return Inertia::render('client/infoSession/ReservationResult', [
                    'type' => 'error',
                    'title' => [
                        'en' => 'Already reserved',
                        'fr' => 'Déjà réservé',
                        'ar' => 'تم الحجز مسبقًا',
                    ],
                    'message' => [
                        'en' => 'You have already reserved an info session.',
                        'fr' => 'Vous avez déjà réservé une séance d\'information.',
                        'ar' => 'لقد حجزت بالفعل جلسة معلومات.'
                    ],
                    'redirectUrl' => config('app.url')
                ]);
            }

            // Validate session matches participant track and is available and upcoming
            $formation = strtolower((string) $participant->formation_field);
            $validFormation = $session->formation === ($formation === 'coding' ? 'Coding' : 'Media');
            $isUpcoming = \Carbon\Carbon::parse($session->start_date)->gte(now());
            $isAvailable = !$session->isFull && !$session->isFinish && $session->isAvailable;

            if (!($validFormation && $isUpcoming && $isAvailable)) {
                return Inertia::render('client/infoSession/ReservationResult', [
                    'type' => 'error',
                    'title' => [
                        'en' => 'Session unavailable',
                        'fr' => 'Séance indisponible',
                        'ar' => 'الجلسة غير متاحة',
                    ],
                    'message' => [
                        'en' => 'This session is no longer available.',
                        'fr' => 'Cette séance n\'est plus disponible.',
                        'ar' => 'هذه الجلسة لم تعد متاحة.'
                    ],
                    'redirectUrl' => config('app.url')
                ]);
            }

            // Check capacity safely in a transaction
            DB::transaction(function () use ($session, $participant) {
                $approvedCount = Participant::where('info_session_id', $session->id)
                    ->where('status', Participant::STATUS_APPROVED)
                    ->lockForUpdate()
                    ->count();

                if ($approvedCount >= $session->places) {
                    $session->update(['isFull' => true]);
                    throw new \RuntimeException('full');
                }

                // Reserve
                $participant->update(['info_session_id' => $session->id]);
            });

            // Build and send QR-coded invitation email
            try {
                $qrPayload = json_encode([
                    'participant_id' => $participant->id,
                    'participant_name' => $participant->full_name,
                    'info_session_id' => $session->id,
                    'info_session_name' => $session->name,
                    'start_date' => $session->start_date,
                ]);

                // Generate QR to a temporary file to avoid binary output leaking into the response
                $qrTempPath = storage_path('app/qr_' . $participant->id . '_' . time() . '.png');
                QRCode::text($qrPayload)->setOutfile($qrTempPath)->png();
                $qrBinary = is_file($qrTempPath) ? file_get_contents($qrTempPath) : '';
                if (is_file($qrTempPath)) { @unlink($qrTempPath); }
                $qrBase64 = base64_encode($qrBinary);

                $mailData = [
                    'formation' => $session->formation,
                    'infosession' => $session->name,
                    'full_name' => $participant->full_name,
                    'time' => $session->start_date,
                    'created_at' => now()->format('Y-m-d H:i'),
                ];

                $pdf = Pdf::loadView('pdf.code', [
                    'data' => $mailData,
                    'image' => $qrBase64,
                ]);

                // Pass pdf instance in data as expected by CodeMail
                $mailData['pdf'] = $pdf;
                Mail::to($participant->email)->send(new CodeMail($mailData, $qrBase64));
            } catch (\Throwable $mailError) {
                Log::error('Failed to send reservation QR email: ' . $mailError->getMessage());
            }

            return Inertia::render('client/infoSession/ReservationResult', [
                'type' => 'success',
                'title' => [
                    'en' => 'Reservation confirmed',
                    'fr' => 'Réservation confirmée',
                    'ar' => 'تم تأكيد الحجز',
                ],
                'message' => [
                    'en' => 'Your place has been reserved successfully!',
                    'fr' => 'Votre place a été réservée avec succès !',
                    'ar' => 'تم حجز مكانك بنجاح!'
                ],
                'redirectUrl' => config('app.url')
            ]);
        } catch (\RuntimeException $re) {
            if ($re->getMessage() === 'full') {
                return Inertia::render('client/infoSession/ReservationResult', [
                    'type' => 'error',
                    'title' => [
                        'en' => 'Session full',
                        'fr' => 'Séance complète',
                        'ar' => 'الجلسة ممتلئة',
                    ],
                    'message' => [
                        'en' => 'This session just filled up.',
                        'fr' => 'Cette séance vient d\'être complète.',
                        'ar' => 'امتلأت هذه الجلسة للتو.'
                    ],
                    'redirectUrl' => config('app.url')
                ]);
            } else {
                return Inertia::render('client/infoSession/ReservationResult', [
                    'type' => 'error',
                    'title' => [
                        'en' => 'Reservation failed',
                        'fr' => 'Échec de la réservation',
                        'ar' => 'فشل الحجز',
                    ],
                    'message' => [
                        'en' => 'Unable to reserve your place at this time.',
                        'fr' => 'Impossible de réserver votre place pour le moment.',
                        'ar' => 'يتعذر حجز مكانك في الوقت الحالي.'
                    ],
                    'redirectUrl' => config('app.url')
                ]);
            }
            return Inertia::render('client/infoSession/ReservationResult', []);
        } catch (\Throwable $th) {
            return Inertia::render('client/infoSession/ReservationResult', [
                'type' => 'error',
                'title' => [
                    'en' => 'Reservation failed',
                    'fr' => 'Échec de la réservation',
                    'ar' => 'فشل الحجز',
                ],
                'message' => [
                    'en' => 'Unable to reserve your place at this time.',
                    'fr' => 'Impossible de réserver votre place pour le moment.',
                    'ar' => 'يتعذر حجز مكانك في الوقت الحالي.'
                ],
                'redirectUrl' => config('app.url')
            ]);
        }
    }
}
