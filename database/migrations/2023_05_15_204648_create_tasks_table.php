<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("tasks", function (Blueprint $table) {
            $table->increments("id");
            $table->integer("profile_id")->unsigned();
            $table
                ->foreign("profile_id")
                ->references("id")
                ->on("profiles")
                ->onDelete("cascade");
            $table->string("description");
            $table->tinyInteger("isCompleted")->default(0);
            $table
                ->integer("character_id")
                ->unsigned()
                ->nullable();
            $table
                ->foreign("character_id")
                ->references("id")
                ->on("characters")
                ->onDelete("cascade");
            $table
                ->integer("item_id")
                ->unsigned()
                ->nullable();
            $table
                ->foreign("item_id")
                ->references("id")
                ->on("items")
                ->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("tasks");
    }
};
