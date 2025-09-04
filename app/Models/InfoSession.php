<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
        'places'
    ];

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
}
