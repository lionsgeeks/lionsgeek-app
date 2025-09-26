<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class General extends Model
{

    protected $fillable = [
        'views',
        'darkmode',
        'tablemode',
        'token'
    ];

    /**
     * Increment website visit counter safely.
     */
    public static function trackVisit(): void
    {
        try {
            $row = static::firstOrCreate(['id' => 1], ['views' => 0]);
            $row->increment('views');
        } catch (\Throwable $th) {
            // Swallow errors to avoid impacting UX
        }
    }
}
