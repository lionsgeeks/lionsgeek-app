<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\booking;
use App\Models\Event;
use Date;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('created_at', 'desc')->get();
        return response()->json($events);
    }

    public function upcoming()
    {
        $timeNow = now();
        $upcomingEvents = Event::where('date', ">", $timeNow)->orderBy('date')->first();
        $latestEvent = Event::latest('date')->first();
        return response()->json([
            'upcoming' => $upcomingEvents,
            'latest' => $latestEvent ? $latestEvent->toArray() : null
        ]);
    }

    public function show(Event $event)
    {
        $participants = booking::where('event_id', $event->id)->get();
        return response()->json([
            'event' => $event,
            'participants' => $participants
        ]);
    }
    public function validateParticipant(Request $request)
    {
        $request->validate([
            "email" => "required|email",
            "code"  => "required|integer",
            "id"    => "required|integer", // event id from current page
        ]);

        // First check if the scanned QR code event == current event
        if ((int)$request->id !== (int)$request->code) {
            return response()->json([
                "message" => "Participant belong to another event",
                "status"  => 200,
            ]);
        }

        // Now check participant
        $participant = Booking::where("email", $request->email)
            ->where("event_id", $request->id)
            ->first();

        if (!$participant) {
            return response()->json([
                "message" => "No such participant.",
                "status"  => 200,
            ]);
        }

        if ($participant->is_visited) {
            return response()->json([
                "message" => "Already participated.",
                "status"  => 200,
                "profile" => $participant,
            ]);
        }

        // mark visited
        $participant->is_visited = true;
        $participant->save();

        return response()->json([
            "message" => "Credentials match.",
            "status"  => 200,
            "profile" => $participant,
        ]);
    }
}
