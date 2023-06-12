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
    }
}
