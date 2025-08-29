import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import CreateEventDialog from "./partials/CreateEventDialog";
import EditEventDialog from "./partials/EditEventDialog";
import EventCard from "./partials/EventCard";
import { Calendar } from "lucide-react";


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
             <div className="bg-[#212529] py-8 text-white">
                                    <div className="mx-auto max-w-7xl px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-[#fee819] p-3">
                                                    <Calendar className="h-8 w-8 text-[#212529]" />
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-bold">Events Management</h1>
                                                    <p className="mt-1 text-gray-300">Manage events</p>
                                                </div>
                                            </div>
                                            <CreateEventDialog onSuccess={handleSuccess} events={events} />
                                        </div>
                                    </div>
                                </div>
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
