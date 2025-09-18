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
        // Remove private_session_id from participants table if it exists
        if (Schema::hasColumn('participants', 'private_session_id')) {
            Schema::table('participants', function (Blueprint $table) {
                $table->dropForeign(['private_session_id']);
                $table->dropColumn('private_session_id');
            });
        }

        // Drop private_sessions table if it exists
        Schema::dropIfExists('private_sessions');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recreate private_sessions table
        Schema::create('private_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('formation'); // coding or media
            $table->dateTime('start_date');
            $table->boolean('isAvailable')->default(true);
            $table->boolean('isFull')->default(false);
            $table->boolean('isFinish')->default(false);
            $table->integer('places')->default(30);
            $table->string('url_token', 32)->unique(); // Unique URL token
            $table->boolean('is_active')->default(true); // To enable/disable session
            $table->timestamps();
        });

        // Add private_session_id back to participants table
        Schema::table('participants', function (Blueprint $table) {
            $table->unsignedBigInteger('private_session_id')->nullable()->after('info_session_id');
            $table->foreign('private_session_id')->references('id')->on('private_sessions')->onDelete('set null');
        });
    }
};
