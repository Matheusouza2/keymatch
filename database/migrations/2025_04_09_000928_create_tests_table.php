<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tests', function (Blueprint $table) {
            $table->string('file')->nullable();
            $table->foreignId('match_game_id')->constrained('match_games')->onDelete('cascade');
            $table->boolean('team1_release')->default(false);
            $table->boolean('team2_release')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tests', function (Blueprint $table) {
            $table->dropForeign(['match_game_id']);
            $table->dropIfExists('tests');
        });
    }
};
