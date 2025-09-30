<?php

namespace App\Exports;

use App\Models\Participant;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ParticipantExport implements FromQuery, WithHeadings, WithMapping
{

    use Exportable;

    // public $term;
    // public $step;
    // public $sessionID;
    protected $fieldsToExport;
    protected $fieldMapping;


    public function __construct($selectedFields = [])
    {
        $defaultFields = ['info_session_id', 'full_name', 'email'];
        
        $cleanSelectedFields = array_diff($selectedFields, $defaultFields);
        
        $this->fieldsToExport = array_merge($defaultFields, $cleanSelectedFields);
        
        $this->fieldMapping = $this->buildFieldMapping();
    }

    private function buildFieldMapping()
    {
        $mapping = [
            'info_session_id' => 'Session', 
            'full_name' => 'Full Name',
            'email' => 'Email',
        ];
        
        foreach ($this->fieldsToExport as $field) {
            if (!isset($mapping[$field])) {
                $mapping[$field] = $this->generateFieldLabel($field);
            }
        }
        
        return $mapping;
    }

    private function generateFieldLabel($fieldName)
    {
        $customLabels = [
            'source' => 'How They Found LionsGeek',
            'is_visited' => 'Have Visited', 
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
            'current_step' => 'Current Step',
            'info_session_id' => 'Session',
            'how_they_found_lionsgeek' => 'How They Found LionsGeek',
        ];
        
        if (isset($customLabels[$fieldName])) {
            return $customLabels[$fieldName];
        }
        
        return ucwords(str_replace('_', ' ', $fieldName));
    }


    public function query()
    {
        return Participant::query()->with('infoSession');

        // if (!empty($this->term)) {
        //     $query->where('full_name', 'like', '%' . $this->term . '%');
        //     $query->orWhere('email', 'like', '%' . $this->term . '%');
        //     $query->orWhere('phone', 'like', '%' . $this->term . '%');
        // }

        // if (!empty($this->step)) {
        //     $query->orWhere('current_step', 'like', '%' . $this->step . '%');
        // }

        // if (!empty($this->sessionID)) {
        //     $query->orWhere('info_session_id', 'like', '%' . $this->sessionID . '%');
        // }

        return $query;
    }



    public function headings(): array
    {
        $headings = [];
        foreach ($this->fieldsToExport as $field) {
            $headings[] = $this->fieldMapping[$field] ?? ucwords(str_replace('_', ' ', $field));
        }
        return $headings;
    }


    // Map method to transform data before export
    public function map($participant): array
    {
        $row = [];
        
        foreach ($this->fieldsToExport as $field) {
            $row[] = $this->getFieldValue($participant, $field);
        }
        
        return $row;
    }
    private function getFieldValue($participant, $field)
    {
        switch ($field) {
            case 'info_session_id':
                return optional($participant->infoSession)->formation;
            case 'have_visited':
            case 'is_visited':
                return $participant->is_visited ? "Came to Info Session" : "Did not Come to Info Session";
            case 'how_they_found_lionsgeek':
                return $participant->source;
            case 'current_step':
                return ucwords(str_replace('_', ' ', $participant->current_step));
            case 'city':
                return ucwords($participant->city);
            case 'prefecture':
                return ucwords(str_replace('_', ' ', $participant->prefecture));
            case 'gender':
                return ucwords($participant->gender);
            case 'created_at':
            case 'updated_at':
                return $participant->{$field}?->format('Y-m-d H:i:s');
            default:
                return $participant->{$field} ?? '';
        }
    }

}
