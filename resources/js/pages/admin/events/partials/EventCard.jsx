import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { router, usePage } from '@inertiajs/react';
import { Calendar, Edit, Eye, MoreVertical, Trash2, Users, Lock, Unlock, Link, RefreshCcw } from 'lucide-react'; // Added Lock, Unlock, Link, RefreshCcw
import { useState } from 'react';

export default function EventCard({ event, onEdit, onDelete }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { props } = usePage();
    const appUrl = props.ziggy?.url || window.location.origin;
    const [isDeleting, setIsDeleting] = useState(false);
    const [copy, setCopy] = useState(true);
    const [regenerate, setRegenerate] = useState(true);
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
            },
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

    const togglePrivacy = (e) => {
        e.stopPropagation();
        router.patch(route('admin.event.privacy', event.id), {}, {
            onSuccess: () => {
                // Optionally, show a success message or refresh the page
            },
            onError: (errors) => {
                console.error('Privacy toggle errors:', errors);
            },
        });
    };

    const copyPrivateUrl = (e) => {
        e.stopPropagation();
        const privateUrl = `${appUrl}/private-event/${event.private_url_token}`;
        navigator.clipboard.writeText(privateUrl);
        setCopy(false);
        setTimeout(() => setCopy(true), 2000);
    };

    const regenerateToken = (e) => {
        e.stopPropagation();
        router.post(route('admin.event.regenerate-token', event.id), {}, {
            onSuccess: () => {
                setRegenerate(false);
                setTimeout(() => setRegenerate(true), 2000);
            },
            onError: (errors) => {
                console.error('Token regeneration errors:', errors);
            },
        });
    };

    return (
        <>
            <Card onClick={handleView} className="h-68 cursor-pointer overflow-hidden p-0 transition-shadow duration-200 hover:shadow-lg">
                <div className="relative h-full">
                    <img
                        src={`${appUrl}/storage/images/events/${event.cover}`}
                        alt={getDisplayName(event.name)}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute top-2 right-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="sm" className="h-8 w-8 bg-white/90 p-0 hover:bg-white" onClick={(e) => e.stopPropagation()} >
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
                                        onEdit(event);
                                    }}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={togglePrivacy}
                                >
                                    {event.is_private ? (
                                        <>
                                            <Unlock className="mr-2 h-4 w-4" />
                                            Make Public
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="mr-2 h-4 w-4" />
                                            Make Private
                                        </>
                                    )}
                                </DropdownMenuItem>
                                {event.is_private && event.private_url_token && (
                                    <>
                                        <DropdownMenuItem onClick={copyPrivateUrl}>
                                            <Link className="mr-2 h-4 w-4" />
                                            {copy ? 'Copy Private URL' : 'Copied!'}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={regenerateToken}>
                                            <RefreshCcw className="mr-2 h-4 w-4" />
                                            {regenerate ? 'Regenerate Private URL' : 'Regenerated!'}
                                        </DropdownMenuItem>
                                    </>
                                )}

                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDeleteDialog(true);
                                    }}
                                    className="text-red-600 focus:text-red-600"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="absolute right-4 bottom-4 left-4 text-white">
                        <div className="mb-1 flex items-center gap-2 text-sm font-medium">
                            <Calendar className="h-4 w-4" />
                            {formatDate(event.date)}
                        </div>
                        <h3 className="mb-2 line-clamp-2 text-xl font-bold">
                            {getDisplayName(event.name)}
                            {event.is_private && <Lock className="ml-2 inline-block h-4 w-4" />}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-sm text-gray-200">{getDisplayDescription(event.description)}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4" />
                                <span>{event.capacity} capacity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{getDisplayName(event.name)}"? This action cannot be undone and will permanently remove
                            the event and all associated data.
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
        </>
    );
}
