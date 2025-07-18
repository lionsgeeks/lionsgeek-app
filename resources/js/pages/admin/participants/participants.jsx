import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import FilterHeader from '../../../components/filter-header';
import ParticipantCard from './partials/ParticipantCard';

export default function Participants() {
    const { participants, infosessions } = usePage().props;
    const [filtredParticipants, setFiltredParticipants] = useState(participants);
    // console.log('rr',participants);
    const breadcrumbs = [
        {
            title: 'Participants',
            href: '/admin/participants',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />
            <div className="p-3 lg:p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Participants</h1>
                    <div className="flex gap-2">
                        <a href="/admin/questions/export">
                            <Button variant="outline" size="sm">
                                Export Questions
                            </Button>
                        </a>
                        <a href={'/admin/participant/export'}>
                            <Button size="sm">Export Students</Button>
                        </a>
                    </div>
                </div>
                <FilterHeader participants={participants} infosessions={infosessions} setFiltredParticipants={setFiltredParticipants} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtredParticipants?.map((participant, index) => (
                        <ParticipantCard key={index} participant={participant} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
