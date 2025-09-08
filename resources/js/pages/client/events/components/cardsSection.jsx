import { useAppContext } from '@/context/appContext';
import { router, usePage } from '@inertiajs/react';
import { TransText } from '../../../../components/TransText';
import './skeleton.css';

export default function CardsSection({ events = [], IMAGEURL = 'http://127.0.0.1:8000' }) {
    const { props } = usePage();
    const { darkMode } = useAppContext();

    const appUrl = props.ziggy?.url || window.location.origin;

    function DateComponent(backdate) {
        const date = new Date(backdate);
        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    }

    const textColor = { color: darkMode ? '#ffffff' : '#1f1f1f' };
    const cardBgColor = { backgroundColor: darkMode ? '#1a1a1a' : '#ffffff' };
    const subTextColor = { color: darkMode ? '#cccccc' : '#8b96af' };

    return (
        <div className="flex items-center justify-center px-6 py-14 md:px-20" style={cardBgColor}>
            <div className="flex w-full flex-wrap gap-10 md:gap-x-[calc(4%/1)] lg:gap-x-[calc(10%/2)] lg:gap-y-14">
                <div id="cards" className="w-full px-6 text-center lg:px-0 lg:pt-5">
                    <h1 className="text-xl" style={textColor}>
                        <TransText fr="Nos événements à venir" ar="فعالياتنا القادمة" en="Our Upcoming Events" />
                    </h1>
                    <h1 className="text-5xl font-bold" style={textColor}>
                        <TransText fr="Découvrez ce qui arrive" ar="اكتشف ما هو قادم" en="Discover What's Next" />
                    </h1>
                </div>

                {events.length > 0 ? (
                    events.map((element, index) => (
                        <div
                            key={index}
                            id="eventCard"
                            className={`flex h-fit w-full flex-col justify-between overflow-hidden rounded-xl shadow-lg transition duration-200 md:w-[48%] lg:w-[30%] ${'cursor-pointer'}`}
                            onClick={() => router.visit(`/events/${element.id}`)}
                            dir="ltr"
                            style={cardBgColor}
                        >
                            <div className="h-[13rem] w-full">
                                <img
                                    loading="lazy"
                                    src={`${appUrl}/storage/images/events/${element.cover}`}
                                    // src={musicFestivalImage}
                                    className="h-full w-full rounded-t-xl object-cover"
                                    alt="event"
                                />
                            </div>
                            <div style={cardBgColor}>
                                <div className="flex flex-col gap-3 px-4 py-4 font-mono">
                                    <h3 className="truncate text-[22px] font-bold" style={textColor}>
                                        <TransText {...element.name} />
                                    </h3>
                                    <div className="flex flex-col gap-2" style={subTextColor}>
                                        <p className="flex items-center gap-1 text-[15px]">
                                            <TransText fr="Date :" ar="التاريخ:" en="Date:" /> {DateComponent(element?.date)}
                                        </p>
                                        {element.capacity > 0 && (
                                            <p className="flex items-center gap-1 text-[15px]">
                                                <TransText
                                                    fr={`${element.capacity} places restantes`}
                                                    ar={`تبقى ${element.capacity} مقاعد`}
                                                    en={`${element.capacity} spots left`}
                                                />
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div
                                    onClick={() => router.visit(`/events/${element.id}`)}
                                    className={`flex w-full items-center justify-center bg-[#fee819] py-2 font-semibold text-black transition duration-150 hover:bg-yellow-400`}
                                    // disabled={element.capacity <= 0}
                                >
                                    <TransText fr="Voir tout" ar="شاهد الكل" en="See all" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex h-[16rem] w-full items-center justify-center text-center text-[30px] font-bold" style={textColor}>
                        <TransText fr="Aucun événement disponible" ar="لا يوجد حدث متاح" en="No Available Event" />
                    </div>
                )}
            </div>
        </div>
    );
}
