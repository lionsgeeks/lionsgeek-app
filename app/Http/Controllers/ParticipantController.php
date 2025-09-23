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
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Always load all participants for frontend filtering
        $participants = Participant::with(['infoSession', 'confirmation', 'approvedBy', 'lastStepChangedBy'])->get();
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

    public function updateSocialStatus(Request $request, Participant $participant)
    {
        $validated = $request->validate([
            // 1. Situation familiale
            'composition_foyer' => 'nullable|string|in:pere_mere,pere_seul,mere_seule,autre',
            'nombre_personnes' => 'nullable|integer',
            'fratrie' => 'nullable|integer',

            // 2. Situation professionnelle et revenus
            'pere_tuteur' => 'nullable|string|in:decede,entrepreneur,cadre,fonctionnaire,salarie_prive,independant,precaire,sans_emploi',
            'mere_tuteur' => 'nullable|string|in:decedee,entrepreneur,cadre,fonctionnaire,salarie_prive,independante,precaire,sans_emploi',
            'revenus_mensuels' => 'nullable|string|in:lt_3000,3000_6000,6000_10000,10000_15000,gt_15000',

            // 3. Logement
            'type_logement' => 'nullable|string|in:proprietaire,locataire,social_irreg,autre',
            // Basic services now a simple yes/no choice
            'services_base' => 'nullable|string|in:yes,no',

            // 4. Niveau d’éducation
            'education_pere' => 'nullable|string|in:non_scolarise,primaire,college_lycee,superieur',
            'education_mere' => 'nullable|string|in:non_scolarisee,primaire,college_lycee,superieur',

            // 5. Autres éléments sociaux
            'aides_sociales' => 'nullable|string',
            'situation_particuliere' => 'nullable|array',
            'situation_particuliere.*' => 'nullable|in:handicap,orphelin,autre',
            'lien_2m' => 'nullable|string',

            // 6. Catégorie sociale
            'categorie_sociale' => 'nullable|string|in:vulnerable,moyenne_inferieure,moyenne,favorisee',
        ]);

        // Compute social score on server using same mapping as UI
        $score = 0;
        $max = 0;

        $add = function ($value, $map, $default = null) use (&$score, &$max) {
            if ($value === '' || $value === null) return;
            $pts = array_key_exists($value, $map) ? $map[$value] : ($default !== null ? $default : 0);
            $score += $pts;
            $mapMax = max($map);
            $max += is_numeric($mapMax) ? $mapMax : 0;
        };

        // Normalize nullable numeric fields to 0 when not provided
        $validated['nombre_personnes'] = isset($validated['nombre_personnes']) && $validated['nombre_personnes'] !== null
            ? (int) $validated['nombre_personnes']
            : 0;
        $validated['fratrie'] = isset($validated['fratrie']) && $validated['fratrie'] !== null
            ? (int) $validated['fratrie']
            : 0;

        // 1) Composition du foyer
        $add($validated['composition_foyer'] ?? null, [
            'pere_mere' => 0,
            'pere_seul' => 7,
            'mere_seule' => 7,
            'autre' => 3,
        ]);
        // Nombre personnes foyer
        if (isset($validated['nombre_personnes'])) {
            $n = max(0, (int) $validated['nombre_personnes']);
            $pts = $n >= 7 ? 6 : ($n >= 5 ? 4 : ($n >= 3 ? 3 : 1));
            $score += $pts;
            $max += 6;
        }
        // Fratrie
        if (isset($validated['fratrie'])) {
            $n = max(0, (int) $validated['fratrie']);
            $pts = $n >= 5 ? 6 : ($n >= 3 ? 3 : ($n >= 1 ? 1 : 0));
            $score += $pts;
            $max += 6;
        }

        // 2) Statuts parents
        $add($validated['pere_tuteur'] ?? null, [
            'decede' => 12,
            'sans_emploi' => 8,
            'precaire' => 6,
            'independant' => 5,
            'salarie_prive' => 3,
            'fonctionnaire' => 3,
            'cadre' => 0,
            'entrepreneur' => 0,
        ]);
        $add($validated['mere_tuteur'] ?? null, [
            'decedee' => 12,
            'sans_emploi' => 8,
            'precaire' => 6,
            'independante' => 5,
            'salarie_prive' => 3,
            'fonctionnaire' => 3,
            'cadre' => 0,
            'entrepreneur' => 0,
        ]);

        // Revenus
        $add($validated['revenus_mensuels'] ?? null, [
            'lt_3000' => 10,
            '3000_6000' => 8,
            '6000_10000' => 4,
            '10000_15000' => 1,
            'gt_15000' => 0,
        ]);

        // 3) Logement (pas d'impact pour services_base désormais)
        $add($validated['type_logement'] ?? null, [
            'social_irreg' => 10,
            'locataire' => 6,
            'autre' => 5,
            'proprietaire' => 1,
        ]);

        // 4) Education
        $add($validated['education_pere'] ?? null, [
            'non_scolarise' => 6,
            'primaire' => 4,
            'college_lycee' => 2,
            'superieur' => 0,
        ]);
        $add($validated['education_mere'] ?? null, [
            'non_scolarisee' => 6,
            'primaire' => 4,
            'college_lycee' => 2,
            'superieur' => 0,
        ]);

        // 5) Situations particulières
        if (isset($validated['situation_particuliere']) && is_array($validated['situation_particuliere'])) {
            // Score the most severe selected option
            $situMap = ['handicap' => 10, 'autre' => 5, 'aucun' => 0];
            $selectedScores = array_map(fn($k) => $situMap[$k] ?? 0, $validated['situation_particuliere']);
            $score += count($selectedScores) ? max($selectedScores) : 0;
            $max += 10;
        }

        // 6) Catégorie sociale
        $add($validated['categorie_sociale'] ?? null, [
            'vulnerable' => 10,
            'moyenne_inferieure' => 6,
            'moyenne' => 3,
            'favorisee' => 0,
        ]);

        $validated['social_score'] = $max > 0 ? (int) round(($score / $max) * 100) : 0;

        $participant->update($validated);

        // Use Flasher for Inertia flash messages
        flash()->success('Social status updated');
        return back();
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



            // 7. Return appropriate response
            return $this->handleSuccessResponse($request, $participant);
        } catch (\Illuminate\Validation\ValidationException $validationException) {


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
            // Session and Formation Information - not required since participants choose via email
            'info_session_id' => 'nullable|integer|exists:info_sessions,id',
            'private_token' => 'nullable|string', // For private session access
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
            'formation_field',
            'full_name',
            'email',
            'phone',
            'city',
            'region',
            'other_city',
            'diploma_institution',
            'diploma_specialty',
            'other_status',
            'referring_organization',
            'other_organization',
            'previous_training_details',
            'why_join_formation',
            'lionsgeek_activity',
            'other_activity',
            'objectives_after_formation',
            'priority_learning_topics',
            'last_self_learned',
            'how_heard_about_formation',
            'current_commitments',
            'time_spent_formatted'
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

        // Since participants are not assigned to sessions during registration,
        // we only need to check the general 180-day rule for all registrations
        // Private session specific checks are removed since no session assignment happens

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

            // Check if formation fields are different (coding <-> media)
            $isDifferentFormation = ($previousFormationField === 'coding' && $currentFormationField === 'media') ||
                ($previousFormationField === 'media' && $currentFormationField === 'coding');

            if ($isDifferentFormation) {
                // Allow cross-registration between coding and media regardless of time

                return; // Allow registration
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
            } else {
            }
        } else {
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

        // Store the file in the public disk
        $cvFile->storeAs('cvs', $cvFileName, 'public');

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
     * Since participants are not assigned during registration, skip capacity checks.
     */
    private function checkSessionCapacity(Request $request): void
    {
        // Skip capacity checks since participants will choose sessions via email
        // Capacity will be checked when they actually reserve a session
        return;
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

        // Compute game scoring if metrics are present
        $levelsCompleted = (int) $request->input('levels_completed', 0);
        $correctAnswers = (int) $request->input('correct_answers', 0);
        $totalAttempts = (int) $request->input('total_attempts', 0);
        $timeSpentSeconds = (int) $request->input('time_spent', 0);
        $scoring = $this->calculateFinalScore($levelsCompleted, $correctAnswers, $totalAttempts, $timeSpentSeconds);

        // Don't assign to any session initially - participants will choose via email

        return Participant::create([
            // Basic Information
            'info_session_id' => null, // No automatic assignment
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
     * Calculate game scoring metrics and final score.
     *
     * @return array{accuracy: float, progress: float, speed: float, finalScore: int}
     */
    private function calculateFinalScore(
        int $levelsCompleted,
        int $correctAnswers,
        int $totalAttempts,
        int $timeSpentSeconds,
        int $totalLevels = 20,
        float $maxSpeed = 5.0
    ): array {
        $totalAttempts = max(0, $totalAttempts);
        $correctAnswers = max(0, $correctAnswers);
        $levelsCompleted = max(0, min($levelsCompleted, $totalLevels));
        $timeSpentSeconds = max(0, $timeSpentSeconds);

        // 1) Accuracy
        $accuracy = $totalAttempts > 0
            ? ($correctAnswers / $totalAttempts) * 100.0
            : 0.0;

        // 2) Progress
        $progress = $totalLevels > 0
            ? ($levelsCompleted / $totalLevels) * 100.0
            : 0.0;

        // 3) Speed (normalized)
        $timeSpentMinutes = max(0.001, $timeSpentSeconds / 60.0); // avoid division by zero
        $rawSpeed = $levelsCompleted / $timeSpentMinutes; // levels per minute
        $normalizedSpeed = $maxSpeed > 0 ? ($rawSpeed / $maxSpeed) * 100.0 : 0.0;

        // Clamp helper
        $clamp = function (float $v): float {
            return max(0.0, min(100.0, $v));
        };

        $accuracy = $clamp($accuracy);
        $progress = $clamp($progress);
        $normalizedSpeed = $clamp($normalizedSpeed);

        // 4) Final score with weights
        $finalScoreFloat = ($accuracy * 0.5) + ($progress * 0.3) + ($normalizedSpeed * 0.2);
        $finalScore = (int) round($clamp($finalScoreFloat));

        return [
            'accuracy' => round($accuracy, 2),
            'progress' => round($progress, 2),
            'speed' => round($normalizedSpeed, 2),
            'finalScore' => $finalScore,
        ];
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
        $participants = Participant::where('status', 'pending')
            ->orderBy('id')
            ->get(['id', 'full_name']);
        $stepParticipant = Participant::where('current_step', '!=', 'info_session')
            ->where('current_step', 'not like', '%school%')
            ->where('current_step', 'not like', '%failed%')
            ->orderBy('id')
            ->get(['id', 'full_name', 'current_step']);

        // Fetch other registrations for the same person across other promos/sessions
        // Match by exact email OR by name case-insensitively, including swapped first/last names
        $normalizedName = strtolower(trim(preg_replace('/\s+/', ' ', (string) $participant->full_name)));
        $nameParts = array_values(array_filter(explode(' ', $normalizedName)));
        $candidateNames = [$normalizedName];
        if (count($nameParts) >= 2) {
            $first = $nameParts[0];
            $last = $nameParts[count($nameParts) - 1];
            $candidateNames[] = trim($last . ' ' . $first);
            $candidateNames[] = trim($first . ' ' . $last);
        }
        $candidateNames = array_values(array_unique($candidateNames));

        $otherProfiles = Participant::with('infoSession')
            ->where('id', '!=', $participant->id)
            ->where(function ($q) use ($participant, $candidateNames) {
                $q->where('email', $participant->email);
                if (!empty($candidateNames)) {
                    $placeholders = implode(',', array_fill(0, count($candidateNames), '?'));
                    $q->orWhereRaw('LOWER(full_name) IN (' . $placeholders . ')', $candidateNames);
                }
            })
            ->orderBy('created_at', 'desc')
            ->get(['id', 'info_session_id', 'current_step', 'status', 'created_at']);

        return Inertia::render('admin/participants/[id]', [
            'participant' => $participant->load([
                'infoSession',
                'notes',
                'questions',
                'satisfaction',
                'confirmation'
            ]),
            'participants' => $participants,
            'stepParticipant' => $stepParticipant,
            'otherProfiles' => $otherProfiles,
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
            'region' => 'nullable|string',
            'session' => 'required|exists:info_sessions,id',
            'step' => 'required|string|in:info_session,interview,interview_pending,interview_failed,jungle,jungle_failed,coding_school,media_school',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif48',
            "fomation_field" => 'nullable|string|in:coding,media',
        ], $messages);


        try {
            $updateData = [
                'full_name' => $request->full_name,
                'email' => $request->email,
                'birthday' => $request->birthday,
                'phone' => $request->phone,
                'city' => $request->city,
                'region' => $request->region,
                'info_session_id' => $request->session,
                'current_step' => $request->step,
                'formation_field' => $request->formation_field,
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
    public function destroy($id)
    {
        $participant = Participant::findOrFail($id);

        if ($participant->image && Storage::exists('public/images/participants/' . $participant->image)) {
            Storage::delete('public/images/participants/' . $participant->image);
        }

        $participant->delete();

        return redirect()->route('participants.index')
            ->with('success', 'Participant deleted successfully!');
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
                'previous_step' => $participant->current_step,
                'current_step' => 'interview_pending',
                'last_step_changed_by' => Auth::id(),
                'last_step_changed_at' => now()
            ]);
            // return $request->header('X-Inertia') ? response()->noContent() : back();
            return back()->with('success', 'Step updated');
        }

        if ($participant->current_step == "interview" || $participant->current_step == "interview_pending") {
            $participant->update([
                'previous_step' => $participant->current_step,
                "current_step" => $action == "next" ? "jungle" : "interview_failed",
                'last_step_changed_by' => Auth::id(),
                'last_step_changed_at' => now()
            ]);
            // return $request->header('X-Inertia') ? response()->noContent() : back();
            return back()->with('success', 'Step updated');
        } elseif ($participant->current_step == "jungle") {
            $participant->update([
                'previous_step' => $participant->current_step,
                "current_step" => $action == "next" ? $school : "jungle" . "_failed",
                'last_step_changed_by' => Auth::id(),
                'last_step_changed_at' => now()
            ]);
            return back()->with('success', 'Step updated');
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

    /**
     * Update a specific admin note.
     */
    public function updateNote(Request $request, Note $note)
    {
        // Only the creator of the note can edit it
        if (!Auth::check() || (string) $note->author !== (string) Auth::user()->name) {
            return back();
        }
        $request->validate([
            'note' => 'required|string',
        ]);
        $note->update(['note' => $request->note]);
        return back();
    }

    /**
     * Delete a specific admin note.
     */
    public function deleteNote(Note $note)
    {
        // Only the creator of the note can delete it
        if (!Auth::check() || (string) $note->author !== (string) Auth::user()->name) {
            return back();
        }
        $note->delete();
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
                $emailRecipient = 'media@mylionsgeek.ma';
            } elseif ($formationType == 'Coding') {
                $emailRecipient = 'coding@mylionsgeek.ma';
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
        try {
            $infoSession = InfoSession::where('id', $request->query('infosession_id'))->first();
            $traning = $infoSession->formation;
            if ($traning == 'Media') {
                $emailRecipient = 'media@mylionsgeek.ma';
            } elseif ($traning == 'Coding') {
                $emailRecipient = 'coding@mylionsgeek.ma';
            }

            $candidats = Participant::where('current_step', 'jungle')->where('info_session_id', $request->query('infosession_id'))->get();
            $day = $request->query('date');

            $successCount = 0;
            $errorCount = 0;

            foreach ($candidats as $candidat) {
                try {
                    // Validate email address
                    if (!filter_var($candidat->email, FILTER_VALIDATE_EMAIL)) {
                        Log::warning("Invalid email address for participant {$candidat->id}: {$candidat->email}");
                        $errorCount++;
                        continue;
                    }

                    $id = Crypt::encryptString($candidat->id);
                    Mail::mailer($emailRecipient)->to($candidat->email)->queue(new JungleMail($candidat->full_name, $id, $day, $traning));
                    $successCount++;

                    Log::info("Jungle email queued for participant {$candidat->id} ({$candidat->email})");
                } catch (\Exception $e) {
                    Log::error("Failed to queue jungle email for participant {$candidat->id}: " . $e->getMessage());
                    $errorCount++;
                }
            }

            if ($successCount > 0) {
                flash()
                    ->option('position', 'bottom-right')
                    ->success("Successfully queued {$successCount} jungle emails.");
            }

            if ($errorCount > 0) {
                flash()
                    ->option('position', 'bottom-right')
                    ->warning("{$errorCount} emails failed to queue. Check logs for details.");
            }
        } catch (\Exception $e) {
            Log::error("Error in toJungle function: " . $e->getMessage());
            flash()
                ->option('position', 'bottom-right')
                ->error("Failed to send jungle emails. Please try again.");
        }

        return back();
    }
    public function toSchool(Request $request)
    {
        try {
            $candidats = Participant::where('info_session_id', $request->query('infosession_id'))
                ->where(function ($query) {
                    $query->where('current_step', 'coding_school')
                        ->orWhere('current_step', 'media_school');
                })
                ->get();
            // If "Send" button is clicked, validate that a date is provided
            // If "Send Without Date" button is clicked, set date to null
            $day = $request->query('submit_without_date') ? null : $request->query('date');

            $successCount = 0;
            $errorCount = 0;

            foreach ($candidats as $candidat) {
                try {
                    // Validate email address
                    if (!filter_var($candidat->email, FILTER_VALIDATE_EMAIL)) {
                        Log::warning("Invalid email address for participant {$candidat->id}: {$candidat->email}");
                        $errorCount++;
                        continue;
                    }

                    $school = $candidat->current_step == "coding_school" ? "coding" : "media";
                    $id = Crypt::encryptString($candidat->id);
                    $mailer = $school == 'Coding' ? 'coding@mylionsgeek.ma' : ($school == 'Media' && 'media@mylionsgeek.ma');
                    Mail::mailer($mailer)->to($candidat->email)->queue(new SchoolMail($candidat->full_name, $id, $day, $school));
                    $successCount++;

                    Log::info("School email queued for participant {$candidat->id} ({$candidat->email})");
                } catch (\Exception $e) {
                    Log::error("Failed to queue school email for participant {$candidat->id}: " . $e->getMessage());
                    $errorCount++;
                }
            }

            if ($successCount > 0) {
                flash()
                    ->option('position', 'bottom-right')
                    ->success("Successfully queued {$successCount} school emails.");
            }

            if ($errorCount > 0) {
                flash()
                    ->option('position', 'bottom-right')
                    ->warning("{$errorCount} emails failed to queue. Check logs for details.");
            }
        } catch (\Exception $e) {
            Log::error("Error in toSchool function: " . $e->getMessage());
            flash()
                ->option('position', 'bottom-right')
                ->error("Failed to send school emails. Please try again.");
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

                // Robust, timezone-aware, case-insensitive session fetch for emails
                $todayTz = \Carbon\Carbon::now(config('app.timezone'))->toDateString();
                $sessions = \App\Models\InfoSession::query()
                    ->whereRaw('LOWER(formation) = ?', [$formation === 'coding' ? 'coding' : 'media'])
                    ->where('isAvailable', true)
                    ->where('isFinish', false)
                    ->where('isFull', false)
                    ->whereDate('start_date', '>=', $todayTz)
                    ->orderBy('start_date', 'asc')
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

            // Check if already reserved any session
            if ($participant->info_session_id) {
                // If already reserved a different session, block
                if ($participant->info_session_id !== $session->id) {
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

                // If already reserved THIS session, show success without sending another email
                if ($participant->info_session_id === $session->id) {
                    return Inertia::render('client/infoSession/ReservationResult', [
                        'type' => 'success',
                        'title' => [
                            'en' => 'Already Reserved',
                            'fr' => 'Déjà réservé',
                            'ar' => 'تم الحجز مسبقًا',
                        ],
                        'message' => [
                            'en' => 'You have already reserved this info session. Check your email for the QR code.',
                            'fr' => 'Vous avez déjà réservé cette séance d\'information. Vérifiez votre email pour le code QR.',
                            'ar' => 'لقد حجزت هذه الجلسة بالفعل. تحقق من بريدك الإلكتروني للحصول على رمز QR.'
                        ],
                        'redirectUrl' => config('app.url')
                    ]);
                }
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
                    "code" => $participant->code,
                    "email" => $participant->email,
                ]);

                // Generate QR to a temporary file to avoid binary output leaking into the response
                $qrTempPath = storage_path('app/qr_' . $participant->id . '_' . time() . '.png');
                QRCode::text($qrPayload)->setOutfile($qrTempPath)->png();
                $qrBinary = is_file($qrTempPath) ? file_get_contents($qrTempPath) : '';
                if (is_file($qrTempPath)) {
                    @unlink($qrTempPath);
                }
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


    public function sendReminder()
    {
        $step = request()->step;

        $participants = Participant::where('current_step', $step)
            ->whereBetween('created_at', [now()->subMonth(), now()])
            ->where("formation_field", "coding")
            ->get();

        dd($participants);
    }
}
