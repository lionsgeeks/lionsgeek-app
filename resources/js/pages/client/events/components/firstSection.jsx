import { TransText } from '@/components/TransText';
import { useAppContext } from '@/context/appContext';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import eventHero from '../../../../../assets/images/event_hero.png';

export default function FirstSectionEvent() {
    const { selectedLanguage, darkMode } = useAppContext();

    const leftside = useRef(null);
    const rightside = useRef(null);

    useEffect(() => {
        gsap.fromTo(leftside.current, { x: '-100%', opacity: 0 }, { x: '0%', duration: 0.5, delay: 0.5, opacity: 1, ease: 'power2.out' });
        gsap.fromTo(rightside.current, { x: '100%', opacity: 0 }, { x: '0%', duration: 0.5, delay: 0.5, opacity: 1, ease: 'power2.out' });
    }, []);

    const backgroundStyle = { backgroundColor: darkMode ? '#0f0f0f' : '#ffffff' };
    const textStyle = { color: darkMode ? '#fff' : '#1f1f1f' };
    const strokeColor = darkMode ? 'white' : 'black';
    const strokeClass = darkMode ? 'stroke-alpha' : 'stroke-beta';

    return (
        <div
            className="flex w-full flex-col-reverse justify-between overflow-x-hidden pt-[3rem] pb-[5em] lg:flex-row lg:px-5 lg:pt-[3.5em]"
            style={backgroundStyle}
        >
            <div ref={leftside} className="flex w-full items-center justify-center lg:w-[50%]">
                <div className="flex w-full flex-col gap-6 px-3 lg:px-16" style={textStyle}>
                    <h1 className="text-start text-[45px] font-bold lg:text-[60px]">
                        <TransText fr="Innovation & Inspiration" ar="الابتكار والإلهام" en="Innovation & Inspiration" />
                    </h1>
                    <p className="text-lgs">
                        <TransText
                            fr="Participez à nos événements technologiques et stimulez votre créativité. Soyez inspiré par des idées visionnaires et transformez votre perspective. Découvrez de nouvelles possibilités et élargissez vos horizons."
                            ar="انضم إلى فعاليات الابتكار التكنولوجي لدينا وأطلق العنان لإبداعك. استلهم من أفكار رؤيوية وغيّر وجهة نظرك. اكتشف آفاقًا جديدة ووسع مداركك."
                            en="Join our tech innovation events and ignite your creativity. Be inspired by visionary ideas and transform your perspective. Discover new possibilities and expand your horizons."
                        />
                    </p>
                    <p className="text-lgs flex items-center gap-2 font-light">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke={strokeColor}
                            className={`size-6 ${strokeClass}`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                        </svg>
                        <TransText fr="Casablanca, Ain Sebaa" ar="الدار البيضاء، عين السبع" en="Casablanca, Ain Sbaa" />
                    </p>
                    <button
                        onClick={() => document.getElementById('cards')?.scrollIntoView({ behavior: 'smooth' })}
                        className={`w-fit rounded-lg bg-alpha px-5 py-2 text-black transition duration-300 hover:scale-105 ${
                            darkMode
                                ? 'hover:border hover:border-alpha hover:bg-transparent hover:text-alpha'
                                : 'hover:border hover:bg-transparent hover:text-alpha'
                        }`}
                    >
                        <TransText fr="Réserver" ar="احجز تذكرتك" en="Get your ticket" />
                    </button>
                </div>
            </div>
            <div ref={rightside} className="lg:w-[35vw]">
                <img loading="lazy" className="h-full w-full rounded-lg" src={eventHero} alt="Event Hero" />
            </div>
        </div>
    );
}
