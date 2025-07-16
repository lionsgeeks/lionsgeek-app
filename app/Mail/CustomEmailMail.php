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

    public function __construct($subject, $content)
    {
        $this->subjectLine = $subject;
        $this->contentBody = $content;
    }

    public function build()
    {
        return $this->subject($this->subjectLine)->html($this->contentBody);
    }
}
