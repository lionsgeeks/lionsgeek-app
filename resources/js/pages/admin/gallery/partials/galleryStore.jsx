import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { Edit, Images, Plus, Upload, X } from 'lucide-react';
import { useState } from 'react';

export default function GalleryStore({ gallery }) {
    const { data, setData, post, put } = useForm({
        title_en: gallery ? gallery.title?.en : '',
        title_fr: gallery ? gallery.title?.fr : '',
        title_ar: gallery ? gallery.title?.ar : '',
        description_en: gallery ? gallery.description?.en : '',
        description_fr: gallery ? gallery.description?.fr : '',
        description_ar: gallery ? gallery.description?.ar : '',
        couverture: gallery ? gallery.couverture : '',
        images: gallery ? gallery?.images : [],
    });
    const [tab, setTab] = useState('English');
    const languages = ['English', 'Français', 'العربية'];
    const [isOpen, setIsOpen] = useState(false);

    const handleFileChange = (event) => {
        if (event.target.name == 'couverture') {
            setData('couverture', event.target.files[0]);
        }
        if (event.target.name == 'images') {
            setData('images', Array.from(event.target.files));
        }
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (gallery) {
            post(
                route('gallery.update', {
                    _method: 'put',
                    data: data,
                    gallery: gallery.id,
                }),
                {
                    onSuccess: () => {
                        setIsOpen(false);
                    },
                },
            );
        } else {
            post(route('gallery.store'), {
                onSuccess: () => {
                    setData({
                        title_en: '',
                        title_fr: '',
                        title_ar: '',
                        description_en: '',
                        description_fr: '',
                        description_ar: '',
                        couverture: '',
                        images: [],
                    });

                    setIsOpen(false);
                },
            });
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    {gallery ? (
                        <div className="cursor-pointer">
                            <Edit className="h-4 w-4" />
                        </div>
                    ) : (
                        <Button className="transform bg-[#212529] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Gallery
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent className="custom-scrollbar max-h-[90vh] overflow-y-auto p-0 sm:max-w-[700px] [&>button]:hidden">
                    {/* Header */}
                    <div className="relative rounded-t-lg bg-[#212529] p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#fee819] p-2">
                                    <Images className="h-6 w-6 text-[#212529]" />
                                </div>
                                <div>
                                    <DialogTitle className="text-xl font-bold text-white">
                                        {gallery ? 'Edit Gallery' : 'Create New Gallery'}
                                    </DialogTitle>
                                    <p className="mt-1 text-sm text-gray-300">
                                        {gallery ? 'Update gallery information and images' : 'Add a new gallery with cover and images'}
                                    </p>
                                </div>
                            </div>
                            {/* Custom close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10 hover:text-[#fee819]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <form onSubmit={onFormSubmit} className="space-y-6">
                            {/* Language Tabs */}
                            <div className="flex items-center justify-center gap-1 rounded-lg bg-gray-100 p-1">
                                {languages.map((language) => (
                                    <button
                                        key={language}
                                        onClick={() => setTab(language)}
                                        className={`flex-1 rounded-md px-3 py-2 font-medium transition-all duration-200 ${
                                            tab === language ? 'bg-[#212529] text-white shadow-sm' : 'bg-transparent text-gray-600 hover:bg-gray-200'
                                        }`}
                                        type="button"
                                    >
                                        {language}
                                    </button>
                                ))}
                            </div>

                            {/* English Form */}
                            {tab === 'English' && (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="title_en" className="mb-2 block text-sm font-medium text-[#212529]">
                                            Title *
                                        </label>
                                        <Input
                                            id="title_en"
                                            name="title[en]"
                                            type="text"
                                            placeholder="Enter gallery title"
                                            required
                                            value={data.title_en}
                                            onChange={(e) => setData('title_en', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="description_en" className="mb-2 block text-sm font-medium text-[#212529]">
                                            Description *
                                        </label>
                                        <textarea
                                            id="description_en"
                                            name="description[en]"
                                            placeholder="Enter gallery description"
                                            required
                                            rows={4}
                                            value={data.description_en}
                                            onChange={(e) => setData('description_en', e.target.value)}
                                            className="w-full resize-none rounded-lg border border-gray-300 p-3 transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Français Form */}
                            {tab === 'Français' && (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="title_fr" className="mb-2 block text-sm font-medium text-[#212529]">
                                            Titre *
                                        </label>
                                        <Input
                                            id="title_fr"
                                            name="title[fr]"
                                            type="text"
                                            placeholder="Entrez le titre de la galerie"
                                            required
                                            value={data.title_fr}
                                            onChange={(e) => setData('title_fr', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="description_fr" className="mb-2 block text-sm font-medium text-[#212529]">
                                            Description *
                                        </label>
                                        <textarea
                                            id="description_fr"
                                            name="description[fr]"
                                            placeholder="Entrez la description de la galerie"
                                            required
                                            rows={4}
                                            value={data.description_fr}
                                            onChange={(e) => setData('description_fr', e.target.value)}
                                            className="w-full resize-none rounded-lg border border-gray-300 p-3 transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Arabic Form */}
                            {tab === 'العربية' && (
                                <div className="space-y-4 text-right" dir="rtl">
                                    <div>
                                        <label htmlFor="title_ar" className="mb-2 block text-sm font-medium text-[#212529]">
                                            العنوان *
                                        </label>
                                        <Input
                                            id="title_ar"
                                            name="title[ar]"
                                            type="text"
                                            placeholder="أدخل عنوان المعرض"
                                            required
                                            value={data.title_ar}
                                            onChange={(e) => setData('title_ar', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 text-right transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="description_ar" className="mb-2 block text-sm font-medium text-[#212529]">
                                            الوصف *
                                        </label>
                                        <textarea
                                            id="description_ar"
                                            name="description[ar]"
                                            placeholder="أدخل وصف المعرض"
                                            required
                                            rows={4}
                                            value={data.description_ar}
                                            onChange={(e) => setData('description_ar', e.target.value)}
                                            className="w-full resize-none rounded-lg border border-gray-300 p-3 text-right transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Cover Image Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-[#212529]">
                                    {tab === 'English' && 'Cover Image *'}
                                    {tab === 'Français' && 'Image de Couverture *'}
                                    {tab === 'العربية' && 'صورة الغلاف *'}
                                </label>
                                <label
                                    htmlFor="image"
                                    className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-all duration-200 hover:border-[#212529]"
                                >
                                    <div className="rounded-lg bg-gray-100 p-2 transition-all duration-200 group-hover:bg-[#212529] group-hover:text-white">
                                        <Upload className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#212529]">
                                            {data.couverture ? 'Cover image selected' : 'Upload cover image'}
                                        </p>
                                        <p className="text-sm text-gray-500">PNG, JPG or JPEG (Max 10MB)</p>
                                    </div>
                                </label>
                                <Input
                                    id="image"
                                    name="couverture"
                                    type="file"
                                    accept="image/png,image/jpg,image/jpeg"
                                    onChange={handleFileChange}
                                    required={!gallery}
                                    className="hidden"
                                />
                            </div>

                            {/* Gallery Images Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-[#212529]">
                                    {tab === 'English' && 'Gallery Images *'}
                                    {tab === 'Français' && 'Images de la Galerie *'}
                                    {tab === 'العربية' && 'صور المعرض *'}
                                </label>
                                <label
                                    htmlFor="images"
                                    className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-all duration-200 hover:border-[#212529]"
                                >
                                    <div className="rounded-lg bg-gray-100 p-2 transition-all duration-200 group-hover:bg-[#212529] group-hover:text-white">
                                        <Images className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#212529]">
                                            {data.images?.length > 0 ? `${data.images.length} images selected` : 'Upload gallery images'}
                                        </p>
                                        <p className="text-sm text-gray-500">Multiple files allowed - PNG, JPG or JPEG</p>
                                    </div>
                                </label>
                                <Input
                                    id="images"
                                    name="images"
                                    type="file"
                                    accept="image/png,image/jpg,image/jpeg"
                                    onChange={handleFileChange}
                                    required={!gallery}
                                    multiple
                                    className="hidden"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 border-gray-300 text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-100"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 transform bg-[#212529] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
                                >
                                    {gallery ? 'Update Gallery' : 'Create Gallery'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
