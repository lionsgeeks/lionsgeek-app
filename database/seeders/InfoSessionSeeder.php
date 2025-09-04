<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InfoSession;
use Carbon\Carbon;

class InfoSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create two upcoming sessions: one Coding, one Media
        InfoSession::updateOrCreate(
            [
                'name' => 'Coding Info Session',
                'start_date' => Carbon::now()->addDays(7)->toDateTimeString(),
            ],
            [
                'formation' => 'Coding',
                'isAvailable' => true,
                'isFull' => false,
                'isFinish' => false,
                'places' => 50,
            ]
        );

        InfoSession::updateOrCreate(
            [
                'name' => 'Media Info Session',
                'start_date' => Carbon::now()->addDays(10)->toDateTimeString(),
            ],
            [
                'formation' => 'Media',
                'isAvailable' => true,
                'isFull' => false,
                'isFinish' => false,
                'places' => 40,
            ]
        );
    }
}




