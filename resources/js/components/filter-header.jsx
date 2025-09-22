import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clipboard, Copy, Mail, RotateCcw, Search, CheckCircle2, Clock, XCircle, Users, ListChecks, Presentation, User, Mountain, Ban, GraduationCap, Film, UserCheck, Calendar, Filter } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import InterviewDialog from './interviewDialog';
import InviteDialog from './inviteDialog';
import InviteToJungle from '../pages/admin/infoSessions/partials/InviteToJungle';
import InviteToSchool from '../pages/admin/infoSessions/partials/InviteToSchool';
const FilterHeader = ({ participants = [], infosession, infosessions = [], setFiltredParticipants, statusCounts = {} }) => {
    const STORAGE_KEY = 'admin_participants_filters_v1';
    const [search, setSearch] = useState('');
    const [selectedStep, setSelectedStep] = useState('');
    const [selectedSession, setSelectedSession] = useState('');
    const [selectedPromo, setSelectedPromo] = useState('');
    const [selectedTrack, setSelectedTrack] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [dateSort, setDateSort] = useState('');
    const [copy, setCopy] = useState(true);

    // Modal state and draft filter values
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [draftStep, setDraftStep] = useState('');
    const [draftSession, setDraftSession] = useState('');
    const [draftPromo, setDraftPromo] = useState('');
    const [draftTrack, setDraftTrack] = useState('');
    const [draftGender, setDraftGender] = useState('');
    const [draftDateSort, setDraftDateSort] = useState('');
    const [isInviteOpen, setIsInviteOpen] = useState(false);

    const isStatusValue = (value) => ['approved', 'pending', 'rejected', 'all'].includes(value);

    // Helper: Title-case a promo label (e.g., "promo 5" -> "Promo 5")
    const formatPromoLabel = (label) =>
        (label || '')
            .toString()
            .toLowerCase()
            .split(' ')
            .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
            .join(' ');

    // Derive distinct promo names from infosessions (prefix before ':') - case-insensitive uniqueness
    const promoOptions = useMemo(() => {
        const lowerSet = new Set();
        (infosessions || []).forEach((s) => {
            if (s?.name && s.name.includes(':')) {
                const raw = s.name.slice(0, s.name.indexOf(':')).trim().toLowerCase();
                if (raw) lowerSet.add(raw);
            }
        });
        return Array.from(lowerSet).sort(); // values are lowercased
    }, [infosessions]);

    // Helper to extract promo for a participant based on its related info_session name (lowercased)
    const getParticipantPromo = (participant) => {
        const name = participant?.info_session?.name;
        if (!name || !name.includes(':')) return null;
        return name.slice(0, name.indexOf(':')).trim().toLowerCase();
    };

    // Helper to extract track (coding/media)
    const getParticipantTrack = (participant) => {
        const sessionFormation = participant?.info_session?.formation?.toString().toLowerCase() || '';
        if (sessionFormation.includes('coding')) return 'coding';
        if (sessionFormation.includes('media')) return 'media';

        const formationField = participant?.formation_field?.toString().toLowerCase() || '';
        if (formationField.includes('coding')) return 'coding';
        if (formationField.includes('media')) return 'media';

        const sessionName = participant?.info_session?.name?.toString().toLowerCase() || '';
        if (sessionName.includes('coding')) return 'coding';
        if (sessionName.includes('media')) return 'media';
        return '';
    };

    // Session options filtered by selectedTrack (coding/media)
    const sessionOptions = useMemo(() => {
        let list = infosessions || [];
        if (selectedTrack && selectedTrack !== 'All') {
            const wanted = selectedTrack.toLowerCase();
            list = list.filter((s) => (s?.formation || '').toString().toLowerCase().includes(wanted));
        }
        // Also filter by selectedPromo (prefix before ':') when provided
        if (selectedPromo && selectedPromo !== 'All') {
            const wantedPromo = selectedPromo.toLowerCase();
            list = list.filter((s) => {
                const name = s?.name || '';
                if (!name.includes(':')) return false;
                const prefix = name.slice(0, name.indexOf(':')).trim().toLowerCase();
                return prefix === wantedPromo;
            });
        }
        // Always include "No Infosession" option
        return [{ name: 'No Infosession', id: 'no-infosession' }, ...list];
    }, [infosessions, selectedTrack, selectedPromo]);

    // Modal session options based on draft values
    const sessionOptionsDraft = useMemo(() => {
        let list = infosessions || [];
        if (draftTrack && draftTrack !== 'All') {
            const wanted = draftTrack.toLowerCase();
            list = list.filter((s) => (s?.formation || '').toString().toLowerCase().includes(wanted));
        }
        if (draftPromo && draftPromo !== 'All') {
            const wantedPromo = draftPromo.toLowerCase();
            list = list.filter((s) => {
                const name = s?.name || '';
                if (!name.includes(':')) return false;
                const prefix = name.slice(0, name.indexOf(':')).trim().toLowerCase();
                return prefix === wantedPromo;
            });
        }
        return [{ name: 'No Infosession', id: 'no-infosession' }, ...list];
    }, [infosessions, draftTrack, draftPromo]);

    // If current selectedSession is not in filtered sessionOptions, reset it
    useEffect(() => {
        if (!selectedSession) return;
        const exists = sessionOptions.some((s) => s?.name === selectedSession);
        if (!exists) setSelectedSession('');
    }, [sessionOptions, selectedSession]);

    // Keep draft session valid while filtering inside modal
    useEffect(() => {
        if (!isFilterOpen) return;
        if (!draftSession) return;
        const exists = sessionOptionsDraft.some((s) => s?.name === draftSession);
        if (!exists) setDraftSession('');
    }, [isFilterOpen, sessionOptionsDraft, draftSession]);

    const filtredParticipans = useMemo(() => {
        let filtered = participants?.filter((participant) => {
            if (!participant) return false;

            // Search
            const matchesSearch = !search ||
                participant?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
                participant?.email?.toLowerCase().includes(search.toLowerCase());

            // Session filter
            const matchesSession = !selectedSession || selectedSession === 'All' ||
                (selectedSession === 'No Infosession' ?
                    !participant?.info_session :
                    participant?.info_session?.name === selectedSession);

            // Promo filter
            const participantPromo = getParticipantPromo(participant);
            const matchesPromo = !selectedPromo || selectedPromo === 'All' ||
                participantPromo === selectedPromo.toLowerCase();

            // Track filter
            const participantTrack = getParticipantTrack(participant);
            const matchesTrack = !selectedTrack || selectedTrack === 'All' ||
                participantTrack === selectedTrack.toLowerCase();

            // Gender filter
            const matchesGender = !selectedGender || selectedGender === 'All' ||
                participant?.gender?.toLowerCase() === selectedGender.toLowerCase();

            // Step filter
            let matchesStep = true;
            if (selectedStep && selectedStep !== 'All') {
                if (isStatusValue(selectedStep)) {
                    if (selectedStep === 'all') {
                        matchesStep = true;
                    } else {
                        matchesStep = participant?.status === selectedStep;
                    }
                } else {
                    switch (selectedStep) {
                        case 'info_session':
                            matchesStep = participant?.info_session != null;
                            break;
                        case 'interview':
                            matchesStep = participant?.current_step && [
                                'interview', 'interview_pending', 'interview_failed',
                                'jungle', 'jungle_failed', 'coding_school', 'media_school'
                            ].includes(participant.current_step);
                            break;
                        case 'interview_pending':
                            matchesStep = participant?.current_step === 'interview_pending';
                            break;
                        case 'interview_failed':
                            matchesStep = participant?.current_step === 'interview_failed';
                            break;
                        case 'jungle':
                            matchesStep = ['jungle', 'jungle_failed'].includes(participant?.current_step);
                            break;
                        case 'jungle_failed':
                            matchesStep = participant?.current_step === 'jungle_failed';
                            break;
                        default:
                            matchesStep = participant?.current_step === selectedStep;
                    }
                }
            }

            return matchesSearch && matchesSession && matchesPromo && matchesTrack && matchesGender && matchesStep;
        }) || [];

        return filtered;
    }, [participants, search, selectedSession, selectedStep, selectedPromo, selectedTrack, selectedGender]);

    const dynamicStatusCounts = useMemo(() => {
        return {
            approved: filtredParticipans.filter(p => p?.status === 'approved').length,
            pending: filtredParticipans.filter(p => p?.status === 'pending').length,
            rejected: filtredParticipans.filter(p => p?.status === 'rejected').length,
            all: filtredParticipans.length,
        };
    }, [filtredParticipans]);

    useEffect(() => {
        if (setFiltredParticipants) {
            let result = [...filtredParticipans];

            if (dateSort && dateSort !== 'All') {
                result.sort((a, b) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);

                    if (dateSort === 'newest') {
                        return dateB - dateA;
                    } else if (dateSort === 'oldest') {
                        return dateA - dateB;
                    }
                    return 0;
                });
            }

            setFiltredParticipants(result);
        }
    }, [filtredParticipans, dateSort, setFiltredParticipants]);

    // Initialize selectedStep from URL status on mount (only for status values)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        const urlStatus = params.get('status');
        if (urlStatus && isStatusValue(urlStatus)) {
            setSelectedStep(urlStatus);
        }
    }, []);

    // Persist status selection to URL; remove when a non-status step is chosen
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        if (selectedStep && isStatusValue(selectedStep)) {
            params.set('status', selectedStep);
        } else {
            params.delete('status');
        }
        const newUrl = `${location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }, [selectedStep]);

    // Load saved filters on participants index only (browser-only)
    const isParticipantsIndex = Array.isArray(infosessions) && !infosession;
    useEffect(() => {
        if (!isParticipantsIndex) return;
        if (typeof window === 'undefined') return;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const saved = JSON.parse(raw);
                if (typeof saved.search === 'string') setSearch(saved.search);
                if (typeof saved.selectedStep === 'string') setSelectedStep(saved.selectedStep);
                if (typeof saved.selectedSession === 'string') setSelectedSession(saved.selectedSession);
                if (typeof saved.selectedPromo === 'string') setSelectedPromo(saved.selectedPromo);
                if (typeof saved.selectedTrack === 'string') setSelectedTrack(saved.selectedTrack);
                if (typeof saved.selectedGender === 'string') setSelectedGender(saved.selectedGender);
                if (typeof saved.dateSort === 'string') setDateSort(saved.dateSort);
            }
        } catch (_) { }
    }, [isParticipantsIndex]);

    // Save filters on change for participants index only (browser-only)
    useEffect(() => {
        if (!isParticipantsIndex) return;
        if (typeof window === 'undefined') return;
        try {
            const payload = {
                search,
                selectedStep,
                selectedSession,
                selectedPromo,
                selectedTrack,
                selectedGender,
                dateSort,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (_) { }
    }, [isParticipantsIndex, search, selectedStep, selectedSession, selectedPromo, selectedTrack, selectedGender, dateSort]);

    const hasActiveFilters = search || selectedStep || selectedSession || selectedPromo || selectedTrack || selectedGender || dateSort;

    // Open modal and seed drafts
    const openFilterModal = () => {
        setDraftStep(selectedStep || '');
        setDraftSession(selectedSession || '');
        setDraftPromo(selectedPromo || '');
        setDraftTrack(selectedTrack || '');
        setDraftGender(selectedGender || '');
        setDraftDateSort(dateSort || '');
        setIsFilterOpen(true);
    };

    const applyFilters = () => {
        setSelectedStep(draftStep);
        setSelectedSession(draftSession);
        setSelectedPromo(draftPromo);
        setSelectedTrack(draftTrack);
        setSelectedGender(draftGender);
        setDateSort(draftDateSort);
        setIsFilterOpen(false);
    };

    const handleReset = () => {
        setSearch('');
        setSelectedStep('');
        setSelectedSession('');
        setSelectedPromo('');
        setSelectedTrack('');
        setSelectedGender('');
        setDateSort('');

        if (setFiltredParticipants) {
            setFiltredParticipants(participants);
        }

        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            params.delete('status');
            window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
        }

        // Clear persisted filters on participants index
        if (isParticipantsIndex && typeof window !== 'undefined') {
            try { localStorage.removeItem(STORAGE_KEY); } catch (_) { }
        }
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
        <div className="relative space-y-4">
            {/* Copy Emails aligned with title (top-right) */}
            <div className="absolute right-0 -top-12 hidden sm:block">
                <Button
                    onClick={handleCopyEmails}
                    className="transform rounded-lg bg-[#212529] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
                >
                    {copy ? <Copy className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
                    {copy ? 'Copy Emails' : 'Copied!'}
                </Button>
            </div>
            {/* Mobile: Copy Emails under the title */}
            <div className="sm:hidden mt-2">
                <Button
                    onClick={handleCopyEmails}
                    className="rounded-lg bg-[#212529] text-white transition-colors hover:bg-[#fee819] hover:text-[#212529]"
                >
                    {copy ? <Copy className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
                    {copy ? 'Copy Emails' : 'Copied!'}
                </Button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3">
                {/* Search Input */}
                <div className="relative w-full sm:max-w-md sm:min-w-[280px] flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="rounded-lg border border-gray-300 bg-white pl-10 h-9 text-[#212529] placeholder:text-gray-400 shadow-sm hover:border-gray-400 focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/30"
                    />
                </div>

                {/* Filter button opens modal */}
                <Button
                    onClick={openFilterModal}
                    variant="outline"
                    className="rounded-lg border border-gray-300 bg-white text-[#212529] hover:bg-gray-50"
                >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
                {/* Email Invitation Section in Modal */}
                <div className="">
                    <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529]">
                                Invite People
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-3xl">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-[#212529]">
                                    Invite People
                                </DialogTitle>
                            </DialogHeader>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
                                <InviteToJungle infosession={infosession} closeParent={() => setIsInviteOpen(false)} />
                                <InviteToSchool infosession={infosession} closeParent={() => setIsInviteOpen(false)} />
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>


                {/* Reset Button - next to Filter */}
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="rounded-lg text-[#212529] transition-all duration-200 ease-in-out hover:bg-gray-50 hover:text-[#212529]/80"
                    >
                        <RotateCcw className="mr-1 h-4 w-4" />
                        Reset
                    </Button>
                )}

                {/* Action Buttons for Infosession Detail Page */}
                {!infosessions && (
                    <div className="ml-auto flex gap-3">
                        <InterviewDialog infosession={infosession} />
                        <InviteDialog infosession={infosession} step={'jungle'} />
                        <InviteDialog infosession={infosession} step={'school'} />
                    </div>
                )}
            </div>

            {/* Results Summary */}
            {participants && (
                <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Showing <span className="font-medium text-[#212529]">{filtredParticipans.length}</span> of{' '}
                            <span className="font-medium text-[#212529]">{participants.length}</span> participants
                        </span>
                        {filtredParticipans.length > 0 && (
                            <Badge className="rounded-lg bg-gray-100 px-2 py-1 text-[#212529]">
                                <Mail className="mr-1 h-3 w-3" />
                                {filtredParticipans.length} emails
                            </Badge>
                        )}
                    </div>
                </div>
            )}

            {/* Filter Modal */}
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogContent className="sm:max-w-2xl max-h-[85vh]">
                    <DialogHeader>
                        <DialogTitle className="text-[#212529]">Filter Participants</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[60vh] pr-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Promo */}
                            {promoOptions?.length > 0 && (
                                <Select onValueChange={setDraftPromo} value={draftPromo}>
                                    <SelectTrigger className="w-full rounded-lg border transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20">
                                        <SelectValue placeholder="Filter By Promo" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-64 overflow-y-auto">
                                        <SelectItem value="All">All Promos</SelectItem>
                                        {promoOptions.map((promo) => (
                                            <SelectItem key={`promo-${promo}`} value={promo}>
                                                {formatPromoLabel(promo)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            {/* Track (hide on infosession detail) */}
                            {!infosession && (
                                <Select onValueChange={setDraftTrack} value={draftTrack}>
                                    <SelectTrigger className="w-full rounded-lg border transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20 capitalize">
                                        <SelectValue placeholder="Filter By Track" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-64 overflow-y-auto">
                                        <SelectItem value="All">All Tracks</SelectItem>
                                        <SelectItem className="capitalize" value="coding">Coding</SelectItem>
                                        <SelectItem className="capitalize" value="media">Media</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}

                            {/* Session (depends on draftTrack/draftPromo) — hide on infosession detail */}
                            {!infosession && sessionOptionsDraft && (
                                <Select onValueChange={setDraftSession} value={draftSession}>
                                    <SelectTrigger className="w-full rounded-lg border transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20">
                                        <SelectValue placeholder="Filter By Session" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-64 overflow-y-auto">
                                        <SelectItem value="All">All Sessions</SelectItem>
                                        {sessionOptionsDraft.map((session, index) => (
                                            <SelectItem key={session.id || index} value={session.name}>
                                                {session.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            {/* Step */}
                            <Select onValueChange={setDraftStep} value={draftStep}>
                                <SelectTrigger className="w-full rounded-lg border focus:border-[#212529]">
                                    <SelectValue placeholder="Filter By Step" />
                                </SelectTrigger>
                                <SelectContent className="max-h-64 overflow-y-auto">
                                    <SelectItem value="approved">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                            <span>Approved<span className="ml-1 text-gray-500">({dynamicStatusCounts.approved || 0})</span></span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-orange-600" />
                                            <span>Pending<span className="ml-1 text-gray-500">({dynamicStatusCounts.pending || 0})</span></span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                        <div className="flex items-center gap-2">
                                            <XCircle className="h-4 w-4 text-red-600" />
                                            <span>Rejected<span className="ml-1 text-gray-500">({dynamicStatusCounts.rejected || 0})</span></span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="all">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-gray-500" />
                                            <span>All<span className="ml-1 text-gray-500">({dynamicStatusCounts.all || 0})</span></span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="All">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <ListChecks className="h-4 w-4 text-gray-500" />
                                            <span>All Steps</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="info_session">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Presentation className="h-4 w-4 text-gray-500" />
                                            <span>Info Session</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="interview">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span>Interview</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="interview_pending">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            <span>Interview Pending</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="interview_failed">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Ban className="h-4 w-4 text-gray-500" />
                                            <span>Interview Failed</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="jungle">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Mountain className="h-4 w-4 text-gray-500" />
                                            <span>Jungle</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="jungle_failed">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Ban className="h-4 w-4 text-gray-500" />
                                            <span>Jungle Failed</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Gender */}
                            <Select onValueChange={setDraftGender} value={draftGender}>
                                <SelectTrigger className="w-full rounded-lg border transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20">
                                    <SelectValue placeholder="Filter By Gender" />
                                </SelectTrigger>
                                <SelectContent className="max-h-64 overflow-y-auto">
                                    <SelectItem value="All">All Genders</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Date Sort */}
                            <Select onValueChange={setDraftDateSort} value={draftDateSort}>
                                <SelectTrigger className="w-full rounded-lg border transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20">
                                    <SelectValue placeholder="Sort By Date" />
                                </SelectTrigger>
                                <SelectContent className="max-h-64 overflow-y-auto">
                                    <SelectItem value="All">Default Order</SelectItem>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-end">
                        <Button variant="secondary" onClick={() => setIsFilterOpen(false)}>Cancel</Button>
                        <Button className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529]" onClick={applyFilters}>Apply</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FilterHeader;
