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
            // Add only the missing fields (region and other_city already exist)

            // Step 2: Education & Current Situation + Phase 2 & 3
            $table->string('education_level')->nullable()->after('other_city');
            $table->string('diploma_institution')->nullable()->after('education_level');
            $table->string('diploma_specialty')->nullable()->after('diploma_institution');
            $table->string('current_situation')->nullable()->after('diploma_specialty');
            $table->string('other_status')->nullable()->after('current_situation');
            $table->string('has_referring_organization')->nullable()->after('other_status');
            $table->string('referring_organization')->nullable()->after('has_referring_organization');
            $table->string('other_organization')->nullable()->after('referring_organization');

            // Step 3: Training Experience & Motivation + LionsGEEK
            $table->string('has_training')->nullable()->after('other_organization');
            $table->text('previous_training_details')->nullable()->after('has_training');
            $table->text('why_join_formation')->nullable()->after('previous_training_details');
            $table->string('participated_lionsgeek')->nullable()->after('why_join_formation');
            $table->string('lionsgeek_activity')->nullable()->after('participated_lionsgeek');
            $table->string('other_activity')->nullable()->after('lionsgeek_activity');

            // Step 4: Goals & Learning + Languages
            $table->string('objectives_after_formation')->nullable()->after('other_activity');
            $table->string('priority_learning_topics')->nullable()->after('objectives_after_formation');
            $table->text('last_self_learned')->nullable()->after('priority_learning_topics');
            $table->string('arabic_level')->nullable()->after('last_self_learned');
            $table->string('french_level')->nullable()->after('arabic_level');
            $table->string('english_level')->nullable()->after('french_level');
            $table->string('other_language')->nullable()->after('english_level');
            $table->string('other_language_level')->nullable()->after('other_language');

            // Step 5: Background & Availability
            $table->string('how_heard_about_formation')->nullable()->after('other_language_level');
            $table->string('current_commitments')->nullable()->after('how_heard_about_formation');

            // Step 6: CV Upload
            $table->string('cv_file')->nullable()->after('current_commitments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->dropColumn([
                'education_level',
                'diploma_institution',
                'diploma_specialty',
                'current_situation',
                'other_status',
                'has_referring_organization',
                'referring_organization',
                'other_organization',
                'has_training',
                'previous_training_details',
                'why_join_formation',
                'participated_lionsgeek',
                'lionsgeek_activity',
                'other_activity',
                'objectives_after_formation',
                'priority_learning_topics',
                'last_self_learned',
                'arabic_level',
                'french_level',
                'english_level',
                'other_language',
                'other_language_level',
                'how_heard_about_formation',
                'current_commitments',
                'cv_file',
            ]);
        });
    }
};
