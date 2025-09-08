<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // For SQLite, we need to recreate the table to change the constraint
        if (config('database.default') === 'sqlite') {
            // First, create a new table with the correct schema
            DB::statement('
                CREATE TABLE participants_new (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    info_session_id INTEGER NULL,
                    formation_field VARCHAR(255) NULL,
                    full_name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    birthday VARCHAR(255) NOT NULL,
                    age VARCHAR(255) NOT NULL,
                    phone VARCHAR(255) NOT NULL,
                    city VARCHAR(255) NOT NULL,
                    region VARCHAR(255) NULL,
                    other_city VARCHAR(255) NULL,
                    prefecture VARCHAR(255) NULL,
                    gender VARCHAR(255) NULL,
                    motivation VARCHAR(255) NULL,
                    source VARCHAR(255) NULL,
                    code VARCHAR(255) NOT NULL,
                    image VARCHAR(255) NULL,
                    current_step VARCHAR(255) DEFAULT "info_session",
                    is_visited BOOLEAN DEFAULT 0,
                    status VARCHAR(255) DEFAULT "pending",
                    approved_by INTEGER NULL,
                    approved_at TIMESTAMP NULL,
                    education_level VARCHAR(255) NULL,
                    diploma_institution VARCHAR(255) NULL,
                    diploma_specialty VARCHAR(255) NULL,
                    current_situation VARCHAR(255) NULL,
                    other_status VARCHAR(255) NULL,
                    has_referring_organization VARCHAR(255) NULL,
                    referring_organization VARCHAR(255) NULL,
                    other_organization VARCHAR(255) NULL,
                    has_training VARCHAR(255) NULL,
                    previous_training_details TEXT NULL,
                    why_join_formation TEXT NULL,
                    participated_lionsgeek VARCHAR(255) NULL,
                    lionsgeek_activity VARCHAR(255) NULL,
                    other_activity VARCHAR(255) NULL,
                    objectives_after_formation VARCHAR(255) NULL,
                    priority_learning_topics VARCHAR(255) NULL,
                    last_self_learned TEXT NULL,
                    arabic_level VARCHAR(255) NULL,
                    french_level VARCHAR(255) NULL,
                    english_level VARCHAR(255) NULL,
                    other_language VARCHAR(255) NULL,
                    other_language_level VARCHAR(255) NULL,
                    how_heard_about_formation VARCHAR(255) NULL,
                    current_commitments VARCHAR(255) NULL,
                    cv_file VARCHAR(255) NULL,
                    game_completed BOOLEAN NULL,
                    final_score INTEGER NULL,
                    correct_answers INTEGER NULL,
                    levels_completed INTEGER NULL,
                    total_attempts INTEGER NULL,
                    wrong_attempts INTEGER NULL,
                    time_spent INTEGER NULL,
                    time_spent_formatted VARCHAR(255) NULL,
                    created_at TIMESTAMP NULL,
                    updated_at TIMESTAMP NULL,
                    FOREIGN KEY (info_session_id) REFERENCES info_sessions(id) ON UPDATE CASCADE ON DELETE CASCADE,
                    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
                )
            ');

            // Copy data from old table to new table (only existing columns)
            DB::statement('
                INSERT INTO participants_new (
                    id, info_session_id, full_name, email, birthday, age, phone, city, 
                    prefecture, gender, motivation, source, code, image, current_step, 
                    is_visited, created_at, updated_at, status, approved_by, approved_at,
                    education_level, diploma_institution, diploma_specialty, current_situation,
                    other_status, has_referring_organization, referring_organization, 
                    other_organization, has_training, previous_training_details, 
                    why_join_formation, participated_lionsgeek, lionsgeek_activity, 
                    other_activity, objectives_after_formation, priority_learning_topics,
                    last_self_learned, arabic_level, french_level, english_level,
                    other_language, other_language_level, how_heard_about_formation,
                    current_commitments, cv_file, formation_field, game_completed, other_city
                )
                SELECT 
                    id, info_session_id, full_name, email, birthday, age, phone, city, 
                    prefecture, gender, motivation, source, code, image, current_step, 
                    is_visited, created_at, updated_at, status, approved_by, approved_at,
                    education_level, diploma_institution, diploma_specialty, current_situation,
                    other_status, has_referring_organization, referring_organization, 
                    other_organization, has_training, previous_training_details, 
                    why_join_formation, participated_lionsgeek, lionsgeek_activity, 
                    other_activity, objectives_after_formation, priority_learning_topics,
                    last_self_learned, arabic_level, french_level, english_level,
                    other_language, other_language_level, how_heard_about_formation,
                    current_commitments, cv_file, formation_field, game_completed, other_city
                FROM participants
            ');

            // Drop the old table
            DB::statement('DROP TABLE participants');

            // Rename the new table
            DB::statement('ALTER TABLE participants_new RENAME TO participants');
        } else {
            // For other databases, use the standard Laravel method
            Schema::table('participants', function (Blueprint $table) {
                $table->unsignedBigInteger('info_session_id')->nullable()->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (config('database.default') === 'sqlite') {
            // For SQLite, recreate the table with NOT NULL constraint
            DB::statement('
                CREATE TABLE participants_old (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    info_session_id INTEGER NOT NULL,
                    formation_field VARCHAR(255) NULL,
                    full_name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    birthday VARCHAR(255) NOT NULL,
                    age VARCHAR(255) NOT NULL,
                    phone VARCHAR(255) NOT NULL,
                    city VARCHAR(255) NOT NULL,
                    region VARCHAR(255) NULL,
                    other_city VARCHAR(255) NULL,
                    prefecture VARCHAR(255) NULL,
                    gender VARCHAR(255) NULL,
                    motivation VARCHAR(255) NULL,
                    source VARCHAR(255) NULL,
                    code VARCHAR(255) NOT NULL,
                    image VARCHAR(255) NULL,
                    current_step VARCHAR(255) DEFAULT "info_session",
                    is_visited BOOLEAN DEFAULT 0,
                    status VARCHAR(255) DEFAULT "pending",
                    approved_by INTEGER NULL,
                    approved_at TIMESTAMP NULL,
                    education_level VARCHAR(255) NULL,
                    diploma_institution VARCHAR(255) NULL,
                    diploma_specialty VARCHAR(255) NULL,
                    current_situation VARCHAR(255) NULL,
                    other_status VARCHAR(255) NULL,
                    has_referring_organization VARCHAR(255) NULL,
                    referring_organization VARCHAR(255) NULL,
                    other_organization VARCHAR(255) NULL,
                    has_training VARCHAR(255) NULL,
                    previous_training_details TEXT NULL,
                    why_join_formation TEXT NULL,
                    participated_lionsgeek VARCHAR(255) NULL,
                    lionsgeek_activity VARCHAR(255) NULL,
                    other_activity VARCHAR(255) NULL,
                    objectives_after_formation VARCHAR(255) NULL,
                    priority_learning_topics VARCHAR(255) NULL,
                    last_self_learned TEXT NULL,
                    arabic_level VARCHAR(255) NULL,
                    french_level VARCHAR(255) NULL,
                    english_level VARCHAR(255) NULL,
                    other_language VARCHAR(255) NULL,
                    other_language_level VARCHAR(255) NULL,
                    how_heard_about_formation VARCHAR(255) NULL,
                    current_commitments VARCHAR(255) NULL,
                    cv_file VARCHAR(255) NULL,
                    game_completed BOOLEAN NULL,
                    final_score INTEGER NULL,
                    correct_answers INTEGER NULL,
                    levels_completed INTEGER NULL,
                    total_attempts INTEGER NULL,
                    wrong_attempts INTEGER NULL,
                    time_spent INTEGER NULL,
                    time_spent_formatted VARCHAR(255) NULL,
                    created_at TIMESTAMP NULL,
                    updated_at TIMESTAMP NULL,
                    FOREIGN KEY (info_session_id) REFERENCES info_sessions(id) ON UPDATE CASCADE ON DELETE CASCADE,
                    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
                )
            ');

            // Copy data from current table to old table (only non-null info_session_id)
            DB::statement('
                INSERT INTO participants_old SELECT * FROM participants WHERE info_session_id IS NOT NULL
            ');

            // Drop the current table
            DB::statement('DROP TABLE participants');

            // Rename the old table
            DB::statement('ALTER TABLE participants_old RENAME TO participants');
        } else {
            // For other databases, use the standard Laravel method
            Schema::table('participants', function (Blueprint $table) {
                $table->unsignedBigInteger('info_session_id')->nullable(false)->change();
            });
        }
    }
};