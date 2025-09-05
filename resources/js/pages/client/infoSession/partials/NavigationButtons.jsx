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
        <div className={`flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mt-8 pt-6 border-t transition-colors duration-200 ${
            darkMode ? 'border-gray-600' : 'border-gray-200'
        }`}>
            <LGButton
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''} flex items-center justify-center w-full sm:w-auto order-2 sm:order-1`}
            >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <TransText en="Previous" fr="Précédent" ar="السابق" />
            </LGButton>

            <LGButton
                type={"button"}
                onClick={currentStep === 6 ? handleGameRedirect : handleNext}
                className={'flex items-center justify-center w-full sm:w-auto order-1 sm:order-2'}
            >
                {currentStep < 6 ? (
                    <>
                        <TransText en="Next" fr="Suivant" ar="التالي" />
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                ) : (
                    <>
                        <span className="hidden sm:inline">
                            <TransText en="Continue to Game" fr="Continuer vers le jeu" ar="المتابعة إلى اللعبة" />
                        </span>
                        <span className="sm:hidden">
                            <TransText en="Start Game" fr="Commencer" ar="بدء اللعبة" />
                        </span>
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                )}
            </LGButton>

        </div>
    );
};

export default NavigationButtons;
