<?php

namespace Database\Seeders;

use App\Models\Resource;
use Illuminate\Database\Seeder;

class ResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Almond
        Resource::create([
            "name" => "Almond",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/5/5a/Almond.png",
        ]);

        // Carrot
        Resource::create([
            "name" => "Carrot",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/c/c3/Carrot.png/",
        ]);

        // Cotton
        Resource::create([
            "name" => "Cotton",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/c/c3/Cotton.png/",
        ]);

        // Cauliflower
        Resource::create([
            "name" => "Cauliflower",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/a/aa/Cauliflower.png/",
        ]);

        // Corn
        Resource::create([
            "name" => "Corn",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/f/f8/Corn.png/",
        ]);

        // Melon
        Resource::create([
            "name" => "Melon",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/1/19/Melon.png/",
        ]);
    }
}
