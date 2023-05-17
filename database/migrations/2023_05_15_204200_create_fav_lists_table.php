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
        Schema::create("fav_lists", function (Blueprint $table) {
            $table->increments("id");
            $table->integer("character_id")->unsigned();
            $table
                ->foreign("character_id")
                ->references("id")
                ->on("characters")
                ->onDelete("cascade");
            $table->integer("item_id")->unsigned();
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
        Schema::dropIfExists("fav_lists");
    }
};
