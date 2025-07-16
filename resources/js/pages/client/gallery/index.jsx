import AppLayout from "@/layouts/app-layout"
import { Head, Link, usePage } from "@inertiajs/react";


import {
    useEffect,
    useRef,
    useState,
} from "react";
import "./firstSection.css";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { TransText } from "../../../components/TransText";

const breadcrumbs = [
    {
        title: 'Gallery',
        href: '/gallery',
    },
];

export default function GalleryPage() {

    const slider = useRef(null);
    const activate = (e) => {
        const items = slider.current.querySelectorAll(".item");
        if (e.target.closest(".next")) {
            slider.current.append(items[0]);
        } else if (e.target.closest(".prev")) {
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
            console.log(screenSize);

            if (screenSize >= 1024) {
                setLength(150)
            } else if (screenSize >= 500) {
                setLength(100)
            }
            else {
                setLength(50)
            }
        }

        updateLength();
        window.addEventListener("resize", updateLength);
        return () => window.removeEventListener("resize", updateLength);

    }, []);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />

            <div className="md:h-screen h-[80vh] w-full overflow-hidden grid place-items-center">
                <main>
                    <ul className="slider" ref={slider}>
                        {galleries?.map((gallery, index) => (
                            <li
                                className="item z10 "
                                key={index}
                                style={{
                                    backgroundImage: `url('${"/storage/images/gallery/"}${gallery.couverture
                                        }')`,
                                }}
                            >
                                <div className="content">
                                    <h2 className=" text-white  md:text-[25px]  text-[15px]   font-bold ">
                                        <TransText
                                            fr={`${gallery.title?.fr}`}
                                            ar={`${gallery.title?.ar}`}
                                            en={`${gallery.title?.en}`}
                                        />
                                    </h2>
                                    <p className="font-semibold  text-white py-4 lg:text-[17px] text-sm">

                                        <TransText fr={gallery.description?.fr} ar={gallery.description?.ar} en={gallery.description?.en} /> {}
                                    </p>
                                    <Link href={`/album/${gallery.id}`}>
                                        <button>Read More</button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <nav className="nav flex gap-3" onClick={activate}>
                        <GrFormPreviousLink
                            className="w-10 h-10 bg-white/70 rounded-full border border-beta prev p-2 cursor-pointer hover:bg-beta hover:stroke-white duration-300"
                            name="arrow-back-outline"
                        />
                        <GrFormNextLink
                            className="w-10 h-10 bg-white/70 rounded-full border border-beta next p-2 cursor-pointer hover:bg-beta hover:stroke-white duration-300"
                            name="arrow-forward-outline"
                        />
                    </nav>
                </main>
            </div>
        </AppLayout>
    )
}
