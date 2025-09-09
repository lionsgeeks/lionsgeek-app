<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;

class CodeMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $data;
    public $image;
    
    public function __construct($data, $image)
    {
        $this->data = $data;
        $this->image = $image;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        // Determine the formation field from participant data
        $formationField = $this->data['participant']->formation_field ?? 'general';
        
        return new Envelope(
            subject: 'Invitation to Our Info Session - ' . $this->data['infosession'],
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
            view: 'maizzlMails.infoSessionInvi',
            with: [
                'data' => $this->data,
                'image' => $this->image,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [
            Attachment::fromData(fn () => $this->data['pdf']->output(), 'Qrcode.pdf')
                ->withMime('application/pdf'),
        ];
    }
}
