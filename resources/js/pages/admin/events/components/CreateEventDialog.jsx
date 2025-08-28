import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import EventForm from "./EventForm";

export default function CreateEventDialog({ onSuccess, events }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSuccess = () => {
        setIsOpen(false);
        onSuccess?.();
    };
    console.log(events);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>

                {events.length == 0 ? (
                    <button className="text-sm text-white rounded-lg mt-2 cursor-pointer p-2 bg-beta ">Click to add a new event</button>
                ) : (
                    <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer p-0">
                        <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                            <Plus className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700">Create Event</h3>
                        </CardContent>
                    </Card>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogTitle className="sr-only">Create New </DialogTitle>
                <EventForm
                    onClose={() => setIsOpen(false)}
                    onSuccess={handleSuccess}
                />
            </DialogContent>
        </Dialog>
    );
}
