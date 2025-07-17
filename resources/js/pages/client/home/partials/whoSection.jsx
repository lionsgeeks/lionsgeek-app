import { TransText } from "@/components/TransText";
import { Link } from "@inertiajs/react";
import { useAppContext } from "@/context/appContext";
import {Button} from "../../../../components/Button"


const WhoSection = () => {
    const {selectedLanguage, darkMode} = useAppContext()

    return (
        <div className="px-7 md:px-16 pt-6 py-12" style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff" }}>
            <div
                className={`flex flex-col gap-6 md:items-center justify-between py-12 md:py-24 bg-beta px-7 md:px-16 rounded-lg ${selectedLanguage === "ar" ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
            >
                <h1
                    className={`text-4xl md:text-6xl font-bold text-balance md:w-1/3 text-white tracking-tighter ${selectedLanguage === "ar" ? "text-end" : "text-start"
                        }`}
                >
                    <TransText en="Who we are" fr="Qui nous sommes" ar="من نحن" />
                    <span className="text-alpha">
                        <TransText en="?" fr="?" ar="؟" />
                    </span>
                </h1>

                <div className={`md:w-2/4 flex flex-col gap-8 ${selectedLanguage === "ar" && "items-end"}`}>
                    <p
                        className={`text-lg md:text-xl font-normal text-white text-balance ${selectedLanguage === "ar" && "text-end"
                            }`}
                    >
                        <TransText
                            en="LionsGeek is a Moroccan non-profit organization based in Casablanca. Our mission is to equip young people with the skills they need to succeed in the digital and audiovisual job markets"
                            fr="LionsGeek est une association marocaine à but non lucratif basée à Casablanca. Notre mission est de doter les jeunes des compétences nécessaires pour réussir sur les marchés du numérique et de l'audiovisuel."
                            ar="هي جمعية مغربية غير ربحية تتخذ من الدار البيضاء مقرا لها. مهمتنا تزويد الشباب بالمهارات المطلوبة للنجاح في سوقي العمل الرقمي والسمعية البصرية"
                        />
                    </p>

                    <Link to={"/about"}>
                        <Button>
                            <TransText en="Learn more" fr="En savoir plus" ar="تعرف أكثر" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WhoSection;
