import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { TransText } from '../../../../components/TransText';
import { Button as LGButton } from '../../../../components/Button';

const NavigationButtons = ({
    currentStep,
    darkMode,
    prevStep,
    nextStep,
    validateCurrentStep,
    errors = {},
    onGameRedirect
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

    return (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <LGButton
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''} flex items-center`}
            >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <TransText en="Previous" fr="Précédent" ar="السابق" />
            </LGButton>

            <LGButton
                type={"button"}
                onClick={currentStep === 6 ? handleGameRedirect : handleNext}
                className={'flex items-center'}
            >
                {currentStep < 6 ? (
                    <>
                        <TransText en="Next" fr="Suivant" ar="التالي" />
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                ) : (
                    <>
                        <TransText en="Continue to Game" fr="Continuer vers le jeu" ar="المتابعة إلى اللعبة" />
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                )}
            </LGButton>

        </div>
    );
};

export default NavigationButtons;
