import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { TransText } from '../../../components/TransText';

const breadcrumbs = [
    {
        title: 'Album',
        href: '/album',
    },
];
export default function AlbumPage() {
    const { gallery } = usePage().props;
    const darkMode = false;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Album" />
            <div className="w-full p-10 py-26 pt-32 lg:px-1" style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff' }}>
                <h1 className="pb-6 text-center text-5xl font-bold" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                    <TransText {...gallery?.title} />
                </h1>
                <div className="flex w-full flex-wrap justify-center gap-4 py-10">
                    {gallery?.images.map((image, index) => (
                        <div key={index} className="h-60 w-full rounded-xl md:w-[30%] lg:h-80 lg:w-[22%]">
                            <img loading="lazy" src={`/storage/images/${image.path}`} className="h-full w-full rounded-xl object-cover" alt={`img`} />
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
