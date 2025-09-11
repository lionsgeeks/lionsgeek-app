import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle2, Clock, Download, Filter, Presentation, Users, XCircle, ChevronLeft, ChevronRight, LayoutGrid, Rows } from 'lucide-react';
import { useEffect, useState } from 'react';
import FilterHeader from '../../../components/filter-header';
import ParticipantCard from './partials/ParticipantCard';
import ParticipantsTable from './partials/ParticipantsTable';

export default function Participants() {
	const { participants = [], infosessions = [], statusCounts = {} } = usePage().props;
	const [filtredParticipants, setFiltredParticipants] = useState(participants);
	const params = new URLSearchParams(window.location.search);
	const statusFromUrl = params.get('status');
	const initialStatus = ['approved', 'pending', 'rejected', 'all'].includes(statusFromUrl) ? statusFromUrl : 'approved';
	const [selectedStatus, setSelectedStatus] = useState(initialStatus);
	const initialView = params.get('view') === 'table' ? 'table' : 'cards';
	const [view, setView] = useState(initialView);

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const participantsPerPage = 24
	const { participant } = usePage().props;

	const breadcrumbs = [
		{
			title: 'Participants',
			href: '/admin/participants',
		},
	];

	// Filter participants based on selected status only
	const getStatusFilteredParticipants = (status) => {
		switch (status) {
			case 'pending':
				return participants.filter((p) => p.status === 'pending');
			case 'rejected':
				return participants.filter((p) => p.status === 'rejected');
			case 'approved':
				return participants.filter((p) => p.status === 'approved');
			case 'all':
			default:
				return participants;
		}
	};

	// Get participants filtered by status only (FilterHeader will handle other filters)
	const statusFilteredParticipants = getStatusFilteredParticipants(selectedStatus);

	// Update filtered participants when status changes
	useEffect(() => {
		const filtered = getStatusFilteredParticipants(selectedStatus);
		setFiltredParticipants(filtered);
		setCurrentPage(1); // Reset to first page when filters change
	}, [selectedStatus, participants]);

	// Reset to first page when filtered participants change (from FilterHeader)
	useEffect(() => {
		setCurrentPage(1);
	}, [filtredParticipants]);

	// Calculate statistics with safe access
	const stepsCount = {
		info_session: filtredParticipants?.filter((p) => p?.current_step === 'info_session')?.length || 0,
		interview: filtredParticipants?.filter((p) => p?.current_step === 'interview')?.length || 0,
		jungle: filtredParticipants?.filter((p) => p?.current_step === 'jungle')?.length || 0,
		school: filtredParticipants?.filter((p) => p?.current_step?.includes('school'))?.length || 0,
	};

	// Pagination calculations
	const totalParticipants = filtredParticipants.length;
	const totalPages = Math.ceil(totalParticipants / participantsPerPage);
	const startIndex = (currentPage - 1) * participantsPerPage;
	const endIndex = startIndex + participantsPerPage;
	const paginatedParticipants = filtredParticipants.slice(startIndex, endIndex);

	// Handle status change without page refresh
	const handleStatusChange = (newStatus) => {
		setSelectedStatus(newStatus);
		setCurrentPage(1);
		const params = new URLSearchParams(window.location.search);
		params.set('status', newStatus);
		params.set('view', view);
		window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
	};

	const handleViewChange = (newView) => {
		setView(newView);
		const params = new URLSearchParams(window.location.search);
		params.set('status', selectedStatus);
		params.set('view', newView);
		window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
	};

	// Pagination handlers
	const goToPage = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Participants" />

			<div className="min-h-screen bg-white">
				{/* Header Section */}
				<div className="bg-[#212529] py-8 text-white">
					<div className="mx-auto max-w-7xl px-6">
						<div className="flex items-center justify-between">
							<div className="flex lg:items-center gap-3">
								<div className="rounded-lg bg-[#fee819] p-3 lg:flex hidden">
									<Users className="h-8 w-8 text-[#212529]" />
								</div>
								<div>
									<h1 className="lg:text-3xl text-2xl lg:font-bold  capitalize">Participants Management</h1>
									<p className="mt-1 text-gray-300 lg:text-lg text-[0.8rem] lg:w-fit w-[90%] ">Manage and track participant progress</p>
								</div>
							</div>
							<div className="flex lg:flex-row flex-col items-start gap-3">
								<a href="/admin/questions/export">
									<Button className="flex justify-center transform cursor-pointer items-center rounded-lg bg-[#fee819] px-2 py-2 h-fit lg:w-fit text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
										<Download className="mr-2 h-4 w-4" />
										Export Questions
									</Button>
								</a>
								<a href={'/admin/participant/export'}>
									<Button className="flex justify-center transform cursor-pointer items-center rounded-lg bg-[#fee819] px-2 py-2 h-fit lg:w-fit text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
										<Download className="mr-2 h-4 w-4" />
										Export Students
									</Button>
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Statistics Cards */}
				<div className="mx-auto -mt-4 max-w-7xl px-6">
					<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
						<Card className="border-0 bg-white shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">Total Participants</p>
										<p className="text-3xl font-bold text-[#212529]">{totalParticipants}</p>
									</div>
									<div className="rounded-lg bg-gray-100 p-3">
										<Users className="h-6 w-6 text-[#212529]" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-0 bg-white shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">Info Session</p>
										<p className="text-3xl font-bold text-[#212529]">{stepsCount.info_session}</p>
									</div>
									<div className="rounded-lg bg-gray-100 p-3">
										<Presentation className="h-6 w-6 text-[#212529]" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-0 bg-white shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">Interview</p>
										<p className="text-3xl font-bold text-[#212529]">{stepsCount.interview}</p>
									</div>
									<div className="rounded-lg bg-gray-100 p-3">
										<Clock className="h-6 w-6 text-[#212529]" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-0 bg-white shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">Advanced</p>
										<p className="text-3xl font-bold text-[#212529]">{stepsCount.jungle + stepsCount.school}</p>
									</div>
									<div className="rounded-lg bg-gray-100 p-3">
										<CheckCircle2 className="h-6 w-6 text-[#212529]" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Filter Section */}
				<div className="mx-auto mb-8 max-w-7xl px-6">
					<Card className="border-0 bg-gray-50">
						<CardContent className="p-6">
							<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2">
										<Filter className="h-5 w-5 text-[#212529]" />
										<h3 className="text-lg font-semibold text-[#212529]">Filter Participants</h3>
									</div>

									<Select value={selectedStatus} onValueChange={handleStatusChange}>
										<SelectTrigger className="w-48">
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="approved">
												<div className="flex items-center gap-2">
													<CheckCircle2 className="h-4 w-4" style={{ color: '#51b04f' }} />
													Approved ({statusCounts.approved || 0})
												</div>
											</SelectItem>
											<SelectItem value="pending">
												<div className="flex items-center gap-2">
													<Clock className="h-4 w-4 text-orange-600" />
													Pending ({statusCounts.pending || 0})
												</div>
											</SelectItem>
											<SelectItem value="rejected">
												<div className="flex items-center gap-2">
													<XCircle className="h-4 w-4" style={{ color: '#ff7376' }} />
													Rejected ({statusCounts.rejected || 0})
												</div>
											</SelectItem>
											<SelectItem value="all">
												<div className="flex items-center gap-2">
													<Users className="h-4 w-4 text-gray-600" />
													All ({statusCounts.all || 0})
												</div>
											</SelectItem>
										</SelectContent>
									</Select>

									{filtredParticipants?.length !== totalParticipants && (
										<Badge variant="secondary" className="bg-gray-100 px-2 py-1 text-[#212529]">
											{filtredParticipants?.length} of {totalParticipants}
										</Badge>
									)}
								</div>

								<div className="flex items-center gap-2">
									<Button
										variant={view === 'cards' ? 'default' : 'outline'}
										size="sm"
										onClick={() => handleViewChange('cards')}
										className="gap-2"
									>
										<LayoutGrid className="h-4 w-4" /> Cards
									</Button>
									<Button
										variant={view === 'table' ? 'default' : 'outline'}
										size="sm"
										onClick={() => handleViewChange('table')}
										className="gap-2"
									>
										<Rows className="h-4 w-4" /> Table
									</Button>
								</div>
							</div>
							<div className="mt-4">
								<FilterHeader
									participants={statusFilteredParticipants}
									infosessions={infosessions}
									setFiltredParticipants={setFiltredParticipants}
								/>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Participants View */}
				<div className="mx-auto max-w-7xl px-6 pb-8">
					{/* Pagination Info */}
					{totalParticipants > 0 && (
						<div className="mb-6 flex items-center justify-between">
							<p className="text-sm text-gray-600">
								Showing {startIndex + 1} to {Math.min(endIndex, totalParticipants)} of {totalParticipants} participants
							</p>
							<p className="text-sm text-gray-600">
								Page {currentPage} of {totalPages}
							</p>
						</div>
					)}

					{filtredParticipants?.length === 0 ? (
						<Card className="border-0 bg-white shadow-lg">
							<CardContent className="p-12 text-center">
								<div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
									<Users className="h-12 w-12 text-gray-400" />
								</div>
								<h2 className="mb-3 text-2xl font-bold text-[#212529]">No Participants Found</h2>
								<p className="mb-6 text-gray-600">
									No participants match your filter criteria. Try adjusting your filters or search terms.
								</p>
							</CardContent>
						</Card>
					) : (
						<>
							{view === 'cards' ? (
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{paginatedParticipants?.map((participant) => (
										<ParticipantCard key={participant.id} participant={participant} />
									))}
								</div>
							) : (
								<ParticipantsTable participants={paginatedParticipants} />
							)}

							{/* Pagination Controls */}
							{totalPages > 1 && (
								<div className="mt-8 flex items-center justify-center space-x-2">
									<Button
										variant="outline"
										size="sm"
										onClick={goToPreviousPage}
										disabled={currentPage === 1}
										className="flex items-center gap-2"
									>
										<ChevronLeft className="h-4 w-4" />
										Previous
									</Button>

									{/* Compact mobile paginator */}
									<div className="flex w-full items-center justify-center sm:hidden">
										<span className="rounded-md border px-3 py-1 text-sm text-gray-700">
											Page {currentPage} of {totalPages}
										</span>
									</div>

									{/* Detailed paginator for >= sm */}
									<div className="hidden items-center space-x-1 sm:flex">
										{/* First page */}
										{currentPage > 3 && (
											<>
												<Button
													variant={1 === currentPage ? "default" : "outline"}
													size="sm"
													onClick={() => goToPage(1)}
													className="min-w-[40px]"
												>
													1
												</Button>
												{currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
											</>
										)}

										{/* Page numbers around current page */}
										{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
											const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
											if (pageNum <= totalPages) {
												return (
													<Button
														key={pageNum}
														variant={pageNum === currentPage ? "default" : "outline"}
														size="sm"
														onClick={() => goToPage(pageNum)}
														className="min-w-[40px]"
													>
														{pageNum}
														</Button>
												);
											}
											return null;
										})}

										{/* Last page */}
										{currentPage < totalPages - 2 && (
											<>
												{currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
												<Button
													variant={totalPages === currentPage ? "default" : "outline"}
													size="sm"
													onClick={() => goToPage(totalPages)}
													className="min-w-[40px]"
												>
													{totalPages}
												</Button>
											</>
										)}
									</div>

									<Button
										variant="outline"
										size="sm"
										onClick={goToNextPage}
										disabled={currentPage === totalPages}
										className="flex items-center gap-2"
									>
										Next
										<ChevronRight className="h-4 w-4" />
									</Button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</AppLayout>
	);
}
