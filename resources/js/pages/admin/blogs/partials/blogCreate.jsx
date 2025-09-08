import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import Tiptap from './tiptap';

const breadcrumbs = [
    {
        title: 'Create Blog',
        href: '/admin/blogs/create',
    },
];

export default function BlogCreate() {
    const { blog } = usePage().props;

    const { data, setData, post } = useForm({
        title_en: blog ? blog.title?.en : '',
        title_fr: blog ? blog.title?.fr : '',
        title_ar: blog ? blog.title?.ar : '',
        description_en: blog ? blog.description?.en : '',
        description_fr: blog ? blog.description?.fr : '',
        description_ar: blog ? blog.description?.ar : '',
        content_en: blog ? blog.content?.en : '',
        content_fr: blog ? blog.content?.fr : '',
        content_ar: blog ? blog.content?.ar : '',
        image: blog ? blog.image : '',
    });

    const [preview, setPreview] = useState(blog?.image ? `/storage/${blog.image}` : null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setData('image', '');
        setPreview(null);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (blog) {
            post(
                route('blogs.update', {
                    _method: 'put',
                    blog: blog.id,
                }),
                {
                    onSuccess: () => {
                        setIsOpen(false);
                    },
                },
            );
        } else {
            post(route('blogs.store'));
        }
    };

    const [tab, setTab] = useState('English');
    const languages = ['English', 'Français', 'العربية'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Blog" />

            <div className="p-6">
                <form onSubmit={onFormSubmit} className="space-y-3">
                    <div className="flex justify-end gap-2">
                        <div>
                            <select
                                value={tab}
                                onChange={(e) => setTab(e.target.value)}
                                className="w-full cursor-pointer rounded-lg border-1 border-black px-[12px] py-[7px] text-black"
                            >
                                {languages.map((language) => (
                                    <option key={language} value={language}>
                                        {language}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button type="submit" className="transition-all duration-150 hover:bg-alpha hover:text-black">
                            Publish
                        </Button>
                    </div>
                    {tab == 'English' && (
                        <>
                            <div>
                                <Label htmlFor="title_en">Title</Label>
                                <Input
                                    type="text"
                                    name="title_en"
                                    placeholder="Title..."
                                    onChange={(e) => {
                                        setData('title_en', e.target.value);
                                    }}
                                    value={data.title_en}
                                />
                            </div>
                            <div className="m-0 flex flex-col justify-between p-0">
                                <Label htmlFor="description_en">Description</Label>
                                <Tiptap content={data.description_en} setData={setData} lang={tab} />
                            </div>
                            <div>
                                <Label htmlFor="image">Blog Cover</Label>
                                <div className="relative mt-1 rounded-lg border border-gray-300 p-6 text-center">
                                    <input
                                        className="hidden"
                                        type="file"
                                        name="image"
                                        id="image-upload"
                                        accept="image/png, image/jpg, image/jpeg"
                                        onChange={handleImageChange}
                                    />

                                    {preview ? (
                                        <div className="relative flex justify-center">
                                            <img src={preview} alt="Preview" className="max-h-48 rounded-md object-contain" />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label htmlFor="image-upload" className="flex cursor-pointer flex-col items-center">
                                            <Upload className="mb-4 h-12 w-12 text-gray-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Click to upload image or drag and drop</span>
                                            <span className="mt-1 text-xs text-gray-500 dark:text-gray-500">PNG, JPG</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {tab == 'Français' && (
                        <>
                            <div>
                                <Label htmlFor="title_fr">Titre</Label>
                                <Input
                                    type="text"
                                    name="title_fr"
                                    placeholder="Titre..."
                                    onChange={(e) => {
                                        setData('title_fr', e.target.value);
                                    }}
                                    value={data.title_fr}
                                />
                            </div>

                            <div className="m-0 flex flex-col justify-between p-0">
                                <Label htmlFor="description_fr">description</Label>
                                <Tiptap content={data.description_fr} setData={setData} lang={tab} />
                            </div>
                            <div>
                                <Label htmlFor="image">couverture du blog</Label>
                                <div className="relative mt-1 rounded-lg border border-gray-300 p-6 text-center">
                                    <input
                                        className="hidden"
                                        type="file"
                                        name="image"
                                        id="image-upload"
                                        accept="image/png, image/jpg, image/jpeg"
                                        onChange={handleImageChange}
                                    />

                                    {preview ? (
                                        <div className="relative flex justify-center">
                                            <img src={preview} alt="Preview" className="max-h-48 rounded-md object-contain" />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label htmlFor="image-upload" className="flex cursor-pointer flex-col items-center">
                                            <Upload className="mb-4 h-12 w-12 text-gray-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Cliquez pour télécharger l'image ou faites-la glisser et déposez-la
                                            </span>
                                            <span className="mt-1 text-xs text-gray-500 dark:text-gray-500">PNG, JPG</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    {tab == 'العربية' && (
                        <>
                            <div>
                                <Label htmlFor="title_ar">العنوان</Label>
                                <Input
                                    type="text"
                                    name="title_ar"
                                    placeholder="العنوان..."
                                    onChange={(e) => {
                                        setData('title_ar', e.target.value);
                                    }}
                                    value={data.title_ar}
                                />
                            </div>
                            <div className="m-0 flex flex-col justify-between p-0">
                                <Label htmlFor="description_ar">الوصف</Label>
                                <Tiptap content={data.description_ar} setData={setData} lang={tab} />
                            </div>
                            <div>
                                <Label htmlFor="image">غلاف المدونة</Label>
                                <div className="relative mt-1 rounded-lg border border-gray-300 p-6 text-center">
                                    <input
                                        className="hidden"
                                        type="file"
                                        name="image"
                                        id="image-upload"
                                        accept="image/png, image/jpg, image/jpeg"
                                        onChange={handleImageChange}
                                    />

                                    {preview ? (
                                        <div className="relative flex justify-center">
                                            <img src={preview} alt="Preview" className="max-h-48 rounded-md object-contain" />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label htmlFor="image-upload" className="flex cursor-pointer flex-col items-center">
                                            <Upload className="mb-4 h-12 w-12 text-gray-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">انقر لتحميل الصورة أو اسحبها</span>
                                            <span className="mt-1 text-xs text-gray-500 dark:text-gray-500">PNG, JPG</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </AppLayout>
    );
}
