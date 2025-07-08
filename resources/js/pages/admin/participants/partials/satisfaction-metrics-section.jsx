import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export function SatisfactionMetricsSection({ participant, loading = false }) {
    const { data, setData, processing, post } = useForm({
        participant_id: participant.id,
        interest_in_joining_lionsgeek: participant.satisfaction.interest_in_joining_lionsgeek,
        overall_availability: participant.satisfaction.overall_availability,
        ability_to_learn: participant.satisfaction.ability_to_learn,
        language: participant.satisfaction.language,
        discipline: participant.satisfaction.discipline,
        motivation: participant.satisfaction.motivation,
        team_player: participant.satisfaction.team_player,
        soft_skills: participant.satisfaction.soft_skills,
    });

    const handleSave = () => {
        post(route(`participant.satisfaction`, participant.id));
    };

    const handleMetricChange = (metric, checked) => {
        setData((prev) => ({
            ...prev,
            [metric]: checked,
        }));
    };

    const metricLabels = {
        interestInJoining: 'Interest In Joining Lionsgeek',
        overallAvailability: 'Overall Availability',
        abilityToLearn: 'Ability To Learn',
        language: 'Language',
        discipline: 'Discipline',
        motivation: 'Motivation',
        teamPlayer: 'Team Player',
        softSkills: 'Soft Skills',
    };

    return (
        <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Satisfaction Percentage:</CardTitle>
                <Button onClick={handleSave} disabled={loading} size="sm">
                    Save
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {Object.entries(data)?.map(
                        ([key, label]) =>
                            key !== 'participant_id' && (
                                <div key={key} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={key}
                                        checked={data[key]}
                                        onCheckedChange={(checked) => handleMetricChange(key, checked)}
                                        disabled={loading}
                                    />
                                    <label
                                        htmlFor={key}
                                        className="text-sm leading-none font-medium capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {key.replaceAll('_', ' ')}
                                    </label>
                                </div>
                            ),
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
