import { useEffect, useRef } from "react";
import coworkvideo from "../../../../assets/videos/videoplayback.mp4";
import ilyass from "../../../../assets/images/testimonial/unknown.jpg";
import { RiDoubleQuotesR } from "react-icons/ri";
import gsap from "gsap";
import AppLayout from "@/layouts/app-layout";
import { Camera, Gamepad, Podcast, Shield, Users, Wifi } from "lucide-react";
import { Head, Link } from "@inertiajs/react";
import { useAppContext } from "@/context/appContext";
import { TransText } from '@/components/TransText';
import { Button } from "@/components/Button";

const Coworking = () => {
    const { selectedLanguage, darkMode } = useAppContext();

    const videoPlay = useRef(null);
    useEffect(() => {
        const videoElement = videoPlay.current;
        const playVideo = (elements) => {
            const video = elements;
            if (video.isIntersecting) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        };
    }, []);

    const leftside = useRef(null);
    const rightside = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            leftside.current,
            { x: "-100%", opacity: "0" },
            { x: "0%", duration: 0.5, delay: 0.5, opacity: "1", ease: "power2.out" }
        );
        gsap.fromTo(
            rightside.current,
            { x: "100%", opacity: "0" },
            { x: "0%", duration: 0.5, delay: 0.5, opacity: "1", ease: "power2.out" }
        );
    }, []);

    const services = [
        {
            icon: <Wifi size={60} color={darkMode ? "#fee819" : "yellow"} />,
            title: <TransText en="High Speed Internet" fr="Internet Haut Débit" ar="إنترنت عالي السرعة" />,
            description: <TransText
                en="Our workspace offers cutting-edge high-speed internet service designed to meet the demanding needs of businesses and individuals in today's fast-paced digital landscape."
                fr="Notre espace de travail offre un service Internet haut débit de pointe conçu pour répondre aux besoins exigeants des entreprises et des particuliers dans le paysage numérique rapide d'aujourd'hui."
                ar="يقدم مساحة عملنا خدمة إنترنت عالية السرعة مصممة لتلبية احتياجات الشركات والأفراد في المشهد الرقمي سريع الخطى اليوم."
            />
        },
        {
            icon: <Camera size={60} color={darkMode ? "#fee819" : "yellow"} />,
            title: <TransText en="Photography Studio" fr="Studio de Photographie" ar="استوديو تصوير" />,
            description: <TransText
                en="Professional studio, perfect for capturing high-quality images of yourself or your products, enhancing your branding and marketing efforts."
                fr="Studio professionnel, parfait pour capturer des images de haute qualité de vous-même ou de vos produits, améliorant ainsi vos efforts de branding et de marketing."
                ar="استوديو احترافي، مثالي لالتقاط صور عالية الجودة لنفسك أو لمنتجاتك، مما يعزز جهود العلامة التجارية والتسويق."
            />
        },
        {
            icon: <Podcast size={60} color={darkMode ? "#fee819" : "yellow"} />,
            title: <TransText en="Podcast Studio" fr="Studio de Podcast" ar="استوديو بودكاست" />,
            description: <TransText
                en="Dedicated space offering a quiet, well-equipped environment to record high-quality audio, ensuring your podcast sounds professional and polished."
                fr="Espace dédié offrant un environnement calme et bien équipé pour enregistrer un audio de haute qualité, garantissant que votre podcast sonne professionnel et soigné."
                ar="مساحة مخصصة توفر بيئة هادئة ومجهزة جيدًا لتسجيل صوت عالي الجودة، مما يضمن أن يكون بودكاستك احترافيًا ومصقولًا."
            />
        },
        {
            icon: <Gamepad size={60} color={darkMode ? "#fee819" : "yellow"} />,
            title: <TransText en="Recreation Space" fr="Espace de Récréation" ar="مساحة ترفيهية" />,
            description: <TransText
                en="Our coworking space includes a dynamic recreation area, providing a relaxing environment to unwind or socialize, enhancing work-life balance and fostering a positive community atmosphere."
                fr="Notre espace de coworking comprend une zone de récréation dynamique, offrant un environnement relaxant pour se détendre ou socialiser, améliorant l'équilibre travail-vie et favorisant une atmosphère communautaire positive."
                ar="يشمل مساحة العمل المشترك لدينا منطقة ترفيهية ديناميكية، توفر بيئة مريحة للاسترخاء أو التواصل الاجتماعي، مما يعزز التوازن بين العمل والحياة ويعزز أجواء مجتمعية إيجابية."
            />
        },
        {
            icon: <Users size={60} color={darkMode ? "#fee819" : "yellow"} />,
            title: <TransText en="Networking" fr="Réseautage" ar="التواصل" />,
            description: <TransText
                en="Our coworking space offers unparalleled networking opportunities, connecting you with professionals and collaborators, fostering innovation, idea exchange, and growth in a dynamic environment."
                fr="Notre espace de coworking offre des opportunités de réseautage inégalées, vous connectant avec des professionnels et des collaborateurs, favorisant l'innovation, l'échange d'idées et la croissance dans un environnement dynamique."
                ar="يوفر مساحة العمل المشترك لدينا فرصًا غير مسبوقة للتواصل، حيث يربطك بالمحترفين والمتعاونين، ويعزز الابتكار وتبادل الأفكار والنمو في بيئة ديناميكية."
            />
        },
        {
            icon: <Shield size={60} color={darkMode ? "#fee819" : "yellow"} />,
            title: <TransText en="High Security" fr="Haute Sécurité" ar="أمان عالي" />,
            description: <TransText
                en="Our coworking space ensures top-tier security, prioritizing your safety and well-being, allowing you to work confidently and focus on your tasks without worry in a secure environment."
                fr="Notre espace de coworking garantit une sécurité de premier ordre, priorisant votre sécurité et votre bien-être, vous permettant de travailler en toute confiance et de vous concentrer sur vos tâches sans souci dans un environnement sécurisé."
                ar="يضمن مساحة العمل المشترك لدينا أمانًا من أعلى المستويات، مع إعطاء الأولوية لسلامتك ورفاهيتك، مما يسمح لك بالعمل بثقة والتركيز على مهامك دون قلق في بيئة آمنة."
            />
        }
    ];

    const testimoniels = [
        {
            name: "Ilyasse Elyatime",
            description: <TransText
                en="LionsGeek's coworking space is a haven for creativity and productivity. The collaborative atmosphere and modern facilities made it the perfect place to work on my projects."
                fr="L'espace de coworking de LionsGeek est un havre de créativité et de productivité. L'atmosphère collaborative et les installations modernes en ont fait l'endroit idéal pour travailler sur mes projets."
                ar="مساحة العمل المشترك في LionsGeek هي ملاذ للإبداع والإنتاجية. جعلت الأجواء التعاونية والمرافق الحديثة منها المكان المثالي للعمل على مشاريعي."
            />,
            image: ilyass,
        },
        {
            name: "Oufkir Hamza",
            description: <TransText
                en="The energy in LionsGeek's coworking space is unmatched. It's inspiring to be surrounded by talented individuals, all striving for excellence in their fields."
                fr="L'énergie dans l'espace de coworking de LionsGeek est incomparable. C'est inspirant d'être entouré de personnes talentueuses, toutes en quête d'excellence dans leurs domaines."
                ar="الطاقة في مساحة العمل المشترك في LionsGeek لا مثيل لها. إنه لأمر ملهم أن تكون محاطًا بأفراد موهوبين، يسعون جميعًا للتميز في مجالاتهم."
            />,
            image: ilyass,
        },
        {
            name: "Amine Bakrim",
            description: <TransText
                en="I love how LionsGeek's coworking space combines professionalism with comfort. The networking opportunities here have been invaluable for my career."
                fr="J'adore comment l'espace de coworking de LionsGeek allie professionnalisme et confort. Les opportunités de réseautage ici ont été inestimables pour ma carrière."
                ar="أحب كيف تجمع مساحة العمل المشترك في LionsGeek بين الاحترافية والراحة. كانت فرص التواصل هنا لا تقدر بثمن لمسيرتي المهنية."
            />,
            image: ilyass,
        },
        {
            name: "Youness Ait Haddou",
            description: <TransText
                en="LionsGeek's coworking space is more than just a place to work—it's a community. I've made meaningful connections and gained new perspectives that enhanced my projects."
                fr="L'espace de coworking de LionsGeek est plus qu'un simple lieu de travail - c'est une communauté. J'ai établi des connexions significatives et acquis de nouvelles perspectives qui ont enrichi mes projets."
                ar="مساحة العمل المشترك في LionsGeek هي أكثر من مجرد مكان للعمل - إنها مجتمع. لقد قمت بإقامة روابط ذات معنى واكتسبت وجهات نظر جديدة عززت مشاريعي."
            />,
            image: ilyass,
        },
        {
            name: "Wissale Chreiba",
            description: <TransText
                en="Having access to LionsGeek's coworking space was a game-changer for me. The high-speed internet and quiet environment helped me focus and achieve my goals."
                fr="Avoir accès à l'espace de coworking de LionsGeek a été un tournant pour moi. L'internet haut débit et l'environnement calme m'ont aidé à me concentrer et à atteindre mes objectifs."
                ar="كان الوصول إلى مساحة العمل المشترك في LionsGeek نقطة تحول بالنسبة لي. ساعدني الإنترنت عالي السرعة والبيئة الهادئة على التركيز وتحقيق أهدافي."
            />,
            image: ilyass,
        },
        {
            name: "Youssef Faradi",
            description: <TransText
                en="The coworking space at LionsGeek fosters innovation and collaboration. The supportive community and excellent amenities make it a pleasure to work here."
                fr="L'espace de coworking chez LionsGeek favorise l'innovation et la collaboration. La communauté solidaire et les excellentes installations rendent le travail ici très agréable."
                ar="تشجع مساحة العمل المشترك في LionsGeek الابتكار والتعاون. المجتمع الداعم والمرافق الممتازة تجعل العمل هنا ممتعًا."
            />,
            image: ilyass,
        }
    ];
    const titles = {
        fr: "Un <span class='text-alpha'>Espace de Coworking Gratuit</span> Pour Vos Objectifs de Vie",
        en: "A <span class='text-alpha'>Free Coworking Space</span> For Your Life Goals",
        ar: "<span class='text-alpha'>مساحة عمل مشترك مجانية</span> لأهداف حياتك"
    };
    return (
        <>
            <AppLayout>
                <Head title="Co-Working" />
                <div className={`min-h-screen w-full ${darkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-black"}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 mx-5 sm:mx-10 lg:mt-10 mt-20 gap-10 lg:gap-20 items-center">
                        <div className=" order-2 lg:order-1 space-y-6 sm:space-y-8 w-full sm:w-[90%] lg:w-[85%] mt-8 sm:mt-16 sm:ml-0 lg:ml-16 lg:text-left  text-center " ref={leftside}>
                            <h1
                                className={`text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl  ${selectedLanguage === "ar" ? "text-right" : ""
                                    }`}
                                dangerouslySetInnerHTML={{ __html: titles[selectedLanguage] || titles.en }}
                            />
                            <p className="text-sm sm:text-base md:text-lg ">
                                <TransText
                                    en="Welcome to our free coworking space, a haven of peace and security designed to inspire productivity and creativity. Here, you can work on your ideas, study, and connect with like-minded people. Whether you're a freelancer, student, or entrepreneur, our space offers the ideal environment to focus and collaborate. Join us and discover a supportive community where innovation and networking thrive."
                                    fr="Bienvenue dans notre espace de coworking gratuit, un havre de paix et de sécurité conçu pour inspirer productivité et créativité. Ici, vous pouvez travailler sur vos idées, étudier et vous connecter avec des personnes partageant les mêmes idées. Que vous soyez freelance, étudiant ou entrepreneur, notre espace offre l'environnement idéal pour se concentrer et collaborer. Rejoignez-nous et découvrez une communauté solidaire où l'innovation et le réseautage prospèrent."
                                    ar="مرحبًا بكم في مساحة العمل المشترك المجانية لدينا، ملاذًا للسلامة والأمان مصممًا لإلهام الإنتاجية والإبداع. هنا يمكنك العمل على أفكارك، والدراسة، والتواصل مع الأشخاص المتشابهين في التفكير. سواء كنت مستقلاً، طالبًا، أو رائد أعمال، توفر مساحتنا البيئة المثالية للتركيز والتعاون. انضم إلينا واكتشف مجتمعًا داعمًا حيث تزدهر الابتكارات والتواصل."
                                />
                            </p>
                            <Link href={"/coworking/form"} className="cursor-pointer">
                                <Button className="px-10 py-3">
                                    <TransText en="Join Us" fr="Rejoignez-nous" ar="انضم إلينا" />
                                </Button>
                            </Link>
                        </div>

                        <div className="order-1 lg:order-2  w-full flex justify-center lg:justify-end" ref={rightside}>
                            <img src="https://lionsgeek.ma/static/media/Coworking-pana.54ca50c5174b93da3b62.png" alt="coworking illustration" className="object-contain" />
                        </div>
                    </div>

                    <div className={`pb-14 pt-20 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-[#0f0f0f]" : "bg-white"}`}>
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h1 className={`text-lg mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                                    <TransText en="Services" fr="Services" ar="الخدمات" />
                                </h1>
                                <h2 className={`text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl ${darkMode ? "text-white" : "text-black"}`}>
                                    <TransText en="Our Included Services" fr="Nos Services Inclus" ar="خدماتنا المدرجة" />
                                </h2>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-x-20 gap-y-8">
                                {services.map((service, index) => (
                                    <div key={index} className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-[#1a1a1a]" : "bg-white"}`}>
                                        <div className="px-5 py-8 flex flex-col items-center justify-center gap-2">
                                            {service.icon}
                                            <h3 className={`text-xl font-bold ml-4 ${darkMode ? "text-white" : "text-black"}`}>
                                                {service.title}
                                            </h3>
                                            <p className={`text-sm text-center px-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-col lg:p-0 p-4 gap-12 text-center ${darkMode ? "bg-[#0f0f0f]" : "bg-white"}`}>
                        <div>
                            <h1 className={`text-lg mb-2 mt-10 ${darkMode ? "text-white" : "text-black"}`}>
                                <TransText en="Workspace" fr="Espace de Travail" ar="مساحة العمل" />
                            </h1>
                            <h2 className={`text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl ${darkMode ? "text-white" : "text-black"}`}>
                                <TransText en="Explore Our Space" fr="Explorez Notre Espace" ar="استكشف مساحتنا" />
                            </h2>
                        </div>

                        <div className="w-full lg:px-16">
                            <video
                                ref={videoPlay}
                                className="border-2 border-alpha rounded-xl"
                                src={coworkvideo}
                                type="video/mp4"
                                autoPlay
                                muted
                                loop
                            ></video>
                        </div>
                    </div>

                    <div className={`flex flex-col gap-12 px-4 lg:px-0 text-center pb-16 ${darkMode ? "bg-[#0f0f0f]" : "bg-white"}`}>
                        <div>
                            <h1 className={`text-lg mb-2 mt-32 ${darkMode ? "text-white" : "text-black"}`}>
                                <TransText en="Testimonials" fr="Témoignages" ar="الشهادات" />
                            </h1>
                            <h2 className={`text-3xl font-extrabold  sm:text-4xl md:text-5xl lg:text-6xl ${darkMode ? "text-white" : "text-black"}`}>
                                <TransText en="People Who Already Love Us" fr="Les Gens Qui Nous Aiment Déjà" ar="الأشخاص الذين يحبوننا بالفعل" />
                            </h2>
                        </div>
                        <div className="flex flex-wrap  lg:px-16 justify-center gap-3">
                            {testimoniels.map((element, index) => (
                                <div
                                    key={index}
                                    className={`w-full md:w-[45%] lg:w-[30%] flex flex-col gap-2 relative overflow-hidden shadow-md p-5 lg:p-8 rounded-lg ${darkMode ? "bg-[#1a1a1a]" : "bg-white"}`}
                                >
                                    <div className="flex gap-3 items-center">
                                        <img
                                            loading="lazy"
                                            className="rounded-full w-10"
                                            src={element.image}
                                            alt=""
                                        />
                                        <p className={`text-base font-bold ${darkMode ? "text-white" : "text-black"}`}>
                                            {element.name}
                                        </p>
                                    </div>
                                    <div className="absolute -top-4 -right-4 bg-alpha/70 p-5 object-cover rounded-full opacity-80">
                                        <RiDoubleQuotesR className="text-5xl" />
                                    </div>
                                    <p className={`text-md lg:text-base text-start ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        {element.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default Coworking;