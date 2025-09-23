<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class JungleMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $full_name;
    public $day;
    public $traning;
    public $id;
    public function __construct($full_name, $id, $day, $traning)
    {
        $this->full_name = $full_name;
        $this->day = $day;
        $this->traning = $traning;
        $this->id = $id;
    }
    public function build()
    {
        $fromEmail = match (strtolower($this->traning)) {
            'coding' => 'coding@mylionsgeek.ma',
            'media'  => 'media@mylionsgeek.ma',
            default  => config('mail.from.address'),
        };

        return $this->from($fromEmail, 'LionsGeek Jungle')
            ->subject('Invitation to Jungle')
            ->view('maizzlMails.jungleMail')
            ->with([
                'full_name' => $this->full_name,
                'day'       => $this->day,
                'traning'   => $this->traning,
                'id'        => $this->id,
            ]);
    }
}
