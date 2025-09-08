import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Code2, GraduationCap, Palette, Presentation, TrendingUp, UserCheck, Users } from 'lucide-react';
import { useState } from 'react';
import FilterHeader from '../../../components/filter-header';
import ParticipantCard from '../participants/partials/ParticipantCard';

const InfosessionDetails = () => {
    const { infosession } = usePage().props;
    const [filtredParticipants, setFiltredParticipants] = useState(infosession?.participants);

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
                                    <h1 className="text-3xl font-bold capitalize">{infosession.name}</h1>
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
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-lg bg-white/10 p-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-[#fee819]" />
                                    <div>
                                        <p className="text-sm text-gray-300">Start Date</p>
                                        <p className="font-medium text-white">
                                            {infosession.start_date?.includes('T')
                                                ? infosession.start_date.replace('T', ' ')
                                                : infosession.start_date}
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
};

export default InfosessionDetails;
