import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Calendar, Users, MoreVertical, Edit, Trash2, Eye } from "lucide-react";

export default function EventCard({ event, onEdit, onDelete }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { props } = usePage();
    const appUrl = props.ziggy?.url || window.location.origin;
    const [isDeleting, setIsDeleting] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            weekday: 'long',
            year: 'numeric',
            month: 'long',

        });
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('admin.events.destroy', event.id), {
            onSuccess: () => {
                setShowDeleteDialog(false);
                onDelete?.(event.id);
            },
            onError: () => {
                setIsDeleting(false);
            },
            onFinish: () => {
                setIsDeleting(false);
            }
        });
    };

    const handleView = () => {
        router.visit(route('admin.events.show', event.id));
    };

    const getDisplayName = (multilingualField) => {
        if (typeof multilingualField === 'object') {
            return multilingualField.en || multilingualField.fr || multilingualField.ar || 'Untitled';
        }
        return multilingualField || 'Untitled';
    };

    const getDisplayDescription = (multilingualField) => {
        if (typeof multilingualField === 'object') {
            const desc = multilingualField.en || multilingualField.fr || multilingualField.ar || 'No description';
            return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
        }
        const desc = multilingualField || 'No description';
        return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
    };

    return (
        <>
            <Card onClick={handleView} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 h-68 p-0">
                <div className="relative h-full">
                    <img
                        src={`${appUrl}/storage/images/events/${event.cover}`}
                        alt={getDisplayName(event.name)}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute top-2 right-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleView}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(event)
                                    }}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={(e) =>
                                   {  e.stopPropagation();
                                    setShowDeleteDialog(true)}
                                    }
                                    className="text-red-600 focus:text-red-600"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2 text-sm font-medium mb-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(event.date)}
                        </div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">
                            {getDisplayName(event.name)}
                        </h3>
                        <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                            {getDisplayDescription(event.description)}
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4" />
                                <span>{event.capacity} capacity</span>
                            </div>
                            {/* <Button
                                size="sm"
                                variant="secondary"
                                onClick={handleView}
                            >
                                View Details
                            </Button> */}
                        </div>
                    </div>
                </div>
            </Card>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{getDisplayName(event.name)}"?
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
        </>
    );
}
