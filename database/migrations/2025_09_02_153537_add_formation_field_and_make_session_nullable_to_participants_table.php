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
            // Add formation_field column to store coding/media
            $table->string('formation_field')->nullable()->after('info_session_id');

            // Make info_session_id nullable
            $table->unsignedBigInteger('info_session_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            // Remove formation_field column
            $table->dropColumn('formation_field');

            // Make info_session_id required again (if needed)
            // Note: This might fail if there are NULL values
            // $table->unsignedBigInteger('info_session_id')->nullable(false)->change();
        });
    }
};
