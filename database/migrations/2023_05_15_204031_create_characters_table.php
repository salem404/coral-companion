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
        Schema::create("characters", function (Blueprint $table) {
            $table->increments("id");
            $table->string("name");
            $table->integer("birthday")->nullable();
            $table
                ->integer("season_id")
                ->unsigned()
                ->nullable();
            $table
                ->foreign("season_id")
                ->references("id")
                ->on("seasons")
                ->onDelete("cascade");
            $table->string("gender")->nullable();
            $table->string("occupation")->nullable();
            $table->boolean("romanceable");
            $table->string("icon");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("characters");
    }
};
