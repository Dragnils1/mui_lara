<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProfileActions>
 */
class ProfileActionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'defer' => 0,
            'status' => env('STATUS_FOR_NEW_USERS'),
            'color' => '',
            'profile_id' => 1,
            'next_contact_date' => Str::random(10),
            'visible_pass' => Str::random(10),
            'dragableColor' => ''
        ];
    }
}