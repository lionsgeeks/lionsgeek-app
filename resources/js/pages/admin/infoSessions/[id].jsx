import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { GraduationCap, Mic, School, TreePine, User, UserCheck, Users } from 'lucide-react';
import FilterHeader from '../../../components/filter-header';
import { useState } from 'react';
import ParticipantCard from '../participants/partials/ParticipantCard';
const InfosessionDetails = () => {
    const { infosession } = usePage().props;
    const [filtredParticipants, setFiltredParticipants] = useState(infosession?.participants);
    console.log(infosession);
    const dispatchParticipant = (step) => {
        return infosession?.participants.filter((p) => p.current_step === step).length;
    };
    const dispatchGender = (gender) => {
        return infosession?.participants.filter((p) => p.gender === gender).length;
    };
    
    return (
        <AppLayout>
            <Head title="Session Details" />
            <div className="p-3 lg:p-6">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {/* Sessions Card */}
                    <Card className="shadow-sm transition-shadow hover:shadow-md">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <GraduationCap className="h-5 w-5 text-blue-600" />
                                Sessions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Session Name</p>
                                <h3 className="mb-1 font-semibold text-gray-900">{infosession.name}</h3>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Date</span>
                                <Badge variant="outline" className="font-mono">
                                    {infosession.start_date}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Type</span>
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{infosession.formation}</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Participants Card */}
                    <Card className="shadow-sm transition-shadow hover:shadow-md">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-green-600" />
                                Participants
                                <Badge variant="secondary" className="ml-auto">
                                    {infosession?.participants.length}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Interview Status */}

                            {/* Categories */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Mic className="h-4 w-4 text-green-500" />
                                        <span className="text-sm">Info session</span>
                                    </div>
                                    <Badge variant="outline">{dispatchParticipant('info_session')}</Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="space-y-3">
                                        <h4 className="flex items-center gap-2 text-gray-900">
                                            <UserCheck className="h-4 w-4 text-green-500" />
                                            Interview Status
                                        </h4>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="rounded-lg bg-blue-50 p-2 text-center">
                                                <div className="font-semibold text-blue-700">{dispatchParticipant('interview')}</div>
                                                <div className="text-blue-600">Awaiting</div>
                                            </div>
                                            <div className="rounded-lg bg-red-50 p-2 text-center">
                                                <div className="font-semibold text-red-700">{dispatchParticipant('interview_failed')}</div>
                                                <div className="text-red-600">Failed</div>
                                            </div>
                                            <div className="rounded-lg bg-yellow-50 p-2 text-center">
                                                <div className="font-semibold text-yellow-700">{dispatchParticipant('interview_pending')}</div>
                                                <div className="text-yellow-600">Pending</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <Separator /> */}

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <TreePine className="h-4 w-4 text-green-500" />
                                            <span className="text-sm">Jungle</span>
                                        </div>
                                        <Badge variant="outline">{dispatchParticipant('jungle')}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <TreePine className="h-4 w-4 text-red-500" />
                                            <span className="text-sm">Jungle Failed</span>
                                        </div>
                                        <Badge variant="outline">{dispatchParticipant('jungle_failed')}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <School className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm">School</span>
                                        </div>
                                        <Badge variant="outline">
                                            {dispatchParticipant(infosession.formation === 'Coding' ? 'coding_school' : 'media_school')}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gender Distribution Card */}
                    <Card className="shadow-sm transition-shadow hover:shadow-md">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <User className="h-5 w-5 text-purple-600" />
                                Gender Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                        <span className="font-medium text-blue-900">Male</span>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-800">{dispatchGender('male')}</Badge>
                                </div>

                                <div className="flex items-center justify-between rounded-lg bg-pink-50 p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full bg-pink-500"></div>
                                        <span className="font-medium text-pink-900">Female</span>
                                    </div>
                                    <Badge className="bg-pink-100 text-pink-800">{dispatchGender('female')}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <FilterHeader infosession={infosession} participants={infosession.participants} setFiltredParticipants={setFiltredParticipants} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtredParticipants?.map((participant, index) => (
                        <ParticipantCard key={index} participant={participant} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default InfosessionDetails;
