import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button as LGButton } from '../../../../components/Button';
import { TransText } from '../../../../components/TransText';

const NavigationButtons = ({
    currentStep,
    darkMode,
    prevStep,
    nextStep,
    validateCurrentStep,
    errors = {},
    onGameRedirect,
    selectedLanguage = 'en'
}) => {
    const handleNext = () => {
        nextStep();
    };

    const handleGameRedirect = () => {
        const isValid = validateCurrentStep();

        if (isValid && onGameRedirect) {
            onGameRedirect();
        }
    };

    // RTL support for Arabic
    const isRTL = selectedLanguage === 'ar';
    const iconSpacing = isRTL ? 'ml-2' : 'mr-2';
    const iconSpacingRight = isRTL ? 'mr-2' : 'ml-2';

    return (
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <LGButton
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''} flex items-center justify-center w-full sm:w-auto min-w-[120px] px-4 py-3 text-sm sm:text-base transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
                <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 ${iconSpacing}`} />
                <TransText en="Previous" fr="Précédent" ar="السابق" />
            </LGButton>

            <LGButton
                type="button"
                onClick={currentStep === 6 ? handleGameRedirect : handleNext}
                className={`flex items-center justify-center w-full sm:w-auto min-w-[140px] px-4 py-3 text-sm sm:text-base transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
                {currentStep < 6 ? (
                    <>
                        <TransText en="Next" fr="Suivant" ar="التالي" />
                        <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 ${iconSpacingRight}`} />
                    </>
                ) : (
                    <>
                        <TransText en="Continue to Game" fr="Continuer vers le jeu" ar="المتابعة إلى اللعبة" />
                        <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 ${iconSpacingRight}`} />
                    </>
                )}
            </LGButton>
        </div>
    );
};

export default NavigationButtons;
