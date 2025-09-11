import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@headlessui/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import EventForm from './EventForm';

export default function CreateEventDialog({ onSuccess }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSuccess = () => {
        setIsOpen(false);
        onSuccess?.();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex justify-center transform cursor-pointer items-center rounded-lg bg-[#fee819] px-2 py-2 h-fit lg:w-fit text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
                    <Plus className="mr-2 h-4 w-4 lg:flex hidden" />
                    Create Event
                </Button>
                {/* {events.length == 0 ? (
                ) : (
                    <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer p-0">
                        <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                            <Plus className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700">Create Event</h3>
                        </CardContent>
                    </Card>
                )} */}
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                <DialogTitle className="sr-only">Create New </DialogTitle>
                <EventForm onClose={() => setIsOpen(false)} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
