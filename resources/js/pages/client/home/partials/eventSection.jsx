import { TransText } from "../../../../components/TransText";
import SubstringText from "../../../../components/SubStringText";
import { useAppContext } from "@/context/appContext";


const EventSection = () => {
    const {selectedLanguage, darkMode} = useAppContext();

    const upcomingEvent = [];
    const IMAGEURL = '';

    const checkDate = () => {
        const currentDate = new Date();
        const upcomingDate = new Date(upcomingEvent?.date);
        return currentDate.getTime() < upcomingDate.getTime();
    };

    const formatDate = (date) => {
        const formatedDate = new Date(date);
        return formatedDate.toISOString().split("T")[0];
    };
    return (
        <div
            style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff" }}
            className={`flex md:mb-0 mb-10 flex-col lg:gap-16 px-7 md:px-16 py-2 md:py-12 relative before:absolute ${darkMode ? "before:bg-[#252529]" : "before:bg-beta"} before:h-[87.5%] md:before:h-2/3 before:inset-0 md:before:top-1/2 before:top-2/3  before:-translate-y-1/2 before:-z-10 ${selectedLanguage === "ar" ? "md:flex-row-reverse" : "md:flex-row"
                }`}
        >
            <img
                loading="lazy"
                className="md:w-1/2 md:h-[75vh] h-[55vh] object-cover object-center"
                src={`${IMAGEURL + "/events/"}${upcomingEvent?.cover}`}
                alt="we-choose-art-event"
            />

            <div
                className={`h-[87.5%]  md:h-2/3 flex-1 self-center lg:block lg:text-start flex flex-col lg:p-6 md:p-4 p-6 text-center items-center md:items-start justify-center  ${selectedLanguage === "ar" ? "text-end" : "text-start"
                    }`}
            >
                <h1 className="text-3xl  md:w-full  lg:text-6xl md:text-4xl  font-bold text-alpha">
                    {checkDate() ? (
                        <TransText
                            en="Upcoming Event"
                            fr="Prochain événement"
                            ar="فعالية قادمة"
                        />
                    ) : (
                        <TransText
                            en="Latest Event"
                            fr="Dernier événement"
                            ar="فعالية قادمة"
                        />
                    )}
                </h1>
                <h4 className="text-white mt-4 md:mt-8 text-sm md:text-base">
                    <TransText en="GeekTalks" fr="Conférences Geek" ar="دردشات جيك" />
                </h4>
                <h2 className="text-white text-2xl  md:text-3xl font-medium mt-1 md:mt-2 mb-2 md:mb-4">
                    <TransText {...upcomingEvent?.name} />
                    {/* {event?.name.en} */}
                </h2>
                <h6 className="text-white text-sm md:text-base">
                    {formatDate(upcomingEvent?.date)} - LionsGeek
                </h6>
                <div className="text-white my-3 lg:text-start text-center md:my-6">
                    <SubstringText
                        text={upcomingEvent?.description[selectedLanguage]}
                        length={170}
                    />
                </div>
                {checkDate() ? (
                    <Link to={`/event/${upcomingEvent?.id}`}>
                        <button outline>
                            <TransText en="See more" fr="Savoir plus" ar="عرض المزيد" />
                        </button>
                    </Link>
                ) : null}
            </div>
        </div>
    );
};

export default EventSection;
