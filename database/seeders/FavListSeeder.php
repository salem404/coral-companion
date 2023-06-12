<?php

namespace Database\Seeders;

use App\Models\FavList;
use Illuminate\Database\Seeder;

class FavListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Test
        FavList::create([
            "character_id" => 1,
            "item_id" => 1,
        ]);
    }
}
