import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle2, Clock, Download, Filter, Presentation, Users, XCircle, ChevronLeft, ChevronRight, LayoutGrid, Rows } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import FilterHeader from '../../../components/filter-header';
import ParticipantCard from './partials/ParticipantCard';
import ParticipantsTable from './partials/ParticipantsTable';
import AdminPageHeader from '../components/AdminPageHeader';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Participants() {
	const { participants = [], infosessions = [], statusCounts = {} ,availableColumns = { default: {}, optional: {} }} = usePage().props;
	const [filtredParticipants, setFiltredParticipants] = useState(participants);
	const params = new URLSearchParams(window.location.search);
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

	const getAvailableOptionalFields = () => {
		if (!availableColumns.optional || Object.keys(availableColumns.optional).length === 0) {
			return {
				birthday: 'Birthday',
				age: 'Age',
				phone: 'Phone', 
				city: 'City',
				prefecture: 'Prefecture',
				gender: 'Gender',
				motivation: 'Motivation',
				source: 'How They Found LionsGeek',
				current_step: 'Current Step',
				is_visited: 'Have Visited',
				created_at: 'Created At',
				updated_at: 'Updated At'
			};
		}
		return availableColumns.optional;
	};

	const [exportFilters, setExportFilters] = useState(() => {
		const initialState = {};
		const optionalFields = getAvailableOptionalFields();
		Object.keys(optionalFields).forEach(key => {
			initialState[key] = false;
		});
		return initialState;
	});

	// dynamic filter participant
	const dynamicStepsCount = useMemo(() => {
		return {
			total: filtredParticipants.length,
			info_session: filtredParticipants.filter((p) => p?.info_session != null).length,
			interview: filtredParticipants.filter((p) => 
				p?.current_step && [
					'interview', 'interview_pending', 'interview_failed',
					'jungle', 'jungle_failed'
				].includes(p.current_step)
			).length,
			advanced: filtredParticipants.filter((p) => 
				p?.current_step && [
					'jungle', 'jungle_failed'
				].includes(p.current_step)
			).length,
			school: filtredParticipants.filter((p) => 
				p?.current_step && ['coding_school', 'media_school'].includes(p.current_step)
			).length,
		};
	}, [filtredParticipants]);

	// FilterHeader will manage filtering; initialize with all participants
	useEffect(() => {
		setFiltredParticipants(participants);
	}, [participants]);

	// Reset to first page when filtered participants change (from FilterHeader)
	useEffect(() => {
		setCurrentPage(1);
	}, [filtredParticipants]);

	// Pagination calculations
	const totalParticipants = filtredParticipants.length;
	const totalPages = Math.ceil(totalParticipants / participantsPerPage);
	const startIndex = (currentPage - 1) * participantsPerPage;
	const endIndex = startIndex + participantsPerPage;
	const paginatedParticipants = filtredParticipants.slice(startIndex, endIndex);

	const handleViewChange = (newView) => {
		setView(newView);
		const params = new URLSearchParams(window.location.search);
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
				<AdminPageHeader
					icon={Users}
					title="Participants Management"
					description="Manage and track participant progress"
					actions={
						<div className='flex gap-3 max-md:hidden'>
							<a href="/admin/questions/export">
								<Button className="flex justify-center transform cursor-pointer items-center rounded-lg bg-[#fee819] px-2 py-2 h-fit lg:w-fit text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
									<Download className="mr-2 h-4 w-4" />
									Export Questions
								</Button>
							</a>

							<Dialog>
								<form>
								<DialogTrigger asChild>
									<Button className="flex justify-center transform cursor-pointer items-center rounded-lg bg-[#fee819] px-2 py-2 h-fit lg:w-fit text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
										<Download className="mr-2 h-4 w-4" />
										Export Students
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Filter Export</DialogTitle> 
									</DialogHeader>
									<div className="grid gap-4">
										<div className="space-y-3">
											<h4 className="font-medium text-sm text-gray-900">Select fields to export:</h4>
											
											<div className="space-y-2 p-3 bg-gray-50 rounded-md">
												<p className="text-xs text-gray-600 font-medium">Always included:</p>
												<div className="flex flex-wrap gap-2">
													{Object.entries(availableColumns.default || {}).map(([field, label]) => (
														<span key={field} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
															{label}
														</span>
													))}
												</div>
											</div>

											<div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
												{Object.entries(getAvailableOptionalFields()).map(([key, label]) => (
													<div key={key} className="flex items-center space-x-2">
														<input
															type="checkbox"
															id={key}
															checked={exportFilters[key] || false}
															onChange={(e) => setExportFilters(prev => ({
																...prev,
																[key]: e.target.checked
															}))}
															className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
														/>
														<label htmlFor={key} className="text-sm text-gray-700 cursor-pointer">
															{label}
														</label>
													</div>
												))}
											</div>
										</div>
									</div>
									<DialogFooter>
										<div className="flex items-center justify-between">
											<div className="flex gap-2 w-fit">
												
											</div>
											<div className="flex items-center gap-3 w-fit">
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => setExportFilters(prev => {
														const newState = {};
														Object.keys(getAvailableOptionalFields()).forEach(key => {
															newState[key] = true;
														});
														return newState;
													})}
													className="transform cursor-pointer items-center rounded-lg bg-gray-50 px-2 py-2 h-fit lg:w-fit text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-white"
												>
													Select All
												</Button>
												<Button
													type="button"
													variant="outline" 
													size="sm"
													onClick={() => setExportFilters(prev => {
														const newState = {};
														Object.keys(getAvailableOptionalFields()).forEach(key => {
															newState[key] = false;
														});
														return newState;
													})}
													className="transform cursor-pointer items-center rounded-lg bg-gray-50 px-2 py-2 h-fit lg:w-fit text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-white"
												>
													Deselect All
												</Button>
												<DialogClose asChild>
													<Button variant="outline" className="transform cursor-pointer items-center rounded-lg bg-gray-50 px-2 py-2 h-fit lg:w-fit text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-white">
														Cancel
													</Button>
												</DialogClose>
													<Button
														onClick={() => {
															const params = new URLSearchParams();
															
															Object.entries(exportFilters).forEach(([key, value]) => {
																if (value) {
																	params.append('fields[]', key);
																}
															});
															
															const filteredIds = filtredParticipants.map(p => p.id);
															filteredIds.forEach(id => {
																params.append('participant_ids[]', id);
															});
															
															window.location.href = `/admin/participant/export?${params.toString()}`;
														}}
														className="flex justify-center transform cursor-pointer items-center rounded-lg bg-[#212529] px-2 py-2 h-fit lg:w-fit text-sm font-medium text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
													>
														<Download className="mr-1 h-4 w-4" />
														Export
													</Button>
											</div>
										</div>
									</DialogFooter>
								</DialogContent>
								</form>
							</Dialog>

						</div>
					}
				/>

				{/* Statistics Cards */}
				<div className="mx-auto -mt-4 max-w-7xl px-6">
					<div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
						<Card className="border-0 bg-white shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">Total Participants</p>
										<p className="text-3xl font-bold text-[#212529]">{dynamicStepsCount.total}</p>
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
										<p className="text-3xl font-bold text-[#212529]">{dynamicStepsCount.info_session}</p>
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
										<p className="text-3xl font-bold text-[#212529]">{dynamicStepsCount.interview}</p>
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
										<p className="text-3xl font-bold text-[#212529]">{dynamicStepsCount.advanced}</p>
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

									{filtredParticipants?.length !== totalParticipants && (
										<Badge variant="secondary" className="bg-gray-100 px-2 py-1 text-[#212529]">
											{filtredParticipants?.length} of {totalParticipants}
										</Badge>
									)}
								</div>
							</div>
							<div className="mt-4">
								{/* FilterHeader manages status + step + search */}
								<div className="flex-1">
									<FilterHeader
										participants={participants}
										infosessions={infosessions}
										setFiltredParticipants={setFiltredParticipants}
										statusCounts={statusCounts}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Participants View */}
				<div className="mx-auto max-w-7xl px-6 pb-8">
					{/* View toggle at top-left of table/list area */}
					<div className="mb-4 flex items-center gap-2">
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
