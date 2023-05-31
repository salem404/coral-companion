<?php

namespace Database\Seeders;

use App\Models\Character;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CharacterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Character::create([
            "name"=>"Name",
            "birthday" => "1",
            "season_id" => "1",
            "gender" => "male",
            "occupation" => "occupation",
            "romanceable" => "1",
            "icon" => "icon",
        ]);
    }
}
