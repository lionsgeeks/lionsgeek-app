import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useAppContext } from '@/context/appContext';

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
            fr: "Vous jouerez à un court jeu de reconnaissance de motifs. Lisez les notes ci‑dessous, puis commencez.",
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
        <div className={`space-y-6 text-center ${selectedLanguage === 'ar' ? 'rtl' : ''}`} dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}>
            <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-beta">{t('heading')}</h1>
                <p className={`mt-2 text-sm sm:text-base opacity-90 ${darkMode ? 'text-white' : 'text-black'}`}>{t('description')}</p>
            </div>

            <div className={`${selectedLanguage === 'ar' ? 'text-right' : 'text-left'} ${darkMode ? 'text-white' : 'text-black'}`}>
                <ul className="list-disc pl-5 text-sm sm:text-base space-y-1">
                    <li>{t('bullet1')}</li>
                    <li>{t('bullet2')}</li>
                    <li>{t('bullet3')}</li>
                </ul>
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    className={`rounded-md px-5 py-2.5 font-semibold hover:opacity-90 ${darkMode ? 'bg-white text-black' : 'bg-beta text-white'}`}
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
    );
}


