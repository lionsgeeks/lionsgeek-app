import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const InterviewDialog = ({ infosession }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dateSlots, setDateSlots] = useState([Date.now()]);

    const addDateSlot = () => {
        setDateSlots([...dateSlots, '']);
    };

    const removeDateSlot = (id) => {
        if (dateSlots.length > 1) {
            const tempArray = [...dateSlots];
            tempArray.splice(id, 1);
            setDateSlots(tempArray);
        }
    };

    const updateDateSlot = (id, value) => {
        const tempArray = [...dateSlots];
        tempArray.splice(id, 1, value);
        setDateSlots(tempArray);
    };
    const sendEmail = (e) => {
        e.preventDefault();
        if (dateSlots.length > 0) {
            router.post('/admin/invite/interview', {
                dates: dateSlots,
                infosession_id: infosession.id,
            });
            setIsDialogOpen(false);
            setDateSlots([Date.now()]);
        } else {
        }
    };
    const getTodayDateTime = () => {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    };
    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>Interview</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between pt-5">
                            Send Invitation to Participants
                            <Button size="sm" className="bg-black text-white hover:bg-gray-800" onClick={addDateSlot}>
                                <Plus className="mr-1 h-4 w-4" />
                                Add Date
                            </Button>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-4">
                            <Label className="font-medium text-gray-600">Choose Date{dateSlots.length > 1 ? 's' : ''}</Label>
                            {dateSlots?.map((slot, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-1 gap-2">
                                            <Input
                                                type="datetime-local"
                                                value={slot}
                                                min={getTodayDateTime()}
                                                onChange={(e) => updateDateSlot(index, e.target.value)}
                                                className="flex-1"
                                                placeholder="Select date and time"
                                            />
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => removeDateSlot(index)}
                                                disabled={dateSlots.length === 1}
                                                className="shrink-0"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                    {index < dateSlots.length - 1 && <Separator className="my-2" />}
                                </div>
                            ))}
                        </div>
                        {dateSlots.length > 1 && (
                            <div className="rounded-lg bg-blue-50 p-3">
                                <p className="text-sm text-blue-700">
                                    <strong>{dateSlots.length}</strong> interview slots will be sent to participants
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={dateSlots.length === 0} className="bg-black text-white hover:bg-gray-800" onClick={sendEmail}>
                            Send
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default InterviewDialog;
