<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        "name",
        "email",
        "phone",
        "gender",
        "event_id"
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
