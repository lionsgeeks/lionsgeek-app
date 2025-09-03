import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { TransText } from '../../../../components/TransText';

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
        const isValid = validateCurrentStep();
        if (isValid) {
            nextStep();
        } else {
            // Show validation errors
            console.log('Validation failed for step', currentStep, 'Errors:', errors);
            // You can add a toast notification here if needed
        }
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
            <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                    : darkMode
                        ? 'bg-beta text-white hover:bg-gray-600'
                        : 'bg-gray-200 text-beta hover:bg-gray-300'
                    }`}
            >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <TransText en="Previous" fr="Précédent" ar="السابق" />
            </button>

            <button
                type={"button"}
                onClick={currentStep === 6 ? handleGameRedirect : handleNext}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${darkMode ? 'bg-alpha text-beta hover:bg-yellow-400' : 'bg-alpha text-beta hover:bg-yellow-400'
                    }`}
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
            </button>

        </div>
    );
};

export default NavigationButtons;
