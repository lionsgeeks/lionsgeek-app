import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';

import { useEffect, useRef, useState } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { TransText } from '../../../components/TransText';
import './firstSection.css';

const breadcrumbs = [
    {
        title: 'Gallery',
        href: '/gallery',
    },
];

export default function GalleryPage() {
    const slider = useRef(null);
    const activate = (e) => {
        const items = slider.current.querySelectorAll('.item');
        if (e.target.closest('.next')) {
            slider.current.append(items[0]);
        } else if (e.target.closest('.prev')) {
            slider.current.prepend(items[items.length - 1]);
        }
    };

    const { galleries } = usePage().props;
    const selectedLanguage = 'en';

    //* to update length of description text based on screen width
    const [length, setLength] = useState(150);
    useEffect(() => {
        const updateLength = () => {
            const screenSize = window.innerWidth;

            if (screenSize >= 1024) {
                setLength(150);
            } else if (screenSize >= 500) {
                setLength(100);
            } else {
                setLength(50);
            }
        };

        updateLength();
        window.addEventListener('resize', updateLength);
        return () => window.removeEventListener('resize', updateLength);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />

            <div className="grid h-[80vh] w-full place-items-center overflow-hidden md:h-screen">
                <main>
                    <ul className="slider" ref={slider}>
                        {galleries?.map((gallery, index) => (
                            <li
                                className="item z10"
                                key={index}
                                style={{
                                    backgroundImage: `url('${'/storage/images/gallery/'}${gallery.couverture}')`,
                                }}
                            >
                                <div className="content">
                                    <h2 className="text-[15px] font-bold text-white md:text-[25px]">
                                        <TransText fr={`${gallery.title?.fr}`} ar={`${gallery.title?.ar}`} en={`${gallery.title?.en}`} />
                                    </h2>
                                    <p className="py-4 text-sm font-semibold text-white lg:text-[17px]">
                                        <TransText fr={gallery.description?.fr} ar={gallery.description?.ar} en={gallery.description?.en} /> {}
                                    </p>
                                    <Link href={`/album/${gallery.id}`}>
                                        <button>
                                            <TransText fr={'Vue galerie'} ar={'عرض الصور'} en={'View Gallery '} />
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <nav className="nav flex gap-3" onClick={activate}>
                        <GrFormPreviousLink
                            className="prev h-10 w-10 cursor-pointer rounded-full border border-beta bg-white/70 p-2 duration-300 hover:bg-beta hover:stroke-white"
                            name="arrow-back-outline"
                        />
                        <GrFormNextLink
                            className="next h-10 w-10 cursor-pointer rounded-full border border-beta bg-white/70 p-2 duration-300 hover:bg-beta hover:stroke-white"
                            name="arrow-forward-outline"
                        />
                    </nav>
                </main>
            </div>
        </AppLayout>
    );
}
