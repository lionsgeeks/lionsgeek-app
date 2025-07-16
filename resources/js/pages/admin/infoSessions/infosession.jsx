import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Ban, Calendar, CheckCircle, Eye, LucidePencil, Plus, Users } from 'lucide-react';
import { useState } from 'react';
import { CreateSessionModal } from './partials/create-session-modal';
import { EditSessionModal } from './partials/edit-session-modal';

export default function InfoSessions() {
    const { infosessions } = usePage().props;
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const breadcrumbs = [
        {
            title: 'Info Session',
            href: '/admin/infosession',
        },
    ];
    const handleViewDetails = (session) => {
        setSelectedSession(session);
        setDetailsModalOpen(true);
    };

    const handleEdit = (session) => {
        setSelectedSession(session);
        setEditModalOpen(true);
    };

    const handleEditFromDetails = () => {
        setDetailsModalOpen(false);
        setEditModalOpen(true);
    };

    const handleDelete = (session) => {
        setSelectedSession(session);
        setDeleteDialogOpen(true);
    };
    const changeAvailabilty = (id) => {
        router.patch(`infosessions/change-availabilty/${id}`);
    };
    const changeStatus = (id) => {
        router.patch(`infosessions/change-status/${id}`);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Info session" />
            <div className="p-3 lg:p-6">
                <div className="mb-3 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Info Sessions</h1>
                        <p>Manage informational sessions about your training programs</p>
                    </div>
                    <Button className="cursor-pointer" onClick={() => setCreateModalOpen(true)}>
                        <Plus className="text-white" /> Create Info Session
                    </Button>
                    <CreateSessionModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
                </div>
                <div className="flex flex-wrap gap-6">
                    {infosessions.map((session, index) => (
                        <Card key={index} className=" h-fit w-[32%]">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{session.name}</CardTitle>
                                    <div className="flex gap-2 items-center">
                                        <Eye className='cursor-pointer' onClick={() => router.visit(`/admin/infosessions/${session.id}`)}/>
                                        <LucidePencil
                                            onClick={() => {
                                                setSelectedSession(session);
                                                setEditModalOpen(true);
                                            }}
                                            size={20}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="bg-black text-white">
                                        {session.formation}
                                    </Badge>
                                    {session?.isAvailable ? <CheckCircle className="text-green-500" /> : <Ban className="text-red-500" />}
                                    <span className="text-sm">{session.isAvailable ? 'Available' : 'Unavailable'}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4" />
                                    <span>First session: {session.start_date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="h-4 w-4" />
                                    <span>Places: {session.places}</span>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <Button
                                        onClick={() => changeAvailabilty(session.id)}
                                        className="cursor-pointer bg-alpha text-black"
                                        variant={session.isAvailable ? 'secondary' : 'default'}
                                        size="sm"
                                    >
                                        {session.isAvailable ? 'Not Available' : 'Available'}
                                    </Button>

                                    <Button
                                        onClick={() => changeStatus(session.id)}
                                        className="cursor-pointer"
                                        variant={session.isFinish ? 'secondary' : 'default'}
                                        size="sm"
                                    >
                                        {session.isFinish ? 'Completed' : 'Mark Complete'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <EditSessionModal open={editModalOpen} onOpenChange={setEditModalOpen} session={selectedSession} />
        </AppLayout>
    );
}
