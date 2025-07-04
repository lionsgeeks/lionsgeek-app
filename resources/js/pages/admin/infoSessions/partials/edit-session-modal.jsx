'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, useForm } from '@inertiajs/react';
import { Calendar, Loader2, Users } from 'lucide-react';
import { useEffect } from 'react';

export function EditSessionModal({ open, onOpenChange, session, loading = false }) {
    const { data, setData, put, processing, errors } = useForm({
        name: '',
        start_date: '',
        places: '',
        formation: '',
    });

    useEffect(() => {
        if (session) {
            setData({
                name: session.name,
                start_date: session.start_date,
                places: session.places,
                formation: session.formation,
            });
        }
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        router.put(`infosessions/${session.id}`, data, {
            onSuccess:()=>{
                onOpenChange(false);
            }
        });
    };

    const handleChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    if (!session) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Info Session</DialogTitle>
                    <DialogDescription>Update the details of this informational session.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-title">
                                Session Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="edit-title"
                                value={data.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="e.g., Web Development Program Overview"
                                required
                                disabled={loading}
                            />
                            {errors.name && <p className="text-base text-red-500">{errors.name}</p>}
                        </div>

                        <div className="gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-date">
                                    Date <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="edit-date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => handleChange('start_date', e.target.value)}
                                        className="pl-10"
                                        required
                                        disabled={loading}
                                    />
                                    {errors.start_date && <p className="text-base text-red-500">{errors.start_date}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-capacity">
                                    Capacity <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Users className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="edit-capacity"
                                        type="number"
                                        value={data.places}
                                        onChange={(e) => handleChange('places', e.target.value)}
                                        placeholder="50"
                                        className="pl-10"
                                        required
                                        min="1"
                                        disabled={loading}
                                    />
                                    {errors.places && <p className="text-base text-red-500">{errors.places}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-type">
                                    Program Type <span className="text-red-500">*</span>
                                </Label>
                                <Select value={data.formation} onValueChange={(value) => handleChange('formation', value)} disabled={loading}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select program type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Coding">Coding</SelectItem>
                                        <SelectItem value="Media">Media</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {errors.formation && <p className="text-base text-red-500">{errors.formation}</p>}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Session
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
