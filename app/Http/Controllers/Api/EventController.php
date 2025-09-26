<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Event;
use App\Models\General;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EventController extends Controller
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

        $events = Event::orderBy('created_at', 'desc')->get();

        return response()->json($events);
    }

    public function upcoming(Request $request): JsonResponse
    {
        // if (! $this->checkToken($request)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        $timeNow = now();
        $upcomingEvents = Event::where('date', '>', $timeNow)
            ->orderBy('date')
            ->first();

        $latestEvent = Event::latest('date')->first();

        return response()->json([
            'upcoming' => $upcomingEvents,
            'latest' => $latestEvent ? $latestEvent->toArray() : null,
        ]);
    }

    public function show(Request $request, Event $event): JsonResponse
    {
        // if (! $this->checkToken($request)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        $participants = Booking::where('event_id', $event->id)->get();

        return response()->json([
            'event' => $event,
            'participants' => $participants,
        ]);
    }

    public function validateParticipant(Request $request): JsonResponse
    {
        // if (! $this->checkToken($request)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        $request->validate([
            'email' => 'required|email',
            'code'  => 'required|integer',
            'id'    => 'required|integer', // event id from current page
        ]);

        // First check if the scanned QR code event == current event
        if ((int) $request->id !== (int) $request->code) {
            return response()->json([
                'message' => 'Participant belongs to another event',
                'status'  => 200,
            ]);
        }

        // Now check participant
        $participant = Booking::where('email', $request->email)
            ->where('event_id', $request->id)
            ->first();

        if (! $participant) {
            return response()->json([
                'message' => 'No such participant.',
                'status'  => 200,
            ]);
        }

        if ($participant->is_visited) {
            return response()->json([
                'message' => 'Already participated.',
                'status'  => 200,
                'profile' => $participant,
            ]);
        }

        // mark visited
        $participant->is_visited = true;
        $participant->save();

        return response()->json([
            'message' => 'Credentials match.',
            'status'  => 200,
            'profile' => $participant,
        ]);
    }
}
