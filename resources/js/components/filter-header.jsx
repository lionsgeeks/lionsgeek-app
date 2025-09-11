import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clipboard, Copy, Mail, RotateCcw, Search } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import InterviewDialog from './interviewDialog';
import InviteDialog from './inviteDialog';

const FilterHeader = ({ participants = [], infosession, infosessions = [], setFiltredParticipants, statusCounts = {} }) => {
	const [search, setSearch] = useState('');
	const [selectedStep, setSelectedStep] = useState('');
	const [selectedSession, setSelectedSession] = useState('');
	const [selectedPromo, setSelectedPromo] = useState('');
	const [selectedTrack, setSelectedTrack] = useState('');
	const [copy, setCopy] = useState(true);

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
		const raw = (participant?.formation_field ?? participant?.info_session?.formation ?? '').toString().toLowerCase();
		if (raw.includes('coding')) return 'coding';
		if (raw.includes('media')) return 'media';
		return '';
	};

	const filtredParticipans =
		participants?.filter((participant) => {
			if (!participant) return false;

			const matchesSearch =
				!search ||
				participant?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
				participant?.email?.toLowerCase().includes(search.toLowerCase());
			const matchesSession = !selectedSession || selectedSession === 'All' || participant?.info_session?.name === selectedSession;

			// Promo filter (case-insensitive)
			const participantPromo = getParticipantPromo(participant);
			const matchesPromo = !selectedPromo || selectedPromo === 'All' || participantPromo === selectedPromo.toLowerCase();

			// Track filter
			const participantTrack = getParticipantTrack(participant);
			const matchesTrack = !selectedTrack || selectedTrack === 'All' || participantTrack === selectedTrack.toLowerCase();

			// If the Step select currently holds a status value, filter by status; otherwise by current_step
			let matchesStep = true;
			if (selectedStep && selectedStep !== 'All') {
				if (isStatusValue(selectedStep)) {
					matchesStep = selectedStep === 'all' ? true : participant?.status === selectedStep;
				} else {
					matchesStep = participant?.current_step === selectedStep;
				}
			}

			return matchesSearch && matchesSession && matchesPromo && matchesTrack && matchesStep;
		}) || [];

	useEffect(() => {
		setFiltredParticipants(filtredParticipans);
	}, [search, selectedSession, selectedStep, selectedPromo, selectedTrack]);

	const hasActiveFilters = search || selectedStep || selectedSession || selectedPromo || selectedTrack;

	const handleReset = () => {
		setSearch('');
		setSelectedStep('');
		setSelectedSession('');
		setSelectedPromo('');
		setSelectedTrack('');
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
			<div className="absolute right-0 -top-12">
				<Button
					onClick={handleCopyEmails}
					className="transform rounded-lg bg-[#212529] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
				>
					{copy ? <Copy className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
					{copy ? 'Copy Emails' : 'Copied!'}
				</Button>
			</div>
			
			{/* Filter Controls */}
			<div className="flex flex-wrap items-center gap-3">
				{/* Search Input */}
				<div className="relative max-w-md min-w_[280px] flex-1 min-w-[280px]">
					<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search by name or email..."
						className="rounded-lg border pl-10 transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
					/>
				</div>

				{/* Promo Filter */}
				{promoOptions?.length > 0 && (
					<Select onValueChange={setSelectedPromo} value={selectedPromo}>
						<SelectTrigger className="w-48 rounded-lg border transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20">
							<SelectValue placeholder="Filter By Promo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All Promos</SelectItem>
							{promoOptions.map((promo) => (
								<SelectItem key={`promo-${promo}`} value={promo}>
									{formatPromoLabel(promo)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}

				{/* Track Filter (Coding/Media) */}
				<Select onValueChange={setSelectedTrack} value={selectedTrack}>
					<SelectTrigger className="w-44 rounded-lg border transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20 capitalize">
						<SelectValue placeholder="Filter By Track" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Tracks</SelectItem>
						<SelectItem className="capitalize" value="coding">Coding</SelectItem>
						<SelectItem className="capitalize" value="media">Media</SelectItem>
					</SelectContent>
				</Select>

				{/* Session Filter */}
				{infosessions && (
					<Select onValueChange={setSelectedSession} value={selectedSession}>
						<SelectTrigger className="w-56 rounded-lg border transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20">
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

				{/* Step Filter with status options on top and counts on the right */}
				<Select onValueChange={setSelectedStep} value={selectedStep}>
					<SelectTrigger className="w-56 rounded-lg border focus:border-[#212529]">
						<SelectValue placeholder="Filter By Step" />
					</SelectTrigger>
					<SelectContent>
						{/* Status options at top */}
						<SelectItem value="approved">
							<span>Approved<span className="ml-1 text-gray-500">({statusCounts.approved || 0})</span></span>
						</SelectItem>
						<SelectItem value="pending">
							<span>Pending<span className="ml-1 text-gray-500">({statusCounts.pending || 0})</span></span>
						</SelectItem>
						<SelectItem value="rejected">
							<span>Rejected<span className="ml-1 text-gray-500">({statusCounts.rejected || 0})</span></span>
						</SelectItem>
						<SelectItem value="all">
							<span>All<span className="ml-1 text-gray-500">({statusCounts.all || 0})</span></span>
						</SelectItem>
						{/* Divider equivalent: keep list order */}
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

				{/* Reset Button moved into controls row (left) */}
				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						onClick={handleReset}
						className="ml-auto rounded-lg text-[#212529] transition-all duration-200 ease-in-out hover:bg-gray-50 hover:text-[#212529]/80"
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
		</div>
	);
};

export default FilterHeader;
