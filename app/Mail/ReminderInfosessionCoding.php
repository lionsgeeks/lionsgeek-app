<?php

namespace App\Mail;

use App\Models\Participant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReminderInfosessionCoding extends Mailable
{
    use Queueable, SerializesModels;

    public $participant;
    public $sessions;
    /**
     * Create a new message instance.
     */
    public function __construct(Participant $participant, $sessions)
    {
        //
        $this->participant = $participant;
        $this->sessions = $sessions;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reminder Infosession Coding',
            from: new \Illuminate\Mail\Mailables\Address('coding@lionsgeek.ma', 'LionsGeek Coding Team'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.reminder-infossesion-coding',
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
