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
        console.log('🎮 NavigationButtons: handleGameRedirect called');
        const isValid = validateCurrentStep();
        console.log('🔍 Step 6 validation result:', isValid);
        console.log('🔍 onGameRedirect function provided:', !!onGameRedirect);

        if (isValid && onGameRedirect) {
            console.log('✅ Calling onGameRedirect function');
            onGameRedirect();
        } else {
            console.log('❌ Validation failed for step 6 or onGameRedirect not provided');
            console.log('❌ isValid:', isValid, 'onGameRedirect:', !!onGameRedirect);

            // Don't redirect to home on validation failure - just stay on the form
            if (!isValid) {
                console.log('❌ Step 6 validation failed - staying on form');
            }
            if (!onGameRedirect) {
                console.log('❌ onGameRedirect function not provided');
            }
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
