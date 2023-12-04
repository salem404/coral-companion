<?php

namespace Database\Seeders;

use App\Models\Crop;
use Illuminate\Database\Seeder;

class CropSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Almond
        Crop::create([
            "resource_id" => 1,
        ]);

        // Carrot
        Crop::create([
            "resource_id" => 2,
        ]);

        // Cotton
        Crop::create([
            "resource_id" => 3,
        ]);

        // Cauliflower
        Crop::create([
            "resource_id" => 4,
        ]);

        // Corn
        Crop::create([
            "resource_id" => 5,
        ]);

        // Melon
        Crop::create([
            "resource_id" => 6,
        ]);
    }
}
