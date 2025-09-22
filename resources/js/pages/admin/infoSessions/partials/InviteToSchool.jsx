import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { School } from 'lucide-react';
import { useState } from 'react';

const InviteToSchool = ({ infosession , closeParent}) => {
    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false); // control dialog open state

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(
            `/admin/invite/school?infosession_id=${infosession.id}&date=${date}`,
            {},
            {
                onSuccess: () => closeParent(),
            }
        );
    };

    const handleInviteWithoutDate = () => {
        router.post(
            `/admin/invite/school?infosession_id=${infosession.id}&submit_without_date=true`,
            {},
            {
                onSuccess: () => {
                    setOpen(false);
                    closeParent();
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Trigger button */}
            <DialogTrigger asChild>
                <div className="flex flex-col font-bold h-[21vh] w-[15vw] items-center justify-center gap-3  border-2 border-dashed rounded-lg text-black hover:bg-beta hover:text-white hover:border-0">
                    <School className="h-10 w-10" />
                    <span>School</span>
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
