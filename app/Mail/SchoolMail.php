<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SchoolMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public $full_name, public $id, public $day, public $school)
    {
        $this->full_name = $full_name;
        $this->day = $day;
        $this->school = $school;
        $this->id = $id;
    }
    /**
     */
    public function build()
    {
        $fromEmail = match (strtolower($this->school)) {
            'coding' => 'coding@mylionsgeek.ma',
            'media'  => 'media@mylionsgeek.ma',
            default  => config('mail.from.address'),
        };

        return $this->from($fromEmail, 'LionsGeek School')
            ->subject('LionsGeek School Invitation')
            ->view($this->day ? 'maizzlMails.schoolMail' : 'maizzlMails.schoolMail2')
            ->with([
                'full_name' => $this->full_name,
                'day'       => $this->day,
                'school'    => $this->school,
                'id'        => $this->id,
            ]);
    }
}
