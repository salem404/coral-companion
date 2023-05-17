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
        Schema::create("families", function (Blueprint $table) {
            $table->increments("id");
            $table->integer("character_id")->unsigned();
            $table
                ->foreign("character_id")
                ->references("id")
                ->on("characters");
            $table->integer("familiar_id")->unsigned();
            $table
                ->foreign("familiar_id")
                ->references("id")
                ->on("characters");
            $table->string("relationship");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("families");
    }
};
