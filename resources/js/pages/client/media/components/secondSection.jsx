import React, { useContext, useEffect, useRef, useState } from "react";
import facebook from "../../../../../assets/icons/icons8-facebook.svg";
import instaLogo from "../../../../../assets/icons/icons8-instagram.svg";
import tiktok from "../../../../../assets/icons/icons8-tic-tac.svg";
import fingerPrint from "../../../../../assets/icons/fingerprint-5.svg";
import adobe from "../../../../../assets/icons/adobe.png";
import camera from "../../../../../assets/icons/camera.png";
import twitterx from "../../../../../assets/icons/icons8-twitterx.svg";
import premierPro from "../../../../../assets/icons/icons8-adobe-premierpro.svg";
import illustrator from "../../../../../assets/icons/icons8-adobe-illustrator.svg";
import afterEffect from "../../../../../assets/icons/icons8-adobe-aftereffect.svg";
import photoshop from "../../../../../assets/icons/icons8-adobe-photoshop.svg";
import linkedinLogo from "../../../../../assets/icons/icons8-linkedin.svg";
import mic from "../../../../../assets/icons/microphone-svgrepo-com.svg";
import screen from "../../../../../assets/icons/screen-desktop-svgrepo-com.svg";
import { TransText } from "../../../../components/TransText";
// import { MyContext } from "../../../utils/contextProvider";
import gsap from "gsap";

