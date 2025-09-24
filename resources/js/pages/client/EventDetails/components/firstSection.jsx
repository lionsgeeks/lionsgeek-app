import { useAppContext } from '@/context/appContext';
import { useGSAP } from '@gsap/react';
import { usePage } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useState } from 'react';
import musicFestivalImage from '../../../../../assets/images/events.jpg';
import BookingModal from './bookingmodal';

const calculateTimeLeft = (targetDate) => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
};

const hasEventPassed = (eventDate) => {
    if (!eventDate) return true;
    return new Date().getTime() > new Date(eventDate).getTime();
};

const getMultilingualText = (textObj, lang = 'en') => {
    if (typeof textObj === 'string') return textObj;
    if (typeof textObj === 'object' && textObj !== null) {
        return textObj[lang] || textObj.en || textObj.fr || textObj.ar || '';
    }
    return '';
};

const TimeBlock = ({ value, label }) => {
    const formattedValue = value.toString().padStart(2, '0');
    return (
        <div className="flex w-[25%] flex-col gap-2 rounded-md bg-beta py-3 text-center text-sm font-semibold">
            <p className="text-sm text-white lg:text-2xl">{formattedValue}</p>
            <p className="text-white">{label}</p>
        </div>
    );
};

let switcher = false;
const switching = (val) => (switcher = val);

