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
            $table->increments("id");
            $table
                ->integer("resource_id")
                ->unsigned()
                ->nullable();
            $table
                ->foreign("resource_id")
                ->references("id")
                ->on("resources")
                ->onDelete("cascade");
            $table->string("type")->nullable();
            $table->string("rank")->nullable();
            $table->integer("seed_price")->nullable();
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
