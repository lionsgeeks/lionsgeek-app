import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import ParticipantCard from './partials/ParticipantCard';
// import Image from 'next/image';

export default function Participants() {
    const { participants } = usePage().props;
    console.log(participants);
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
                        <Input placeholder="Name, Email or Phone" className="pl-10" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter By Steps" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="media-media-session">Media Media session</SelectItem>
                            <SelectItem value="coding-coding-session">Coding Coding session</SelectItem>
                            <SelectItem value="media-second-media-session">Media Second Media Session</SelectItem>
                            <SelectItem value="media-private-session">Media private session</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter By Session" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-steps">All Steps</SelectItem>
                            <SelectItem value="info-session">Info Session</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="interview-pending">Interview Pending</SelectItem>
                            <SelectItem value="interview-failed">Interview Failed</SelectItem>
                            <SelectItem value="jungle">Jungle</SelectItem>
                            <SelectItem value="jungle-failed">Jungle Failed</SelectItem>
                            <SelectItem value="coding-school">Coding School</SelectItem>
                            <SelectItem value="media-school">Media School</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">Reset Filters</Button>
                    <Button>Copy Emails</Button>
                </div>

                {/* Participants Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {participants.map((participant, index) => (
                        <ParticipantCard key={index} participant={participant} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
