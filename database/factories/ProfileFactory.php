<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Profile;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Profile::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'firstname' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'vip' => random_int(0, 1),
            'height' => Str::random(10),
            'weight' => Str::random(10),
            'role' => Str::random(10),
            'about' => Str::random(10),
            'birthday' => Str::random(10),
            'birthdaychild1' => Str::random(10),
            'birthdaychild2' => Str::random(10),
            'birthdaychild3' => Str::random(10),
            'birthdaychild4' => Str::random(10),
            'birthyear' => Str::random(10),
            'children' => Str::random(10),
            'city' => Str::random(10),
            'comment' => Str::random(10),
            'comp' => Str::random(10),
            'dateofend' => Str::random(10),
            'familystatus' => Str::random(10),
            'fav' => Str::random(10),
            'fav_date' => Str::random(10),
            'fav_modify' => Str::random(10),
            'fb' => Str::random(10),
            'gender' => Str::random(10),
            'helptext' => Str::random(10),
            'images' => ',,,',
            'inst' => Str::random(10),
            'langlove' => Str::random(10),
            'langlove2' => Str::random(10),
            'lastlove' => Str::random(10),
            'lastzodiak' => Str::random(10),
            'ok' => Str::random(10),
            'phone' => Str::random(10),
            'registermonth' => Str::random(10),
            'report' => Str::random(10),
            'smoke' => Str::random(10),
            'source' => Str::random(10),
            'targetsearch' => Str::random(10),
            'targetsearchtext' => Str::random(10),
            'user_InNum' => Str::random(10),
            'user_OutNum' => Str::random(10),
            'vk' => Str::random(10),
            'zodiak' => Str::random(10),
            'source_type' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}


