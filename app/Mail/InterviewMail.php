<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InterviewMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $full_name;
    public $day;
    public $timeSlot;
    public $date;
    public $exactTime;
    public $course;

    /**
     * Create a new message instance.
     */
    public function __construct($full_name, $day, $timeSlot, $course)
    {
        $this->full_name = $full_name;
        $this->day = $day;
        $this->timeSlot = $timeSlot;
        $carbonInstance = Carbon::parse($timeSlot);
        $this->date = $carbonInstance->toDateString(); // e.g., 2025-01-24
        $this->exactTime = $carbonInstance->format('H:i'); // e.g., 16:44
        $this->course = $course;
    }

    public function build()
    {
        return $this->subject('Invitation to Your Interview at Lionsgeek!')
            ->view('maizzlMails.interviewmail')
            ->with([
                'full_name' => $this->full_name,
                'date' => $this->date,
                'exactTime' => $this->exactTime,
                'course' => $this->course,
            ]);
    }
}
