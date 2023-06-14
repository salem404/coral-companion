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
        Schema::create("seasonal_crops", function (Blueprint $table) {
            $table->id();
            $table
                ->Integer("season_id")
                ->unsigned()
                ->nullable();
            $table
                ->foreign("season_id")
                ->references("id")
                ->on("seasons")
                ->onDelete("cascade");
            $table->Integer("crop_id")->unsigned();
            $table
                ->foreign("crop_id")
                ->references("id")
                ->on("items");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("seasonal_crops");
    }
};
