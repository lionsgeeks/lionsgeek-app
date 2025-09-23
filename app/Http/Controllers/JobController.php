<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index()
    {
        $pending = DB::table('jobs')->get();
        $failed  = DB::table('failed_jobs')->get();

        return Inertia::render('admin/jobs/index', [
            'pending' => $pending,
            'failed'  => $failed,
        ]);
    }

    public function startWorker()
    {
        $phpPath  = PHP_BINARY; // auto-detect PHP path (works on both Windows & Linux)
        $artisan  = base_path('artisan');

        if (strncasecmp(PHP_OS, 'WIN', 3) === 0) {
            // Windows: use "start /B"
            pclose(popen("start /B \"\" \"$phpPath\" \"$artisan\" queue:work --timeout=60", "r"));
        } else {
            // Linux/Mac: use nohup
            exec("nohup $phpPath $artisan queue:work --timeout=60 > /dev/null 2>&1 &");
        }

        return back()->with('success', 'Queue worker started.');
    }

    public function stopWorker()
    {
        if (strncasecmp(PHP_OS, 'WIN', 3) === 0) {
            // Kill all php.exe processes (⚠️ will stop other PHP scripts too)
            exec('taskkill /F /IM php.exe /T');
        } else {
            // Kill all "php artisan queue:work" processes
            exec('pkill -f "php artisan queue:work"');
        }

        return back()->with('success', 'Queue worker stopped.');
    }

    public function retryFailed($id)
    {
        Artisan::call('queue:retry', ['id' => $id]);

        return back()->with('success', "Job #{$id} retried.");
    }

    public function deleteFailed($id)
    {
        Artisan::call('queue:forget', ['id' => $id]);

        return back()->with('success', "Job #{$id} deleted.");
    }

    public function resetAll()
    {
        // Flush all failed jobs
        Artisan::call('queue:flush');

        return back()->with('success', 'All failed jobs have been reset.');
    }
}
