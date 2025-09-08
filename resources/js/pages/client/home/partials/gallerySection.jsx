import { useAppContext } from '@/context/appContext';
import { usePage } from '@inertiajs/react';
import { Image } from 'lucide-react';
import { useEffect, useState } from 'react';
import SubstringText from '../../../../components/SubStringText';
import { TransText } from '../../../../components/TransText';
import './gallerySection.css';

export default function GallerySection() {
    const [count, setCount] = useState(0);
    const [onLoop, setOnLoop] = useState(true);
    const [onScroll, setOnScroll] = useState(false);

    const { selectedLanguage, darkMode } = useAppContext();

    const { galleries } = usePage().props;

    const duration = 3750;
    const transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    useEffect(() => {
        if (onLoop && !onScroll && galleries) {
            setOnScroll(true);
            const caroussel = document.getElementById('caroussel');
            const firstItem = caroussel?.firstChild;
            if (firstItem) {
                caroussel.style.transform = `translateX(calc( -${firstItem.clientWidth}px - 3.5rem ))`;

                setTimeout(() => {
                    firstItem.remove();
                    caroussel.appendChild(firstItem);

                    caroussel.style.transition = 'none';
                    caroussel.style.transform = `translate(0)`;

                    setTimeout(() => {
                        caroussel.style.transition = transition;
                        setCount((prev) => prev + 1);
                        setOnScroll(false);
                    }, 100);
                }, duration);
            }
        }
    }, [onLoop, count]);

    return (
        <div className="px-7 py-12 md:px-16 md:py-24" style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff' }}>
            <div className="flex flex-col justify-between gap-16 overflow-hidden transition-all">
                <div className="w-full text-center">
                    <h1 className="text-lg md:text-xl" style={{ color: darkMode ? '#fff' : '#0f0f0f' }}>
                        <TransText en="Gallery" fr="Galerie" ar="معرض" />
                    </h1>
                    <h1 className="text-3xl font-bold md:text-5xl" style={{ color: darkMode ? '#fff' : '#0f0f0f' }}>
                        <TransText
                            en="Discover our great moments together."
                            fr="Découvrez nos plus beaux moments ensemble."
                            ar="شاركنا أجمل لحظاتنا معًا"
                        />
                    </h1>
                </div>
                {galleries ? (
                    <>
                        <div
                            id="caroussel"
                            onMouseEnter={() => setOnLoop(false)}
                            onMouseLeave={() => setOnLoop(true)}
                            style={{ transition }}
                            className="justify- flex gap-x-14"
                        >
                            {galleries?.map((element, index) => (
                                <div
                                    key={index}
                                    className="flex h-[50vh] flex-[calc(calc(100%-calc(2*3.5rem))/3)] flex-shrink-0 cursor-pointer flex-col gap-2 transition-transform duration-300 md:h-[62.5vh]"
                                >
                                    <div className="group relative flex h-full flex-col justify-end after:absolute after:inset-0 after:bg-beta/50 after:opacity-0 after:transition-opacity after:duration-[375ms] hover:after:opacity-100">
                                        <img
                                            loading="lazy"
                                            className="size-full object-cover"
                                            src={`${'/storage/images/gallery/'}${element.couverture}`}
                                            alt="gallery"
                                        />

                                        <div className="absolute z-10 flex w-full translate-y-[150%] flex-col pr-4 pb-4 pl-6 transition-all duration-700 group-hover:translate-y-0">
                                            <h1 className="truncate text-xl font-medium text-white transition-all duration-700">
                                                <TransText {...element.title} />
                                            </h1>
                                            <p className="text-white">
                                                <SubstringText text={element.description[selectedLanguage]} length={120} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-[calc(5%/3)] px-4 md:px-16">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`${index !== 0 && 'max-md:hidden'} skeleton flex h-[25rem] w-full items-center justify-center gap-5 rounded-md bg-skeleton1 p-6 md:w-[calc(95%/3)]`}
                                >
                                    <Image />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
