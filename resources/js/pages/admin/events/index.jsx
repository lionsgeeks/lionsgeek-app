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


                        {events.length === 0 &&(
                            <div className="h-full bg-white flex rounded-lg items-center justify-center w-full">
                                <div className="text-center w-[50%]  border-2 border-dashed border-gray-500 py-20 rounded-lg">
                                    <h1 className="text-2xl font-semibold text-gray-700 mb-3">No events Available</h1>
                                    <p className="text-gray-500 mb-6">
                                        It looks like there aren’t any events created yet.
                                    </p>
                                    <CreateEventDialog onSuccess={handleSuccess} events={events} />
                                </div>
                            </div>
                        ) }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.length > 0 &&(
                        <CreateEventDialog onSuccess={handleSuccess} events={events} />

                        ) }

                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>



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
