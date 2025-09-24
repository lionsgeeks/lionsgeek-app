<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmation;
use App\Models\Booking;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use LaravelQRCode\Facades\QRCode;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255',
            'phone'    => 'required|string|max:20',
            'gender'   => 'required|string|in:male,female',
            'event_id' => 'required|exists:events,id',
        ]);

        $event = Event::findOrFail($request->event_id);

        if ($event->capacity <= 0) {
            return response()->json([
                'success' => false,
                'message' => [
                    'en' => 'Sorry, this event is fully booked.',
                ]
            ], 422);
        }

        $existingBooking = Booking::where('email', $request->email)
            ->where('event_id', $request->event_id)
            ->first();

        if ($existingBooking) {
            return response()->json([
                'success' => false,
                'message' => [
                    'en' => 'You have already booked this event.',
                ]
            ], 422);
        }

        $booking = Booking::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'phone'    => $request->phone,
            'gender'   => $request->gender,
            'event_id' => $request->event_id,
        ]);

        $event->decrement('capacity');

        // Generate QR code
        $qrPayload = json_encode([
            'booking_id' => $booking->id, // Use booking ID for uniqueness
            'event_id'   => $booking->event_id,
            'email'      => $booking->email,
        ]);

        // Generate QR code image as base64
        ob_start();
        QRCode::text($qrPayload)
            ->setSize(300)
            ->setMargin(10)
            ->setErrorCorrectionLevel('H')
            ->png();
        $qrImage = ob_get_clean();
        $qrBase64 = base64_encode($qrImage);

        // Send confirmation email
        try {
            Mail::to($booking->email)->send(new BookingConfirmation($booking, $event, $qrBase64));
        } catch (\Exception $e) {
            Log::error('Failed to send booking confirmation email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => [
                'en' => 'Booking confirmed! Check your email for confirmation details.',
            ]
        ]);
    }

    /**
     * Verify a booking using the QR code.
     */
    public function verifyBooking($booking_id)
    {
        $booking = Booking::find($booking_id);

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not found.'
            ], 404);
        }

        if ($booking->is_visited) {
            return response()->json([
                'success' => false,
                'message' => 'Booking already visited.'
            ], 409); // Conflict
        }

        $booking->is_visited = true;
        $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Booking verified successfully.',
            'booking' => $booking
        ]);
    }
}
