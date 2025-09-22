<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Mail\InfoSessionCodingReminderMail;
use App\Mail\InfoSessionMediaReminderMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendInfoSessionReminderJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $participant;

    public function __construct(User $participant)
    {
        $this->participant = $participant;
    }

    public function handle()
    {
        try {
            $track = $this->getParticipantTrack();
            
            Log::info("Processing reminder for: " . $this->participant->email . " (Track: {$track})");
            
            switch($track) {
                case 'coding':
                    Mail::to($this->participant->email)
                        ->send(new InfoSessionCodingReminderMail($this->participant));
                    Log::info("✅ Coding info session reminder sent to: " . $this->participant->email);
                    break;
                    
                case 'media':
                    Mail::to($this->participant->email)
                        ->send(new InfoSessionMediaReminderMail($this->participant));
                    Log::info("✅ Media info session reminder sent to: " . $this->participant->email);
                    break;
                    
                default:
                    Mail::to($this->participant->email)
                        ->send(new InfoSessionCodingReminderMail($this->participant));
                    Log::info("✅ Default coding reminder sent to: " . $this->participant->email);
            }
            
        } catch (\Exception $e) {
            Log::error("❌ Failed to send info session reminder: " . $e->getMessage());
            throw $e;
        }
    }

    private function getParticipantTrack()
    {
        $formationField = strtolower($this->participant->formation_field ?? '');
        if (strpos($formationField, 'coding') !== false) return 'coding';
        if (strpos($formationField, 'media') !== false) return 'media';
        
        if ($this->participant->info_session) {
            $sessionFormation = strtolower($this->participant->info_session->formation ?? '');
            if (strpos($sessionFormation, 'coding') !== false) return 'coding';
            if (strpos($sessionFormation, 'media') !== false) return 'media';
            
            $sessionName = strtolower($this->participant->info_session->name ?? '');
            if (strpos($sessionName, 'coding') !== false) return 'coding';
            if (strpos($sessionName, 'media') !== false) return 'media';
        }
        
        return 'coding';
    }
}
