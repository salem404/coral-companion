<?php

namespace Database\Seeders;

use App\Models\Season;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
        foreach ($seasons as $season) {
            Season::create([
                'name' => $season,
            ]);
        }
    }
}
