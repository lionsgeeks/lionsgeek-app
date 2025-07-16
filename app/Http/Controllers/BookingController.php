<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmation;
use App\Models\booking;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'gender' => 'required|string|in:male,female',
            'event_id' => 'required|exists:events,id'
        ]);

        $event = Event::findOrFail($request->event_id);

        // Check if event has capacity (capacity represents remaining spots)
        if ($event->capacity <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, this event is fully booked.'
            ], 422);
        }

        // Check if user already booked this event
        $existingBooking = booking::where('email', $request->email)
            ->where('event_id', $request->event_id)
            ->first();

        if ($existingBooking) {
            return response()->json([
                'success' => false,
                'message' => 'You have already booked this event.'
            ], 422);
        }

        // Create booking
        $booking = booking::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'gender' => $request->gender,
            'event_id' => $request->event_id,
        ]);

        // Decrease event capacity by 1
        $event->decrement('capacity');

        // Send confirmation email
        try {
            Mail::to($request->email)->send(new BookingConfirmation($booking, $event));
        } catch (\Exception $e) {
            // Log the error but don't fail the booking
            Log::error('Failed to send booking confirmation email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Booking confirmed! Check your email for confirmation details.'
        ]);
    }
}
