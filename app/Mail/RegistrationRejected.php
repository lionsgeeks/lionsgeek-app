<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Participant;

class RegistrationRejected extends Mailable
{
    use Queueable, SerializesModels;

    public $participant;

    /**
     * Create a new message instance.
     */
    public function __construct(Participant $participant)
    {
        $this->participant = $participant;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $formationField = $this->participant->formation_field ?? 'general';
        
        return new Envelope(
            subject: 'Registration Update - ' . ucfirst($formationField) . ' Program',
            from: new \Illuminate\Mail\Mailables\Address(
                $formationField === 'coding' ? 'coding@lionsgeek.ma' : 
                ($formationField === 'media' ? 'media@lionsgeek.ma' : 'info@lionsgeek.ma'), 
                $formationField === 'coding' ? 'LionsGeek Coding Team' : 
                ($formationField === 'media' ? 'LionsGeek Media Team' : 'LionsGeek')
            ),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.registration-rejected',
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
