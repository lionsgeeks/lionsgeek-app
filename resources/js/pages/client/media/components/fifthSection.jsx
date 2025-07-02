import { QuoteIcon } from "lucide-react";
import media1 from "../../../../../assets/images/testimonial/media1.JPG";
import media2 from "../../../../../assets/images/testimonial/media2.JPG";
import media3 from "../../../../../assets/images/testimonial/media3.JPG";
import media4 from "../../../../../assets/images/testimonial/media4.JPG";
import media5 from "../../../../../assets/images/testimonial/media5.JPG";
import media6 from "../../../../../assets/images/testimonial/media6.JPG";
// import { RiDoubleQuotesR } from "react-icons/ri";
import { TransText } from "../../../../components/TransText";
// import { useAppContext } from "../../../utils/contextProvider";


export const FifthSection = () => {
  // const { darkMode } = useAppContext();
   const selectedLanguage = 'en';
  const darkMode = false;
  const testimoniels = [
    {
      name: "Hiba Sabri",
      class: "Media School 3",
      description:
        "LionsGeek's media classes were exceptional. From video editing to content creation, I gained practical skills that transformed my passion into a career. The hands-on projects and expert guidance were invaluable.",
      image: media1,
    },
    {
      name: "Fatima zahra Hajji",
      class: "Media School 3",
      description:
        "The storytelling and branding sessions at LionsGeek gave me a new perspective on how to create impactful media content. I now feel confident producing professional-quality videos and graphics.",
      image: media2,
    },
    {
      name: "Soufiane Naimi",
      class: "Media School 3",
      description:
        "Attending LionsGeek's media workshops was the best decision for my creative career. Their focus on practical learning helped me master tools like Adobe Premiere and Photoshop.",
      image: media3,
    },
    {
      name: "anwar bouchiri",
      class: "Media School 3",
      description:
        "LionsGeek provided the perfect mix of technical training and creative freedom. The mentorship helped me discover my strengths in video production and marketing strategies.",
      image: media4,
    },
    {
      name: "Fatima zahra Chorfi",
      class: "Media School 3",
      description:
        "Thanks to LionsGeek, I learned how to create visually compelling content that resonates with audiences. Their mentorship and constructive feedback elevated my skills to a professional level.",
      image: media5,
    },
    {
      name: "Adam Qmiat",
      class: "Media School 3",
      description:
        "The media program at LionsGeek is top-notch. The focus on personal branding and visual storytelling gave me an edge in today's competitive media industry.",
      image: media6,
    },
  ];

  return (
    <div
      className=" flex flex-col gap-6 lg:px-16 px-7 py-8 "
      style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff" }}
    >
      <div className="w-full text-center pb-10">
        <h1
          className="text-xl"
          style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
        >
          <TransText fr="Témoignages" ar="شهادات" en="Testimonials" />
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
      <div className="flex flex-wrap justify-center gap-3">
        {testimoniels.map((element, index) => (
          <div
            key={index}
            className="lg:w-[30%] flex flex-col gap-2 relative overflow-hidden  p-8 border-2 border-gray-100 rounded-lg"
            style={{
              backgroundColor: darkMode ? "#212529" : "#ffffff",
              border: darkMode ? "none" : "2px solid #f3f4f6",
            }}
          >
            <div className="flex gap-3 items-center">
              <div className=" w-14 h-14 overflow-hidden rounded-full">
              <img
                loading="lazy"
                className=" w-[120%] object-contain object-top"
                src={element.image}
                alt=""
                />
                </div>
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
