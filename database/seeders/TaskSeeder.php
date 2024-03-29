<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Test
        Task::create([
            "description" => "This is a test task",
            "resource_id" => 1,
            "character_id" => 1,
            "profile_id" => 1,
            "isCompleted" => 0,
        ]);
    }
}
