<?php

namespace Database\Seeders;

use App\Models\SeasonalCrop;
use Illuminate\Database\Seeder;

class SeasonalCropSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Almond Spring
        SeasonalCrop::create([
            "season_id" => 1,
            "crop_id" => 1,
        ]);

        // Carrot Spring
        SeasonalCrop::create([
            "season_id" => 1,
            "crop_id" => 2,
        ]);

        // Cotton Fall
        SeasonalCrop::create([
            "season_id" => 3,
            "crop_id" => 3,
        ]);

        // Cotton Winter
        SeasonalCrop::create([
            "season_id" => 4,
            "crop_id" => 3,
        ]);

        // Cauliflower Spring
        SeasonalCrop::create([
            "season_id" => 1,
            "crop_id" => 4,
        ]);

        // Corn Summer
        SeasonalCrop::create([
            "season_id" => 2,
            "crop_id" => 5,
        ]);

        // Melon Summer
        SeasonalCrop::create([
            "season_id" => 2,
            "crop_id" => 6,
        ]);
    }
}
