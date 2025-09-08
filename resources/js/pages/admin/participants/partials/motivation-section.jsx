'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export function MotivationSection({ participant, loading = false }) {
    const [motivation, setMotivation] = useState(participant.motivation);

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Motivation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea value={motivation} placeholder="Enter participant motivation..." rows={4} disabled={loading} readOnly />
            </CardContent>
        </Card>
    );
}
