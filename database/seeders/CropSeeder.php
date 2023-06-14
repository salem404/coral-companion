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
            "item_id" => 1,
            "type_id" => 1,
            "isGigantic" => 0,
        ]);

        // Carrot
        Crop::create([
            "item_id" => 2,
            "type_id" => 1,
            "isGigantic" => 0,
        ]);

        // Cotton
        Crop::create([
            "item_id" => 3,
            "type_id" => 1,
            "isGigantic" => 0,
        ]);

        // Cauliflower
        Crop::create([
            "item_id" => 4,
            "type_id" => 1,
            "isGigantic" => 1,
        ]);

        // Corn
        Crop::create([
            "item_id" => 5,
            "type_id" => 1,
            "isGigantic" => 0,
        ]);

        // Melon
        Crop::create([
            "item_id" => 6,
            "type_id" => 1,
            "isGigantic" => 0,
        ]);
    }
}
