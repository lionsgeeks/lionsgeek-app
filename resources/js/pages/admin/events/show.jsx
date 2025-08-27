import { usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/layouts/app-layout";
import { Calendar, Users, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import EditEventDialog from "./components/EditEventDialog";

export default function AdminEventShow() {
    const { event } = usePage().props;
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
     const { props } = usePage();
    const appUrl = props.ziggy?.url || window.location.origin;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    console.log(event);

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
            }
        });
    };

    const getDisplayText = (multilingualField) => {
        if (typeof multilingualField === 'object') {
            return {
                en: multilingualField.en || 'Not provided',
                fr: multilingualField.fr || 'Non fourni',
                ar: multilingualField.ar || 'غير متوفر'
            };
        }
        return {
            en: multilingualField || 'Not provided',
            fr: multilingualField || 'Non fourni',
            ar: multilingualField || 'غير متوفر'
        };
    };

    const nameTexts = getDisplayText(event.name);
    const descriptionTexts = getDisplayText(event.description);

    return (
        <AppLayout>
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.visit(route('admin.events.index'))}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Events
                            </Button>
                            <h1 className="text-2xl font-bold">Event Details</h1>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleEdit}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardContent className="p-0">
                                    <img
                                        src={`${appUrl}/storage/images/events/${event.cover}`}
                                        alt={nameTexts.en}
                                        className="w-full h-64 object-cover rounded-t-lg"
                                    />
                                </CardContent>
                            </Card>

                            <Card>

                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-lg font-semibold">{nameTexts.en}</p>
                                    </div>

                                </CardContent>
                            </Card>

                            <Card>

                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-gray-700">{descriptionTexts.en}</p>
                                    </div>

                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Event Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Date & Time</p>
                                            <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Capacity</p>
                                            <p className="text-sm text-gray-600">{event.capacity} people</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Statistics</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="font-medium">Total Bookings</p>
                                        <p className="text-2xl font-bold text-blue-600">{event.bookings?.length || 0}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Available Spots</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {event.capacity}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>


                        </div>
                    </div>
                </main>
            </div>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{nameTexts.en}"?
                            This action cannot be undone and will permanently remove the event
                            and all associated data.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete Event"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <EditEventDialog
                event={event}
                isOpen={showEditDialog}
                onClose={handleCloseEdit}
                onSuccess={handleEditSuccess}
            />
        </AppLayout>
    );
}
