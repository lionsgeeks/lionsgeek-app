import { TransText } from '@/components/TransText';
import { useAppContext } from '@/context/appContext';
import { Link } from '@inertiajs/react';
import { Button } from '../../../../components/Button';

const WhoSection = () => {
    const { selectedLanguage, darkMode } = useAppContext();

    return (
        <div className="px-7 py-12 pt-6 md:px-16" style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff' }}>
            <div
                className={`flex flex-col justify-between gap-6 rounded-lg bg-beta px-7 py-12 md:items-center md:px-16 md:py-24 ${
                    selectedLanguage === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
            >
                <h1
                    className={`text-4xl font-bold tracking-tighter text-balance text-white md:w-1/3 md:text-6xl ${
                        selectedLanguage === 'ar' ? 'text-end' : 'text-start'
                    }`}
                >
                    <TransText en="Who we are" fr="Qui nous sommes" ar="من نحن" />
                    <span className="text-alpha">
                        <TransText en="?" fr="?" ar="؟" />
                    </span>
                </h1>

                <div className={`flex flex-col gap-8 md:w-2/4 ${selectedLanguage === 'ar' && 'items-end'}`}>
                    <p className={`text-lg font-normal text-balance text-white md:text-xl ${selectedLanguage === 'ar' && 'text-end'}`}>
                        <TransText
                            en="LionsGeek is a Moroccan non-profit organization based in Casablanca. Our mission is to equip young people with the skills they need to succeed in the digital and audiovisual job markets"
                            fr="LionsGeek est une association marocaine à but non lucratif basée à Casablanca. Notre mission est de doter les jeunes des compétences nécessaires pour réussir sur les marchés du numérique et de l'audiovisuel."
                            ar="هي جمعية مغربية غير ربحية تتخذ من الدار البيضاء مقرا لها. مهمتنا تزويد الشباب بالمهارات المطلوبة للنجاح في سوقي العمل الرقمي والسمعية البصرية"
                        />
                    </p>

                    <Link href={'/about'}>
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