const BookingSection = ({ event, t, darkMode }) => {
    if (!hasEventPassed(event?.date)) {
        if (event.capacity <= 0) {
            return (
                <div className="p-4">
                    <h1 className={`py-3 text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                        {t({ fr: 'Événement complet', en: 'Event Full', ar: 'الحدث مكتمل' })}
                    </h1>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {t({ fr: 'Cet événement est complet', en: 'This event is fully booked', ar: 'هذا الحدث مكتمل' })}
                    </p>
                    <div className="p-4">
                        <button className="w-full cursor-not-allowed rounded-md bg-gray-400 px-4 py-2 text-gray-700" disabled>
                            {t({ fr: 'Complet', en: 'Fully Booked', ar: 'مكتمل' })}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <>
                <div className="p-4">
                    <h1 className={`py-3 text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                        {t({ fr: 'Événement gratuit', en: 'Free Event', ar: 'حدث مجاني' })}
                    </h1>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {t({ fr: 'Places restantes', en: 'Spots remaining', ar: 'الأماكن المتبقية' })}: {event.capacity}{' '}
                        {t({ fr: 'places', en: 'spots', ar: 'مكان' })}
                    </p>
                </div>
                <div className="p-4">
                    {Math.max(0, event.capacity - (event.bookings?.length || 0)) > 0 ? (
                        <button
                            className="w-full rounded-md bg-alpha px-4 py-2 text-black transition hover:bg-yellow-400"
                            onClick={() => switching(true)}
                        >
                            {t({ fr: 'Réserver maintenant', en: 'Book now', ar: 'احجز الآن' })}
                        </button>
                    ) : (
                        <button className="w-full cursor-not-allowed rounded-md bg-gray-400 px-4 py-2 text-white" disabled>
                            {t({ fr: 'Complet', en: 'Sold Out', ar: 'مكتمل' })}
                        </button>
                    )}
                </div>
            </>
        );
    }

    return (
        <div className="p-4">
            <button
                className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 py-3 font-medium text-red-500 shadow-sm"
                disabled
            >
                {t({ fr: "L'événement est terminé.", en: 'The event has ended.', ar: 'لقد انتهى الحدث.' })}
            </button>
        </div>
    );
};

export default function FirstSectionEventDetail({ event: eventProp }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const { props } = usePage();
    const { selectedLanguage = 'en', darkMode = false } = useAppContext();

    const event = eventProp;
    const appUrl = props.ziggy?.url || window.location.origin;

    const t = (translations) => translations[selectedLanguage] || translations.en;

    useEffect(() => {
        if (event?.date) {
            const timer = setInterval(() => {
                const updatedTimeLeft = calculateTimeLeft(event.date);
                setTimeLeft(updatedTimeLeft);
                if (Object.values(updatedTimeLeft).every((v) => v === 0)) clearInterval(timer);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [event]);

    useGSAP(() => {
        gsap.timeline({ defaults: { ease: 'power4.inOut' } })
            .to('.first', {
                opacity: 1,
                y: 0,
                duration: 1.5,
                'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
            })
            .to(
                '.last',
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.2,
                    stagger: 0.3,
                    'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                },
                '-=1.4',
            );
    }, [event]);

    return event ? (
        <div id="eventDet" className={`h-fit p-7 pt-28 md:pt-40 lg:p-16 lg:pt-24 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
            <div className="first flex w-full gap-5 rounded-l-lg">
                <div className="lg:flex lg:flex-col">
                    <div className="flex h-[40%] items-center justify-center rounded-t-lg bg-alpha px-2 text-lg font-bold text-white">
                        {new Date(event.date).toLocaleDateString(
                            selectedLanguage === 'ar' ? 'ar-EG' : selectedLanguage === 'fr' ? 'fr-FR' : 'en-US',
                            { month: 'short' },
                        )}
                    </div>
                    <div className="flex h-[60%] items-center justify-center rounded-b-lg bg-beta px-2 text-2xl font-semibold text-white">
                        {new Date(event.date).getDate()}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="gap-2 px-2 text-xl lg:flex lg:text-3xl">
                        <h1 className={`${darkMode ? 'text-white' : 'text-[#0f0f0f]'}`}>{getMultilingualText(event.name, selectedLanguage)}</h1>
                    </div>
                    <div className="flex gap-3 text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke={darkMode ? 'white' : '#0f0f0f'}
                            className="size-5 lg:size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                        </svg>
                        <p className={`${darkMode ? 'text-white' : 'text-[#0f0f0f]'}`}>
                            {event.capacity} {t({ en: 'capacity', fr: 'places', ar: 'سعة' })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="first h-[100%] flex flex-col-reverse mt-2  lg:gap-10   lg:flex lg:flex-row">
                <div className="flex flex-col gap-5 py-5 lg:w-[70%]">
                    <img
                        loading="lazy"
                        className="w-[100%] rounded-lg object-cover md:h-[25rem] lg:h-[25rem]"
                        src={event?.cover ? `${appUrl}/storage/images/events/${event.cover}` : musicFestivalImage}
                        alt={getMultilingualText(event.name)}
                    />
                    <div className="flex flex-col rounded-lg border px-4 py-4 shadow-sm">
                        <div className={`${darkMode ? 'border-b-2 border-white' : 'border-b-2 border-black'} py-3`}>
                            <h1 className={`${darkMode ? 'text-white' : 'text-[#0f0f0f]'}`}>
                                {t({ ar: 'حول هذا الحدث', fr: 'À propos de cet événement', en: 'About this event' })}
                            </h1>
                        </div>
                        <div className="py-4">
                            <p className={`${darkMode ? 'text-white' : 'text-[#0f0f0f]'}`}>
                                {getMultilingualText(event.description, selectedLanguage)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="last flex h-fit flex-col rounded-lg border shadow-xl md:mt-10 lg:w-[30%]">
                    <h2 className={`border-b border-gray-500 p-4 ${darkMode ? 'text-white' : 'text-[#0f0f0f]'}`}>
                        {t({ ar: 'تفاصيل الحدث', fr: "Détail de l'Événement", en: 'Event Details' })}
                    </h2>
                    <div className="flex gap-2 p-4">
                        <TimeBlock value={timeLeft.days} label={t({ ar: 'أيام', fr: 'Jours', en: 'Days' })} />
                        <TimeBlock value={timeLeft.hours} label={t({ ar: 'ساعات', fr: 'Heures', en: 'Hours' })} />
                        <TimeBlock value={timeLeft.minutes} label={t({ ar: 'دقائق', fr: 'Minutes', en: 'Minutes' })} />
                        <TimeBlock value={timeLeft.seconds} label={t({ ar: 'ثواني', fr: 'Secondes', en: 'Seconds' })} />
                    </div>
                    <BookingSection event={event} t={t} darkMode={darkMode} />
                </div>
            </div>

            <BookingModal isOpen={switcher} onClose={() => switching(false)} event={event} />
        </div>
    ) : (
        <div className="w-full px-3 pt-28 md:px-14 md:pt-40 lg:pt-28">
            <div className="flex h-[30rem] w-full flex-col gap-10 rounded-lg p-8">
                <div className="flex gap-4">
                    <div className="skeleton h-[8rem] w-[40%] rounded-md bg-skeleton2 md:w-[25%] lg:w-[12%]"></div>
                    <div className="mt-2 flex w-[60%] flex-col gap-3 lg:w-[18%]">
                        <div className="skeleton h-[2rem] w-full rounded-md bg-skeleton2"></div>
                        <div className="skeleton h-[2rem] w-full rounded-md bg-skeleton2"></div>
                    </div>
                </div>
                <div className="skeleton h-[15rem] w-[100%] rounded-md bg-skeleton2"></div>
            </div>
        </div>
    );
}
