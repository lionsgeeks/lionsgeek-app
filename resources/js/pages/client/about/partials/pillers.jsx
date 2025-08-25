import myImage from "../../../../../assets/images/coding_afiche.jpg";
import myImage2 from "../../../../../assets/images/media_affiche.jpg";
import { TransText } from "../../../../components/TransText";
import { useAppContext } from "@/context/appContext";

export const Pillers = () => {
    const { selectedLanguage, darkMode } = useAppContext();

    return (
        <div
            className={`flex flex-col items-center justify-between py-14 ${darkMode ? "bg-[#0f0f0f]" : "bg-beta"}  border-t- border-t-alpha border-b-alpha`}
        >
            <div className=" rounded-lg xl:w-[50vw] w-[100vw]  px-1 text-center">
                <h1 className="xl:text-7xl text-4xl text-alpha font-bold py-4">
                    <TransText en="Formations" ar="الدورات التدريبية" fr="Formations" />

                </h1>
                <p className="xl:text-2xl text-sm text-alpha font-normal ">
                    <TransText
                        en="Free training and mentorship to help you thrive in the tech and media industries"
                        ar="دورات تدريبية وإرشاد مجاني لمساعدتك على النجاح في صناعات التكنولوجيا والإعلام"
                        fr="Formation gratuite et mentorat pour vous aider à prospérer dans les industries de la technologie et des médias"
                    />
                </p>
            </div>
            {/* Coding */}
            <div className={`${darkMode ? "bg-beta" : "bg-[#f9f9f9]"}  relative xl:flex hidden flex-row rounded-lg w-[80vw] lg:h-fit h-[40vh] mt-8 `}>
                <div className="relative w-[50%]">
                    <div className="relative w-full codingformationpic">
                        <img
                            loading="lazy"
                            src={myImage2}
                            alt="Curved Effect"
                            className="w-full object-cover"
                        />
                        <svg
                            locale="fr"
                            className="absolute right-0 top-0 h-full w-auto"
                            viewBox="0 0 60 1000"
                            fill="#f9f9f9"
                            preserveAspectRatio="none"
                        >
                            <g clipPath="url(#clip0)">
                                <path
                                    d="M85.5 1079.95C43.7072 966.929 19.9593 852.301 14.5 737.24C8 600.336 29.872 512.409 41.5 424.739C59.279 290.7 60.81 99.3082 -16.5 -142.448H85.5L85.5 1079.95Z"
                                    fill={`${darkMode ? "#212529" : "#f9f9f9"}`}
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect
                                        width="1000"
                                        height="80"
                                        fill="#f9f9f9"
                                        transform="translate(0 1000) rotate(-90)"
                                    ></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div
                    dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                    className="w-[50%] h-[70%] gap-4 flex flex-col justify-around py-8 px-5"
                >
                    <p className={`${darkMode && "text-white"} text-4xl font-semibold py-3`}>
                        <TransText
                            en="Coding"
                            ar="البرمجة"
                            fr="Coding"
                        />

                    </p>
                    <p className={`${darkMode && "text-white"}`}>
                        <TransText
                            en="Our 6-month Coding Formation will teach you how to become a Full-Stack Web Developer. You will learn front-end skills like HTML, CSS, JavaScript, and React to create websites that look great and work well. On the back-end, you’ll use PHP and Laravel to build powerful systems and APIs. This program is hands-on, with real projects to help you practice what you learn. It’s perfect for anyone who wants to start a career in web development or improve their coding skills."
                            fr="Notre formation de 6 mois en programmation vous apprendra à devenir un développeur web Full-Stack. Vous apprendrez des compétences front-end comme HTML, CSS, JavaScript et React pour créer des sites web à la fois esthétiques et performants. Du côté back-end, vous utiliserez PHP et Laravel pour développer des systèmes puissants et des API. Ce programme est pratique, avec des projets réels pour vous aider à mettre en pratique ce que vous apprenez. C’est parfait pour toute personne souhaitant commencer une carrière dans le développement web ou améliorer ses compétences en programmation."
                            ar="ستعلمك دورة البرمجة لمدة 6 أشهر كيفية أن تصبح مطور ويب متكامل (Full-Stack). ستتعلم مهارات الواجهة الأمامية مثل HTML وCSS وJavaScript وReact لإنشاء مواقع ويب تبدو رائعة وتعمل بكفاءة. وفي الجزء الخاص بالواجهة الخلفية، ستستخدم PHP وLaravel لبناء أنظمة قوية وواجهات برمجة تطبيقات (APIs). هذا البرنامج عملي، ويتضمن مشاريع حقيقية لمساعدتك على تطبيق ما تتعلمه. إنه مثالي لأي شخص يرغب في بدء مهنة في تطوير الويب أو تحسين مهاراته في البرمجة."
                        />
                    </p>
                </div>
            </div>


            {/* Media */}
            <div className={`${darkMode ? "bg-beta" : "bg-[#f9f9f9]"} relative xl:flex hidden flex-row-reverse rounded-lg w-[80vw] lg:h-fit h-[40vh] mt-8`}>
                <div className="relative w-[50%]">
                    <div className="relative w-[100%] codingformationpic">
                        <img
                            loading="lazy"
                            src={myImage}
                            alt="Curved Effect"
                            className="w-full object-cover"
                        />
                        <svg
                            locale="fr"
                            className="absolute left-0 top-0 h-full flipped-svg"
                            viewBox="0 0 60 1000"
                            fill="#f9f9f9"
                            preserveAspectRatio="none"
                        >
                            <g clipPath="url(#clip0)">
                                <path
                                    d="M85.5 1079.95C43.7072 966.929 19.9593 852.301 14.5 737.24C8 600.336 29.872 512.409 41.5 424.739C59.279 290.7 60.81 99.3082 -16.5 -142.448H85.5L85.5 1079.95Z"
                                    fill={`${darkMode ? "#212529" : "#f9f9f9"}`}
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect
                                        width="1000"
                                        height="60"
                                        fill="#f9f9f9"
                                        transform="translate(0 1000) rotate(-90)"
                                    ></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div
                    dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                    className="w-[50%] h-[70%] gap-4 flex flex-col justify-around  py-8 px-5"
                >
                    <p className={`text-4xl font-semibold py-3 ${darkMode && "text-white"} `}>
                        <TransText
                            en="Media"
                            ar="الإعلام"
                            fr="Médias"
                        />
                    </p>
                    <p className={`${darkMode && "text-white"}`}>
                        <TransText
                            en="Our 6-month Media Formation will teach you the skills needed to create amazing digital content. You will learn how to design graphics, edit videos, and manage social media platforms to engage and grow audiences. This hands-on program focuses on practical projects, giving you real experience in creating content for different types of media. Whether you want to start a career in media or improve your creative skills, this program is a great way to learn and grow."
                            ar="ستعلمك دورة الإعلام لمدة 6 أشهر المهارات اللازمة لإنشاء محتوى رقمي مذهل. ستتعلم كيفية تصميم الرسومات، وتحرير الفيديوهات، وإدارة منصات وسائل التواصل الاجتماعي لجذب الجمهور وزيادة التفاعل. يركز هذا البرنامج العملي على المشاريع التطبيقية، مما يمنحك خبرة حقيقية في إنشاء المحتوى لأنواع مختلفة من الوسائط. سواء كنت ترغب في بدء مهنة في الإعلام أو تحسين مهاراتك الإبداعية، فإن هذا البرنامج يعد وسيلة رائعة للتعلم والنمو"
                            fr="Notre formation de 6 mois en médias vous apprendra les compétences nécessaires pour créer un contenu numérique exceptionnel. Vous apprendrez à concevoir des graphismes, à monter des vidéos et à gérer des plateformes de médias sociaux pour engager et développer des audiences. Ce programme pratique est axé sur des projets concrets, vous offrant une expérience réelle dans la création de contenu pour différents types de médias. Que vous souhaitiez débuter une carrière dans les médias ou améliorer vos compétences créatives, ce programme est une excellente façon d'apprendre et de progresser."
                        />
                    </p>
                </div>
            </div>
            {/* responsivity cards */}
            <div className="xl:hidden block bg-gray-100 w-[80vw]  rounded-lg mt-10">
                <div className="image w-full h-[50%] flex justify-center">
                    <img loading="lazy" src={myImage2} alt="" className="rounded-b-lg object-cover object-left" />
                </div>
                <div className="text h-[50%] border-b-4 rounded-lg border-b-alpha flex flex-col justify-around">
                    <h1 className="font-bold text-2xl text-center">
                        <TransText
                            en="Coding"
                            ar="البرمجة"
                            fr="Programmation"
                        />

                    </h1>
                    <p className="w-[80vw] px-4 ">
                        <TransText
                            en="Our 6-month Coding Formation will teach you how to become a Full-Stack Web Developer. You will learn front-end skills like HTML, CSS, JavaScript, and React to create websites that look great and work well. On the back-end, you’ll use PHP and Laravel to build powerful systems and APIs. This program is hands-on, with real projects to help you practice what you learn. It’s perfect for anyone who wants to start a career in web development or improve their coding skills."
                            fr="Notre formation de 6 mois en programmation vous apprendra à devenir un développeur web Full-Stack. Vous apprendrez des compétences front-end comme HTML, CSS, JavaScript et React pour créer des sites web à la fois esthétiques et performants. Du côté back-end, vous utiliserez PHP et Laravel pour développer des systèmes puissants et des API. Ce programme est pratique, avec des projets réels pour vous aider à mettre en pratique ce que vous apprenez. C’est parfait pour toute personne souhaitant commencer une carrière dans le développement web ou améliorer ses compétences en programmation."
                            ar="ستعلمك دورة البرمجة لمدة 6 أشهر كيفية أن تصبح مطور ويب متكامل (Full-Stack). ستتعلم مهارات الواجهة الأمامية مثل HTML وCSS وJavaScript وReact لإنشاء مواقع ويب تبدو رائعة وتعمل بكفاءة. وفي الجزء الخاص بالواجهة الخلفية، ستستخدم PHP وLaravel لبناء أنظمة قوية وواجهات برمجة تطبيقات (APIs). هذا البرنامج عملي، ويتضمن مشاريع حقيقية لمساعدتك على تطبيق ما تتعلمه. إنه مثالي لأي شخص يرغب في بدء مهنة في تطوير الويب أو تحسين مهاراته في البرمجة."
                        />
                    </p>
                </div>
            </div>

            <div className="xl:hidden block bg-gray-100 w-[80vw] rounded-lg mt-10">
                <div className="image w-full h-[50%] flex justify-center">
                    <img loading="lazy" src={myImage} alt="" className="rounded-b-lg object-cover object-left" />
                </div>
                <div className="text h-[50%] border-b-4 rounded-lg border-b-alpha flex flex-col justify-around">
                    <h1 className="font-bold text-2xl text-center">
                        <TransText
                            en="Media"
                            ar="الإعلام"
                            fr="Médias"
                        />
                    </h1>
                    <p className="w-[80vw] px-4 ">
                        <TransText
                            en="Our 6-month Media Formation will teach you the skills needed to create amazing digital content. You will learn how to design graphics, edit videos, and manage social media platforms to engage and grow audiences. This hands-on program focuses on practical projects, giving you real experience in creating content for different types of media. Whether you want to start a career in media or improve your creative skills, this program is a great way to learn and grow."
                            ar="ستعلمك دورة الإعلام لمدة 6 أشهر المهارات اللازمة لإنشاء محتوى رقمي مذهل. ستتعلم كيفية تصميم الرسومات، وتحرير الفيديوهات، وإدارة منصات وسائل التواصل الاجتماعي لجذب الجمهور وزيادة التفاعل. يركز هذا البرنامج العملي على المشاريع التطبيقية، مما يمنحك خبرة حقيقية في إنشاء المحتوى لأنواع مختلفة من الوسائط. سواء كنت ترغب في بدء مهنة في الإعلام أو تحسين مهاراتك الإبداعية، فإن هذا البرنامج يعد وسيلة رائعة للتعلم والنمو"
                            fr="Notre formation de 6 mois en médias vous apprendra les compétences nécessaires pour créer un contenu numérique exceptionnel. Vous apprendrez à concevoir des graphismes, à monter des vidéos et à gérer des plateformes de médias sociaux pour engager et développer des audiences. Ce programme pratique est axé sur des projets concrets, vous offrant une expérience réelle dans la création de contenu pour différents types de médias. Que vous souhaitiez débuter une carrière dans les médias ou améliorer vos compétences créatives, ce programme est une excellente façon d'apprendre et de progresser."
                        />
                    </p>
                </div>
            </div>
        </div>
    );
};