export const SecondSection = () => {
  // const { selectedLanguage, darkMode } = useContext(MyContext);
  const selectedLanguage = 'en';
  const darkMode = false;

  const skill = [
    "Digital Marketing",
    "Branding",
    "Graphic Design",
    "Audio Visual",
  ];
  const [hint, setHint] = useState("Digital Marketing");
  const [activeSkill, setActiveSkill] = useState("Digital Marketing");
  const [anime, setAnime] = useState(true);
  const rightside = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".leftside",
      { x: "-100%", opacity: "0" },
      {
        x: "0%",
        stagger: 0.2,
        duration: 0.4,
        // delay: 0.1,
        opacity: "1",
        scrollTrigger: {
          trigger: ".leftside",
          start: "top bottom",
        },
      }
    );

    gsap.fromTo(
      rightside.current,
      { y: "100%", opacity: "0" },
      {
        y: "0%",
        duration: 1,
        stagger: 0.2,
        opacity: "1",
        scrollTrigger: {
          trigger: rightside.current,
          start: "top bottom",
        },
      }
    );
  }, []);

  const programe = {
    "Digital Marketing": [
      {
        ar: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}> تعلم كيفية الترويج لمحتواك بفعالية عبر مختلف المنصات عبر الإنترنت. فهم الاستراتيجيات وراء تحسين محركات البحث (SEO) والتسويق عبر وسائل التواصل الاجتماعي والحملات البريدية والتحليلات للوصول إلى جمهورك المستهدف وجذبهم</span>,
        fr: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>Apprenez à promouvoir efficacement votre contenu sur diverses plateformes en ligne. Comprenez les stratégies derrière le SEO, le marketing sur les réseaux sociaux, les campagnes par e-mail et les analyses pour atteindre et engager votre audience cible.</span>,
        en: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>Learn how to effectively promote your content across various online platforms. Understand the strategies behind SEO, social media marketing, email campaigns, and analytics to reach and engage your target audience.</span>,
      },
      {
        en: "Digital Marketing",
        ar: "التسويق الرقمي",
        fr: "Marketing Digital",
      },
      [facebook, instaLogo, twitterx, tiktok],
    ],
    Branding: [
      {
        ar: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>اكتشف أساسيات إنشاء هوية علامة تجارية قوية. تعلم كيفية تطوير هوية بصرية ولفظية متسقة تتجاوب مع جمهورك وتتميز عن المنافسة</span>,
        fr: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>Découvrez les essentiels de la création d'une identité de marque forte. Apprenez à développer une identité visuelle et verbale cohérente qui résonne avec votre audience et vous distingue de la concurrence</span>,
        en: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>Discover the essentials of creating a strong brand identity. Learn how to develop a consistent visual and verbal identity that resonates with your audience and sets you apart from the competition.</span>,
      },
      { en: "Branding", ar: "العلامة التجارية ", fr: "Branding" },
      [fingerPrint, linkedinLogo],
    ],
    "Graphic Design": [
      {
        ar: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>أتقن أساسيات تصميم الجرافيك، بما في ذلك الطباعة ونظرية الألوان والتخطيط. استخدم برامج الصناعة القياسية لإنشاء تصاميم جذابة واحترافية لمختلف الوسائط</span>,
        fr: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>Maîtrisez les fondamentaux du design graphique, y compris la typographie, la théorie des couleurs et la mise en page. Utilisez des logiciels standard de l'industrie pour créer des designs visuellement attrayants et professionnels pour divers médias.</span>,
        en: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>Master the fundamentals of graphic design, including typography, color theory, and layout. Use industry-standard software to create visually appealing and professional designs for various media.</span>,
      },
      { en: "Graphic Design", ar: " تصميم الجرافيك ", fr: "Design Graphique" },
      [premierPro, illustrator, afterEffect, photoshop],
    ],
    "Audio Visual": [
      {
        ar: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>اكتسب خبرة في إنتاج الصوت والفيديو. تعلم كيفية التقاط صوت وصور عالية الجودة، وتحرير التسجيلات، ودمجها في محتواك الرقمي لتعزيز تجربة المشاهد الإجمالية.</span>,
        fr: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>Acquérez une expertise en production audio et vidéo. Apprenez à capturer des sons et des images de haute qualité, à éditer les enregistrements et à les intégrer dans votre contenu numérique pour améliorer l'expérience globale des spectateurs.</span>,
        en: <span style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>Gain expertise in audio and video production. Learn how to capture high-quality sound and visuals, edit recordings, and integrate them into your digital content to enhance the overall viewer experience</span>,
      },
      { en: "Audio Visual", ar: " الصوتيات والمرئيات", fr: "Audiovisuel" },
      [mic, camera, screen],
    ],
  };

  return (
    <div className="flex flex-col gap-8 lg:px-16 px-7 py-7 bg-gray-50 " style={{ backgroundColor: darkMode ? "#0f0f0f" : "#f9fafb", }}
    >
      <div className="w-full text-center pb-10">
        <h1 className="text-xl" style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
        >
          <TransText fr="Nos cours" ar="دوراتنا" en="Our Courses" />
        </h1>
        <h1 className="text-5xl font-bold" style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
        >
          <TransText fr="Programme" en="Program" ar="البرنامج" />
        </h1>
      </div>
      <div
        className={`flex gap-2 flex-col lg:flex-row ${selectedLanguage === "ar" ? "text-right lg:flex-row-reverse" : ""
          }`}

      >
        <div className="lg:w-[40%] flex flex-col gap-2" >
          {skill.map((element, index) => (
            <div key={index}>
              <div
                onMouseDown={() => setAnime(false)}
                onClick={() => {
                  setHint(element);
                  setActiveSkill(element);
                  setAnime(true);
                }}
                className={`leftside overflow-x-hidden ${darkMode ? "bg-[#212529]" : "bg-white"}  cursor-pointer p-3 pl-8 text-3xl flex justify-between items-center ${selectedLanguage === "ar"
                  ? "text-right lg:flex-row-reverse"
                  : ""
                  }`}
              >
                <h1
                  className={`flex gap-3 ${darkMode ? "text-white" : "text-black"} ${selectedLanguage === "ar"
                    ? "text-right lg:flex-row-reverse"
                    : ""
                    }`}

                >
                  <span
                    className={`${activeSkill === element ? "text-alpha" : darkMode ?
                      'text-white'
                      :
                      'text-black'

                      } font-bold`}
                  >
                    {" "}
                    {index + 1}{" "}
                  </span>
                  <span
                    className={`${activeSkill === element ? "text-alpha" : darkMode ?
                      'text-white'
                      :
                      'text-black'

                      } font-bold`}
                  >
                    {" "}
                    {TransText(programe[element][1])}{" "}
                  </span>
                </h1>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`lg:rotate-0 ${activeSkill === element ? "stroke-alpha" : darkMode ? "stroke-white" : "stroke-black"
                    } ${element === hint ? "rotate-90" : ""} ${selectedLanguage === "ar" ? "lg:rotate-180" : ""
                    } size-5 font-bold`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
              <div
                className={`${element === hint ? "h-auto " : "h-0 hidden"
                  }  gap-2 lg:hidden flex flex-col bg-white p-4`}
                style={{
                  backgroundColor: darkMode ? "#0f0f0f" : "#ffffff", border: darkMode ? "1px solid #ffffff" : "none", color: darkMode ? "#ffffff" : "#0f0f0f"
                }}

              >
                {TransText(programe[element][0])}
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:w-[50%] p-4 bg-white relative overflow-hidden" style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff", border: darkMode ? "1px solid #ffffff" : "none", }}
        >
          {programe[hint] && (
            <>
              <p
                className={`font-medium text-xl bg-white/25 absolute px-5 ${selectedLanguage == "ar" ? "text-right " : ""
                  }`}
                style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff" }}

              >
                {TransText(programe[hint][0])}
              </p>
              <img
                loading="lazy"
                className={`hidden lg:flex size-[120%] object-cover absolute duration-700 ${anime ? "-rotate-12 -right-56 duration-500" : "-right-96"
                  } -top-6 opacity-5`}
                style={{
                  opacity: darkMode ? 0.2 : undefined
                }}
                src={
                  programe[hint][2][
                  Math.floor(Math.random() * programe[hint][2].length)
                  ]
                }
                alt=""
              />
            </>
          )}
        </div>
        <div
          ref={rightside}
          className={`lg:flex lg:flex-col hidden w-[10%] gap-2 `}

        >
          {programe[hint][2].map((element, index) => (
            <img loading="lazy" key={index} className={`w-[40%] ${darkMode && ![facebook , instaLogo , premierPro , photoshop , illustrator , afterEffect].includes(element) && "invert"}`}
              src={element} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};
