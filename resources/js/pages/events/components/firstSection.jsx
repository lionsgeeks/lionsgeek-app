import gsap from "gsap";
import { useEffect } from "react";
import { useRef } from "react";
import eventHero from "../../../../assets/images/event_hero.png";

export default function FirstSectionEvent() {

    const leftside = useRef(null);
    const rightside = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            leftside.current,
            { x: "-100%", opacity: "0" },
            { x: "0%", duration: 0.5, delay: 0.5, opacity: "1", ease: "power2.out" }
        );
        gsap.fromTo(
            rightside.current,
            { x: "100%", opacity: "0" },
            { x: "0%", duration: 0.5, delay: 0.5, opacity: "1", ease: "power2.out" }
        );
    }, []);

    return (

            <div className="flex lg:flex-row flex-col-reverse overflow-x-hidden bg-white justify-between w-full lg:px-5 lg:pt-[3.5em] pt-[3rem] pb-[5em]">
                <div ref={leftside} className="flex justify-center items-center lg:w-[50%] w-full">
                    <div className="lg:px-16 px-3 flex flex-col gap-6 w-full">
                        <h1 className=" font-bold lg:text-[60px] text-[45px] text-start text-[#0f0f0f]">
                            Inovation & Inspiration
                        </h1>
                        <p className="text-lg text-[#0f0f0f]">
                            Join our tech innovation events and ignite your creativity. Be inspired by visionary ideas and transform your perspective. Discover new possibilities and expand your horizons.
                        </p>
                        <p className="font-light flex gap-2 text-lg text-[#0f0f0f]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="black"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                />
                            </svg>
                            Casablanca, Ain Sbaa
                        </p>
                        <button
                            onClick={() =>
                                document.getElementById("cards")?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="bg-alpha w-fit px-5 py-2 rounded-lg hover:bg-transparent hover:scale-105 hover:text-alpha hover:border"
                        >
                            Get your ticket
                        </button>
                    </div>
                </div>
                <div ref={rightside} className="lg:w-[35vw]">
                    {/* Optional image placeholder or content */}
                    <img
                        loading="lazy"
                        className="h-full w-full rounded-lg "
                        src={eventHero}
                        alt="img"
                    />
                </div>
            </div>
    );
};
