import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Clipboard, Copy, Search, Filter, RotateCcw, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import InterviewDialog from './interviewDialog';
import InviteDialog from './inviteDialog';

const FilterHeader = ({ participants = [], infosession, infosessions = [], setFiltredParticipants }) => {
    const [search, setSearch] = useState('');
    const [selectedStep, setSelectedStep] = useState('');
    const [selectedSession, setSelectedSession] = useState('');
    const [copy, setCopy] = useState(true);
    
    const filtredParticipans = participants?.filter((participant) => {
        if (!participant) return false;
        
        const matchesSearch =
            !search ||
            participant?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            participant?.email?.toLowerCase().includes(search.toLowerCase());
        const matchesSession = !selectedSession || selectedSession === 'All' || participant?.info_session?.name === selectedSession;
        const matchesStep = !selectedStep || selectedStep === 'All' || participant?.current_step === selectedStep;
        return matchesSearch && matchesSession && matchesStep;
    }) || [];
    
    useEffect(() => {
        setFiltredParticipants(filtredParticipans);
    }, [search, selectedSession, selectedStep]);

    const hasActiveFilters = search || selectedStep || selectedSession;

    const handleReset = () => {
        setSearch('');
        setSelectedStep('');
        setSelectedSession('');
    };

    const handleCopyEmails = () => {
        const emails = filtredParticipans.map((p) => p.email).join(', ');
        if (emails) {
            navigator.clipboard.writeText(emails);
            setCopy(false);
            setTimeout(() => setCopy(true), 1500);
        } else {
        }
    };

    return (
        <div className="space-y-4">
            {/* Reset Button */}
            {hasActiveFilters && (
                <div className="flex justify-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="text-[#212529] hover:text-[#212529]/80 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-50"
                    >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                    </Button>
                </div>
            )}

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="relative min-w-[280px] flex-1 max-w-md">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Search by name or email..." 
                        className="pl-10 rounded-lg border focus:border-[#212529] transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#212529]/20" 
                    />
                </div>

                {/* Session Filter */}
                {infosessions && (
                    <Select onValueChange={setSelectedSession} value={selectedSession}>
                        <SelectTrigger className="w-48 rounded-lg border focus:border-[#212529] transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#212529]/20">
                            <SelectValue placeholder="Filter By Session" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Sessions</SelectItem>
                            {infosessions.map((session, index) => (
                                <SelectItem key={index} value={session.name}>
                                    {session.name} ({session.formation})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* Step Filter */}
                <Select onValueChange={setSelectedStep} value={selectedStep}>
                    <SelectTrigger className="w-48 rounded-lg border focus:border-[#212529]">
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

                            {/* Copy Emails Button */}
            <Button
                onClick={handleCopyEmails}
                className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                    {copy ? <Copy className="h-4 w-4 mr-2" /> : <Clipboard className="h-4 w-4 mr-2" />}
                    {copy ? 'Copy Emails' : 'Copied!'}
                </Button>

                {/* Action Buttons for Infosession Detail Page */}
                {!infosessions && (
                    <div className="flex gap-3 ml-auto">
                        <InterviewDialog infosession={infosession} />
                        <InviteDialog infosession={infosession} step={'jungle'} />
                        <InviteDialog infosession={infosession} step={'school'} />
                    </div>
                )}
            </div>

            {/* Results Summary */}
            {participants && (
                <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Showing <span className="font-medium text-[#212529]">{filtredParticipans.length}</span> of <span className="font-medium text-[#212529]">{participants.length}</span> participants
                        </span>
                        {filtredParticipans.length > 0 && (
                            <Badge className="bg-gray-100 text-[#212529] rounded-lg px-2 py-1">
                                <Mail className="h-3 w-3 mr-1" />
                                {filtredParticipans.length} emails
                            </Badge>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterHeader;
