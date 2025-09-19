import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Code2, Copy, GraduationCap, Lock, Palette, Presentation, RefreshCw, TrendingUp, UserCheck, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import FilterHeader from '../../../components/filter-header';
import ParticipantCard from '../participants/partials/ParticipantCard';

const InfosessionDetails = () => {
    const { infosession } = usePage().props;
    const [filtredParticipants, setFiltredParticipants] = useState(infosession?.participants);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const participantsPerPage = 24;

    const dispatchParticipant = (step) => {
        return infosession?.participants.filter((p) => p.current_step === step).length;
    };

    const dispatchGender = (gender) => {
        return infosession?.participants.filter((p) => p.gender === gender).length;
    };

    const getFormationIcon = (formation) => {
        return formation === 'Coding' ? <Code2 className="h-16 w-16 text-white" /> : <Palette className="h-16 w-16 text-white" />;
    };

    const breadcrumbs = [
        {
            title: 'Info Sessions',
            href: `/admin/infosessions`,
        },
        {
            title: infosession.name,
            href: `/admin/infosessions/${infosession.id}`,
        },
    ];

    // Calculate completion rate
    const totalParticipants = infosession.participants.length;
    const completedParticipants = dispatchParticipant('coding_school') + dispatchParticipant('media_school');
    const completionRate = totalParticipants > 0 ? ((completedParticipants / totalParticipants) * 100).toFixed(1) : 0;

    // Pagination calculations
    const totalFilteredParticipants = filtredParticipants?.length || 0;
    const totalPages = Math.ceil(totalFilteredParticipants / participantsPerPage);
    const startIndex = (currentPage - 1) * participantsPerPage;
    const endIndex = startIndex + participantsPerPage;
    const paginatedParticipants = filtredParticipants?.slice(startIndex, endIndex) || [];

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

    const copyPrivateUrl = (token) => {
        const url = `${window.location.origin}/private-session/${token}`;
        navigator.clipboard.writeText(url).then(() => {
            alert('Private URL copied to clipboard!');
        });
    };

    const regenerateToken = (id) => {
        router.post(`/admin/infosessions/${id}/regenerate-token`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${infosession.name} - Session Details`} />
            <div className="min-h-screen bg-gray-50">
                {/* Header Banner */}
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <Button
                            onClick={() => router.visit('/admin/infosessions')}
                            variant="ghost"
                            className="mb-6 rounded-lg text-white transition-all duration-200 ease-in-out hover:bg-[#fee819] hover:text-[#212529]"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Info Sessions
                        </Button>

                        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-[#fee819] p-3">
                                    {infosession.formation === 'Coding' ? (
                                        <Code2 className="h-8 w-8 text-[#212529]" />
                                    ) : (
                                        <Palette className="h-8 w-8 text-[#212529]" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-3xl font-bold capitalize">{infosession.name}</h1>
                                        {infosession.is_private && (
                                            <Badge className="bg-yellow-500 text-yellow-900 flex items-center gap-1">
                                                <Lock className="h-3 w-3" />
                                                Private Session
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="mt-1 text-gray-300">Session details and participant tracking</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-300">Completion Rate</div>
                                <div className="text-3xl font-bold text-[#fee819]">{completionRate}%</div>
                                <div className="text-sm text-gray-300">
                                    {completedParticipants} of {totalParticipants} completed
                                </div>
                            </div>
                        </div>

                        {/* Session Info Cards */}
                        <div className={`mt-6 grid grid-cols-1 gap-4 ${infosession.is_private ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
                            <div className="rounded-lg bg-white/10 p-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-[#fee819]" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-gray-500">Start Date</p>
                                        <p className="font-medium text-white">
                                            {infosession.start_date
                                                ? new Date(infosession.start_date).toLocaleString("en-GB", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                                : ""}
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4">
                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-[#fee819]" />
                                    <div>
                                        <p className="text-sm text-gray-300">Available Places</p>
                                        <p className="font-medium text-white">
                                            {totalParticipants} / {infosession.places}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4">
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="h-5 w-5 text-[#fee819]" />
                                    <div>
                                        <p className="text-sm text-gray-300">Formation Type</p>
                                        <Badge className="mt-1 rounded-lg bg-[#fee819] text-[#212529]">{infosession.formation}</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Private URL Card - Only show for private sessions */}
                            {infosession.is_private && infosession.private_url_token && (
                                <div className="rounded-lg bg-yellow-500/20 border border-yellow-500/30 p-4">
                                    <div className="flex items-center gap-3">
                                        <Lock className="h-5 w-5 text-yellow-400" />
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-300">Private URL</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <Button
                                                    onClick={() => copyPrivateUrl(infosession.private_url_token)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#212529] text-xs"
                                                >
                                                    <Copy className="h-3 w-3 mr-1" />
                                                    Copy
                                                </Button>
                                                <Button
                                                    onClick={() => regenerateToken(infosession.id)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#212529] text-xs"
                                                >
                                                    <RefreshCw className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Private URL Management */}
                        {infosession.is_private && infosession.private_url_token && (
                            <div className="mt-6 rounded-lg bg-yellow-500/20 border border-yellow-500/30 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <Lock className="h-5 w-5" />
                                            Private Session URL
                                        </h3>
                                        <p className="text-sm text-gray-300 mt-1">
                                            Share this unique URL with participants to access this private session
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button
                                            onClick={() => copyPrivateUrl(infosession.private_url_token)}
                                            variant="outline"
                                            className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#212529]"
                                        >
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copy URL
                                        </Button>
                                        <Button
                                            onClick={() => regenerateToken(infosession.id)}
                                            variant="outline"
                                            className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#212529]"
                                        >
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Regenerate
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-3 p-3 bg-white/10 rounded-lg">
                                    <p className="text-xs text-gray-300 mb-1">Current URL:</p>
                                    <code className="text-sm text-yellow-200 break-all">
                                        {window.location.origin}/private-session/{infosession.private_url_token}
                                    </code>
                                </div>
                            </div>
                        )}
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
                                        <p className="text-3xl font-bold text-[#212529]">{dispatchParticipant('info_session')}</p>
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
                                        <p className="text-sm font-medium text-gray-600">Interview Stage</p>
                                        <p className="text-3xl font-bold text-[#212529]">
                                            {dispatchParticipant('interview') + dispatchParticipant('interview_pending')}
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <UserCheck className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Advanced/Completed</p>
                                        <p className="text-3xl font-bold text-[#212529]">{dispatchParticipant('jungle') + completedParticipants}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <TrendingUp className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Filter and Participants Section */}
                <div className="mx-auto max-w-7xl px-6 pb-8">
                    <div className="mb-8 rounded-lg border-0 bg-white shadow-lg">
                        <div className="p-6">
                            <FilterHeader
                                infosession={infosession}
                                participants={infosession.participants}
                                setFiltredParticipants={setFiltredParticipants}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="mb-2 text-2xl font-bold text-[#212529]">Session Participants</h2>
                        <p className="text-gray-600">
                            {filtredParticipants?.length} {filtredParticipants?.length === 1 ? 'participant' : 'participants'}
                            {filtredParticipants?.length !== totalParticipants && ` (filtered from ${totalParticipants} total)`}
                        </p>
                    </div>

                    {/* Pagination Info */}
                    {totalFilteredParticipants > 0 && (
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(endIndex, totalFilteredParticipants)} of {totalFilteredParticipants} participants
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
                                    {totalParticipants === 0
                                        ? 'This session has no registered participants yet.'
                                        : 'No participants match your current filters. Try adjusting your search criteria.'}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {paginatedParticipants?.map((participant) => (
                                    <ParticipantCard key={participant.id} participant={participant} />
                                ))}
                            </div>

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

                                    <div className="flex items-center space-x-1">
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
};

export default InfosessionDetails;
