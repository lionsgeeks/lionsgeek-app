import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BookingModal from "./bookingmodal";
import musicFestivalImage from "../../../../assets/images/events.jpg";

const selectedLanguage = "en";
const darkMode = false;

const t = (translations) => translations[selectedLanguage] || translations.en;

const events = [
  {
    id: "1",
    name: {
      en: "Music Festival",
      fr: "Festival de Musique",
      ar: "مهرجان الموسيقى"
    },
    location: {
      en: "Rabat",
      fr: "Rabat",
      ar: "الرباط"
    },
    description: {
      en: "Enjoy a night of unforgettable performances.",
      fr: "Profitez d'une nuit de performances inoubliables.",
      ar: "استمتع بليلة من العروض التي لا تُنسى."
    },
    date: "2025-07-15T20:00:00",
    price: "150",
    cover: "music-festival.jpg"
  },
  {
    id: "2",
    name: {
      en: "bojo",
      fr: "Festival de Musique",
      ar: "مهرجان الموسيقى"
    },
    location: {
      en: "Rabat",
      fr: "Rabat",
      ar: "الرباط"
    },
    description: {
      en: "Enjoy a night of unforgettable performances.",
      fr: "Profitez d'une nuit de performances inoubliables.",
      ar: "استمتع بليلة من العروض التي لا تُنسى."
    },
    date: "2025-07-15T20:00:00",
    price: "150",
    cover: "music-festival.jpg"
}
];



