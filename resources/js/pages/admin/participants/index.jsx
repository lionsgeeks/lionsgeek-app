import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle2, Clock, Download, Filter, Presentation, Users, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import FilterHeader from '../../../components/filter-header';
import ParticipantCard from './partials/ParticipantCard';

export default function Participants() {
    const { participants = [], infosessions = [], statusCounts = {} } = usePage().props;
    const [filtredParticipants, setFiltredParticipants] = useState(participants);
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('approved');

    const breadcrumbs = [
        {
            title: 'Participants',
            href: '/admin/participants',
        },
    ];

    // Filter participants based on selected status
    const getFilteredParticipants = (status) => {
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

    // Calculate current participants based on status
    const currentParticipants = getFilteredParticipants(selectedStatus);

    // Update filtered participants when status changes
    useEffect(() => {
        setFiltredParticipants(currentParticipants);
    }, [selectedStatus, participants]);

    // Calculate statistics with safe access
    const totalParticipants = currentParticipants?.length || 0;
    const stepsCount = {
        info_session: currentParticipants?.filter((p) => p?.current_step === 'info_session')?.length || 0,
        interview: currentParticipants?.filter((p) => p?.current_step === 'interview')?.length || 0,
        jungle: currentParticipants?.filter((p) => p?.current_step === 'jungle')?.length || 0,
        school: currentParticipants?.filter((p) => p?.current_step?.includes('school'))?.length || 0,
    };
    const hasSearch = search.length > 0;

    // Handle status change without page refresh
    const handleStatusChange = (newStatus) => {
        setSelectedStatus(newStatus);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />

            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#fee819] p-3">
                                    <Users className="h-8 w-8 text-[#212529]" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Participants Management</h1>
                                    <p className="mt-1 text-gray-300">Manage and track participant progress</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <a href="/admin/questions/export">
                                    <Button className="transform bg-[#fee819] text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export Questions
                                    </Button>
                                </a>
                                <a href={'/admin/participant/export'}>
                                    <Button className="transform bg-[#fee819] text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
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
                            </div>
                            <div className="mt-4">
                                <FilterHeader
                                    participants={currentParticipants}
                                    infosessions={infosessions}
                                    setFiltredParticipants={setFiltredParticipants}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Participants Grid */}
                <div className="mx-auto max-w-7xl px-6 pb-8">
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
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filtredParticipants?.map((participant) => (
                                <ParticipantCard key={participant.id} participant={participant} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
