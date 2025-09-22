<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Jobs\SendInfoSessionReminderJob;

class SendInfoSessionRemindersCommand extends Command
{
    protected $signature = 'reminders:info-session 
                          {--delay=0 : Delay in minutes} 
                          {--dry-run : Preview without sending}
                          {--track= : Filter by track (coding/media)}
                          {--limit=100 : Maximum participants to process}';
    
    protected $description = 'Send info session reminders to participants who haven\'t selected a session';

    public function handle()
    {
        $delay = (int) $this->option('delay');
        $dryRun = $this->option('dry-run');
        $track = $this->option('track');
        $limit = (int) $this->option('limit');
        
        $this->info('🔍 Searching for participants without info session...');
        
        $query = User::whereNull('info_session_id')
                    ->where('status', 'pending');
        
        if ($track) {
            $query->where('formation_field', 'LIKE', '%' . $track . '%');
            $this->info("🎯 Filtering by track: {$track}");
        }
        
        $participants = $query->limit($limit)->get();
        
        if ($participants->isEmpty()) {
            $this->warn('❌ No participants found without info session selection.');
            return 0;
        }
        
        $this->info("✅ Found {$participants->count()} participants");
        
        $tableData = $participants->map(function($p) {
            return [
                'Name' => $p->full_name,
                'Email' => $p->email,
                'Track' => $p->formation_field ?? 'Not specified',
                'Status' => $p->status,
                'Created' => $p->created_at->format('Y-m-d H:i')
            ];
        })->toArray();
        
        $this->table(['Name', 'Email', 'Track', 'Status', 'Created'], $tableData);
        
        if ($dryRun) {
            $this->info('🔍 DRY RUN: No emails will be sent.');
            return 0;
        }
        
        if (!$this->confirm("📧 Send reminders to {$participants->count()} participants?")) {
            $this->info('❌ Operation cancelled.');
            return 0;
        }
        
        if ($delay > 0) {
            $this->info("⏰ Scheduling reminders with {$delay} minutes delay...");
        } else {
            $this->info("🚀 Sending reminders immediately...");
        }
        
        $bar = $this->output->createProgressBar($participants->count());
        $bar->start();
        
        foreach ($participants as $participant) {
            if ($delay > 0) {
                SendInfoSessionReminderJob::dispatch($participant)
                    ->delay(now()->addMinutes($delay));
            } else {
                SendInfoSessionReminderJob::dispatch($participant);
            }
            $bar->advance();
        }
        
        $bar->finish();
        $this->newLine();
        
        if ($delay > 0) {
            $this->info("✅ {$participants->count()} reminders scheduled to be sent in {$delay} minutes!");
            $this->info("💡 Run 'php artisan queue:work' to process the jobs.");
        } else {
            $this->info("✅ {$participants->count()} reminders dispatched to queue!");
            $this->info("💡 Run 'php artisan queue:work' to process the jobs immediately.");
        }
        
        return 0;
    }
}
