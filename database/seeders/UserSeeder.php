<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Admin user
        User::create([
            "email" => "admin@admin.com",
            "password" => bcrypt($_ENV["ADMIN_PASSWORD"]),
            "isAdmin" => 1,
        ]);
        // Normal user
        User::create([
            "email" => "test@test.es",
            "password" => bcrypt("12345678"),
        ]);
    }
}
