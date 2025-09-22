import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { School } from 'lucide-react';
import { useState } from 'react';

const InviteToSchool = ({ infosession }) => {
    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false); // control dialog open state

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(
            `/admin/invite/school?infosession_id=${infosession.id}&date=${date}`,
            {},
            {
                onSuccess: () => setOpen(false), // close modal on success
            }
        );
    };

    const handleInviteWithoutDate = () => {
        router.post(
            `/admin/invite/school?infosession_id=${infosession.id}&submit_without_date=true`,
            {},
            {
                onSuccess: () => setOpen(false), // close modal on success
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Trigger button */}
            <DialogTrigger asChild>
                <div className="flex flex-col h-[30vh] items-center justify-center gap-3 bg-black text-white hover:bg-beta">
                    <School className="h-20 w-20" />
                    <span>to School</span>
                </div>
            </DialogTrigger>

            {/* Modal content */}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <School className="h-5 w-5" />
                        Invite to School
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="date" className="text-sm font-medium">
                            Date
                        </label>
                        <input
                            id="date"
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                            disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="mt-4 flex justify-between gap-2">
                        <Button type="submit" className="w-full">
                            Invite
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={handleInviteWithoutDate}
                        >
                            Invite Without Date
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InviteToSchool;
