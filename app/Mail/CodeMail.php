<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
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
    public function build()
    {
        return $this->subject('Invitation to Our Info Session -' . $this->data['infosession'])
            ->view('maizzlMails.infoSessionInvi')
            ->attachData($this->data['pdf']->output(), 'Qrcode.pdf', [
                'mime' => 'application/pdf',
            ])
            ->with([
                'data' => $this->data,
                'image' => $this->image,
            ]);
    }
}
