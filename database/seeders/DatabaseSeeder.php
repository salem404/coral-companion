<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SeasonSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProfileSeeder::class);
        $this->call(CharacterSeeder::class);
        $this->call(FamilySeeder::class);
        $this->call(TypeSeeder::class);
        $this->call(ItemSeeder::class);
        $this->call(TaskSeeder::class);
        $this->call(FavListSeeder::class);

        // \App\Models\User::factory(10)->create();
    }
}
