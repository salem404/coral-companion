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
            $table->integer("birthday")->nullable()->min(1)->max(28);
            $table
                ->integer("season_id")
                ->unsigned()
                ->nullable()
            ->min(1)
            ->max(4);
            $table
                ->foreign("season_id")
                ->references("id")
                ->on("seasons")
                ->onDelete("cascade");
            $table->string("gender")->nullable();
            $table->string("occupation")->nullable();
            $table->tinyInteger("isRomanceable")->default(0)->min(0)->max(1);
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
