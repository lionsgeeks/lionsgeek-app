import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Calendar, Loader2, Users, GraduationCap, Code2, Palette, Eye } from 'lucide-react';

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

    const getFormationIcon = (formation) => {
        return formation === 'Coding' ? Code : Palette;
    };

    const getFormationColor = (formation) => {
        return formation === 'Coding' 
            ? 'text-blue-600 bg-blue-50 border-blue-200' 
            : 'text-purple-600 bg-purple-50 border-purple-200';
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px] rounded-lg">
                {/* Header */}
                <div className="bg-[#212529] p-5 text-white rounded-t-lg -m-6 mb-6">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-[#fee819] rounded-lg">
                                <GraduationCap className="h-5 w-5 text-[#212529]" />
                            </div>
                            <DialogTitle className="text-xl font-semibold">Create New Info Session</DialogTitle>
                        </div>
                        <DialogDescription className="text-white/90">
                            Create an informational session for your training programs.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Session Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium text-[#212529]">
                            Session Title <span className="text-[#ff7376]">*</span>
                        </Label>
                        <Input
                            id="title"
                            value={data.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="e.g., Web Development Program Overview"
                            required
                            disabled={processing}
                            className="rounded-lg border focus:border-[#212529] transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#212529]/20"
                        />
                        {errors.name && (
                            <p className="text-[#ff7376] text-sm">{errors.name}</p>
                        )}
                    </div>

                    {/* Program Type */}
                    <div className="space-y-2">
                        <Label htmlFor="type" className="text-sm font-medium text-[#212529]">
                            Program Type <span className="text-[#ff7376]">*</span>
                        </Label>
                        <Select 
                            value={data.formation} 
                            onValueChange={(value) => handleChange('formation', value)} 
                            disabled={processing}
                        >
                            <SelectTrigger className="rounded-lg border focus:border-[#212529]">
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
                        {errors.formation && (
                            <p className="text-[#ff7376] text-sm">{errors.formation}</p>
                        )}
                    </div>

                    {/* Date and Capacity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-sm font-medium text-[#212529]">
                                Start Date <span className="text-[#ff7376]">*</span>
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    id="date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => handleChange('start_date', e.target.value)}
                                                                    className="pl-10 rounded-lg border focus:border-[#212529]"
                                required
                                disabled={processing}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        {errors.start_date && (
                            <p className="text-[#ff7376] text-sm">{errors.start_date}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="capacity" className="text-sm font-medium text-[#212529]">
                            Capacity <span className="text-[#ff7376]">*</span>
                        </Label>
                        <div className="relative">
                            <Users className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="capacity"
                                type="number"
                                value={data.places}
                                onChange={(e) => handleChange('places', e.target.value)}
                                placeholder="50"
                                className="pl-10 rounded-lg border focus:border-[#212529]"
                                required
                                min="1"
                                max="500"
                                disabled={processing}
                            />
                        </div>
                        {errors.places && (
                            <p className="text-[#ff7376] text-sm">{errors.places}</p>
                        )}
                        </div>
                    </div>

                    {/* Preview */}
                    {data.formation && data.name && (
                        <div className="p-4 bg-[#f2f2f2] rounded-lg border">
                            <p className="text-sm font-medium text-[#212529] mb-2">Preview</p>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                                <div className="text-[#212529]">{data.formation === 'Coding' ? <Code2 className="h-5 w-5" /> : <Palette className="h-5 w-5" />}</div>
                                <div>
                                    <div className="font-medium text-[#212529]">{data.name}</div>
                                    <div className="text-sm text-gray-500">{data.formation} Program</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <DialogFooter className="flex gap-3 pt-4 border-t">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => onOpenChange(false)} 
                            disabled={processing}
                                                                    className="text-[#212529] hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing || !data.name || !data.formation || !data.start_date || !data.places}
                                                                    className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {processing ? 'Creating...' : 'Create Session'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
