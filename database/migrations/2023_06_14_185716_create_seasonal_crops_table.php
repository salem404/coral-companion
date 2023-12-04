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
            $table->increments("id");
            $table
                ->integer("season_id")
                ->unsigned()
                ->nullable();
            $table
                ->foreign("season_id")
                ->references("id")
                ->on("seasons")
                ->onDelete("cascade");
            $table
                ->integer("crop_id")
                ->unsigned()
                ->nullable();
            $table
                ->foreign("crop_id")
                ->references("id")
                ->on("crops")
                ->onDelete("cascade");
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
