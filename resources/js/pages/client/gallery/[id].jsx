import { TransText } from '../../../components/TransText';
import { usePage } from '@inertiajs/react';
import AppLayout from "@/layouts/app-layout"

export default function AlbumPage() {
    const { gallery } = usePage().props;
    const darkMode = true;

    return (
        <AppLayout>
            <div className='w-full p-10 lg:px-1 py-26 pt-32 ' style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff" }}>
                <h1 className='text-center text-5xl font-bold pb-6' style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
                >
                    <TransText {...JSON.parse(gallery?.title)} />
                </h1>
                <div className='w-full flex flex-wrap gap-4 justify-center py-10' >
                    {
                        gallery?.images.map((image, index) => (
                            <div key={index} className='w-full md:w-[30%] lg:w-[22%] h-60 lg:h-80  rounded-xl'>
                                <img loading="lazy" src={`/storage/images/${image.path}`} className='w-full h-full object-cover rounded-xl' alt={`img`} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </AppLayout>
    );
};
