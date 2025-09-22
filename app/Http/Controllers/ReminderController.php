<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Jobs\SendInfoSessionReminderJob;
use Illuminate\Support\Facades\Log;

class ReminderController extends Controller
{
    public function sendReminder(Request $request)
    {
    
        
        
        $participants = User::whereIn('id', $request->participants)->get();
        $delayMinutes = $validated['delay_minutes'] ?? 0;
        $sendImmediately = $validated['send_immediately'] ?? true;
        
        dd($participants);
        if ($participants->isEmpty()) {
            return back()->with('error', 'No participants found!');
        }

        Log::info("Processing {$validated['reminder_type']} reminder for {$participants->count()} participants");

        $jobsDispatched = 0;
        
        foreach ($participants as $participant) {
            switch($validated['reminder_type']) {
                case 'info_session':
                    if ($sendImmediately || $delayMinutes == 0) {
                        SendInfoSessionReminderJob::dispatch($participant);
                    } else {
                        SendInfoSessionReminderJob::dispatch($participant)
                            ->delay(now()->addMinutes($delayMinutes));
                    }
                    $jobsDispatched++;
                    break;
                    
                case 'jungle':
                    Log::info("Jungle reminder for: " . $participant->email);
                    break;
                    
                case 'school':
                    Log::info("School reminder for: " . $participant->email);
                    break;
            }
        }

        $message = $sendImmediately || $delayMinutes == 0 
            ? "✅ {$jobsDispatched} reminders dispatched immediately!"
            : "⏰ {$jobsDispatched} reminders scheduled in {$delayMinutes} minutes!";
            
        Log::info($message);
        
        return back()->with('success', $message . " Run 'php artisan queue:work' to process them.");
    }
}
