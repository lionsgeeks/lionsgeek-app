<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\General;
use App\Models\InfoSession;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class InfoSessionController extends Controller
{
    protected function checkToken(Request $request): bool
    {
        $token = $request->bearerToken();
        $storedToken = General::first()?->token;

        return $token && $storedToken && hash_equals($storedToken, $token);
    }

    public function index(Request $request): JsonResponse
    {
        if (! $this->checkToken($request)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $infos = InfoSession::where('isAvailable', true)
            ->where('isFinish', false)
            ->where('is_private', false)
            ->orderBy('start_date', 'desc')
            ->get();

        return response()->json(['infos' => $infos]);
    }

    public function PrivateSession(Request $request): JsonResponse
    {
        if (! $this->checkToken($request)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $infos = InfoSession::where('isAvailable', true)
            ->where('isFinish', false)
            ->where('is_private', true)
            ->first();

        return response()->json(['infos' => $infos]);
    }

    public function manualChecking(Request $request): JsonResponse
    {
        // if (! $this->checkToken($request)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        $request->validate([
            'id' => 'integer',
        ]);

        $participant = Participant::find($request->id);

        if ($participant) {
            $participant->is_visited = true;
            $participant->current_step = 'interview';
            $participant->save();

            return response()->json([
                'message' => 'manual visite',
                'status' => 200,
                'profile' => $participant,
            ]);
        }

        return response()->json([
            'message' => 'Participant not found',
            'status' => 404,
        ], 404);
    }

    public function validateParticipant(Request $request): JsonResponse
    {
        // if (! $this->checkToken($request)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        $request->validate([
            'email'     => 'required|email',
            'code'      => 'required',
            'sessionId' => 'required|integer', // session id from current page
        ]);

        $participant = Participant::where('email', $request->email)
            ->where('code', $request->code)
            ->first();

        if (! $participant) {
            return response()->json([
                'message' => 'No such participant.',
                'status'  => 200,
            ]);
        }

        if ((int) $participant->info_session_id !== (int) $request->sessionId) {
            return response()->json([
                'message' => 'Participant belongs to another session',
                'status'  => 200,
                'profile' => $participant,
            ]);
        }

        if ($participant->is_visited) {
            return response()->json([
                'message' => 'Already participated.',
                'status'  => 200,
                'profile' => $participant,
            ]);
        }

        $participant->is_visited = true;
        $participant->current_step = 'interview';
        $participant->save();

        return response()->json([
            'message' => 'Credentials match.',
            'status'  => 200,
            'profile' => $participant,
        ]);
    }

    public function infoData(Request $request): JsonResponse
    {
        // if (! $this->checkToken($request)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        $session = InfoSession::find($request->id);

        if (! $session) {
            return response()->json([
                'message' => 'Session not found',
                'status' => 404,
            ], 404);
        }

        $participant = $session->participants()->get();
        $attended = $session->participants()->where('is_visited', 1)->orderBy('updated_at', 'desc')->get();
        $unattended = $session->participants()->where('is_visited', 0)->orderBy('created_at', 'asc')->get();

        return response()->json([
            'session' => $session,
            'participants' => $participant,
            'attended' => $attended,
            'unattended' => $unattended,
        ]);
    }

    public function profileData(Request $request): JsonResponse
    {
        // if (! $this->checkToken($request)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        $profile = Participant::find($request->id);

        if (! $profile) {
            return response()->json([
                'message' => 'Profile not found',
                'status' => 404,
            ], 404);
        }

        return response()->json($profile);
    }

    public function indexLionsgate(Request $request): JsonResponse
    {
        if (! $this->checkToken($request)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $infos = InfoSession::where('name', '!=', 'private session')
            ->orderBy('start_date', 'desc')
            ->get();

        return response()->json(['infos' => $infos]);
    }
}
