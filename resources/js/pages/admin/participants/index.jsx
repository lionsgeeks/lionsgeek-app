import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Users, Download, Clock, CheckCircle2, Presentation } from 'lucide-react';
import FilterHeader from '../../../components/filter-header';
import ParticipantCard from './partials/ParticipantCard';

export default function Participants() {
    const { participants = [], infosessions = [] } = usePage().props;
    const [filtredParticipants, setFiltredParticipants] = useState(participants);
    
    const breadcrumbs = [
        {
            title: 'Participants',
            href: '/admin/participants',
        },
    ];

    // Calculate statistics with safe access
    const totalParticipants = participants?.length || 0;
    const stepsCount = {
        info_session: participants?.filter(p => p?.current_step === 'info_session')?.length || 0,
        interview: participants?.filter(p => p?.current_step === 'interview')?.length || 0,
        jungle: participants?.filter(p => p?.current_step === 'jungle')?.length || 0,
        school: participants?.filter(p => p?.current_step?.includes('school'))?.length || 0,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />
                            <div className="p-6 bg-white min-h-screen">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-beta mb-2">Participants</h1>
                            <p className="text-gray-600">Manage and track participant progress</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                                                                    <a href="/admin/questions/export">
                                            <Button variant="outline" size="sm" className="w-full sm:w-auto text-[#212529] hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export Questions
                                </Button>
                            </a>
                            <a href={'/admin/participant/export'}>
                                <Button size="sm" className="w-full sm:w-auto bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export Students
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Statistics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Card className="border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Total</p>
                                        <p className="text-xl font-bold text-beta">{totalParticipants}</p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Users className="h-5 w-5 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                                                    <div>
                                    <p className="text-sm text-gray-600 mb-1">Info Session</p>
                                    <p className="text-xl font-bold text-[#212529]">{stepsCount.info_session}</p>
                                </div>
                                <div className="p-2 bg-[#f2f2f2] rounded-lg">
                                    <Presentation className="h-5 w-5 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Interview</p>
                                        <p className="text-xl font-bold text-[#212529]">{stepsCount.interview}</p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Clock className="h-5 w-5 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Advanced</p>
                                        <p className="text-xl font-bold text-[#212529]">{stepsCount.jungle + stepsCount.school}</p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <CheckCircle2 className="h-5 w-5 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                            {/* Filter Section */}
            <div className="bg-gray-50 rounded-lg border mb-6">
                    <div className="p-4">
                        <FilterHeader 
                            participants={participants} 
                            infosessions={infosessions} 
                            setFiltredParticipants={setFiltredParticipants} 
                        />
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-beta">
                        Participants ({filtredParticipants?.length})
                    </h2>
                    {filtredParticipants?.length !== totalParticipants && (
                        <Badge className="bg-[#fee819] text-[#212529] rounded-lg px-3 py-1">
                            Showing {filtredParticipants?.length} of {totalParticipants}
                        </Badge>
                    )}
                </div>

                {/* Participants Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtredParticipants?.map((participant) => (
                        <ParticipantCard key={participant.id} participant={participant} />
                    ))}
                </div>

                {/* Empty State */}
                {filtredParticipants?.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-beta mb-2">No participants found</h3>
                        <p className="text-gray-600">Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
