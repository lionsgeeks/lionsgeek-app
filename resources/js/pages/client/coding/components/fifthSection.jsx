import React from "react";
import ilyass from "../../../../../assets/images/testimonial/ilyass.jpg";
import osama from "../../../../../assets/images/testimonial/osama.jpg";
import aymen from "../../../../../assets/images/testimonial/aymen.jpg";
import wissal from "../../../../../assets/images/testimonial/wissal.jpg";
import nassim from "../../../../../assets/images/testimonial/P1062983.jpeg";
import sara from "../../../../../assets/images/testimonial/unknown.jpg";
// import { RiDoubleQuotesR } from "react-icons/ri";
import { TransText } from "../../../../components/TransText";
import { QuoteIcon } from "lucide-react";
// import { useAppContext } from "../../../utils/contextProvider";

export const FifthSection = () => {
  // const { darkMode } = useAppContext();
   const selectedLanguage = 'en';
  const darkMode = false;

  const testimoniels = [
    {
      name: "Oussama Jebrane",
      class: "Coding school 1",
      description:
        "LionsGeek offers top-notch web development education. The practical approach, including real-world projects and industry visits, prepared me well for the tech industry.",
      image: osama,
    },

    {
      name: "Nassim El'mharmache",
      class: "Coding School 1",
      description:
        "Attending LionsGeek's master classes was a game-changer. The UI/UX Design and Personal Branding sessions boosted my career. I highly recommend LionsGeek for web development and media training.",
      image: nassim,
    },
    {
      name: "Ilyass Elyatime",
      class: "Coding School 2",
      description:
        "LionsGeek transformed my web development skills. The hands-on projects and expert guidance were invaluable. Now, I'm confident in HTML, CSS, JavaScript, React, and Laravel.",
      image: ilyass,
    },
    {
      name: "Wissale Chreiba",
      class: "Coding School 2",
      description:
        "I loved the media and code crossover classes at LionsGeek. They gave me a comprehensive understanding of both fields, making me a versatile professional.",
      image: wissal,
    },
    {
      name: "Ayman Boujjar",
      class: "Coding School 3",
      description:
        "The personal attention and mentorship at LionsGeek are outstanding. The CV and cover letter workshops helped me land my dream job in web development.",
      image: aymen,
    },
    {
      name: "sara chafik idrissi",
      class: "Coding School 3",
      description:
        "I loved the media and code crossover classes at LionsGeek. They gave me a comprehensive understanding of both fields, making me a versatile professional.",
      image: sara,
    },
  ];

  return (
    <div
      className="flex flex-col gap-6 lg:px-16 px-7 py-8 "
      style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff" }}
    >
      <div className="w-full text-center pb-10">
        <h1
          className="text-xl"
          style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
        >
          <TransText fr="Témoignages" ar="شهادات" en="Testimonials" />{" "}
        </h1>
        <h1
          className="lg:text-5xl text-2xl font-bold"
          style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
        >
          <TransText
            fr=" Les gens qui nous aiment déjà"
            ar="الأشخاص الذين يحبوننا بالفعل"
            en="People Who Already Love Us"
          />{" "}
        </h1>
      </div>
      <div className="flex lg:flex-row lg:flex-wrap flex-col justify-center gap-3">
        {testimoniels.map((element, index) => (
          <div
            key={index}
            className="lg:w-[30%] flex flex-col gap-2 relative overflow-hidden bg-white p-8 border-2 border-gray-100 rounded-lg"
            style={{
              backgroundColor: darkMode ? "#212529" : "#ffffff",
              border: darkMode ? "none" : "2px solid #f3f4f6",
            }}
          >
            <div className="flex gap-3 items-center">
              <img
                loading="lazy"
                className="rounded-full w-14 h-14 bg-cover object-cover object-top"
                src={element.image}
                alt=""
              />
              <div className="flex flex-col">
                <p
                  className="font-medium"
                  style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
                >
                  {element.name}
                </p>
                <p
                  className="font- text-xs text-black/70"
                  style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
                >
                  {element.class}
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-alpha/70 p-5 object-cover rounded-full opacity-80">
              <QuoteIcon className="text-5xl" />
            </div>
            <p style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>
              {element.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
