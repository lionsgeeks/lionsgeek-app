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
    public $attachments;

    public function __construct($subject, $content, $sender = null, $attachments = [])
    {
        $this->subjectLine = $subject;
        $this->contentBody = $content;
        $this->senderEmail = $sender ? $sender . '@lionsgeek.ma' : 'hello@lionsgeek.ma';
        $this->attachments = $attachments;
    }

    public function build()
    {
        $email = $this->subject($this->subjectLine)
                    ->view('emails.custom-email')
                    ->with([
                        'subjectLine' => $this->subjectLine,
                        'contentBody' => $this->contentBody,
                        'senderEmail' => $this->senderEmail,
                        'attachments' => $this->attachments,
                    ]);

        if (!empty($this->attachments)) {
            foreach ($this->attachments as $attachment) {
                if (isset($attachment['path']) && file_exists($attachment['path'])) {
                    $email->attach($attachment['path'], [
                        'as' => $attachment['name'],
                        'mime' => $attachment['mime'] ?? null
                    ]);
                }
            }
        }

        return $email;
    }
}
