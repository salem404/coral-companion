<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Testing profile
        Profile::create([
            "farmer_name" => "Test",
            "farm_name" => "Test Farm",
            "user_id" => 2,
        ]);
    }
}
