import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { Rocket, TreePalm } from 'lucide-react';
import { useState } from 'react';

const InviteToJungle = ({ infosession , closeParent }) => {
    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false); // control dialog open state

const handleSubmit = (e) => {
    e.preventDefault();
    router.post(
        `/admin/invite/jungle?infosession_id=${infosession.id}&date=${date}`,
        {},
        {
             onSuccess: () => closeParent(),
        }
    );
};


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Trigger button */}
            <DialogTrigger asChild >
                <div className="flex font-bold flex-col h-[21vh] w-[15vw] items-center justify-center gap-3  border-2 border-dashed rounded-lg  text-black hover:bg-beta hover:text-white hover:border-0">
                    <TreePalm className="h-10 w-10" />
                    Jungle
                </div>
            </DialogTrigger>

            {/* Modal content */}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <TreePalm className="h-5 w-5" />
                        Invite to Jungle
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
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background
                            file:border-0 file:bg-transparent file:text-sm file:font-medium
                            placeholder:text-muted-foreground focus-visible:outline-none
                            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                            disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <Button type="submit" className="mt-4 w-full">
                        Invite
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InviteToJungle;
