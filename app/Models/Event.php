<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        "name",
        "description",
        "date",
        "capacity",
        "cover",
        "location",
    ] ;

    protected $casts = [
        'name' => 'array',
        'description' => 'array',
    ];
    public function attendances()
    {
        return $this->belongsToMany(Attendence::class,'reservations');
    }
    public function bookings()
    {
        return $this->hasMany(booking::class);
    }
}
