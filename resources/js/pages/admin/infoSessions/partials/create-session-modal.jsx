import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Calendar, Loader2, Users } from 'lucide-react';

export function CreateSessionModal({ open, onOpenChange }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        formation: '',
        start_date: '',
        places: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route('infosessions.store'), {
            onSuccess: () => {
                setData({
                    name: '',
                    formation: '',
                    start_date: '',
                    places: '',
                });
                onOpenChange(false);
            },
        });
    };

    const handleChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create New Info Session</DialogTitle>
                    <DialogDescription>Create an informational session to introduce participants to your training programs.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">
                                Session Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="e.g., Web Development Program Overview"
                                required
                                disabled={processing}
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                        </div>

                        <div className="gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">
                                    Date <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => handleChange('start_date', e.target.value)}
                                        className="pl-10"
                                        required
                                        disabled={processing}
                                    />
                                    {errors.start_date && <p className="text-red-500">{errors.start_date}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="capacity">
                                    Capacity <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Users className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="capacity"
                                        type="number"
                                        value={data.capacity}
                                        onChange={(e) => handleChange('places', e.target.value)}
                                        placeholder="50"
                                        className="pl-10"
                                        required
                                        min="1"
                                        disabled={processing}
                                    />
                                    {errors.places && <p className="text-red-500">{errors.places}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">
                                Program Type <span className="text-red-500">*</span>
                            </Label>
                            <Select value={data.type} onValueChange={(value) => handleChange('formation', value)} disabled={processing}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select program type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Coding">Coding</SelectItem>
                                    <SelectItem value="Media">Media</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.formation && <p className="text-red-500">{errors.formation}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Session
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
