import { Check } from 'lucide-react';
import { TransText } from '../../../../components/TransText';

const ProgressIndicator = ({ currentStep, darkMode, selectedLanguage }) => {
    const steps = [
        { number: 1, title: { en: 'Personal', fr: 'Personnel', ar: 'شخصي' } },
        { number: 2, title: { en: 'Education', fr: 'Formation', ar: 'التعليم' } },
        { number: 3, title: { en: 'Experience', fr: 'Expérience', ar: 'الخبرة' } },
        { number: 4, title: { en: 'Goals', fr: 'Objectifs', ar: 'الأهداف' } },
        { number: 5, title: { en: 'Background', fr: 'Contexte', ar: 'الخلفية' } },
        { number: 6, title: { en: 'Upload', fr: 'Télécharger', ar: 'رفع' } },
    ];

    return (
        <div className="mb-8">
            {/* Mobile Progress Bar */}
            <div className="md:hidden">
                <div className="mb-2 flex items-center justify-between">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <TransText en="Step" fr="Étape" ar="خطوة" /> {Math.min(currentStep, 6)} <TransText en="of" fr="de" ar="من" /> 6
                    </span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {Math.round((Math.min(currentStep, 6) / 6) * 100)}%
                    </span>
                </div>
                <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-beta' : 'bg-gray-200'}`}>
                    <div
                        className="h-2 rounded-full bg-alpha transition-all duration-500 ease-out"
                        style={{ width: `${(Math.min(currentStep, 6) / 6) * 100}%` }}
                    />
                </div>
            </div>

            {/* Desktop Step Indicators */}
            <div className="hidden items-center justify-between md:flex">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                                currentStep > step.number 
                                    ? 'bg-alpha text-beta' 
                                    : currentStep === step.number 
                                    ? 'bg-alpha text-beta' 
                                    : darkMode 
                                    ? 'bg-beta text-white' 
                                    : 'bg-gray-200 text-gray-500'
                            }`}>
                                {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                            </div>
                            <span
                                className={`mt-2 text-xs font-medium ${
                                    currentStep >= step.number
                                        ? darkMode
                                            ? 'text-white'
                                            : 'text-gray-900'
                                        : darkMode
                                          ? 'text-gray-400'
                                          : 'text-gray-500'
                                }`}
                            >
                                <TransText {...step.title} />
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-4 ${
                                currentStep > step.number 
                                    ? 'bg-alpha' 
                                    : darkMode ? 'bg-beta' : 'bg-gray-200'
                            }`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressIndicator;
