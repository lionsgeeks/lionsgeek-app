<?php

namespace App\Http\Controllers;

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
use App\Models\Satisfaction;
use Carbon\Carbon;
use DateTime;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $participants = Participant::with(['infoSession', 'confirmation'])->get();
        return Inertia::render('admin/participants/participants', [
            'participants' => $participants,
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

        // ob_start();
        // QRCode::text($jsonData)
        //     ->setErrorCorrectionLevel('H')
        //     ->png();

        // $qrImage = ob_get_clean();
        // $image = base64_encode($qrImage);
        // $pdf = Pdf::loadView('mail.partials.code', compact(['image', 'data']));
        // $data['pdf'] = $pdf;
        //!!!!!! add mail 
        // Mail::to($participant->email)->send(new CodeMail($data, $image));

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
    public function show(string $id)
    {
        //
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
}
