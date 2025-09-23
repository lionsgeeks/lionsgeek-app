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
        Schema::table('events', function (Blueprint $table) {
            $table->string('private_url_token')->nullable()->unique()->after('capacity');
            $table->boolean('is_private')->default(false)->after('private_url_token');
            $table->timestamp('token_generated_at')->nullable()->after('is_private');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['private_url_token', 'is_private', 'token_generated_at']);
        });
    }
};