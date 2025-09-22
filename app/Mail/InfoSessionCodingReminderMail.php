<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\InfoSession;

class InfoSessionCodingReminderMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $participant;
    public $availableSessions;

    public function __construct(User $participant)
    {
        $this->participant = $participant;
        $this->availableSessions = InfoSession::where('formation', 'LIKE', '%coding%')
            ->where('date', '>', now())
            ->orderBy('date')
            ->get();
    }

    public function build()
    {
        return $this->subject('🖥️ تذكير: اختر جلسة المعلومات - تخصص البرمجة')
            ->view('emails.info-session-coding-reminder')
            ->with([
                'participant' => $this->participant,
                'availableSessions' => $this->availableSessions,
                'selectionUrl' => route('info-session.select', ['type' => 'coding'])
            ]);
    }
}
