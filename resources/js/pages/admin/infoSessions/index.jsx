import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Ban, Calendar, CheckCircle, Edit, Plus, Users, GraduationCap, Clock, Calendar as CalendarIcon, Code2, Palette } from 'lucide-react';
import { useState } from 'react';
import { CreateSessionModal } from './partials/create-session-modal';
import { EditSessionModal } from './partials/edit-session-modal';

export default function InfoSessions() {
    const { infosessions = [] } = usePage().props;
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const breadcrumbs = [
        {
            title: 'Info Sessions',
            href: '/admin/infosessions',
        },
    ];
    
    const changeAvailabilty = (id) => {
        router.patch(`infosessions/change-availabilty/${id}`);
    };
    
    const changeStatus = (id) => {
        router.patch(`infosessions/change-status/${id}`);
    };

    const getFormationColor = (formation) => {
        return formation === 'Coding' 
            ? 'bg-blue-100 text-blue-700 border-blue-200' 
            : 'bg-purple-100 text-purple-700 border-purple-200';
    };

    const getFormationIcon = (formation) => {
        return formation === 'Coding' ? 
            <Code2 className="h-6 w-6" /> : 
            <Palette className="h-6 w-6" />;
    };

    // Calculate statistics with safe access
    const totalSessions = infosessions?.length || 0;
    const availableSessions = infosessions?.filter(s => s?.isAvailable)?.length || 0;
    const completedSessions = infosessions?.filter(s => s?.isFinish)?.length || 0;
    const codingSessions = infosessions?.filter(s => s?.formation === 'Coding')?.length || 0;

    // Empty state
    if (!infosessions || infosessions.length === 0) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Info Sessions" />
                            <div className="p-6 bg-white min-h-screen">
                    <div className="mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                        <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Info Sessions</h1>
                                <p className="text-gray-600">Manage informational sessions about your training programs</p>
                            </div>
                            <Button 
                                onClick={() => setCreateModalOpen(true)}
                                className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Create Info Session
                            </Button>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center h-[50vh]">
                        <div className="text-center p-8">
                            <GraduationCap className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Info Sessions Yet</h3>
                            <p className="text-gray-600 text-lg mb-8">Start by creating your first informational session to engage with potential participants.</p>
                            <Button 
                                onClick={() => setCreateModalOpen(true)}
                                className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Create Your First Session
                            </Button>
                        </div>
                    </div>
                    
                    <CreateSessionModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
                </div>
            </AppLayout>
        );
    }   
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Info Sessions" />
            <div className="p-6 bg-white min-h-screen">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-beta mb-2">Info Sessions</h1>
                            <p className="text-gray-600">Manage informational sessions about your training programs</p>
                        </div>
                        <Button 
                            onClick={() => setCreateModalOpen(true)}
                            className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Info Session
                        </Button>
                    </div>

                    {/* Statistics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Card className="border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Total</p>
                                        <p className="text-xl font-bold text-[#212529]">{totalSessions}</p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <GraduationCap className="h-5 w-5 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Available</p>
                                        <p className="text-xl font-bold text-[#212529]">{availableSessions}</p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <CheckCircle className="h-5 w-5 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Completed</p>
                                        <p className="text-xl font-bold text-[#212529]">{completedSessions}</p>
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
                                        <p className="text-sm text-gray-600 mb-1">Coding</p>
                                        <p className="text-xl font-bold text-[#212529]">{codingSessions}</p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Code2 className="h-5 w-5 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Sessions List */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-[#212529]">All Sessions ({totalSessions})</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {infosessions.map((session, index) => (
                                            <Card 
                        key={session.id} 
                        className="border rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-[1.02] bg-white h-full flex flex-col overflow-hidden p-0 cursor-pointer"
                        onClick={() => router.visit(`/admin/infosessions/${session.id}`)}
                    >
                            {/* Header */}
                            <div className="bg-gray-50 p-4 text-[#212529] rounded-t-lg">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="flex-shrink-0 text-[#212529]">{getFormationIcon(session.formation)}</div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-lg font-semibold capitalize truncate">{session.name}</h3>
                                            <Badge className="bg-[#fee819] text-[#212529] rounded-lg text-xs mt-1 w-fit">
                                                {session.formation}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                                        <button 
                                            onClick={() => {
                                                setSelectedSession(session);
                                                setEditModalOpen(true);
                                            }}
                                            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-110 border"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-2">
                                    {session.isAvailable ? (
                                        <CheckCircle className="h-4 w-4 text-[#51b04f]" />
                                    ) : (
                                        <Ban className="h-4 w-4 text-[#ff7376]" />
                                    )}
                                    <span className="text-sm">
                                        {session.isAvailable ? 'Open for Registration' : 'Registration Closed'}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <CardContent className="p-4 flex-1 flex flex-col">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                                            <CalendarIcon className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-500">Start Date</p>
                                            <p className="font-medium text-[#212529]">{session.start_date}</p>
                                        </div>
                                </div>
                                    
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                                    <Users className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-500">Capacity</p>
                                            <p className="font-medium text-[#212529]">{session.places} participants</p>
                                        </div>
                                    </div>
                                </div>

                                                                                        {/* Action buttons */}
                            <div className="pt-3 border-t mt-4" onClick={(e) => e.stopPropagation()}>
                                <Button
                                    onClick={() => changeAvailabilty(session.id)}
                                    variant={session.isAvailable ? "outline" : "default"}
                                    size="sm"
                                    className={`w-full rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                                        session.isAvailable 
                                            ? 'border-[#ff7376] text-[#ff7376] hover:bg-[#ff7376] hover:text-white' 
                                            : 'bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529]'
                                    }`}
                                >
                                    {session.isAvailable ? 'Close' : 'Open'}
                                </Button>
                            </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            
            <CreateSessionModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
            <EditSessionModal open={editModalOpen} onOpenChange={setEditModalOpen} session={selectedSession} />
        </AppLayout>
    );
}
