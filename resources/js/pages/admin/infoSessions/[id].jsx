import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import { 
    GraduationCap, 
    Mic, 
    School, 
    TreePine, 
    User, 
    UserCheck, 
    Users, 
    Calendar,
    MapPin,
    Clock,
    Target,
    TrendingUp,
    ArrowLeft,
    Eye,
    Code2,
    Palette,
    Presentation
} from 'lucide-react';
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
        return formation === 'Coding' ? 
            <Code2 className="h-16 w-16 text-white" /> : 
            <Palette className="h-16 w-16 text-white" />;
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
    const completionRate = totalParticipants > 0 ? (completedParticipants / totalParticipants * 100).toFixed(1) : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${infosession.name} - Session Details`} />
            <div className="min-h-screen bg-white">
                <div className="p-6">
                    <Button 
                        onClick={() => router.push('/admin/infosessions')}
                        variant="ghost"
                        className="mb-6 text-[#212529] hover:bg-gray-50 rounded-lg transition-all duration-200 ease-in-out"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Info Sessions
                    </Button>

                    {/* Header Section */}
                    <div className="bg-[#212529] rounded-lg p-6 text-white mb-6">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div>{getFormationIcon(infosession.formation)}</div>
                                <div>
                                    <h1 className="text-2xl font-bold mb-2 capitalize">{infosession.name}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-white/90">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{infosession.start_date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Target className="h-4 w-4" />
                                            <span>{infosession.places} places</span>
                                        </div>
                                        <Badge className="bg-[#fee819] text-[#212529] rounded-lg">
                                            {infosession.formation}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white/80 text-sm">Completion Rate</div>
                                <div className="text-2xl font-bold">{completionRate}%</div>
                                <div className="text-white/80 text-sm">
                                    {completedParticipants} of {totalParticipants} completed
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Card className="border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Total</p>
                                        <p className="text-xl font-bold text-[#212529]">{totalParticipants}</p>
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
                                        <p className="text-xl font-bold text-[#212529]">{dispatchParticipant('info_session')}</p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
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
                                        <p className="text-xl font-bold text-[#212529]">
                                            {dispatchParticipant('interview') + dispatchParticipant('interview_pending')}
                                        </p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <UserCheck className="h-5 w-5 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Advanced</p>
                                        <p className="text-xl font-bold text-[#212529]">
                                            {dispatchParticipant('jungle') + completedParticipants}
                                        </p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                                    {/* Filter and Participants Section */}
                <div className="bg-gray-50 rounded-lg border mb-6">
                        <div className="p-4">
                            <FilterHeader 
                                infosession={infosession} 
                                participants={infosession.participants} 
                                setFiltredParticipants={setFiltredParticipants} 
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-[#212529]">
                            Participants ({filtredParticipants?.length})
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtredParticipants?.map((participant) => (
                            <ParticipantCard key={participant.id} participant={participant} />
                        ))}
                    </div>

                    {filtredParticipants?.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-[#212529] mb-2">No participants found</h3>
                            <p className="text-gray-600">Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default InfosessionDetails;
