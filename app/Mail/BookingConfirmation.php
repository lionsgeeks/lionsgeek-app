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
use Barryvdh\DomPDF\Facade\Pdf;

class BookingConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;
    public $event;
    public $qrCodeBase64;

    public function __construct(Booking $booking, Event $event, $qrCodeBase64)
    {
        $this->booking = $booking;
        $this->event = $event;
        $this->qrCodeBase64 = $qrCodeBase64;
    }

    public function envelope(): Envelope
    {
        $eventName = is_array($this->event->name)
            ? ($this->event->name['en'] ?? $this->event->name['fr'] ?? $this->event->name['ar'] ?? 'Event')
            : $this->event->name;

        return new Envelope(
            subject: 'Event Booking Confirmation - ' . $eventName,
            from: new \Illuminate\Mail\Mailables\Address('info@lionsgeek.ma', 'LionsGeek'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-confirmation',
            with: [
                'booking' => $this->booking,
                'event' => $this->event,
                'eventName' => is_array($this->event->name) ? ($this->event->name['en'] ?? $this->event->name['fr'] ?? $this->event->name['ar'] ?? 'Event') : $this->event->name,
                'eventDescription' => is_array($this->event->description) ? ($this->event->description['en'] ?? $this->event->description['fr'] ?? $this->event->description['ar'] ?? 'No description') : $this->event->description,
                'eventDate' => $this->event->date,
            ]
        );
    }

    public function attachments(): array
    {
        $pdf = Pdf::loadView('emails.booking', [
            'booking' => $this->booking,
            'event' => $this->event,
            'qrCode' => $this->qrCodeBase64,
            'eventName' => is_array($this->event->name) ? ($this->event->name['en'] ?? $this->event->name['fr'] ?? $this->event->name['ar'] ?? 'Event') : $this->event->name,
            'eventDescription' => is_array($this->event->description) ? ($this->event->description['en'] ?? $this->event->description['fr'] ?? $this->event->description['ar'] ?? 'No description') : $this->event->description,
            'eventDate' => $this->event->date,
        ])->output();

        return [
            Attachment::fromData(fn() => $pdf, 'booking_confirmation.pdf')
                ->withMime('application/pdf'),
        ];
    }
}