const calculateTimeLeft = (targetDate) => {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const hasEventPassed = (eventDate) => {
  if (!eventDate) return true;
  const now = new Date().getTime();
  const eventTime = new Date(eventDate).getTime();
  return now > eventTime;
};

const TimeBlock = ({ value, label }) => {
  const formattedValue = value.toString().padStart(2, '0');
  return (
    <div className="w-[25%] bg-beta py-3 rounded-md text-center flex flex-col gap-2 text-sm font-semibold">
      <p className="text-white text-sm lg:text-2xl">{formattedValue}</p>
      <p className="text-white">{label}</p>
    </div>
  );
};

let switcher = false;
const switching = (lightSwitch) => (switcher = lightSwitch);

const BookingSection = ({ event }) => {
  if (!hasEventPassed(event?.date)) {
    return (
      <>
        <div className="p-4">
          <h1 className={`font-bold text-2xl py-3 ${darkMode ? "text-white" : "text-black"}`}>
            {t({ fr: "Total à payer", en: "Total to pay", ar: "المبلغ الإجمالي للدفع" })}: {event.price}{" "}
            {t({ en: "MAD", fr: "Dirham", ar: "درهم" })}
          </h1>
        </div>
        <div className="p-4">
          <button
            className="bg-alpha text-black rounded-md px-4 py-2 transition w-full"
            onClick={() => switching(true)}
          >
            {t({ fr: "Réserver maintenant", en: "Book now", ar: "احجز الآن" })}
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="p-4">
      <button
        className="border border-gray-300 bg-gray-100 text-red-500 w-full py-3 rounded-lg cursor-not-allowed font-medium shadow-sm"
        disabled
      >
        {t({ fr: "L'événement est terminé.", en: "The event has ended.", ar: "لقد انتهى الحدث." })}
      </button>
    </div>
  );
};

export default function FirstSectionEventDetail() {
  const [event, setEvent] = useState();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const id = "2";

  useEffect(() => {
    const found = events.filter((element) => element.id === id);
    setEvent(found);
  }, [id]);

  useEffect(() => {
    if (event && event[0]?.date) {
      const timer = setInterval(() => {
        const updatedTimeLeft = calculateTimeLeft(event[0].date);
        setTimeLeft(updatedTimeLeft);
        if (Object.values(updatedTimeLeft).every(value => value === 0)) clearInterval(timer);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [event]);

  useGSAP(() => {
    let animation = gsap.timeline({ defaults: { ease: "power4.inOut" } });
    animation
      .to(".first", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      })
      .to(".last", {
        opacity: 1,
        y: 0,
        duration: 0.2,
        stagger: 0.3,
        "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      }, "-=1.4");
  }, [event]);

  return (
    <>
      {event ? (
        <div id="eventDet" className={`h-fit lg:p-16 p-7 lg:pt-24 md:pt-40 pt-28 ${darkMode ? "bg-[#0f0f0f]" : "bg-white"}`}>
          <div className="first w-full gap-5 rounded-l-lg flex">
            <div className="lg:flex lg:flex-col">
              <div className="bg-alpha rounded-t-lg px-2 h-[40%] flex items-center justify-center font-bold text-white text-lg">
                {new Date(event[0].date).toLocaleDateString(selectedLanguage === "ar" ? 'ar-EG' : selectedLanguage === "fr" ? 'fr-FR' : 'en-US', { month: 'short' })}
              </div>
              <div className="bg-beta h-[60%] rounded-b-lg px-2 flex items-center justify-center font-semibold text-white text-2xl">
                {new Date(event[0].date).getDate()}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="lg:flex gap-2 lg:text-3xl text-xl px-2">
                <h1 className={`${darkMode ? "text-white" : "text-[#0f0f0f]"}`}>
                  {event[0].name[selectedLanguage]}
                </h1>
              </div>
              <div className="flex gap-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={darkMode ? "white" : "#0f0f0f"} className="lg:size-6 size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p className={`${darkMode ? "text-white" : "text-[#0f0f0f]"}`}>
                  {event[0].location[selectedLanguage]}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:flex lg:flex-row flex-col gap-10 h-[100%] first">
            <div className="lg:w-[70%] py-5 flex flex-col gap-5">
              <img
                loading="lazy"
                className="lg:h-[25rem] md:h-[25rem] w-[100%] rounded-lg object-cover"
                // src={`${IMAGEURL}/events/${event[0].cover}`}
                src={musicFestivalImage}
                alt=""
              />
              <div className="shadow-sm px-4 border rounded-lg flex flex-col py-4">
                <div className={`${darkMode ? "border-b-2 border-white" : "border-b-2 border-black"} py-3`}>
                  <h1 className={`${darkMode ? "text-white" : "text-[#0f0f0f]"}`}>
                    {t({ ar: "حول هذا الحدث", fr: "A propos de cet évenement", en: "About this event" })}
                  </h1>
                </div>
                <div className="py-4">
                  <p className={`${darkMode ? "text-white" : "text-[#0f0f0f]"}`}>
                    {event[0].description[selectedLanguage]}
                  </p>
                </div>
              </div>
            </div>

            <div className="shadow-xl last border rounded-lg h-fit flex flex-col md:mt-10 lg:w-[30%]">
              <h2 className={`p-4 border-b border-gray-500 ${darkMode ? "text-white" : "text-[#0f0f0f]"}`}>
                {t({ ar: "تفاصيل الحدث", fr: "Détail de l'Événement", en: "Event Details" })}
              </h2>
              <div className="flex gap-2 p-4">
                <TimeBlock value={timeLeft.days} label={t({ ar: "أيام", fr: "Jours", en: "Days" })} />
                <TimeBlock value={timeLeft.hours} label={t({ ar: "ساعات", fr: "Heures", en: "Hours" })} />
                <TimeBlock value={timeLeft.minutes} label={t({ ar: "دقائق", fr: "Minutes", en: "Minutes" })} />
                <TimeBlock value={timeLeft.seconds} label={t({ ar: "ثواني", fr: "Secondes", en: "Seconds" })} />
              </div>
              <BookingSection event={event[0]} />
            </div>
          </div>

          <BookingModal isOpen={switcher} onClose={() => switching(false)} event={event[0]} />
        </div>
      ) : (
        <div className="w-full lg:pt-28 md:pt-40 pt-28 md:px-14 px-3">
          <div className="h-[30rem] p-8 w-full rounded-lg flex flex-col gap-10">
            <div className="flex gap-4">
              <div className="skeleton lg:w-[12%] md:w-[25%] w-[40%] h-[8rem] bg-skeleton2 rounded-md"></div>
              <div className="lg:w-[18%] w-[60%] flex flex-col gap-3 mt-2">
                <div className="skeleton w-full h-[2rem] bg-skeleton2 rounded-md"></div>
                <div className="skeleton w-full h-[2rem] bg-skeleton2 rounded-md"></div>
              </div>
            </div>
            <div className="skeleton w-[100%] h-[15rem] bg-skeleton2 rounded-md"></div>
          </div>
        </div>
      )}
    </>
  );
}
