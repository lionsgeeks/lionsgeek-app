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
        'previous_step',
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
        'how_heard_about_formation',
        'current_commitments',
        'cv_file',

        // Game metrics
        'game_completed',
        'final_score',
        'correct_answers',
        'levels_completed',
        'total_attempts',
        'wrong_attempts',
        'time_spent',
        'time_spent_formatted',
        'intelligence_level',

        // Approval workflow
        'status',
        'approved_by',
        'approved_at',
        
        // Step change tracking
        'last_step_changed_by',
        'last_step_changed_at',
    ];

    // Status constants
    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    public function infoSession()
    {
        return  $this->belongsTo(InfoSession::class);
    }



    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function lastStepChangedBy()
    {
        return $this->belongsTo(User::class, 'last_step_changed_by');
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

    // Scope methods
    public function scopeApproved($query)
    {
        return $query->where('status', self::STATUS_APPROVED);
    }

    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    public function scopeRejected($query)
    {
        return $query->where('status', self::STATUS_REJECTED);
    }

    // Helper methods
    public function isPending()
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isApproved()
    {
        return $this->status === self::STATUS_APPROVED;
    }

    public function isRejected()
    {
        return $this->status === self::STATUS_REJECTED;
    }
}
