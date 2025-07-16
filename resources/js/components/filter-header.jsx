import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clipboard, Copy, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import InterviewDialog from './interviewDialog';
import InviteDialog from './inviteDialog';

const FilterHeader = ({ participants, infosession, infosessions, setFiltredParticipants }) => {
    const [search, setSearch] = useState('');
    const [selectedStep, setSelectedStep] = useState('');
    const [selectedSession, setSelectedSession] = useState('');
    const [copy, setCopy] = useState(true);
    const filtredParticipans = participants?.filter((participant) => {
        const matchesSearch =
            !search ||
            participant.full_name.toLowerCase().includes(search.toLowerCase()) ||
            participant.email.toLowerCase().includes(search.toLowerCase());
        const matchesSession = !selectedSession || selectedSession === 'All' || participant.info_session.name === selectedSession;
        const matchesStep = !selectedStep || selectedStep === 'All' || participant.current_step === selectedStep;
        return matchesSearch && matchesSession && matchesStep;
    });
    useEffect(() => {
        setFiltredParticipants(filtredParticipans);
    }, [search, selectedSession, selectedStep]);

    return (
        <div className="mb-6 flex flex-wrap items-center gap-4 py-5">
            <div className="relative max-w-sm flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name, Email " className="w-80 pl-10 md:w-full" />
            </div>
            {infosessions && (
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
            )}
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
                        setTimeout(() => setCopy(true), 1500);
                    } else {
                        alert('No emails to copy.');
                    }
                }}
            >
                {copy ? <Copy /> : <Clipboard />}
                {copy ? 'Copy Emails' : 'Copied'}
            </Button>
            {!infosessions && (
                <div className="flex gap-3">
                    <InterviewDialog infosession={infosession} />
                    <InviteDialog infosession={infosession}  step={'jungle'} />
                    <InviteDialog infosession={infosession}  step={'school'} />
                </div>
            )}
        </div>
    );
};

export default FilterHeader;
