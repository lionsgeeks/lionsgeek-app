import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
const InviteDialog = ({ step, infosession }) => {
    const [date, setDate] = useState(null);
    const { post, data, setData, processing } = useForm();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const getTodayDateTime = () => {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    };
    const sendEmailWithDate = (e) => {
        e.preventDefault();
        post(
            route(`invite.${step}`, {
                date,
                infosession_id: infosession.id,
                submit_without_date: false,
            }),
            {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setDate('');
                },
            },
        );
    };
    const sendEmailWithoutDate = (e) => {
        e.preventDefault();
        post(
            route(`invite.${step}`, {
                date: '',
                infosession_id: infosession.id,
                submit_without_date: true,
            }),
            {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setDate('');
                },
            },
        );
    };
    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="capitalize">{step}</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between pt-5">Send Invitation to Participants</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Label className="font-medium text-gray-600">Choose Date</Label>
                        <Input
                            type="datetime-local"
                            value={date}
                            min={getTodayDateTime()}
                            onChange={(e) => setDate(e.target.value)}
                            className="flex-1"
                            placeholder="Select date and time"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        {step === 'school' && <Button onClick={sendEmailWithoutDate}>Send Without Date</Button>}
                        <Button disabled={processing || !date} className="bg-black text-white hover:bg-gray-800" onClick={sendEmailWithDate}>
                            Send
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default InviteDialog;
