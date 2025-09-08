import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button as LGButton } from '../../../../components/Button';
import { TransText } from '../../../../components/TransText';

const NavigationButtons = ({ currentStep, darkMode, prevStep, nextStep, validateCurrentStep, errors = {}, onGameRedirect }) => {
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
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
            <LGButton
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`${currentStep === 1 ? 'cursor-not-allowed opacity-50' : ''} flex items-center`}
            >
                <ChevronLeft className="mr-2 h-5 w-5" />
                <TransText en="Previous" fr="Précédent" ar="السابق" />
            </LGButton>

            <LGButton type={'button'} onClick={currentStep === 6 ? handleGameRedirect : handleNext} className={'flex items-center'}>
                {currentStep < 6 ? (
                    <>
                        <TransText en="Next" fr="Suivant" ar="التالي" />
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                ) : (
                    <>
                        <TransText en="Continue to Game" fr="Continuer vers le jeu" ar="المتابعة إلى اللعبة" />
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                )}
            </LGButton>
        </div>
    );
};

export default NavigationButtons;
