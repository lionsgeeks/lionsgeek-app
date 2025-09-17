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
            $table->foreignId('last_step_changed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('last_step_changed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->dropForeign(['last_step_changed_by']);
            $table->dropColumn(['last_step_changed_by', 'last_step_changed_at']);
        });
    }
};
