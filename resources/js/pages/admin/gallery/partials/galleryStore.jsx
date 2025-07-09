import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Pen, PenLine, PlusIcon } from 'lucide-react';

export default function GalleryStore({ gallery }) {
    const { data, setData, post, put } = useForm({
        title_en: gallery ? JSON.parse(gallery.title)?.en : '',
        title_fr: gallery ? JSON.parse(gallery.title)?.fr : '',
        title_ar: gallery ? JSON.parse(gallery.title)?.ar : '',
        description_en: gallery ? JSON.parse(gallery.title)?.en : '',
        description_fr: gallery ? JSON.parse(gallery.title)?.fr : '',
        description_ar: gallery ? JSON.parse(gallery.title)?.ar : '',
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
            setData('images', Array.from(event.target.files))
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
                    }
                }
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
                }
            });
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div className='cursor-pointer'>
                        {
                            gallery ? <PenLine /> :
                                <div className='flex items-center justify-center h-full group w-full border-dashed border-1 border-black rounded-lg'>
                                    <div className='flex flex-col gap-2 items-center group-hover:scale-110 transition-all duration-150'>
                                        <PlusIcon size={40} />
                                        <p className='text-lg'>Create Gallery</p>
                                    </div>
                                </div>
                        }
                    </div>
                </DialogTrigger>
                <DialogContent className="min-w-[40vw]">
                    <DialogTitle>Add a Gallery</DialogTitle>
                    <div>
                        <form onSubmit={onFormSubmit}>
                            <div className="flex items-center justify-center gap-2 p-2 w-[100%] bg-slate-200 rounded">
                                {languages.map((language) => (
                                    <button
                                        key={language}
                                        onClick={() => setTab(language)}
                                        className={`w-1/3 rounded-md font-medium p-1 ${tab === language ? 'bg-white text-black' : 'bg-slate-200 text-black'
                                            }`}
                                        type="button"
                                    >
                                        {language}
                                    </button>
                                ))}
                            </div>


                            {/* English Form */}
                            {tab === 'English' && (
                                <div className="flex flex-col items-center w-[100%] gap-5">
                                    <div className="flex flex-col w-[100%] gap-1">
                                        <label htmlFor="title_en">Title</label>
                                        <Input
                                            placeholder="Enter title"
                                            required
                                            className="w-[100%] border-[2px] border-black rounded-[10px]"
                                            type="text"
                                            name="title[en]"
                                            id="title_en"
                                            onChange={(e) => { setData('title_en', e.target.value) }}
                                            value={data.title_en}
                                        />
                                    </div>

                                    <div className="flex flex-col w-[100%] gap-1">
                                        <label htmlFor="description_en">Description</label>
                                        <textarea
                                            placeholder="Enter description"
                                            required
                                            rows="5"
                                            className="w-[100%] border-[2px] border-black rounded-[10px] p-1"
                                            name="description[en]"
                                            id="description_en"
                                            onChange={(e) => { setData('description_en', e.target.value) }}
                                            value={data.description_en}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Français Form */}
                            {tab === 'Français' && (
                                <div className="flex flex-col items-center w-[100%] gap-5">
                                    <div className="flex flex-col w-[100%] gap-1">
                                        <label htmlFor="title_fr">Titre</label>
                                        <Input
                                            placeholder="Enter le Titre"
                                            required
                                            className="w-[100%] border-[2px] border-black rounded-[10px]"
                                            type="text"
                                            name="title[fr]"
                                            id="title_fr"
                                            onChange={(e) => { setData('title_fr', e.target.value) }}
                                            value={data.title_fr}
                                        />
                                    </div>

                                    <div className="flex flex-col w-[100%] gap-1">
                                        <label htmlFor="description_fr">Description</label>
                                        <textarea
                                            placeholder="Enter la description"
                                            required
                                            rows="5"
                                            className="w-[100%] border-[2px] border-black rounded-[10px]"
                                            name="description[fr]"
                                            id="description_fr"
                                            onChange={(e) => { setData('description_fr', e.target.value) }}
                                            value={data.description_fr}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Arabic Form */}
                            {tab === 'العربية' && (
                                <div className="flex flex-col items-center w-[100%] gap-5">
                                    <div className="flex flex-col w-[100%] text-end gap-1">
                                        <label htmlFor="title_ar">العنوان</label>
                                        <Input
                                            placeholder="أدخل العنوان"
                                            required
                                            className="w-[100%] border-[2px] border-black rounded-[10px]"
                                            type="text"
                                            name="title[ar]"
                                            id="title_ar"
                                            onChange={(e) => { setData('title_ar', e.target.value) }}
                                            value={data.title_ar}
                                        />
                                    </div>

                                    <div className="flex flex-col w-[100%] text-end gap-1">
                                        <label htmlFor="description_ar">وصف النص</label>
                                        <textarea
                                            placeholder="أدخل الوصف"
                                            required
                                            rows="5"
                                            className="w-[100%] border-[2px] border-black rounded-[10px]"
                                            name="description[ar]"
                                            id="description_ar"
                                            onChange={(e) => { setData('description_ar', e.target.value) }}
                                            value={data.description_ar}
                                        />
                                    </div>
                                </div>
                            )}


                            <div className="flex flex-col gap-1 my-1">
                                <div>
                                    {tab === 'English' && <p>Cover</p>}
                                    {tab === 'Français' && <p>Couverture</p>}
                                    {tab === 'العربية' && <p className="text-end">الغطاء</p>}
                                </div>

                                <label
                                    htmlFor="image"
                                    className="p-[0.75rem] cursor-pointer flex gap-2 items-center border-[2px] border-black rounded-[10px]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6 flex-shrink-0"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        />
                                    </svg>
                                    <span id="imagesPlaceholder" className="text-base text-gray-500">
                                        Upload Cover
                                    </span>
                                </label>

                                <Input
                                    onChange={handleFileChange}
                                    className="hidden"
                                    required={!gallery}
                                    type="file"
                                    placeholder="image"
                                    accept="image/png, image/jpg, image/jpeg"
                                    name="couverture"
                                    id="image"
                                />
                            </div>



                            <div className="flex flex-col gap-1">
                                <div>
                                    {tab === 'English' && <p>Gallery</p>}
                                    {tab === 'Français' && <p>Galerie</p>}
                                    {tab === 'العربية' && <p className="text-end">الصور</p>}
                                </div>

                                <label
                                    htmlFor="images"
                                    className="p-[0.75rem] cursor-pointer flex gap-2 items-center border-[2px] border-black rounded-[10px]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6 flex-shrink-0"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        />
                                    </svg>
                                    <span id="imagesPlaceholder" className="text-base text-gray-500">
                                        {data?.gallery?.length > 0 ? 'image Uploaded' : 'Upload Images'}
                                    </span>
                                </label>

                                <Input
                                    onChange={handleFileChange}
                                    className="hidden"
                                    required={!gallery}
                                    type="file"
                                    placeholder="image"
                                    multiple
                                    accept="image/png, image/jpg, image/jpeg"
                                    name="images"
                                    id="images"
                                />
                            </div>


                            <Button
                                type="submit"
                                className="mt-2 w-full hover:bg-alpha hover:text-black transition-all duration-150 ">
                                Submit
                            </Button>
                        </form>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    )
}
