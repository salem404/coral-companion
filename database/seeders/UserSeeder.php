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
        // Normal user
        User::create([
            'username' => 'user',
            'email' => 'test@test.es',
            'password' => bcrypt('12345678')
        ]);
        // Admin user
        User::create([
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin123'),
            'isAdmin' => 1
        ]);

    }
}
