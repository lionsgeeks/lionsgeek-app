import { useAppContext } from '@/context/appContext';
import SubstringText from '../../../../components/SubStringText';
import { TransText } from '../../../../components/TransText';

const EventSection = () => {
    const { selectedLanguage, darkMode } = useAppContext();

    const upcomingEvent = [];
    const IMAGEURL = '';

    const checkDate = () => {
        const currentDate = new Date();
        const upcomingDate = new Date(upcomingEvent?.date);
        return currentDate.getTime() < upcomingDate.getTime();
    };

    const formatDate = (date) => {
        const formatedDate = new Date(date);
        return formatedDate.toISOString().split('T')[0];
    };
    return (
        <div
            style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff' }}
            className={`relative mb-10 flex flex-col px-7 py-2 before:absolute md:mb-0 md:px-16 md:py-12 lg:gap-16 ${darkMode ? 'before:bg-[#252529]' : 'before:bg-beta'} before:inset-0 before:top-2/3 before:-z-10 before:h-[87.5%] before:-translate-y-1/2 md:before:top-1/2 md:before:h-2/3 ${
                selectedLanguage === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
        >
            <img
                loading="lazy"
                className="h-[55vh] object-cover object-center md:h-[75vh] md:w-1/2"
                src={`${IMAGEURL + '/events/'}${upcomingEvent?.cover}`}
                alt="we-choose-art-event"
            />

            <div
                className={`flex h-[87.5%] flex-1 flex-col items-center justify-center self-center p-6 text-center md:h-2/3 md:items-start md:p-4 lg:block lg:p-6 lg:text-start ${
                    selectedLanguage === 'ar' ? 'text-end' : 'text-start'
                }`}
            >
                <h1 className="text-3xl font-bold text-alpha md:w-full md:text-4xl lg:text-6xl">
                    {checkDate() ? (
                        <TransText en="Upcoming Event" fr="Prochain événement" ar="فعالية قادمة" />
                    ) : (
                        <TransText en="Latest Event" fr="Dernier événement" ar="فعالية قادمة" />
                    )}
                </h1>
                <h4 className="mt-4 text-sm text-white md:mt-8 md:text-base">
                    <TransText en="GeekTalks" fr="Conférences Geek" ar="دردشات جيك" />
                </h4>
                <h2 className="mt-1 mb-2 text-2xl font-medium text-white md:mt-2 md:mb-4 md:text-3xl">
                    <TransText {...upcomingEvent?.name} />
                    {/* {event?.name.en} */}
                </h2>
                <h6 className="text-sm text-white md:text-base">{formatDate(upcomingEvent?.date)} - LionsGeek</h6>
                <div className="my-3 text-center text-white md:my-6 lg:text-start">
                    <SubstringText text={upcomingEvent?.description[selectedLanguage]} length={170} />
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
