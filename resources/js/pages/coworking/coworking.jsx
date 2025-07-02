import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCamera, faPodcast, faGamepad, faUsers, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import coworkvideo from "../../../assets/videos/videoplayback.mp4";
import ilyass from "../../../assets/images/testimonial/unknown.jpg";
import { RiDoubleQuotesR } from "react-icons/ri";
import gsap from "gsap";
import AppLayout from "@/layouts/app-layout";

const Coworking = () => {

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
            icon: faWifi,
            title: "Internet Haut Débit",
            description: "Notre espace de travail offre un service Internet haut débit de pointe conçu pour répondre aux besoins exigeants des entreprises et des particuliers dans le paysage numérique rapide d'aujourd'hui."
        },
        {
            icon: faCamera,
            title: "Studio de Photographie",
            description: "Studio professionnel, parfait pour capturer des images de haute qualité de vous-même ou de vos produits, améliorant ainsi vos efforts de branding et de marketing."
        },
        {
            icon: faPodcast,
            title: "Studio de Podcast",
            description: "Espace dédié offrant un environnement calme et bien équipé pour enregistrer un audio de haute qualité, garantissant que votre podcast sonne professionnel et soigné."
        },
        {
            icon: faGamepad,
            title: "Espace de Récréation",
            description: "Notre espace de coworking comprend une zone de récréation dynamique, offrant un environnement relaxant pour se détendre ou socialiser, améliorant l'équilibre travail-vie et favorisant une atmosphère communautaire positive."
        },
        {
            icon: faUsers,
            title: "Réseautage",
            description: "Notre espace de coworking offre des opportunités de réseautage inégalées, vous connectant avec des professionnels et des collaborateurs, favorisant l'innovation, l'échange d'idées et la croissance dans un environnement dynamique."
        },
        {
            icon: faShieldAlt,
            title: "Haute Sécurité",
            description: "Notre espace de coworking garantit une sécurité de premier ordre, priorisant votre sécurité et votre bien-être, vous permettant de travailler en toute confiance et de vous concentrer sur vos tâches sans souci dans un environnement sécurisé."
        }
    ];
    const testimoniels = [
        {
            name: "Ilyasse Elyatime",
            description:
                "LionsGeek's coworking space is a haven for creativity and productivity. The collaborative atmosphere and modern facilities made it the perfect place to work on my projects.",
            image: ilyass,
        },
        {
            name: "Oufkir Hamza",
            description:
                "The energy in LionsGeek's coworking space is unmatched. It's inspiring to be surrounded by talented individuals, all striving for excellence in their fields.",
            image: ilyass,
        },
        {
            name: "Amine Bakrim",
            description:
                "I love how LionsGeek's coworking space combines professionalism with comfort. The networking opportunities here have been invaluable for my career.",
            image: ilyass,
        },
        {
            name: "Youness Ait Haddou",
            description:
                "LionsGeek's coworking space is more than just a place to work—it's a community. I've made meaningful connections and gained new perspectives that enhanced my projects.",
            image: ilyass,
        },
        {
            name: "Wissale Chreiba",
            description:
                "Having access to LionsGeek's coworking space was a game-changer for me. The high-speed internet and quiet environment helped me focus and achieve my goals.",
            image: ilyass,
        },
        {
            name: "Youssef Faradi",
            description:
                "The coworking space at LionsGeek fosters innovation and collaboration. The supportive community and excellent amenities make it a pleasure to work here.",
            image: ilyass,
        },
    ];
    return (
        <>
        <AppLayout>

            <div className="min-h-screen bg-[#0f0f0f] text-white">

                <div className="grid lg:grid-cols-2 mx-10 mt-20 gap-20 items-center">

                    <div className="space-y-8 w-[85%] mt-16 ml-16" ref={leftside}>
                        <h1 className="text-6xl font-extrabold">
                            Un <span className="text-alpha">Espace de Coworking Gratuit</span> Pour Vos Objectifs de Vie
                        </h1>
                        <p className="text-sm w-lg">
                            Bienvenue dans notre espace de coworking gratuit, un havre de paix et de sécurité conçu pour inspirer
                            productivité et créativité. Ici, vous pouvez travailler sur vos idées, étudier et vous connecter avec des
                            personnes partageant les mêmes idées. Que vous soyez freelance, étudiant ou entrepreneur, notre espace
                            offre l'environnement idéal pour se concentrer et collaborer. Rejoignez-nous et découvrez une communauté
                            solidaire où l'innovation et le réseautage prospèrent.
                        </p>
                        <button className="bg-alpha text-black px-10 py-3 rounded-lg transition-colors">
                            Rejoignez-nous
                        </button>
                    </div>


                    <div className=" w-[80%]" ref={rightside}>
                        <img src="https://lionsgeek.ma/static/media/Coworking-pana.54ca50c5174b93da3b62.png" alt="nnn" className="object-contain  "
                        />
                    </div>
                </div>
            </div>
            <div className="bg-[#0f0f0f] pb-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">
                        <h1 className="text-lg text-white mb-2">
                            Services
                        </h1>
                        <h2 className="text-5xl font-bold text-white">
                            Nos Services Inclus
                        </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-x-20 gap-y-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-[#212529] rounded-2xl shadow-xl overflow-hidden">
                                <div className="px-5 py-8 flex flex-col items-center justify-center gap-2">

                                    <FontAwesomeIcon icon={service.icon} className="text-alpha font-bold text-6xl mb-4" />

                                    <h3 className="text-xl font-bold text-white ml-4">
                                        {service.title}
                                    </h3>

                                    <p className="text-white text-sm text-center px-5">
                                        {service.description}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#0f0f0f] flex flex-col gap-12 text-center">
                <div>
                    <h1 className="text-lg text-white mb-2 mt-24">
                        Espace de Travail
                    </h1>
                    <h2 className="text-5xl font-extrabold text-white">
                        Explorez Notre Espace
                    </h2>
                </div>

                <div className="w-full px-16">
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

            <div className="bg-[#0f0f0f] flex flex-col gap-12 text-center pb-16">
                <div>
                    <h1 className="text-lg text-white mb-2 mt-32">
                        Témoignages
                    </h1>
                    <h2 className="text-5xl font-extrabold text-white">
                        Les Gens Qui Nous Aiment Déjà
                    </h2>
                </div>
                <div className="flex flex-wrap px-16 justify-center gap-3">
                    {testimoniels.map((element, index) => (
                        <div
                            key={index}
                            className="w-full md:w-[45%] lg:w-[30%] flex flex-col gap-2 relative overflow-hidden bg-[#212529] p-5 lg:p-8 rounded-lg"
                        >
                            <div className="flex gap-3 items-center">
                                <img
                                    loading="lazy"
                                    className="rounded-full w-10"
                                    src={element.image}
                                    alt=""
                                />
                                <p
                                    className="text-white text-base font-bold"
                                >
                                    {element.name}
                                </p>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-alpha/70 p-5 object-cover rounded-full opacity-80">
                                <RiDoubleQuotesR className="text-5xl" />
                            </div>
                            <p className="text-white text-md lg:text-base text-start">
                                {element.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
                    </AppLayout>

        </>
    );
};

export default Coworking;