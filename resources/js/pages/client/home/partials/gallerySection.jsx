import { useEffect, useState } from "react";
import { TransText } from "../../../../components/TransText";
import SubstringText from "../../../../components/SubStringText";
import "./gallerySection.css"
import { Image } from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function GallerySection() {
    const [count, setCount] = useState(0);
    const [onLoop, setOnLoop] = useState(true);
    const [onScroll, setOnScroll] = useState(false);

    const darkMode = false;

    const { galleries } = usePage().props
    const selectedLanguage = "en";



    const duration = 3750;
    const transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;






    useEffect(() => {
        if (onLoop && !onScroll && galleries) {
            setOnScroll(true);
            const caroussel = document.getElementById("caroussel");
            const firstItem = caroussel?.firstChild;
            if (firstItem) {

                caroussel.style.transform = `translateX(calc( -${firstItem.clientWidth}px - 3.5rem ))`;

                setTimeout(() => {
                    firstItem.remove();
                    caroussel.appendChild(firstItem);

                    caroussel.style.transition = "none";
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
        <div className="px-7 md:px-16 py-12 md:py-24" style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff" }}>
            <div className="overflow-hidden flex flex-col gap-16 transition-all justify-between">
                <div className="w-full text-center">
                    <h1 className="text-lg md:text-xl" style={{ color: darkMode ? "#fff" : "#0f0f0f" }}>
                        <TransText en="Gallery" fr="Galerie" ar="معرض" />
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-bold" style={{ color: darkMode ? "#fff" : "#0f0f0f" }}>
                        <TransText
                            en="Discover our great moments together."
                            fr="Découvrez nos plus beaux moments ensemble."
                            ar="شاركنا أجمل لحظاتنا معًا"
                        />
                    </h1>
                </div>
                {
                    galleries ?
                        <>
                            <div
                                id="caroussel"
                                onMouseEnter={() => setOnLoop(false)}
                                onMouseLeave={() => setOnLoop(true)}
                                style={{ transition }}
                                className="flex justify- gap-x-14"
                            >
                                {galleries?.map((element, index) => (
                                    <div
                                        key={index}
                                        className="h-[50vh] md:h-[62.5vh] flex flex-col gap-2 cursor-pointer flex-shrink-0 flex-[calc(calc(100%-calc(2*3.5rem))/3)] transition-transform duration-300"
                                    >
                                        <div className="flex flex-col justify-end group h-full after:transition-opacity after:duration-[375ms] relative after:absolute after:bg-beta/50 after:opacity-0 hover:after:opacity-100 after:inset-0">
                                            <img
                                                loading="lazy"
                                                className="size-full object-cover"
                                                src={`${"/storage/images/gallery/"}${element.couverture}`}
                                                alt="gallery"
                                            />

                                            <div className="w-full absolute z-10 duration-700 transition-all flex flex-col translate-y-[150%] group-hover:translate-y-0 pl-6 pr-4 pb-4">
                                                <h1 className="font-medium text-xl duration-700 truncate transition-all text-white">
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
                        :
                        <>
                            <div className="flex md:px-16 px-4 gap-[calc(5%/3)] ">
                                {
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <div key={index} className={`${index !== 0 && "max-md:hidden"} skeleton flex items-center justify-center gap-5  md:w-[calc(95%/3)] w-full bg-skeleton1 h-[25rem] p-6  rounded-md`} >
                                            <Image />
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                }

            </div>
        </div>
    )
}
