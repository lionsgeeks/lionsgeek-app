'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, useForm } from '@inertiajs/react';
import { Calendar, Code2, GraduationCap, Loader2, Palette, Users, X } from 'lucide-react';
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
            // Format the date to YYYY-MM-DDTHH:MM for HTML datetime-local input
            const formatDateTime = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                // Get local datetime in YYYY-MM-DDTHH:MM format
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                return `${year}-${month}-${day}T${hours}:${minutes}`;
            };

            setData({
                name: session.name || '',
                start_date: formatDateTime(session.start_date),
                places: session.places || '',
                formation: session.formation || '',
            });
        }
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        router.put(`infosessions/${session.id}`, data, {
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    };

    const handleChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    if (!session) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="custom-scrollbar max-h-[90vh] overflow-y-auto p-0 sm:max-w-[700px] [&>button]:hidden">
                {/* Header */}
                <div className="relative rounded-t-lg bg-[#212529] p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-[#fee819] p-2">
                                <GraduationCap className="h-6 w-6 text-[#212529]" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold text-white">Edit Info Session</DialogTitle>
                                <p className="mt-1 text-sm text-gray-300">Update the details of this informational session</p>
                            </div>
                        </div>
                        {/* Custom close button */}
                        <button
                            onClick={() => onOpenChange(false)}
                            className="rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10 hover:text-[#fee819]"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Session Title */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-title" className="text-sm font-medium text-[#212529]">
                                Session Title <span className="text-[#ff7376]">*</span>
                            </Label>
                            <Input
                                id="edit-title"
                                value={data.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="e.g., Web Development Program Overview"
                                required
                                disabled={loading}
                                className="rounded-lg border transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                            />
                            {errors.name && <p className="text-sm text-[#ff7376]">{errors.name}</p>}
                        </div>

                        {/* Program Type */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-type" className="text-sm font-medium text-[#212529]">
                                Program Type <span className="text-[#ff7376]">*</span>
                            </Label>
                            <Select value={data.formation} onValueChange={(value) => handleChange('formation', value)} disabled={loading}>
                                <SelectTrigger className="rounded-lg border transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20">
                                    <SelectValue placeholder="Choose program type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Coding">
                                        <div className="flex items-center gap-2">
                                            <Code2 className="h-4 w-4" />
                                            <span>Coding Program</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Media">
                                        <div className="flex items-center gap-2">
                                            <Palette className="h-4 w-4" />
                                            <span>Media Program</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.formation && <p className="text-sm text-[#ff7376]">{errors.formation}</p>}
                        </div>

                        {/* Date and Capacity */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="edit-date" className="text-sm font-medium text-[#212529]">
                                    Start Date & Time <span className="text-[#ff7376]">*</span>
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="edit-date"
                                        type="datetime-local"
                                        value={data.start_date}
                                        onChange={(e) => handleChange('start_date', e.target.value)}
                                        className="rounded-lg border pl-10 transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                {errors.start_date && <p className="text-sm text-[#ff7376]">{errors.start_date}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-capacity" className="text-sm font-medium text-[#212529]">
                                    Capacity <span className="text-[#ff7376]">*</span>
                                </Label>
                                <div className="relative">
                                    <Users className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="edit-capacity"
                                        type="number"
                                        value={data.places}
                                        onChange={(e) => handleChange('places', e.target.value)}
                                        placeholder="50"
                                        className="rounded-lg border pl-10 transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                        required
                                        min="1"
                                        max="500"
                                        disabled={loading}
                                    />
                                </div>
                                {errors.places && <p className="text-sm text-[#ff7376]">{errors.places}</p>}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={loading}
                                className="flex-1 border-gray-300 text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 transform bg-[#212529] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
                            >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update Session
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
