import { useRef, useState } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X, Newspaper, Upload, Image as ImageIcon, Plus, Images, Trash2 } from "lucide-react";


const breadcrumbs = [{ title: 'Press', href: '/admin/press' }];

export default function Press() {
    const { presses } = usePage().props;
    const { delete: destroy } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [tab, setTab] = useState('English');
    const [coverPreview, setCoverPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const coverInputRef = useRef(null);
    const logoInputRef = useRef(null);
    const { data, setData, post, processing, reset, errors } = useForm({
        name_en: '',
        name_fr: '',
        name_ar: '',
        cover: null,
        logo: null,
        link: '',
    });

    const languages = ['English', 'Français', 'العربية'];

    const handleFileChange = (field) => (e) => {
        const file = e.target.files[0];
        setData(field, file);

        const reader = new FileReader();
        reader.onload = () => {
            if (field === 'cover') setCoverPreview(reader.result);
            if (field === 'logo') setLogoPreview(reader.result);
        };
        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name[en]', data.name_en);
        formData.append('name[fr]', data.name_fr);
        formData.append('name[ar]', data.name_ar);
        if (data.cover) formData.append('cover', data.cover);
        if (data.logo) formData.append('logo', data.logo);
        formData.append('link', data.link);

        router.post(route("press.store"), formData, {
            onSuccess: () => {
                reset();
                setCoverPreview(null);
                setLogoPreview(null);
                setIsOpen(false);
                router.reload({ only: ['presses'] });
            },
        });
    };
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedPress, setSelectedPress] = useState(null);
    const handleDelete = (press) => {
        setSelectedPress(press);
        setIsDeleteOpen(true);
    };

    const confirmDelete = () => {
        if (selectedPress) {
            onDeletePress(selectedPress.id);
        }
        setIsDeleteOpen(false);
    };

    const onDeletePress = (pressId) => {
        destroy(route('press.destroy', pressId), {
            onSuccess: () => {
                router.reload({ only: ['presses'] });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Press" />

            <div className="min-h-screen bg-white">
                <div className="bg-[#212529] py-8 text-white">
                    <div className="flex items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-[#fee819] p-3 lg:flex hidden">
                                <Newspaper className="h-8 w-8 text-[#212529]" />
                            </div>
                            <div>
                                <h1 className="lg:text-3xl text-2xl lg:font-bold  capitalize">Press Releases</h1>
                                <p className="mt-1 text-gray-300 lg:text-lg text-[0.8rem] lg:w-fit w-[90%] ">Manage and showcase all your press coverage and media mentions</p>
                            </div>
                        </div>
                        {/* Modal Add press*/}
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex justify-center transform cursor-pointer items-center rounded-lg bg-[#fee819] px-2 py-2 h-fit lg:w-fit text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Press
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="custom-scrollbar max-h-[90vh] overflow-y-auto p-0 sm:max-w-[700px] [&>button]:hidden">
                                {/* Header */}
                                <div className="relative rounded-t-lg bg-[#212529] p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-[#fee819] p-2">
                                                <Newspaper className="h-6 w-6 text-[#212529]" />
                                            </div>
                                            <div>
                                                <DialogTitle className="text-xl font-bold text-white">Create New Press</DialogTitle>
                                                <p className="mt-1 text-sm text-gray-300">Add press name, cover, logo and website link</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10 hover:text-[#fee819]"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="flex items-center justify-center gap-1 rounded-lg bg-gray-100 p-1">
                                            {languages.map((language) => (
                                                <button
                                                    key={language}
                                                    type="button"
                                                    onClick={() => setTab(language)}
                                                    className={`flex-1 rounded-md px-3 py-2 font-medium transition-all duration-200 ${tab === language
                                                            ? 'bg-[#212529] text-white shadow-sm'
                                                            : 'bg-transparent text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {language}
                                                </button>
                                            ))}
                                        </div>
                                        {tab === 'English' && (
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="title_en" className="mb-2 block text-sm font-medium text-[#212529]">
                                                        Title
                                                    </label>
                                                    <Input
                                                        id="title_en"
                                                        placeholder="Enter Press Name"
                                                        value={data.name_en}
                                                        onChange={(e) => setData('name_en', e.target.value)}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-[#212529]">Cover Image</label>
                                                    <label
                                                        htmlFor="cover-upload"
                                                        className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-all duration-200 hover:border-[#212529]"
                                                    >
                                                        <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-[#212529] group-hover:text-white">
                                                            <Upload className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-[#212529]">
                                                                {coverPreview ? 'Cover Selected' : 'Upload cover image'}
                                                            </p>
                                                            <p className="text-sm text-gray-500">PNG, JPG, JPEG</p>
                                                        </div>
                                                        {coverPreview && (
                                                            <div className="relative mt-2 w-32">
                                                                <img src={coverPreview} alt="Preview" className="w-full rounded-lg" />
                                                                <button
                                                                    type="button"
                                                                    className="absolute top-1 right-1 rounded-full bg-red-500 text-white transition"
                                                                    onClick={() => {
                                                                        setCoverPreview(null);
                                                                        setData('cover', null);
                                                                        coverInputRef.current.value = null;
                                                                    }}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </label>
                                                    <Input
                                                        ref={coverInputRef}
                                                        id="cover-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange('cover')}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-[#212529]">Logo</label>
                                                    <label
                                                        htmlFor="logo-upload"
                                                        className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-all duration-200 hover:border-[#212529]"
                                                    >
                                                        <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-[#212529] group-hover:text-white">
                                                            <ImageIcon className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-[#212529]">
                                                                {logoPreview ? 'Logo Selected' : 'Upload logo'}
                                                            </p>
                                                            <p className="text-sm text-gray-500">PNG, JPG, JPEG</p>
                                                        </div>
                                                        {logoPreview && (
                                                            <div className="relative mt-2 w-32">
                                                                <img src={logoPreview} alt="Preview" className="w-full rounded-lg" />
                                                                <button
                                                                    type="button"
                                                                    className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white transition"
                                                                    onClick={() => {
                                                                        setLogoPreview(null);
                                                                        setData('logo', null);
                                                                        logoInputRef.current.value = null;
                                                                    }}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </label>
                                                    <Input
                                                        ref={logoInputRef}
                                                        id="logo-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange('logo')}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-[#212529]">Link</label>
                                                    <Input
                                                        type="url"
                                                        placeholder="https://example.com"
                                                        value={data.link}
                                                        onChange={(e) => setData('link', e.target.value)}
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {tab === 'Français' && (
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="title_fr" className="mb-2 block text-sm font-medium text-[#212529]">
                                                        Titre
                                                    </label>

                                                    <Input
                                                        id="title_fr"
                                                        placeholder="Entrez le nom de la presse"
                                                        value={data.name_fr}
                                                        onChange={(e) => setData('name_fr', e.target.value)}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-[#212529]">Image de couverture</label>
                                                    <label
                                                        htmlFor="cover-upload"
                                                        className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-all duration-200 hover:border-[#212529]"
                                                    >
                                                        <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-[#212529] group-hover:text-white">
                                                            <Upload className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-[#212529]">
                                                                {coverPreview ? 'Couverture sélectionnée' : "Télécharger l'image de couverture"}
                                                            </p>
                                                            <p className="text-sm text-gray-500">PNG, JPG, JPEG</p>
                                                        </div>
                                                        {coverPreview && (
                                                            <div className="relative mt-2 w-32">
                                                                <img src={coverPreview} alt="Preview" className="w-full rounded-lg" />
                                                                <button
                                                                    type="button"
                                                                    className="absolute top-1 right-1 rounded-full bg-red-500 text-white transition"
                                                                    onClick={() => {
                                                                        setCoverPreview(null);
                                                                        setData('cover', null);
                                                                        coverInputRef.current.value = null;
                                                                    }}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </label>
                                                    <Input
                                                        ref={coverInputRef}
                                                        id="cover-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange('cover')}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-[#212529]">Logo</label>
                                                    <label
                                                        htmlFor="logo-upload"
                                                        className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-all duration-200 hover:border-[#212529]"
                                                    >
                                                        <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-[#212529] group-hover:text-white">
                                                            <ImageIcon className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-[#212529]">
                                                                {logoPreview ? 'Logo sélectionné' : 'Télécharger le logo'}
                                                            </p>
                                                            <p className="text-sm text-gray-500">PNG, JPG, JPEG</p>
                                                        </div>
                                                        {logoPreview && (
                                                            <div className="relative mt-2 w-32">
                                                                <img src={logoPreview} alt="Preview" className="w-full rounded-lg" />
                                                                <button
                                                                    type="button"
                                                                    className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white transition"
                                                                    onClick={() => {
                                                                        setLogoPreview(null);
                                                                        setData('logo', null);
                                                                        logoInputRef.current.value = null;
                                                                    }}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </label>
                                                    <Input
                                                        ref={logoInputRef}
                                                        id="logo-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange('logo')}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-[#212529]">Lien</label>
                                                    <Input
                                                        type="url"
                                                        placeholder="https://example.com"
                                                        value={data.link}
                                                        onChange={(e) => setData('link', e.target.value)}
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {tab === 'العربية' && (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label htmlFor="title_ar" className="mb-2 block text-sm font-medium text-[#212529]">
                                                        العنوان
                                                    </label>

                                                    <Input
                                                        placeholder="أدخل اسم الصحافة"
                                                        value={data.name_ar}
                                                        onChange={(e) => setData('name_ar', e.target.value)}
                                                        className="w-full text-right"
                                                        dir="rtl"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-[#212529]">صورة الغلاف</label>
                                                    <label
                                                        htmlFor="cover-upload"
                                                        className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-all duration-200 hover:border-[#212529]"
                                                    >
                                                        <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-[#212529] group-hover:text-white">
                                                            <Upload className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-[#212529]">
                                                                {coverPreview ? 'الغلاف المحدد' : 'تحميل صورة الغلاف'}
                                                            </p>
                                                            <p className="text-sm text-gray-500">PNG, JPG, JPEG</p>
                                                        </div>
                                                        {coverPreview && (
                                                            <div className="relative mt-2 w-32">
                                                                <img src={coverPreview} alt="Preview" className="w-full rounded-lg" />
                                                                <button
                                                                    type="button"
                                                                    className="absolute top-1 right-1 rounded-full bg-red-500 text-white transition"
                                                                    onClick={() => {
                                                                        setCoverPreview(null);
                                                                        setData('cover', null);
                                                                        coverInputRef.current.value = null;
                                                                    }}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </label>
                                                    <Input
                                                        ref={coverInputRef}
                                                        id="cover-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange('cover')}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-[#212529]">الشعار</label>
                                                    <label
                                                        htmlFor="logo-upload"
                                                        className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-all duration-200 hover:border-[#212529]"
                                                    >
                                                        <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-[#212529] group-hover:text-white">
                                                            <ImageIcon className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-[#212529]">
                                                                {logoPreview ? 'الشعار المحدد' : 'تحميل الشعار'}
                                                            </p>
                                                            <p className="text-sm text-gray-500">PNG, JPG, JPEG</p>
                                                        </div>
                                                        {logoPreview && (
                                                            <div className="relative mt-2 w-32">
                                                                <img src={logoPreview} alt="Preview" className="w-full rounded-lg" />
                                                                <button
                                                                    type="button"
                                                                    className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white transition"
                                                                    onClick={() => {
                                                                        setLogoPreview(null);
                                                                        setData('logo', null);
                                                                        logoInputRef.current.value = null;
                                                                    }}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </label>
                                                    <Input
                                                        ref={logoInputRef}
                                                        id="logo-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange('logo')}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-[#212529]">الرابط</label>
                                                    <Input
                                                        type="url"
                                                        placeholder="https://example.com"
                                                        value={data.link}
                                                        onChange={(e) => setData('link', e.target.value)}
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-3 pt-4">
                                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="flex-1"
                                            >
                                                {processing ? 'Processing...' : 'Submit'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Press List */}
                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
                    {presses.map((press) => (
                        <div
                            key={press.id}
                            className="flex flex-col rounded-lg border bg-gray-50 p-3 text-[#212529] shadow transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="h-48 overflow-hidden">
                                <img src={`/storage/images/press/${press.cover}`} alt={press.name.fr} className="h-full w-full object-cover" />
                            </div>

                            <div className="flex flex-1 flex-col justify-between p-4">
                                <div className="flex min-h-[80px] items-start gap-3">
                                    <img
                                        src={`/storage/images/press/${press.logo}`}
                                        alt={`Logo ${press.name.fr}`}
                                        className="h-10 w-10 rounded-full object-contain"
                                    />
                                    <h3 className="text-lg leading-snug font-bold">{press.name.fr}</h3>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <button
    onClick={() => router.visit(route('press.show', press.id))}
    className="inline-block rounded-2xl bg-beta px-4 py-1.5 font-bold text-white transition hover:bg-alpha hover:text-beta"
>
    See press
</button>
                                    <button onClick={() => handleDelete(press)} className="flex items-center text-red-600 hover:text-red-800">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal Delete*/}
                <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
             <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 ">
                        <DialogTitle>Are you sure you want to delete this press?</DialogTitle>

                        <div className="mt-4 flex justify-end gap-3">
                            <button className="rounded border px-3 py-1" onClick={() => setIsDeleteOpen(false)}>
                                Cancel
                            </button>
                            <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={confirmDelete}>
                                Delete
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}