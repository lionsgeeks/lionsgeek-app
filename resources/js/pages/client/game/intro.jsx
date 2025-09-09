import { useAppContext } from '@/context/appContext';
import { router } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Homepage', href: '/' },
    { title: 'Game', href: '/game/intro' },
];

export default function GameIntro({ setCurrentStep }) {
    const { darkMode, selectedLanguage } = useAppContext();

    const translations = {
        heading: {
            en: 'Before you start',
            fr: 'Avant de commencer',
            ar: 'قبل أن تبدأ',
        },
        description: {
            en: 'You will play a short pattern recognition game. Read the notes below, then start.',
            fr: 'Vous jouerez à un court jeu de reconnaissance de motifs. Lisez les notes ci‑dessous, puis commencez.',
            ar: 'ستقوم بلعب لعبة قصيرة للتعرّف على الأنماط. اقرأ الملاحظات أدناه ثم ابدأ.',
        },
        bullet1: {
            en: 'The timer is hidden.',
            fr: 'Le minuteur est masqué.',
            ar: 'المؤقّت مخفي.',
        },
        bullet2: {
            en: 'Finish all levels or just keep answering until the end.',
            fr: 'Terminez tous les niveaux ou continuez simplement à répondre jusqu’à la fin.',
            ar: 'أكمل جميع المستويات أو واصل الإجابة حتى النهاية.',
        },
        bullet3: {
            en: 'Submission happens automatically at the end.',
            fr: 'L’envoi se fait automatiquement à la fin.',
            ar: 'يتم الإرسال تلقائيًا عند النهاية.',
        },
        start: {
            en: 'Start the game',
            fr: 'Commencer le jeu',
            ar: 'ابدأ اللعبة',
        },
    };

    const t = (key) => translations[key]?.[selectedLanguage] ?? translations[key]?.en ?? '';
    
    return (
        <div className={`${selectedLanguage === 'ar' ? 'rtl' : ''}`} dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}>
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="text-center mb-10">
                    <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#212529]'}`}>
                        {t('heading')}
                    </h1>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed`}>
                        {t('description')}
                    </p>
                </div>

                <div className={`rounded-2xl ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'} shadow-lg overflow-hidden`}>
                    <div className={`px-8 py-5 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
                        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#212529]'}`}>
                            Game Instructions
                        </h2>
                    </div>
                    
                    <div className="px-6 sm:px-8 py-6">
                        <div className={`space-y-5 ${selectedLanguage === 'ar' ? 'text-right' : 'text-left'} max-w-2xl mx-auto`}>
                            <div className="flex items-center sm:justify-start justify-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-yellow-400 text-black flex-shrink-0`}>
                                    1
                                </div>
                                <div className="flex items-center">
                                    <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                                        {t('bullet1')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center sm:justify-start justify-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-yellow-400 text-black flex-shrink-0`}>
                                    2
                                </div>
                                <div className="flex items-center">
                                    <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                                        {t('bullet2')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center sm:justify-start justify-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-yellow-400 text-black flex-shrink-0`}>
                                    3
                                </div>
                                <div className="flex items-center">
                                    <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                                        {t('bullet3')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 text-center">
                            <button
                                type="button"
                                className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-medium transition-all duration-200 border border-yellow-400 hover:bg-transparent hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 active:scale-[0.98]"
                                onClick={() => {
                                    if (typeof setCurrentStep === 'function') {
                                        setCurrentStep(9);
                                    } else {
                                        router.visit('/game');
                                    }
                                }}
                            >
                                {t('start')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
