<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Participant;

class RegistrationApprovedCoding extends Mailable
{
    use Queueable, SerializesModels;

    public $participant;
    public $sessions;

    /**
     * Create a new message instance.
     */
    public function __construct(Participant $participant, $sessions)
    {
        $this->participant = $participant;
        $this->sessions = $sessions;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invitation to LionsGeek Coding Program Info Session',
            from: new \Illuminate\Mail\Mailables\Address('coding@lionsgeek.ma', 'LionsGeek Coding Team'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.registration-approved-coding',
            with: [
                'participant' => $this->participant,
                'sessions' => $this->sessions,
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
        return [];
    }
}
