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
        'is_private'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'isAvailable' => 'boolean',
        'isFull' => 'boolean',
        'isFinish' => 'boolean',
        'is_private' => 'boolean'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($infoSession) {
            if ($infoSession->is_private && empty($infoSession->private_url_token)) {
                $infoSession->private_url_token = self::generateUrlToken();
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
        return self::where('private_url_token', $token)
            ->where('is_private', true)
            ->where('isAvailable', true)
            ->first();
    }

    /**
     * Regenerate the private URL token
     */
    public function regenerateUrlToken()
    {
        $this->update(['private_url_token' => self::generateUrlToken()]);
        return $this->private_url_token;
    }
}
