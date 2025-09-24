import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { router, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Edit, MapPin, Trash2, Users, Link, RefreshCcw, Lock } from 'lucide-react'; // Added Link, RefreshCcw, Lock
import { useState } from 'react';
import EditEventDialog from './partials/EditEventDialog';

import logo from '../../../../assets/images/logolionsgeek.png';
import Participants from '../../../components/participants';

export default function AdminEventShow() {
    const { event } = usePage().props;
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { props } = usePage();
    const appUrl = props.ziggy?.url || window.location.origin;
    const tab = 'English'; // This should be dynamic based on your language logic
    const [copy, setCopy] = useState(true);
    const [regenerate, setRegenerate] = useState(true);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleEdit = () => {
        setShowEditDialog(true);
    };

    const handleCloseEdit = () => {
        setShowEditDialog(false);
    };

    const handleEditSuccess = () => {
        window.location.reload();
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('admin.events.destroy', event.id), {
            onSuccess: () => {
                router.visit(route('admin.events.index'));
            },
            onError: () => {
                setIsDeleting(false);
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    const getDisplayText = (multilingualField) => {
        if (typeof multilingualField === 'object') {
            return {
                en: multilingualField.en || 'Not provided',
                fr: multilingualField.fr || 'Non fourni',
                ar: multilingualField.ar || 'غير متوفر',
            };
        }
        return {
            en: multilingualField || 'Not provided',
            fr: multilingualField || 'Non fourni',
            ar: multilingualField || 'غير متوفر',
        };
    };

    const nameTexts = getDisplayText(event.name);
    const descriptionTexts = getDisplayText(event.description);

    const copyPrivateUrl = () => {
        const privateUrl = `${appUrl}/private-event/${event.private_url_token}`;
        navigator.clipboard.writeText(privateUrl);
        setCopy(false);
        setTimeout(() => setCopy(true), 2000);
    };

    const regenerateToken = () => {
        router.post(route('admin.event.regenerate-token', event.id), {}, {
            onSuccess: () => {
                setRegenerate(false);
                setTimeout(() => setRegenerate(true), 2000);
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Token regeneration errors:', errors);
            },
        });
    };


    return (
        <AppLayout>
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <Button
                            onClick={() => router.visit('/admin/events')}
                            variant="ghost"
                            className="mb-6 rounded-lg text-white transition-all duration-200 ease-in-out hover:bg-[#fee819] hover:text-[#212529]"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to events
                        </Button>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#fee819] p-3">
                                    <Calendar className="h-8 w-8 text-[#212529]" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Events Details</h1>
                                    <p className="mt-1 text-gray-300">Manage event details</p>
                                </div>
                            </div>
                            <div className="mb-6 flex items-center justify-end md:justify-between">
                                <div className="flex gap-2">
                                    <Button onClick={handleEdit}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Header */}

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <div>
                                <h2 className="mb-2 text-3xl font-bold">
                                    {nameTexts.en}
                                    {event.is_private && <Lock className="ml-2 inline-block h-6 w-6 text-gray-500" />}
                                </h2>
                                <p className="mb-4 text-muted-foreground">{descriptionTexts.en}</p>
                                <div className="flex gap-2">
                                    <Badge variant="secondary">Event</Badge>
                                    <Badge variant="secondary">Registration</Badge>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={`${appUrl}/storage/images/events/${event.cover}`}
                                    alt={nameTexts.en}
                                    className="h-64 w-full object-cover sm:h-80"
                                />
                            </div>

                            <Participants bookings={event.bookings || []} tab={tab} />
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Event Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Date & Time</p>
                                            <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Location</p>
                                            <p className="text-sm text-muted-foreground">"Ain sebaa center, 4th floor, Route de Rabat, Casablanca"</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Capacity</p>
                                            <p className="text-sm text-muted-foreground">{event.capacity} person</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Duration</p>
                                            <p className="text-sm text-muted-foreground">90 minutes</p>
                                        </div>
                                    </div>

                                    {event.is_private && event.private_url_token && (
                                        <div className="space-y-2 border-t pt-4">
                                            <h3 className="font-medium">Private Event URL</h3>
                                            <div className="flex items-center gap-2">
                                                <Link className="h-5 w-5 text-muted-foreground" />
                                                <p className="text-sm text-muted-foreground truncate">
                                                    {`${appUrl}/private-event/${event.private_url_token}`}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button onClick={copyPrivateUrl} size="sm" className="flex-1">
                                                    {copy ? 'Copy URL' : 'Copied!'}
                                                </Button>
                                                <Button onClick={regenerateToken} size="sm" variant="outline" className="flex-1">
                                                    <RefreshCcw className="h-4 w-4 mr-2" />
                                                    {regenerate ? 'Regenerate' : 'Regenerated!'}
                                                </Button>

                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Statistics</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="mb-1 text-sm text-muted-foreground">Total Bookings</p>
                                        <p className="text-3xl font-bold text-blue-600">{event.bookings?.length.toLocaleString() || 0}</p>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-sm text-muted-foreground">Available Spots</p>
                                        <p className="text-3xl font-bold text-green-600">
                                            {Math.max(0, event.capacity - (event.bookings?.length || 0)).toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-sm text-muted-foreground">Registration Rate</p>
                                        <p className="text-lg font-semibold">
                                            {event.capacity > 0 ? (((event.bookings?.length || 0) / event.capacity) * 100).toFixed(1) : 0}%
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Event Organizer</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3">
                                        <img className="h-10 w-10 rounded-full" src={logo} alt="Lions Geek Logo" />
                                        <div>
                                            <p className="font-medium">LionsGeek</p>
                                            <p className="text-sm text-muted-foreground">"contact@lionsgeek.ma"</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 ">
                    <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{nameTexts.en}"? This action cannot be undone and will permanently remove the event and
                            all associated data.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete Event'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <EditEventDialog event={event} isOpen={showEditDialog} onClose={handleCloseEdit} onSuccess={handleEditSuccess} />
        </AppLayout>
    );
}
