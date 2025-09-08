import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import EventForm from './EventForm';

export default function EditEventDialog({ event, isOpen, onClose, onSuccess }) {
    const handleSuccess = () => {
        onSuccess?.();
        onClose?.();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                <DialogTitle className="sr-only">Edit Event</DialogTitle>
                <EventForm event={event} onClose={onClose} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
