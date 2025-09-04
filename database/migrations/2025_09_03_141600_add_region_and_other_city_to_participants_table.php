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
            if (!Schema::hasColumn('participants', 'region')) {
                $table->string('region')->nullable()->after('city');
            }
            if (!Schema::hasColumn('participants', 'other_city')) {
                $table->string('other_city')->nullable()->after('region');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            if (Schema::hasColumn('participants', 'other_city')) {
                $table->dropColumn('other_city');
            }
            if (Schema::hasColumn('participants', 'region')) {
                $table->dropColumn('region');
            }
        });
    }
};


