<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProfileActions;

class ProfileActionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        ProfileActions::factory(10)->create();
        
        //связываем действия профилей с профилем
        $profiles = Profile::all();
        ProfileActions::all()->each(function ($profileActions) use ($profiles) {
            $profileActions->profile_id = $profiles->random()->id;
            $profileActions->save();
        });
    }
}

