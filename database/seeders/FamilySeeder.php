<?php

namespace Database\Seeders;

use App\Models\Family;
use Illuminate\Database\Seeder;

class FamilySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Aaliyah's mother
        Family::create([
            "character_id" => "1",
            "familiar_id" => "7",
            "relationship" => "Mother",
        ]);
    }
}
