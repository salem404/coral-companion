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
        Schema::create("crops", function (Blueprint $table) {
            $table->id();
            $table
                ->integer("item_id")
                ->unsigned()
                ->nullable();
            $table
                ->foreign("item_id")
                ->references("id")
                ->on("items")
                ->onDelete("cascade");
            $table->integer("type_id")->unsigned();
            $table
                ->foreign("type_id")
                ->references("id")
                ->on("types")
                ->onDelete("cascade");
            $table->tinyInteger("isGigantic")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("crops");
    }
};
