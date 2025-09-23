<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Event extends Model
{
    protected $fillable = [
        "name",
        "description",
        "date",
        "capacity",
        "cover",
        "location",
        "is_private",
        "private_url_token",
        "token_generated_at",
    ] ;

    protected $casts = [
        'name' => 'array',
        'description' => 'array',
        'is_private' => 'boolean',
        'token_generated_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($event) {
            if ($event->is_private && empty($event->private_url_token)) {
                $event->private_url_token = self::generateUrlToken();
                $event->token_generated_at = now();
            }
        });

        static::updating(function ($event) {
            if ($event->is_private && empty($event->private_url_token)) {
                $event->private_url_token = self::generateUrlToken();
                $event->token_generated_at = now();
            }
        });
    }

    public function attendances()
    {
        return $this->belongsToMany(Attendence::class,'reservations');
    }
    public function bookings()
    {
        return $this->hasMany(booking::class);
    }

    /**
     * Generate a unique URL token for private events.
     */
    public static function generateUrlToken()
    {
        do {
            $token = Str::random(32);
        } while (self::where('private_url_token', $token)->exists());
        return $token;
    }

    /**
     * Find an event by its private URL token.
     */
    public static function findByToken($token)
    {
        $event = self::where('private_url_token', $token)
            ->where('is_private', true)
            ->first();

        if ($event) {
            $event->regenerateTokenIfExpired();
        }

        return $event;
    }

    /**
     * Regenerate the private URL token manually.
     */
    public function regenerateUrlToken()
    {
        $this->update([
            'private_url_token' => self::generateUrlToken(),
            'token_generated_at' => now(),
        ]);
        return $this->private_url_token;
    }

    /**
     * Regenerate the token if it has expired.
     */
    public function regenerateTokenIfExpired()
    {
        $tokenTime = $this->token_generated_at ? new \DateTime($this->token_generated_at) : null;
        $nowMinusMonth = new \DateTime('-1 month');

        if (!$tokenTime || $tokenTime < $nowMinusMonth) {
            $this->update([
                'private_url_token' => self::generateUrlToken(),
                'token_generated_at' => now(),
            ]);
        }

        return $this->private_url_token;
    }
}