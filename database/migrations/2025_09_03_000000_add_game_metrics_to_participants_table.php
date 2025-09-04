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
        Schema::table('participants', function (Blueprint $table) {
            $table->boolean('game_completed')->nullable()->after('cv_file');
            $table->integer('final_score')->nullable()->after('game_completed');
            $table->integer('correct_answers')->nullable()->after('final_score');
            $table->integer('levels_completed')->nullable()->after('correct_answers');
            $table->integer('total_attempts')->nullable()->after('levels_completed');
            $table->integer('wrong_attempts')->nullable()->after('total_attempts');
            $table->integer('time_spent')->nullable()->after('wrong_attempts'); // seconds
            $table->string('time_spent_formatted')->nullable()->after('time_spent'); // MM:SS
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->dropColumn([
                'game_completed',
                'final_score',
                'correct_answers',
                'levels_completed',
                'total_attempts',
                'wrong_attempts',
                'time_spent',
                'time_spent_formatted',
            ]);
        });
    }
};


