<?php

namespace App\Mail;

use App\Models\Booking;
use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;

class BookingConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;
    public $event;
    public $qrCodeBase64;

    /**
     * Create a new message instance.
     */
    public function __construct(Booking $booking, Event $event, $qrCodeBase64)
    {
        $this->booking = $booking;
        $this->event = $event;
        $this->qrCodeBase64 = $qrCodeBase64;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        // Ensure event name is handled correctly for multilingual
        $eventName = is_array($this->event->name) ? ($this->event->name['en'] ?? $this->event->name['fr'] ?? $this->event->name['ar'] ?? 'Event') : $this->event->name;

        return new Envelope(
            subject: 'Event Booking Confirmation - ' . $eventName,
            from: new \Illuminate\Mail\Mailables\Address('info@lionsgeek.ma', 'LionsGeek'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-confirmation',
            with: [
                'booking' => $this->booking,
                'event' => $this->event,
                'qrCode' => $this->qrCodeBase64,
                // Also pass event details for convenience in the view
                'eventName' => is_array($this->event->name) ? ($this->event->name['en'] ?? $this->event->name['fr'] ?? $this->event->name['ar'] ?? 'Event') : $this->event->name,
                'eventDescription' => is_array($this->event->description) ? ($this->event->description['en'] ?? $this->event->description['fr'] ?? $this->event->description['ar'] ?? 'No description') : $this->event->description,
                'eventDate' => $this->event->date,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // Attach the QR code image directly
        return [
            Attachment::fromData(fn () => base64_decode($this->qrCodeBase64), 'qr_code.png')
                ->withMime('image/png'),
        ];
    }
}