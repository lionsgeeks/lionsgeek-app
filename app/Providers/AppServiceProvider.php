<?php

namespace App\Providers;

use App\Models\Contact;
use App\Models\Coworking;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'selectedLanguage' => session('language', 'en'),
            // Flasher messages
            'messages' => fn () => session()->get('flasher')
        ]);

        Inertia::share('notifications', function () {
            $contacts = Contact::where('mark_as_read', false)
                ->get()
                ->map(fn($c) => [
                    'id' => $c->id,
                    'type' => 'contact',
                    'full_name' => $c->full_name,
                    'message' => $c->message,
                    'created_at' => $c->created_at,
                ]);

            $coworking = Coworking::latest()->take(3)->get()
                ->map(fn($c) => [
                    'id' => $c->id,
                    'type' => 'coworking',
                    'full_name' => $c->full_name,
                    'proj_name' => $c->proj_name,
                    'created_at' => $c->created_at,
                ]);

            return $contacts->merge($coworking)->sortByDesc('created_at')->values();
        });
    }
}
