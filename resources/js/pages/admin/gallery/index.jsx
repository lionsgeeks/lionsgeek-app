import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react";
import GalleryStore from "./partials/galleryStore";
import GalleryShow from "./partials/galleryShow";
import { Input } from '@/components/ui/input';
import { Search, Trash } from "lucide-react";
import { useState } from "react";


const breadcrumbs = [
    {
        title: 'Gallery',
        href: '/admin/gallery',
    },
];

export default function GalleryAdmin() {
    const { galleries } = usePage().props;
    const { delete: destroy } = useForm();
    const [search, setSearch] = useState('');


    const filteredGallery = galleries.filter((gal) =>
        gal.title?.en?.toLowerCase().includes(search?.toLowerCase())
        || gal.title?.fr?.toLowerCase().includes(search?.toLowerCase())
        || gal.title?.ar?.toLowerCase().includes(search?.toLowerCase())
        || gal.description?.en?.toLowerCase().includes(search?.toLowerCase())
        || gal.description?.fr?.toLowerCase().includes(search?.toLowerCase())
        || gal.description?.ar?.toLowerCase().includes(search?.toLowerCase())
    );
    const onDeleteGallery = (galleryID) => {
        destroy(route('gallery.destroy', galleryID))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />

            <div className="p-6">
                <div className="relative w-[300px]">
                    <Input
                        type="text"
                        placeholder="Search Gallery"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>

                <div className="pt-12 lg:px-10">
                    <div
                        className={`grid grid-cols-1 lg:grid-cols-3 gap-2 w-full rounded-lg min-h-[40vh]`}
                    >
                        <GalleryStore />
                        {galleries.length === 0 && (
                            <div className="h-full bg-white flex rounded-lg items-center justify-center w-full">
                                <div className="text-center">
                                    <h1 className="text-2xl font-semibold text-gray-700 mb-3">No gallery Available</h1>
                                    <p className="text-gray-500 mb-6">
                                        It looks like there aren’t any galleries created yet.
                                    </p>
                                    <GalleryStore />
                                </div>
                            </div>
                        )}


                        {filteredGallery?.map((gallery, index) => (
                            <div
                                key={index}
                                className={` text-nowrap flex flex-col overflow-hidden gap-3 px-4 py-4 rounded-[16px] border border-black`}
                            >
                                <img
                                    className="w-full h-[12rem] object-cover rounded-[16px]"
                                    src={`/storage/images/gallery/${gallery.couverture}`} // Adjust path as needed
                                    alt=""
                                />
                                <div className="w-full flex flex-row items-center justify-between">
                                    <h4 className="lg:text-[20px] text-black text-[15px] font-semibold">
                                        {gallery.title?.en?.length > 25
                                            ? `${gallery.title?.en.slice(0, 15)}...`
                                            : gallery.title?.en}
                                    </h4>

                                </div>
                                <div className="flex justify-around lg:justify-end gap-3 items-center">
                                    <GalleryShow gallery={gallery} />
                                    <GalleryStore gallery={gallery} />
                                    <button
                                        onClick={() => { onDeleteGallery(gallery.id) }}
                                    >
                                        <Trash color="red" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
