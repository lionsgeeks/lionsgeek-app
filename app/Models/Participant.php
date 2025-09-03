<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = [
        'info_session_id',
        'formation_field',
        'full_name',
        'email',
        'birthday',
        'age',
        'phone',
        'city',
        'region',
        'other_city',
        'prefecture',
        'gender',
        'motivation',
        'source',
        'code',
        'current_step',
        'is_visited',
        'image',

        // New detailed form fields
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
    ];

    protected $casts = [
        'game_progress_data' => 'array',
    ];

    public function infoSession()
    {
        return  $this->belongsTo(InfoSession::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function questions()
    {
        return $this->hasOne(FrequentQuestion::class);
    }

    public function satisfaction()
    {
        return $this->hasOne(Satisfaction::class);
    }

    public function confirmation()
    {
        return $this->hasOne(ParticipantConfirmation::class);
    }
}
