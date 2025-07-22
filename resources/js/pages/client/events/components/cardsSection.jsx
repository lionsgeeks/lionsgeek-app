import "./skeleton.css";
import { TransText } from "../../../../components/TransText";
import { router, usePage } from "@inertiajs/react";
import musicFestivalImage from "../../../../../assets/images/events.jpg";
import { useAppContext } from "@/context/appContext";

export default function CardsSection({ events = [], IMAGEURL = "http://127.0.0.1:8000" }) {
    const { props } = usePage();
    const { darkMode } = useAppContext();

    const appUrl = props.ziggy?.url || window.location.origin;

    function DateComponent(backdate) {
        const date = new Date(backdate);
        return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }

    const textColor = { color: darkMode ? "#ffffff" : "#1f1f1f" };
    const cardBgColor = { backgroundColor: darkMode ? "#1a1a1a" : "#ffffff" };
    const subTextColor = { color: darkMode ? "#cccccc" : "#8b96af" };

    return (
        <div className="flex justify-center items-center md:px-20 px-6 py-14" style={cardBgColor}>
            <div className="flex flex-wrap w-full lg:gap-x-[calc(10%/2)] lg:gap-y-14 md:gap-x-[calc(4%/1)] gap-10">
                <div id="cards" className="w-full text-center lg:pt-5 lg:px-0 px-6">
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
                            className={`shadow-lg h-fit overflow-hidden flex flex-col justify-between lg:w-[30%] md:w-[48%] w-full rounded-xl transition duration-200 ${
                                element.capacity > 0 ? "cursor-pointer" : "cursor-not-allowed opacity-75"
                            }`}
                            onClick={() => element.capacity > 0 && router.visit(`/events/${element.id}`)}
                            dir="ltr"
                            style={cardBgColor}
                        >
                            <div className="w-full h-[13rem]">
                                <img
                                    loading="lazy"
                                    src={`${appUrl}/storage/${element.cover}`}
                                    // src={musicFestivalImage}
                                    className="w-full h-full object-cover rounded-t-xl"
                                    alt="event"
                                />
                            </div>
                            <div style={cardBgColor}>
                                <div className="flex flex-col font-mono gap-3 py-4 px-4">
                                    <h3 className="text-[22px] font-bold truncate" style={textColor}>
                                        <TransText {...element.name} />
                                    </h3>
                                    <div className="flex flex-col gap-2" style={subTextColor}>
                                        <p className="text-[15px] flex items-center gap-1">
                                            <TransText fr="Date :" ar="التاريخ:" en="Date:" /> {DateComponent(element?.date)}
                                        </p>
                                        <p className="text-[15px] flex items-center gap-1 truncate">
                                            {element.capacity > 0 ? (
                                                <TransText
                                                    fr={`${element.capacity} places restantes`}
                                                    ar={`تبقى ${element.capacity} مقاعد`}
                                                    en={`${element.capacity} spots left`}
                                                />
                                            ) : (
                                                <TransText fr="Complet" ar="مكتمل" en="Fully booked" />
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className={`transition duration-150 w-full py-2 font-semibold ${
                                        element.capacity > 0
                                            ? "bg-[#fee819] text-black hover:bg-yellow-400"
                                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                    }`}
                                    disabled={element.capacity <= 0}
                                >
                                    {element.capacity > 0 ? (
                                        <TransText fr="Voir tout" ar="شاهد الكل" en="See all" />
                                    ) : (
                                        <TransText fr="Complet" ar="مكتمل" en="Fully Booked" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div
                        className="flex justify-center items-center text-center w-full h-[16rem] text-[30px] font-bold"
                        style={textColor}
                    >
                        <TransText
                            fr="Aucun événement disponible"
                            ar="لا يوجد حدث متاح"
                            en="No Available Event"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
