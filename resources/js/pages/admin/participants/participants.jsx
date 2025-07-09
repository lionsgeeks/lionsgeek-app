import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Clipboard, Copy, Search } from 'lucide-react';
import { useState } from 'react';
import ParticipantCard from './partials/ParticipantCard';

export default function Participants() {
    const { participants, infosessions } = usePage().props;
    const [search, setSearch] = useState('');
    const [selectedStep, setSelectedStep] = useState('');
    const [selectedSession, setSelectedSession] = useState('');
    const [copy, setCopy] = useState(true);
    const filtredParticipans = participants.filter((participant) => {
        const matchesSearch =
            !search ||
            participant.full_name.toLowerCase().includes(search.toLowerCase()) ||
            participant.email.toLowerCase().includes(search.toLowerCase());

        const matchesSession = !selectedSession || selectedSession === 'All' || participant.info_session.name === selectedSession;

        const matchesStep = !selectedStep || selectedStep === 'All' || participant.current_step === selectedStep;

        return matchesSearch && matchesSession && matchesStep;
    });

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

                {/* Controls */}
                <div className="mb-6 flex items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name, Email " className="pl-10" />
                    </div>
                    <Select onValueChange={setSelectedSession} value={selectedSession}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter By Session" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Sessions</SelectItem>
                            {infosessions.map((session, index) => (
                                <SelectItem key={index} value={session.name}>
                                    {session.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setSelectedStep} value={selectedStep}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter By Step" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Steps</SelectItem>
                            <SelectItem value="info_session">Info Session</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="interview_pending">Interview Pending</SelectItem>
                            <SelectItem value="interview_failed">Interview Failed</SelectItem>
                            <SelectItem value="jungle">Jungle</SelectItem>
                            <SelectItem value="jungle_failed">Jungle Failed</SelectItem>
                            <SelectItem value="coding_school">Coding School</SelectItem>
                            <SelectItem value="media_school">Media School</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearch('');
                            setSelectedStep('');
                            setSelectedSession('');
                        }}
                    >
                        Reset Filters
                    </Button>
                    <Button
                        onClick={() => {
                            const emails = filtredParticipans.map((p) => p.email).join(', ');
                            if (emails) {
                                navigator.clipboard.writeText(emails);
                                setCopy(false);
                                setTimeout(() => setCopy(true), 1500); // Reset after 1.5s
                            } else {
                                alert('No emails to copy.');
                            }
                        }}
                    >
                        {copy ? <Copy /> : <Clipboard />}
                        {copy ? 'Copy Emails' : 'Copied'}
                    </Button>
                </div>

                {/* Participants Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtredParticipans.map((participant, index) => (
                        <ParticipantCard key={index} participant={participant} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
