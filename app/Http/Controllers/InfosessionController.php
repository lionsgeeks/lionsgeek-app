<?php

namespace App\Http\Controllers;

use App\Models\InfoSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InfosessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $infosessions = InfoSession::withCount('participants')->get();
        return Inertia::render('admin/infoSessions/index', [
            'infosessions' => $infosessions
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
        // dd();
        try {
            $request->validate([
                'name' => 'required',
                'formation' => 'required',
                'start_date' => 'required',
                'places' => 'required',
                'is_private' => 'boolean',
            ]);
            InfoSession::create([
                'name' => strtolower($request->name),
                'formation' => $request->formation,
                'start_date' => $request->start_date,
                'places' => $request->places,
                'is_private' => $request->boolean('is_private', false),
                'isAvailable' => true, // Make sessions available by default
            ]);
            return back();
        } catch (\Throwable $th) {
            //throw $th;
            return back();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $infosession = InfoSession::where('id', $id)->with('allParticipants.confirmation')->first();

        // Alias allParticipants as participants for frontend compatibility
        if ($infosession) {
            $infosession->participants = $infosession->allParticipants;
        }

        return Inertia::render('admin/infoSessions/[id]', [
            'infosession' => $infosession
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
    public function update(Request $request,  $id)
    {
        $infoSession = InfoSession::where('id', $id)->first();
        $request->validate([
            'name' => 'required',
            'formation' => 'required',
            'start_date' => 'required',
            'places' => 'required',
        ]);
        $infoSession->update([
            'name' => $request->name,
            'formation' => $request->formation,
            'start_date' => $request->start_date,
            'places' => $request->places,
        ]);
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $infosession = InfoSession::where('id', $id)->first();
            if (!$infosession) {
                return back();
            }

            // Delete related participants (all of them)
            $infosession->allParticipants()->delete();

            // Delete the info session
            $infosession->delete();

            return back();
        } catch (\Throwable $th) {
            return back();
        }
    }
    public function availabilityStatus($id)
    {
        try {
            //code...
            $infosession = InfoSession::where('id', $id)->first();
            $infosession->update([
                'isAvailable' => !$infosession->isAvailable
            ]);
            return back();
        } catch (\Throwable $th) {
            //throw $th;
            return back();
        }
    }
    public function completeStatus($id)
    {
        try {
            $infosession = InfoSession::where('id', $id)->first();



            $newFinishStatus = !$infosession->isFinish;

            $infosession->update([
                'isAvailable' => $newFinishStatus ? false : $infosession->isAvailable,
                'isFinish' => $newFinishStatus
            ]);

            $infosession->refresh();

            $message = $infosession->isFinish
                ? 'Session has been marked as completed'
                : 'Session has been marked as incomplete';

            $messageType = $infosession->isFinish ? 'success' : 'info';

            return back()->with($messageType, $message);
        } catch (\Throwable $th) {
            //throw $th;
            return back();
        }
    }

    /**
     * Show infosession by private URL token
     */
    public function showByToken($token)
    {
        $infoSession = InfoSession::findByToken($token);

        if (!$infoSession) {
            abort(404, 'Private session not found or inactive');
        }

        return Inertia::render('client/infoSession/index', [
            'sessions' => [$infoSession],
            'formation_field' => strtolower($infoSession->formation),
            'privatesession' => true,
            'private_token' => $token
        ]);
    }

    /**
     * Regenerate private URL token for an infosession
     */
    public function regenerateToken(InfoSession $infosession)
    {
        try {
            if (!$infosession->is_private) {
                return back()->withErrors(['error' => 'This is not a private session']);
            }

            $newToken = $infosession->regenerateUrlToken();

            return back()->with('success', 'Private URL regenerated successfully');
        } catch (\Throwable $th) {
            return back()->withErrors(['error' => 'Failed to regenerate URL']);
        }
    }
}
