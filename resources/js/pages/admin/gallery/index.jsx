import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react";
import GalleryStore from "./partials/galleryStore";
import GalleryShow from "./partials/galleryShow";
import { Button } from '@/components/ui/button';
import { Trash } from "lucide-react";


const breadcrumbs = [
    {
        title: 'Gallery',
        href: '/gallery',
    },
];

export default function GalleryAdmin() {
    const { galleries } = usePage().props;
    const { delete: destroy } = useForm();


    const onDeleteGallery = (galleryID) => {
        destroy(route('gallery.destroy', galleryID))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />

            <div className="p-6">
                <div className="flex justify-end">
                    <GalleryStore />
                </div>
                <div className="pt-12 px-4 lg:px-10">
                    <div
                        className={`flex-row-reverse justify-between flex min-h-[76vh] mb-3 p-6 flex-wrap gap-x-[calc(5%/3)] gap-y-4 w-full rounded-lg `}
                    >
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

                        {
                            galleries?.length > 0 && (
                                <div className="w-full flex gap-6 overflow-y-auto flex-wrap">

                                    {galleries?.map((gallery, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`lg:w-[calc(95%/3)] md:w-[calc(95%/2)] w-full text-nowrap flex flex-col overflow-hidden gap-3 h-fit px-4 py-4 rounded-[16px] border border-black`}
                                            >
                                                <img
                                                    className="w-full h-[12rem] object-cover rounded-[16px]"
                                                    src={`/storage/images/gallery/${gallery.couverture}`} // Adjust path as needed
                                                    alt=""
                                                />
                                                <div className="w-full flex flex-row items-center justify-between">
                                                    <h4 className="lg:text-[20px] text-black text-[15px] font-semibold">
                                                        {JSON.parse(gallery.title)?.en?.length > 25
                                                            ? `${JSON.parse(gallery.title)?.en.slice(0, 15)}...`
                                                            : JSON.parse(gallery.title)?.en}
                                                    </h4>

                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    <GalleryShow gallery={gallery} />
                                                    <GalleryStore gallery={gallery} />
                                                    <Button variant="destructive"
                                                        onClick={() => {onDeleteGallery(gallery.id)}}
                                                    >
                                                        <Trash />
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
