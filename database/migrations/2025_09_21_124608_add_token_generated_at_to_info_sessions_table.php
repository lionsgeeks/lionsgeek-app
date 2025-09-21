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
        Schema::table('info_sessions', function (Blueprint $table) {
                        $table->timestamp('token_generated_at')->nullable()->after('private_url_token');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('info_sessions', function (Blueprint $table) {
                        $table->dropColumn('token_generated_at');

        });
    }
};
