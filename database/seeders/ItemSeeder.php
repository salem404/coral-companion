<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Almond
        Item::create([
            "name" => "Almond",
            "type_id" => 1,
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/5/5a/Almond.png",
        ]);

        // Carrot
        Item::create([
            "name" => "Carrot",
            "type_id" => 1,
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/c/c3/Carrot.png/",
        ]);

        // Cotton
        Item::create([
            "name" => "Cotton",
            "type_id" => 1,
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/c/c3/Cotton.png/",
        ]);

        // Cauliflower
        Item::create([
            "name" => "Cauliflower",
            "type_id" => 1,
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/a/aa/Cauliflower.png/",
        ]);

        // Corn
        Item::create([
            "name" => "Corn",
            "type_id" => 1,
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/f/f8/Corn.png/",
        ]);

        // Melon
        Item::create([
            "name" => "Melon",
            "type_id" => 1,
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/1/19/Melon.png/",
        ]);
    }
}
