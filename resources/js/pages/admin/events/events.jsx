import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import CreateEventDialog from "./components/CreateEventDialog";
import EditEventDialog from "./components/EditEventDialog";
import EventCard from "./components/EventCard";



const breadcrumbs = [
    {
        title: 'Events',
        href: '/admin/events',
    },
];

export default function AdminEvents() {
    const { events = [] } = usePage().props;
    const [editingEvent, setEditingEvent] = useState(null);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const handleEdit = (event) => {
        setEditingEvent(event);
        setShowEditDialog(true);
    };

    const handleCloseEdit = () => {
        setShowEditDialog(false);
        setEditingEvent(null);
    };

    const handleSuccess = () => {
        window.location.reload();
    };



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">Events</h1>
                        <div className="text-sm text-gray-600">
                            {events.length} Event{events.length !== 1 ? 's' : ''} total
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CreateEventDialog onSuccess={handleSuccess} />

                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>

                    {events.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg mb-2">No events found</div>
                            <div className="text-gray-400 text-sm">
                                Create your first event to get started
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <EditEventDialog
                event={editingEvent}
                isOpen={showEditDialog}
                onClose={handleCloseEdit}
                onSuccess={handleSuccess}
            />
        </AppLayout>
    );
}
