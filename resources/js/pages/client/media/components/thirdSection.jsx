import React, { useContext } from "react";
import { GraduationCap, InfoIcon, MessagesSquare, TreePalmIcon, UserCheck } from "lucide-react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { TransText } from "../../../../components/TransText";
import { useAppContext } from "@/context/appContext";
gsap.registerPlugin(ScrollTrigger);
export const ThirdSection = () => {
    const {selectedLanguage, darkMode} = useAppContext();

    useGSAP(() => {
        let ctx = gsap.from(".animateSection", {
            stagger: 0.7,
            width: "0",
            duration: 1,
            scrollTrigger: {
                trigger: ".animateSection",
                start: "top center",
            },
        });
    });
    const road = [
        {
            title: {
                en: "Check-in",
                ar: "تسجيل الوصول",
                fr: "Enregistrement",
            },
            description: {
                en: "Start your journey by filling out a simple form with your information. This step ensures we have all the details we need to personalize your experience at LionsGeek.",
                ar: "ابدأ رحلتك بملء استمارة بسيطة بمعلوماتك. تضمن هذه الخطوة أن نحصل على جميع التفاصيل التي نحتاجها لتخصيص تجربتك في لاينز جيك",
                fr: "Commencez votre voyage en remplissant un simple formulaire avec vos informations. Cette étape nous permet de nous assurer que nous disposons de tous les détails nécessaires pour personnaliser votre expérience chez LionsGeek.",
            },
            Icon: UserCheck,
        },
        {
            title: {
                en: "Information Session",
                fr: "Session d'information",
                ar: "جلسة معلومات",
            },
            description: {
                en: "Attend a detailed session where our coach will explain the program, its structure, and what you can expect. This session sets the stage for your learning journey, providing you with a clear roadmap.",
                ar: "احضر جلسة تفصيلية حيث سيشرح مدربنا البرنامج وهيكله وما يمكنك توقعه. تضع هذه الجلسة الأساس لرحلة التعلم الخاصة بك، حيث توفر لك خريطة طريق واضحة",
                fr: "Assistez à une session détaillée où notre coach vous expliquera le programme, sa structure et ce à quoi vous pouvez vous attendre. Cette session pose les bases de votre apprentissage, en vous fournissant une feuille de route claire",
            },
            Icon: InfoIcon,
        },
        {
            title: {
                en: "Interview",
                fr: "Entretien",
                ar: "مقابلة",
            },
            description: {
                en: "Have an interview with our team to discuss your goals, current skills, and expectations. This conversation helps us understand how best to support you and tailor the program to meet your needs.",
                fr: "Passez un entretien avec notre équipe pour discuter de vos objectifs, de vos compétences actuelles et de vos attentes. Cette conversation nous aide à comprendre comment vous soutenir au mieux et à adapter le programme à vos besoins.",
                ar: " اجر مقابلة مع فريقنا لمناقشة أهدافك ومهاراتك الحالية وتوقعاتك. تساعدنا هذه المحادثة على فهم كيفية دعمك على أفضل وجه وتخصيص البرنامج لتلبية احتياجاتك",
            },
            Icon: MessagesSquare,
        },
        {
            title: {
                en: "Jungle",
                fr: "Jungle",
                ar: "الأدغال",
            },
            description: {
                en: "Immerse yourself in a week-long bootcamp where you'll learn the basics of web development. By the end of the week, you'll create a project and present it for evaluation. This hands-on experience is crucial for building a strong foundation.`",
                fr: "Plongez-vous dans un bootcamp d'une semaine où vous apprendrez les bases du développement web. À la fin de la semaine, vous créerez un projet et le présenterez pour évaluation. Cette expérience pratique est cruciale pour bâtir une base solide.",
                ar: "اغمر نفسك في برنامج تدريبي مكثف لمدة أسبوع حيث ستتعلم أساسيات تطوير الويب. في نهاية الأسبوع، ستقوم بإنشاء مشروع وتقديمه للتقييم. هذه التجربة العملية ضرورية لبناء أساس قوي",
            },
            Icon: TreePalmIcon,
        },
        {
            title: {
                en: "Media School",
                fr: "École des médias",
                ar: "مدرسة الإعلام",
            },
            description: {
                en: "Begin the intensive 6-month media program, diving deep into audiovisual techniques and editing. You'll master camera use, lighting, sound, and video editing through practical projects and mentorship from industry professionals. This is where your journey to becoming a skilled content creator truly begins.",
                fr: "Commencez le programme intensif de 6 mois en médias, en plongeant profondément dans les techniques audiovisuelles et le montage. Vous maîtriserez l'utilisation de la caméra, l'éclairage, le son et le montage vidéo à travers des projets pratiques et un mentorat de professionnels de l'industrie. C'est ici que commence véritablement votre parcours pour devenir un créateur de contenu qualifié",
                ar: "ابدأ البرنامج المكثف لمدة 6 أشهر في الإعلام، والتعمق في تقنيات الصوت والفيديو والمونتاج. ستتقن استخدام الكاميرا، والإضاءة، والصوت، وتحرير الفيديو من خلال المشاريع العملية والإرشاد من قبل محترفين في الصناعة. هنا تبدأ رحلتك لتصبح منشئ محتوى ماهر حقًا.",
            },
            Icon: GraduationCap,
        },
    ];
    return (
        <div className="lg:px-16 px-7 py-16 flex flex-col gap-8 overflow-hidden" style={{ backgroundColor: darkMode ? "#0f0f0f" : undefined, }}>
            <div className="w-full text-center pb-10">
                <h1 className="text-xl" style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>
                    <TransText ar="رحلتنا" fr="Notre parcours" en="Our Journey" />
                </h1>
                <h1 className="text-5xl font-bold" style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>
                    <TransText
                        fr="Le chemin vers LionsGeek"
                        ar="LionsGeek الطريق إلى "
                        en="The Road to LionsGeek"
                    />
                </h1>
            </div>
            <div
                className={`flex lg:flex-row lg:flex-wrap flex-col z-20 items-center gap-10 justify-center ${selectedLanguage === "ar" ? "lg:flex-row-reverse text-right" : ""
                    } `}
            >
                {road.map(({ description, title, Icon }, index) => (
                    <div
                        key={index}
                        className={`bg-gray-50 p-7 flex flex-col lg:w-[30%] gap-4 rounded-lg relative`}
                        style={{
                            backgroundColor: darkMode ? "#212529" : undefined,
                        }}
                    >
                        <svg
                            className={`hidden lg:flex animateSection absolute inset-0 top-1/2 -z-10 -translate-y-1/2 ${index === 3 || index === 4 ? "-left-96" : "-right-36"
                                } `}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 200 150"
                            overflow="visible"
                        >
                            <path
                                id="path"
                                fill="none"
                                stroke={darkMode ? "#fee819" : "#333"}
                                strokeMiterlimit="10"
                                strokeWidth="2"
                                d="M0,75 L200,75"
                            />
                        </svg>
                        <Icon
                            className={`text-5xl absolute -top-6 ${title.en === "Media School" ? "stroke-alpha" : "fill-alpha"
                                } `}
                        />
                        <h1
                            className={`font-bold text-2xl flex gap-2 ${selectedLanguage === "ar" ? "flex-row-reverse" : ""
                                } `}
                            style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
                        >
                            <span className="text-alpha">
                                {selectedLanguage === "ar"
                                    ? ` . ${index + 1}`
                                    : `${index + 1} . `}{" "}
                            </span>{" "}
                            {TransText(title)}
                        </h1>
                        <p className={`${selectedLanguage === "ar" ? "text-right" : ""}`} style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>
                            {TransText(description)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
