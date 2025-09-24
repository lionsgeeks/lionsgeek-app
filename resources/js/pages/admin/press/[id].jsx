import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Camera, Edit3, ExternalLink, Newspaper, Save, Upload } from 'lucide-react';
import { useState } from 'react';

const ShowPress = () => {
    const { press } = usePage().props;

    const [activeTab, setActiveTab] = useState('en');
    const [coverPreview, setCoverPreview] = useState(`/storage/images/press/${press.cover}`);
    const [logoPreview, setLogoPreview] = useState(`/storage/images/press/${press.logo}`);
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, processing, errors } = useForm({
        name: {
            en: press.name?.en || '',
            fr: press.name?.fr || '',
            ar: press.name?.ar || '',
        },
        link: press.link || '',
        cover: null,
        logo: null,
    });

    const translations = {
        en: {
            name: 'Name',
            cover: 'Cover Image',
            logo: 'Logo',
            link: 'Website Link',
            namePlaceholder: 'Enter name',
        },
        fr: {
            name: 'Nom',
            cover: 'Image de couverture',
            logo: 'Logo',
            link: 'Lien du site',
            namePlaceholder: 'Entrez le nom',
        },
        ar: {
            name: 'الاسم',
            cover: 'صورة الغلاف',
            logo: 'الشعار',
            link: 'رابط الموقع',
            namePlaceholder: 'أدخل الاسم',
        },
    };

    const handleFileChange = (field) => (e) => {
        const file = e.target.files[0];
        setData(field, file);

        const reader = new FileReader();
        reader.onload = () => {
            if (field === 'cover') setCoverPreview(reader.result);
            else setLogoPreview(reader.result);
        };
        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name[en]', data.name.en);
        formData.append('name[fr]', data.name.fr);
        formData.append('name[ar]', data.name.ar);
        formData.append('link', data.link);
        if (data.cover) formData.append('cover', data.cover);
        if (data.logo) formData.append('logo', data.logo);
        formData.append('_method', 'put');

        router.post(route('press.update', press.id), formData, {
            forceFormData: true,
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    router.visit('/admin/press');
                }, 1500);
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this press?')) {
            router.delete(route('press.destroy', press.id));
        }
    };

    const handleLinkClick = () => {
        if (data.link) {
            window.open(data.link, '_blank', 'noopener,noreferrer');
        }
    };

    const breadcrumbs = [
        { title: 'Press', href: '/admin/press' },
        { title: 'Edit Press', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Press" />

            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#fee819] p-3">
                                    <Newspaper className="h-8 w-8 text-[#212529]" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Edit Press Release</h1>
                                    <p className="mt-1 text-gray-300">Update press release information and media files</p>
                                </div>
                            </div>
                            <div className="max-md:w-full flex max-md:justify-end">
                                <button
                                    onClick={() => router.visit('/admin/press')}
                                    className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20 w-fit "
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Press
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="mx-auto max-w-4xl px-6 pt-6">
                        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Save className="h-5 w-5 text-green-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">Saved changes successfully! Redirecting...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="mx-auto max-w-4xl px-6 py-8">
                    <div className="rounded-lg border-0 bg-white shadow-lg">
                        <div className="p-8">
                            {/* Tab and Save Button Header */}
                            <div className="mb-8 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-semibold text-[#212529]">Press Information</h2>
                                    <select
                                        value={activeTab}
                                        onChange={(e) => setActiveTab(e.target.value)}
                                        className="rounded-lg border-gray-300 px-3 py-2 text-sm focus:border-[#fee819] focus:ring-[#fee819]"
                                    >
                                        <option value="en">English</option>
                                        <option value="fr">Français</option>
                                        <option value="ar">العربية</option>
                                    </select>
                                </div>

                                <div className="max-md:w-full flex max-md:justify-end">
                                    <button
                                        type="submit"
                                        form="press-form"
                                        disabled={processing}
                                        className="flex items-center gap-2 rounded-lg bg-[#212529] px-6 py-3 text-white transition-all duration-200 hover:bg-[#212529]/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Save className="h-4 w-4" />
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>

                            <form id="press-form" onSubmit={handleSubmit} className="space-y-8">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">{translations[activeTab].name}</label>
                                    <input
                                        type="text"
                                        value={data.name[activeTab]}
                                        onChange={(e) => setData(`name.${activeTab}`, e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#fee819] ${
                                            errors[`name.${activeTab}`] ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        placeholder={translations[activeTab].namePlaceholder}
                                        dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                    />
                                    {errors[`name.${activeTab}`] && (
                                        <p className="flex items-center gap-1 text-sm text-red-600">{errors[`name.${activeTab}`]}</p>
                                    )}
                                </div>

                                {/* Website Link Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">{translations[activeTab].link}</label>
                                    <div className="relative">
                                        <input
                                            type="url"
                                            value={data.link}
                                            onChange={(e) => setData('link', e.target.value)}
                                            className={`w-full rounded-lg border px-4 py-3 pr-12 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#fee819] ${
                                                errors.link ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            placeholder="https://example.com"
                                        />
                                        {data.link && (
                                            <button
                                                type="button"
                                                onClick={handleLinkClick}
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#212529]"
                                                title="Open link in new tab"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                    {errors.link && <p className="flex items-center gap-1 text-sm text-red-600">{errors.link}</p>}
                                </div>

                                {/* Cover Image */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        {translations[activeTab].cover}
                                    </label>
                                    {coverPreview && (
                                        <div className="group relative">
                                            <img
                                                src={coverPreview}
                                                alt="Cover"
                                                className="h-80 w-full rounded-lg border-2 border-gray-200 object-cover shadow-sm"
                                            />
                                            {/* Always visible edit indicator */}
                                            <div className="absolute top-3 right-3 rounded-lg border bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Camera className="h-4 w-4" />
                                                    <span className="font-medium">Click to edit</span>
                                                </div>
                                            </div>
                                            {/* Hover overlay */}
                                            <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-lg bg-black/40 text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                                                <div className="rounded-lg border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
                                                    <Upload className="mx-auto mb-3 h-8 w-8" />
                                                    <div className="mb-1 text-lg font-semibold">Update Cover Image</div>
                                                    <div className="text-sm opacity-90">Click to upload new image</div>
                                                    <div className="mt-1 text-xs opacity-75">Recommended: 1200x600px</div>
                                                </div>
                                                <input type="file" onChange={handleFileChange('cover')} className="hidden" accept="image/*" />
                                            </label>
                                        </div>
                                    )}
                                    {!coverPreview && (
                                        <div className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12 text-center transition-all duration-200 hover:border-[#fee819] hover:bg-yellow-50">
                                            <label className="block cursor-pointer">
                                                <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                                <div className="mb-2 text-lg font-medium text-gray-600">Upload Cover Image</div>
                                                <div className="mb-4 text-sm text-gray-500">Drag and drop or click to browse</div>
                                                <div className="text-xs text-gray-400">Recommended: 1200x600px • JPG, PNG, WebP</div>
                                                <input type="file" onChange={handleFileChange('cover')} className="hidden" accept="image/*" />
                                            </label>
                                        </div>
                                    )}
                                    {errors.cover && <p className="text-sm text-red-600">{errors.cover}</p>}
                                </div>

                                {/* Logo */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        {translations[activeTab].logo}
                                    </label>
                                    {logoPreview && (
                                        <div className="group relative w-fit">
                                            <img
                                                src={logoPreview}
                                                alt="Logo"
                                                className="h-32 w-32 rounded-lg border-2 border-gray-200 object-cover shadow-sm"
                                            />
                                            {/* Always visible edit indicator for logo */}
                                            <div className="absolute top-2 right-2 rounded-full border bg-white/90 p-1.5 shadow-lg backdrop-blur-sm">
                                                <Edit3 className="h-3 w-3 text-gray-600" />
                                            </div>
                                            {/* Hover overlay */}
                                            <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-lg bg-black/50 text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                                                <div className="text-center">
                                                    <Upload className="mx-auto mb-2 h-6 w-6" />
                                                    <div className="mb-1 text-sm font-semibold">Update Logo</div>
                                                    <div className="text-xs opacity-90">Click to upload</div>
                                                    <div className="mt-1 text-xs opacity-75">Square 200x200px</div>
                                                </div>
                                                <input type="file" onChange={handleFileChange('logo')} className="hidden" accept="image/*" />
                                            </label>
                                        </div>
                                    )}
                                    {!logoPreview && (
                                        <div className="w-fit cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 transition-all duration-200 hover:border-[#fee819] hover:bg-yellow-50">
                                            <label className="block cursor-pointer text-center">
                                                <Upload className="mx-auto mb-3 h-8 w-8 text-gray-400" />
                                                <div className="mb-1 text-sm font-medium text-gray-600">Upload Logo</div>
                                                <div className="mb-2 text-xs text-gray-500">Click to browse</div>
                                                <div className="text-xs text-gray-400">Square 200x200px • PNG preferred</div>
                                                <input type="file" onChange={handleFileChange('logo')} className="hidden" accept="image/*" />
                                            </label>
                                        </div>
                                    )}
                                    {errors.logo && <p className="text-sm text-red-600">{errors.logo}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShowPress;
