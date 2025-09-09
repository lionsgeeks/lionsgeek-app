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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="text-center mb-8 sm:mb-10">
                    <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-[#212529]'}`}>
                        {t('heading')}
                    </h1>
                    <p className={`text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed px-2`}>
                        {t('description')}
                    </p>
                </div>

                <div className={`rounded-xl sm:rounded-2xl ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'} shadow-lg overflow-hidden`}>
                    <div className={`px-4 sm:px-6 lg:px-8 py-4 sm:py-5 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
                        <h2 className={`text-lg sm:text-xl font-semibold text-center sm:text-left ${darkMode ? 'text-white' : 'text-[#212529]'}`}>
                            Game Instructions
                        </h2>
                    </div>
                    
                    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                        <div className={`space-y-4 sm:space-y-5 ${selectedLanguage === 'ar' ? 'text-right' : 'text-left'} max-w-2xl mx-auto`}>
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium bg-alpha text-black flex-shrink-0 mt-0.5`}>
                                    1
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                                        {t('bullet1')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium bg-alpha text-black flex-shrink-0 mt-0.5`}>
                                    2
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                                        {t('bullet2')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium bg-alpha text-black flex-shrink-0 mt-0.5`}>
                                    3
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                                        {t('bullet3')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6 sm:mt-8 text-center">
                            <button
                                type="button"
                                className="w-full sm:w-auto bg-alpha text-black px-6 sm:px-8 py-3 sm:py-3 rounded-lg font-medium transition-all duration-200 border border-alpha hover:bg-yellow-400 hover:text-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-alpha focus:ring-opacity-50 active:scale-[0.98] text-sm sm:text-base"
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
