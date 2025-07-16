<?php

namespace App\Mail;

use App\Models\booking;
use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;
    public $event;

    /**
     * Create a new message instance.
     */
    public function __construct(booking $booking, Event $event)
    {
        $this->booking = $booking;
        $this->event = $event;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Event Booking Confirmation - ' . $this->getEventName(),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-confirmation',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    /**
     * Get event name in English (fallback to other languages)
     */
    private function getEventName(): string
    {
        if (is_array($this->event->name)) {
            return $this->event->name['en'] ?? $this->event->name['fr'] ?? $this->event->name['ar'] ?? 'Event';
        }
        return $this->event->name ?? 'Event';
    }
}
