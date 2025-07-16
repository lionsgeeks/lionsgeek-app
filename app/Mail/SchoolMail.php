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
     *! add schoolMail2 email
     */
    public function build()
    {
        return $this->subject('LionsGeek School Invitation')
            ->view($this->day ? 'maizzlMails.schoolMail' : 'maizzlMails.schoolMail2 ')
            ->with([
                'full_name' => $this->full_name,
                'day' => $this->day,
                'school' => $this->school,
                'id' => $this->id,
            ]);
    }
}
