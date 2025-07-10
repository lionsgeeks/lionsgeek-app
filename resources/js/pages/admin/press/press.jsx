import { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";


const breadcrumbs = [
    {
        title: 'Press',
        href: '/admin/press',
    },
];

export default function Press() {
    const { presses } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    const [activeTab, setActiveTab] = useState('en');
    const [coverPreview, setCoverPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const { data, setData, post, errors, processing, reset } = useForm({
        name: { en: '', fr: '', ar: '' },
        cover: null,
        logo: null,
        link: ''
    });
    const translations = {
        en: {
            name: "Name",
            cover: "Cover Image",
            logo: "Logo",
            link: "Website Link",
            submit: "Submit",
            uploadText: "Click to upload or drag and drop",
            namePlaceholder: "Enter name"
        },
        fr: {
            name: "Nom",
            cover: "Image de couverture",
            logo: "Logo",
            link: "Lien du site",
            submit: "Envoyer",
            uploadText: "Cliquez pour télécharger",
            namePlaceholder: "Entrez le nom"
        },
        ar: {
            name: "الاسم",
            cover: "صورة الغلاف",
            logo: "الشعار",
            link: "رابط الموقع",
            submit: "إرسال",
            uploadText: "انقر للتحميل ",
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
        if (data.cover) formData.append('cover', data.cover);
        if (data.logo) formData.append('logo', data.logo);
        formData.append('link', data.link);

        post(route('press.store'), {
            data: formData,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setCoverPreview(null);
                setLogoPreview(null);
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Press" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900"></h1>
                        <Button
                            onClick={() => setShowModal(true)}
                            className="hover:bg-alpha hover:text-black font-semibold px-4 py-2 rounded-lg"
                        >
                            Add Press
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {presses.map((press) => (
                            <div key={press.id} className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={`/storage/${press.cover}`}
                                        alt={press.name.fr}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 " >
                                    <div className="flex items-center mb-3">
                                        <img
                                            src={`/storage/${press.logo}`}
                                            alt={`Logo ${press.name.fr}`}
                                            className="w-10 h-10 object-contain mr-3 rounded-full"
                                        />
                                        <h3 className="font-bold text-lg">{press.name.fr}</h3>
                                    </div>
                                    <a
                                        href={route('press.show', press.id)}
                                        rel="noopener noreferrer"
                                        className="bg-alpha rounded-2xl px-4 py-1.5 font-bold"
                                    >
                                        See press
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
                            <div className="p-6">

                                <h1 className="text-2xl font-bold text-center text-gray-800 mb-3">Create Press</h1>
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-xl font-bold text-gray-500 hover:text-gray-700"
                                    >
                                        <X />
                                    </button>
                                </div>
                                <div className="flex border-b">
                                    <button
                                        className={`flex-1 py-3 font-medium ${activeTab === 'en' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                        onClick={() => setActiveTab('en')}
                                    >
                                        English
                                    </button>
                                    <button
                                        className={`flex-1 py-3 font-medium ${activeTab === 'fr' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                        onClick={() => setActiveTab('fr')}
                                    >
                                        Français
                                    </button>
                                    <button
                                        className={`flex-1 py-3 font-medium ${activeTab === 'ar' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                        onClick={() => setActiveTab('ar')}
                                    >
                                        العربية
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{translations[activeTab].name}</label>
                                        <input
                                            type="text"
                                            value={data.name[activeTab]}
                                            onChange={(e) => setData(`name.${activeTab}`, e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border ${errors[`name.${activeTab}`] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder={translations[activeTab].namePlaceholder}
                                            dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                                        />
                                        {errors[`name.${activeTab}`] && (
                                            <p className="mt-1 text-sm text-red-600">{errors[`name.${activeTab}`]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1"> {translations[activeTab].cover}</label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                {coverPreview ? (
                                                    <img src={coverPreview} alt="Cover preview" className=" w-[250px] rounded-lg" />
                                                )
                                                    :
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            Upload Cover
                                                        </p>
                                                    </div>
                                                }
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange('cover')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        {errors.cover && (
                                            <p className="mt-1 text-sm text-red-600">{errors.cover}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {translations[activeTab].logo}
                                        </label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                {logoPreview ? (
                                                    <img src={logoPreview} alt="Logo preview" className="w-[250px] rounded-lg" />
                                                )
                                                    :
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            Upload Logo
                                                        </p>
                                                    </div>
                                                }

                                                <input
                                                    type="file"
                                                    onChange={handleFileChange('logo')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        {errors.logo && (
                                            <p className="mt-1 text-sm text-red-600">{errors.logo}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {translations[activeTab].link}
                                        </label>
                                        <input
                                            type="url"
                                            value={data.link}
                                            onChange={(e) => setData('link', e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border ${errors.link ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="https://example.com"
                                        />
                                        {errors.link && (
                                            <p className="mt-1 text-sm text-red-600">{errors.link}</p>
                                        )}
                                    </div>

                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full hover:bg-alpha hover:text-black"
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </span>
                                            )
                                                :
                                                'Submit'
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </AppLayout>
    );
}
