import React, { useState } from 'react';
import { useForm, usePage, router, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const ShowPress = () => {
    const { press } = usePage().props;

    const [activeTab, setActiveTab] = useState('en');
    const [coverPreview, setCoverPreview] = useState(`/storage/images/press/${press.cover}`);
    const [logoPreview, setLogoPreview] = useState(`/storage/images/press/${press.logo}`);

    const { data, setData, processing, errors } = useForm({
        name: {
            en: press.name?.en || '',
            fr: press.name?.fr || '',
            ar: press.name?.ar || ''
        },
        link: press.link || '',
        cover: null,
        logo: null,
    });

    const translations = {
        en: {
            name: "Name",
            cover: "Cover Image",
            logo: "Logo",
            link: "Website Link",
            namePlaceholder: "Enter name"
        },
        fr: {
            name: "Nom",
            cover: "Image de couverture",
            logo: "Logo",
            link: "Lien du site",
            namePlaceholder: "Entrez le nom"
        },
        ar: {
            name: "الاسم",
            cover: "صورة الغلاف",
            logo: "الشعار",
            link: "رابط الموقع",
            namePlaceholder: "أدخل الاسم"
        }
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
            onSuccess: () => alert('Updated successfully!'),
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this press?')) {
            router.delete(route('press.destroy', press.id));
        }
    };

    return (
        <AppLayout>
            <div className="w-full mx-auto p-8 bg-white shadow rounded-lg">
                <div className="flex items-center justify-between pt-4">
                    <h1 className="text-2xl font-bold mb-6 text-center">Edit Press</h1>
                    <div className=''>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 ml-2"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="flex border-b mb-6">
                    {['en', 'fr', 'ar'].map((lang) => (
                        <button
                            key={lang}
                            className={`flex-1 py-3 font-medium ${activeTab === lang
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab(lang)}
                        >
                            {lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'العربية'}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{translations[activeTab].name}</label>
                        <input
                            type="text"
                            value={data.name[activeTab]}
                            onChange={(e) => setData(`name.${activeTab}`, e.target.value)}
                            className={`w-full px-4 py-2 rounded-lg border ${errors[`name.${activeTab}`] ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder={translations[activeTab].namePlaceholder}
                            dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                        />
                        {errors[`name.${activeTab}`] && <p className="text-sm text-red-600">{errors[`name.${activeTab}`]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{translations[activeTab].link}</label>
                        <input
                            type="url"
                            value={data.link}
                            onChange={(e) => setData('link', e.target.value)}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.link ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="https://example.com"
                        />
                        {errors.link && <p className="text-sm text-red-600">{errors.link}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {translations[activeTab].cover}
                        </label>
                        {coverPreview && (
                            <div className="relative mb-2">
                                <img
                                    src={coverPreview}
                                    alt="Cover"
                                    className="h-40 w-full object-cover rounded"
                                />
                                <label className="absolute inset-0 bg-black/30 text-white flex items-center justify-center rounded cursor-pointer text-lg font-semibold">
                                    + Update Cover
                                    <input
                                        type="file"
                                        onChange={handleFileChange('cover')}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                        )}
                        {!coverPreview && (
                            <input type="file" onChange={handleFileChange('cover')} />
                        )}

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{translations[activeTab].logo}</label>
                        {logoPreview && <img src={logoPreview} alt="Logo" className="h-20 mb-2" />}
                        <input type="file" onChange={handleFileChange('logo')} />
                        {errors.logo && <p className="text-sm text-red-600">{errors.logo}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-alpha px-6 py-2 rounded-lg  disabled:opacity-70"
                    >
                        Save
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default ShowPress;
