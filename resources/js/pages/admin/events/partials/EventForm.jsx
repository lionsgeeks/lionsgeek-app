import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm, usePage } from '@inertiajs/react';
import { Calendar, Upload, X } from 'lucide-react';
import { useState } from 'react';

export default function EventForm({ event = null, onClose, onSuccess }) {
    const isEditing = !!event;
    const { props } = usePage();
    const appUrl = props.ziggy?.url || window.location.origin;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: {
            en: event?.name?.en || '',
            fr: event?.name?.fr || '',
            ar: event?.name?.ar || '',
        },
        description: {
            en: event?.description?.en || '',
            fr: event?.description?.fr || '',
            ar: event?.description?.ar || '',
        },
        date: event?.date || '',
        capacity: event?.capacity || '',
        location: event?.location || '',
        cover: null,
    });

    const [activeTab, setActiveTab] = useState('en');
    const [previewImage, setPreviewImage] = useState(event?.cover ? `${appUrl}/storage/images/events/${event.cover}` : null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', JSON.stringify(data.name));
        formData.append('description', JSON.stringify(data.description));
        formData.append('date', data.date);
        formData.append('capacity', data.capacity);
        formData.append('location', data.location);

        if (data.cover) {
            formData.append('cover', data.cover);
        }

        if (isEditing) {
            formData.append('_method', 'PUT');
            post(route('admin.events.update', event.id), {
                data: formData,
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                    onClose?.();
                },
                onError: (errors) => {
                    console.error('Update errors:', errors);
                },
            });
        } else {
            post(route('admin.events.store'), {
                data: formData,
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                    onClose?.();
                },
                onError: (errors) => {
                    console.error('Create errors:', errors);
                },
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('cover', file);
            const reader = new FileReader();
            reader.onload = (e) => setPreviewImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('cover', null);
        setPreviewImage(null);
    };

    const updateMultilingualField = (field, language, value) => {
        setData(field, {
            ...data[field],
            [language]: value,
        });
    };

    return (
        <Card className="mx-auto w-full max-w-4xl border-none p-0 shadow-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {isEditing ? 'Edit Event' : 'Create New Event'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Cover Image Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="cover">Cover Image</Label>
                        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
                            {previewImage ? (
                                <div className="relative">
                                    <img src={previewImage} alt="Preview" className="h-48 w-full rounded-lg object-cover" />
                                    <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={removeImage}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <label htmlFor="cover-upload" className="block cursor-pointer text-center">
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-4">
                                            <span className="mt-2 block text-sm font-medium text-gray-900">Click to upload cover image</span>
                                        </div>
                                    </div>

                                    <input id="cover-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                        {errors.cover && <p className="text-sm text-red-600">{errors.cover}</p>}
                    </div>

                    <div className="space-y-4">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="en">English</TabsTrigger>
                                <TabsTrigger value="fr">Français</TabsTrigger>
                                <TabsTrigger value="ar">العربية</TabsTrigger>
                            </TabsList>

                            <TabsContent value="en" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name-en">Event Name (English)</Label>
                                    <Input
                                        id="name-en"
                                        value={data.name.en}
                                        onChange={(e) => updateMultilingualField('name', 'en', e.target.value)}
                                        placeholder="Enter event name in English"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description-en">Description (English)</Label>
                                    <textarea
                                        id="description-en"
                                        value={data.description.en}
                                        onChange={(e) => updateMultilingualField('description', 'en', e.target.value)}
                                        placeholder="Enter event description in English"
                                        className="min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="fr" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name-fr">Nom de l'événement (Français)</Label>
                                    <Input
                                        id="name-fr"
                                        value={data.name.fr}
                                        onChange={(e) => updateMultilingualField('name', 'fr', e.target.value)}
                                        placeholder="Entrez le nom de l'événement en français"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description-fr">Description (Français)</Label>
                                    <textarea
                                        id="description-fr"
                                        value={data.description.fr}
                                        onChange={(e) => updateMultilingualField('description', 'fr', e.target.value)}
                                        placeholder="Entrez la description de l'événement en français"
                                        className="min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="ar" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name-ar">اسم الحدث (العربية)</Label>
                                    <Input
                                        id="name-ar"
                                        value={data.name.ar}
                                        onChange={(e) => updateMultilingualField('name', 'ar', e.target.value)}
                                        placeholder="أدخل اسم الحدث بالعربية"
                                        className="text-right"
                                        dir="rtl"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description-ar">الوصف (العربية)</Label>
                                    <textarea
                                        id="description-ar"
                                        value={data.description.ar}
                                        onChange={(e) => updateMultilingualField('description', 'ar', e.target.value)}
                                        placeholder="أدخل وصف الحدث بالعربية"
                                        className="min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2 text-right focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        dir="rtl"
                                        required
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                placeholder="Enter event location"
                                required
                            />
                            {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date">Event Date & Time</Label>
                            <Input id="date" type="datetime-local" value={data.date} onChange={(e) => setData('date', e.target.value)} required />
                            {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input
                                id="capacity"
                                type="number"
                                min="1"
                                value={data.capacity}
                                onChange={(e) => setData('capacity', e.target.value)}
                                placeholder="Enter event capacity"
                                required
                            />
                            {errors.capacity && <p className="text-sm text-red-600">{errors.capacity}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEditing ? 'Update Event' : 'Create Event'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
