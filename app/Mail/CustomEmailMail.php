<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CustomEmailMail extends Mailable
{
    use Queueable, SerializesModels;

    public $subjectLine;
    public $contentBody;
    public $senderEmail;

    public function __construct($subject, $content, $sender = null)
    {
        $this->subjectLine = $subject;
        $this->contentBody = $content;
        $this->senderEmail = $sender ? $sender . '@lionsgeek.ma' : 'hello@lionsgeek.ma';
    }

    public function build()
    {
        return $this->subject($this->subjectLine)
                    ->view('emails.custom-email')
                    ->with([
                        'subjectLine' => $this->subjectLine,
                        'contentBody' => $this->contentBody,
                        'senderEmail' => $this->senderEmail,
                    ]);
    }
}
