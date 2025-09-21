<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class InfoSession extends Model
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory;

    protected $fillable = [
        'name',
        'formation',
        'start_date',
        'isAvailable',
        "isFull",
        'isFinish',
        'places',
        'private_url_token',
        'is_private',
        'token_generated_at', 
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'isAvailable' => 'boolean',
        'isFull' => 'boolean',
        'isFinish' => 'boolean',
        'is_private' => 'boolean',
        'token_generated_at' => 'datetime', 
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($infoSession) {
            if ($infoSession->is_private && empty($infoSession->private_url_token)) {
                $infoSession->private_url_token = self::generateUrlToken();
                $infoSession->token_generated_at = now(); 
            }
        });

        static::updating(function ($infoSession) {
            if ($infoSession->is_private && empty($infoSession->private_url_token)) {
                $infoSession->private_url_token = self::generateUrlToken();
                $infoSession->token_generated_at = now();
            }
        });
    }

    public function participants()
    {
        return $this->hasMany(Participant::class)->where('status', Participant::STATUS_APPROVED);
    }

    public function allParticipants()
    {
        return $this->hasMany(Participant::class);
    }

    public function pendingParticipants()
    {
        return $this->hasMany(Participant::class)->where('status', Participant::STATUS_PENDING);
    }

    public function rejectedParticipants()
    {
        return $this->hasMany(Participant::class)->where('status', Participant::STATUS_REJECTED);
    }

    /**
     * Generate a unique URL token for private sessions
     */
    public static function generateUrlToken()
    {
        do {
            $token = Str::random(32);
        } while (self::where('private_url_token', $token)->exists());
        return $token;
    }

    /**
     * Find an infosession by its private URL token
     */
    public static function findByToken($token)
    {
        $session = self::where('private_url_token', $token)
            ->where('is_private', true)
            ->where('isAvailable', true)
            ->first();

        if ($session) {
            $session->regenerateTokenIfExpired();
        }

        return $session;
    }

    /**
     * Regenerate the private URL token manually
     */
    public function regenerateUrlToken()
    {
        $this->update([
            'private_url_token' => self::generateUrlToken(),
            'token_generated_at' => now(),
        ]);
        return $this->private_url_token;
    }

    public function regenerateTokenIfExpired()
    {
        $tokenTime = $this->token_generated_at ? new \DateTime($this->token_generated_at) : null;
        // $nowMinusMonth = new \DateTime('-1 minute'); 
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
