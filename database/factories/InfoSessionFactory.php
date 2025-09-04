<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\InfoSession;

/** @extends Factory<\App\Models\InfoSession> */
class InfoSessionFactory extends Factory
{
    protected $model = InfoSession::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'formation' => $this->faker->randomElement(['Coding', 'Media']),
            'start_date' => now()->addDays(7),
            'isAvailable' => true,
            'isFinish' => false,
            'isFull' => false,
            'places' => 100,
        ];
    }
}
