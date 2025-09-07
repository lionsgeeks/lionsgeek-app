import { useEffect, useState } from 'react';
import Modal from '../../../components/Modal';
import { useAppContext } from '@/context/appContext';
import AppLayout from '@/layouts/app-layout';
import { useForm, usePage, router } from '@inertiajs/react';
import { TransText } from '../../../components/TransText';
import LoadingPage from '../../../components/loadingPage';

// Import step components
import ProgressIndicator from './partials/ProgressIndicator';
import NavigationButtons from './partials/NavigationButtons';
import Step1PersonalInfo from './partials/Step1PersonalInfo';
import Step2EducationSituation from './partials/Step2EducationSituation';
import Step3ExperienceMotivation from './partials/Step3ExperienceMotivation';
import Step4GoalsLearning from './partials/Step4GoalsLearning';
import Step5BackgroundAvailability from './partials/Step5BackgroundAvailability';
import Step6CVUpload from './partials/Step6CVUpload';
import { PatternGame } from '../game/partials/pattern-game';
import GameIntro from '../game/intro';


const InfoSession = ({ trainingType = 'digital' }) => {
    const { selectedLanguage, darkMode } = useAppContext();
    const { sessions } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        // Session and formation info
        info_session_id: '',
        formation_field: '',

        // Step 1: Personal Information
        full_name: '',
        birthday: '',
        city: '',
        region: '',
        other_city: '',
        email: '',
        phone: '',
        gender: '',

        // Step 2: Education & Current Situation + Phase 2 & 3
        education_level: '',
        diploma_institution: '',
        diploma_specialty: '',
        current_situation: '',
        other_status: '',
        has_referring_organization: '',
        referring_organization: '',
        other_organization: '',

        // Step 3: Training Experience & Motivation + LionsGEEK
        has_training: '',
        previous_training_details: '',
        why_join_formation: '',
        participated_lionsgeek: '',
        lionsgeek_activity: '',
        other_activity: '',

        // Step 4: Goals & Learning + Languages
        objectives_after_formation: '',
        priority_learning_topics: '',
        last_self_learned: '',
        arabic_level: '',
        french_level: '',
        english_level: '',
        other_language: '',
        other_language_level: '',

        // Step 5: Background & Availability
        how_heard_about_formation: '',
        current_commitments: '',

        // Step 6: CV Upload (no video)
        cv_file: null,
    });

    const [sending, setSending] = useState(false);
    const [validate, setValidate] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    // Multi-step form state
    const [currentStep, setCurrentStep] = useState(1);
    const [stepValidation, setStepValidation] = useState({
        1: false, 2: false, 3: false, 4: false, 5: false, 6: false
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setData(prevData => ({
                ...prevData,
                [name]: files[0] || null
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }

        // Extract formation field from selected session
        if (name === 'info_session_id' && value) {
            const selectedSession = sessions.find(session => session.id == value);
            if (selectedSession && selectedSession.formation) {
                const formationType = selectedSession.formation.toLowerCase();
                setData(prevData => ({
                    ...prevData,
                    formation_field: formationType
                }));
            } else {
                setData(prevData => ({
                    ...prevData,
                    formation_field: ''
                }));
            }
        }

        // Clear conditional fields when parent field changes
        if (name === 'city' && value !== 'casablanca') {
            setData(prevData => ({ ...prevData, region: '' }));
        }

        if (name === 'city' && value !== 'other') {
            setData(prevData => ({ ...prevData, other_city: '' }));
        }

        if (name === 'has_referring_organization' && value === 'no') {
            setData(prevData => ({
                ...prevData,
                referring_organization: '',
                other_organization: ''
            }));
        }

        if (name === 'referring_organization' && (value !== 'autre_plateforme' && value !== 'autre_association')) {
            setData(prevData => ({ ...prevData, other_organization: '' }));
        }

        if (name === 'education_level' && value !== 'other') {
            setData(prevData => ({
                ...prevData,
                diploma_institution: '',
                diploma_specialty: ''
            }));
        }

        if (name === 'participated_lionsgeek' && value === 'no') {
            setData(prevData => ({
                ...prevData,
                lionsgeek_activity: '',
                other_activity: ''
            }));
        }

        if (name === 'lionsgeek_activity' && value !== 'other') {
            setData(prevData => ({ ...prevData, other_activity: '' }));
        }

        if (name === 'other_language' && !value) {
            setData(prevData => ({ ...prevData, other_language_level: '' }));
        }

        if (name === 'current_situation' && value !== 'other') {
            setData(prevData => ({ ...prevData, other_status: '' }));
        }

        if (name === 'has_training' && value === 'no') {
            setData(prevData => ({ ...prevData, previous_training_details: '' }));
        }
    };

    // No longer needed - using single selects instead of multi-select

    // Navigation functions
    const nextStep = () => {
        const isValid = validateCurrentStep();
        if (isValid && currentStep < 8) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // Validate ALL form data before allowing game access
    const validateAllSteps = () => {
        const allErrors = {};
        
        // Step 1 validation
        if (!data.formation_field) allErrors.formation_field = 'Please select a training type';
        if (!data.full_name.trim()) allErrors.full_name = 'Full name is required';
        if (!data.birthday) {
            allErrors.birthday = 'Date of birth is required';
        } else {
            const age = Math.floor((new Date() - new Date(data.birthday)) / (365.25 * 24 * 60 * 60 * 1000));
            if (age < 18) allErrors.birthday = 'You must be at least 18 years old';
            if (age > 30) allErrors.birthday = 'Age must be 30 or younger';
        }
        if (!data.city) allErrors.city = 'City is required';
        if (data.city === 'casablanca' && !data.region) allErrors.region = 'Region is required for Casablanca';
        if (data.city === 'other' && !data.other_city.trim()) allErrors.other_city = 'Please specify your city';
        if (!data.email.trim()) allErrors.email = 'Email is required';
        if (!data.phone.trim()) allErrors.phone = 'Phone number is required';

        // Step 2 validation
        if (!data.education_level) allErrors.education_level = 'Education level is required';
        if (data.education_level === 'other' && !data.diploma_institution.trim()) allErrors.diploma_institution = 'Institution is required';
        if (data.education_level === 'other' && !data.diploma_specialty.trim()) allErrors.diploma_specialty = 'Specialty is required';
        if (!data.current_situation) allErrors.current_situation = 'Current situation is required';
        if (data.current_situation === 'other' && !data.other_status.trim()) allErrors.other_status = 'Please specify your status';
        if (!data.has_referring_organization) allErrors.has_referring_organization = 'Please select if you have a referring organization';
        if (data.has_referring_organization === 'yes' && !data.referring_organization) allErrors.referring_organization = 'Please select your referring organization';
        if ((data.referring_organization === 'autre_plateforme' || data.referring_organization === 'autre_association') && !data.other_organization.trim()) allErrors.other_organization = 'Please specify the organization';

        // Step 3 validation
        if (!data.has_training) allErrors.has_training = 'Please select if you have previous training';
        if (data.has_training === 'yes' && !data.previous_training_details.trim()) allErrors.previous_training_details = 'Please provide training details';
        if (!data.why_join_formation.trim()) allErrors.why_join_formation = 'Motivation is required';
        if (data.why_join_formation.length < 100) allErrors.why_join_formation = 'Motivation must be at least 100 characters';
        if (!data.participated_lionsgeek) allErrors.participated_lionsgeek = 'Please select if you participated in LionsGEEK';
        if (data.participated_lionsgeek === 'yes' && !data.lionsgeek_activity) allErrors.lionsgeek_activity = 'Please select your LionsGEEK activity';
        if (data.lionsgeek_activity === 'other' && !data.other_activity.trim()) allErrors.other_activity = 'Please specify the activity';

        // Step 4 validation
        const isMedia = (data.formation_field || '').toLowerCase() === 'media';
        if (!data.objectives_after_formation) allErrors.objectives_after_formation = 'Please select your objectives';
        if (isMedia && !data.priority_learning_topics) allErrors.priority_learning_topics = 'Please select priority learning topics';
        if (!data.last_self_learned.trim()) allErrors.last_self_learned = 'Please describe what you last learned';
        if (!data.arabic_level) allErrors.arabic_level = 'Arabic level is required';
        if (!data.french_level) allErrors.french_level = 'French level is required';
        if (!data.english_level) allErrors.english_level = 'English level is required';
        if (data.other_language && !data.other_language_level) allErrors.other_language_level = 'Please specify the level for other language';

        // Step 5 validation
        if (!data.how_heard_about_formation) allErrors.how_heard_about_formation = 'Please select how you heard about the formation';
        if (!data.current_commitments) allErrors.current_commitments = 'Please describe your current commitments';

        // Step 6 validation
        if (!data.cv_file) allErrors.cv_file = 'CV file is required';

        return allErrors;
    };

    // Game redirect function
    const handleGameRedirect = () => {
        // Validate ALL steps before allowing game access
        const allErrors = validateAllSteps();
        
        if (Object.keys(allErrors).length > 0) {
            // There are validation errors - show them and go back to first error step
            setValidationErrors(allErrors);
            
            // Find the first step with errors and redirect there
            const errorSteps = {
                1: ['formation_field', 'full_name', 'birthday', 'city', 'region', 'other_city', 'email', 'phone'],
                2: ['education_level', 'diploma_institution', 'diploma_specialty', 'current_situation', 'other_status', 'has_referring_organization', 'referring_organization', 'other_organization'],
                3: ['has_training', 'previous_training_details', 'why_join_formation', 'participated_lionsgeek', 'lionsgeek_activity', 'other_activity'],
                4: ['objectives_after_formation', 'priority_learning_topics', 'last_self_learned', 'arabic_level', 'french_level', 'english_level', 'other_language_level'],
                5: ['how_heard_about_formation', 'current_commitments'],
                6: ['cv_file']
            };

            // Find first step with errors
            for (let step = 1; step <= 6; step++) {
                const stepFields = errorSteps[step];
                const hasErrorInStep = stepFields.some(field => allErrors[field]);
                if (hasErrorInStep) {
                    setCurrentStep(step);
                    return;
                }
            }
        }
        
        // All validation passed - proceed to game
        // Store form data to sessionStorage as backup
        sessionStorage.setItem('formData', JSON.stringify(data));
        setCurrentStep(7);
    };

    // Validation for each step
    const validateCurrentStep = () => {
        const newErrors = {};

        switch (currentStep) {
            case 1:
                // Personal Information validation
                if (!data.formation_field) newErrors.formation_field = 'Please select a training type';
                if (!data.full_name.trim()) newErrors.full_name = 'Full name is required';
                if (!data.birthday) {
                    newErrors.birthday = 'Date of birth is required';
                } else {
                    const age = Math.floor((new Date() - new Date(data.birthday)) / (365.25 * 24 * 60 * 60 * 1000));
                    if (age < 18) newErrors.birthday = 'You must be at least 18 years old';
                    if (age > 30) newErrors.birthday = 'Age must be 30 or younger';
                }
                if (!data.city) newErrors.city = 'City is required';
                if (data.city === 'casablanca' && !data.region) newErrors.region = 'Region is required for Casablanca';
                if (data.city === 'other' && !data.other_city.trim()) newErrors.other_city = 'Please specify your city';
                if (!data.email.trim()) newErrors.email = 'Email is required';
                if (!data.phone.trim()) newErrors.phone = 'Phone number is required';

                setValidationErrors(newErrors);
                const step1Valid = Object.keys(newErrors).length === 0;
                setStepValidation(prev => ({ ...prev, 1: step1Valid }));
                return step1Valid;
            case 2:
                // Education & Current Situation + Phase 2 & 3 validation
                if (!data.education_level) newErrors.education_level = 'Education level is required';
                if (data.education_level === 'other' && !data.diploma_institution.trim()) newErrors.diploma_institution = 'Institution is required';
                if (data.education_level === 'other' && !data.diploma_specialty.trim()) newErrors.diploma_specialty = 'Specialty is required';
                if (!data.current_situation) newErrors.current_situation = 'Current situation is required';
                if (data.current_situation === 'other' && !data.other_status.trim()) newErrors.other_status = 'Please specify your status';
                if (!data.has_referring_organization) newErrors.has_referring_organization = 'Please select if you have a referring organization';
                if (data.has_referring_organization === 'yes' && !data.referring_organization) newErrors.referring_organization = 'Please select your referring organization';
                if ((data.referring_organization === 'autre_plateforme' || data.referring_organization === 'autre_association') && !data.other_organization.trim()) newErrors.other_organization = 'Please specify the organization';

                setValidationErrors(newErrors);
                const step2Valid = Object.keys(newErrors).length === 0;
                setStepValidation(prev => ({ ...prev, 2: step2Valid }));
                return step2Valid;
            case 3:
                // Training Experience & Motivation + LionsGEEK validation
                if (!data.has_training) newErrors.has_training = 'Please select if you have previous training';
                if (data.has_training === 'yes' && !data.previous_training_details.trim()) newErrors.previous_training_details = 'Please provide training details';
                if (!data.why_join_formation.trim()) newErrors.why_join_formation = 'Motivation is required';
                if (data.why_join_formation.length < 100) newErrors.why_join_formation = 'Motivation must be at least 100 characters';
                if (!data.participated_lionsgeek) newErrors.participated_lionsgeek = 'Please select if you participated in LionsGEEK';
                if (data.participated_lionsgeek === 'yes' && !data.lionsgeek_activity) newErrors.lionsgeek_activity = 'Please select your LionsGEEK activity';
                if (data.lionsgeek_activity === 'other' && !data.other_activity.trim()) newErrors.other_activity = 'Please specify the activity';

                setValidationErrors(newErrors);
                const step3Valid = Object.keys(newErrors).length === 0;
                setStepValidation(prev => ({ ...prev, 3: step3Valid }));
                return step3Valid;
            case 4:
                // Goals & Learning + Languages validation
                const isMedia = (data.formation_field || '').toLowerCase() === 'media';
                if (!data.objectives_after_formation) newErrors.objectives_after_formation = 'Please select your objectives';
                if (isMedia && !data.priority_learning_topics) newErrors.priority_learning_topics = 'Please select priority learning topics';
                if (!data.last_self_learned.trim()) newErrors.last_self_learned = 'Please describe what you last learned';
                if (!data.arabic_level) newErrors.arabic_level = 'Arabic level is required';
                if (!data.french_level) newErrors.french_level = 'French level is required';
                if (!data.english_level) newErrors.english_level = 'English level is required';
                if (data.other_language && !data.other_language_level) newErrors.other_language_level = 'Please specify the level for other language';

                setValidationErrors(newErrors);
                const step4Valid = Object.keys(newErrors).length === 0;
                setStepValidation(prev => ({ ...prev, 4: step4Valid }));
                return step4Valid;
            case 5:
                // Background & Availability validation
                if (!data.how_heard_about_formation) newErrors.how_heard_about_formation = 'Please select how you heard about the formation';
                if (!data.current_commitments) newErrors.current_commitments = 'Please describe your current commitments';

                setValidationErrors(newErrors);
                const step5Valid = Object.keys(newErrors).length === 0;
                setStepValidation(prev => ({ ...prev, 5: step5Valid }));
                return step5Valid;
            case 6:
                // CV Upload validation (required)
                if (!data.cv_file) newErrors.cv_file = 'CV file is required';

                setValidationErrors(newErrors);
                const step6Valid = Object.keys(newErrors).length === 0;
                setStepValidation(prev => ({ ...prev, 6: step6Valid }));
                return step6Valid;
            case 7:

                const step7Valid = true;

                setStepValidation(prev => ({ ...prev, 7: step7Valid }));

                return step7Valid;
            default:
                return false;
        }
    };

    // Form submission is now handled by the game modal after completion

    // Determine if it's digital marketing or coding
    const isDigitalMarketing = trainingType === 'digital' || trainingType === 'media';

    return (
        <AppLayout>
            <div
                className={`min-h-screen px-4 sm:px-6 pt-20 sm:pt-24 lg:px-16 lg:pt-28 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}
                dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
            >
                {!processing ? (
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                <TransText
                                    en={"Training Application"}
                                    fr={"Candidature Formation"}
                                    ar={"طلب التسجيل في تكوين"}
                                />
                            </h1>
                            <p className={`text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                <TransText
                                    en="Complete your application in 6 simple steps"
                                    fr="Complétez votre candidature en 6 étapes simples"
                                    ar="أكمل طلبك في 6 خطوات بسيطة"
                                />
                            </p>
                        </div>

                        {currentStep <= 6 && (
                            <ProgressIndicator
                                currentStep={currentStep}
                                darkMode={darkMode}
                                selectedLanguage={selectedLanguage}
                            />
                        )}

                        <div className={`rounded-xl p-4 sm:p-6 lg:p-8 shadow-xl transition-all duration-300 ${darkMode ? 'bg-gray-800 border border-gray-700 shadow-gray-900/20' : 'bg-white border border-gray-200 shadow-gray-200/50'
                            }`}>
                            <form
                                autoComplete="off"
                                className="space-y-6"
                            >
                                {/* Step Content */}
                                <div className="step-content">
                                    {currentStep === 1 && (
                                        <Step1PersonalInfo
                                            data={data}
                                            handleChange={handleChange}
                                            errors={{ ...errors, ...validationErrors }}
                                            darkMode={darkMode}
                                            selectedLanguage={selectedLanguage}
                                            sessions={sessions}
                                        />
                                    )}

                                    {currentStep === 2 && (
                                        <Step2EducationSituation
                                            data={data}
                                            handleChange={handleChange}
                                            errors={{ ...errors, ...validationErrors }}
                                            darkMode={darkMode}
                                            selectedLanguage={selectedLanguage}
                                        />
                                    )}

                                    {currentStep === 3 && (
                                        <Step3ExperienceMotivation
                                            data={data}
                                            handleChange={handleChange}
                                            errors={{ ...errors, ...validationErrors }}
                                            darkMode={darkMode}
                                            selectedLanguage={selectedLanguage}
                                            trainingType={trainingType}
                                        />
                                    )}

                                    {currentStep === 4 && (
                                        <Step4GoalsLearning
                                            data={data}
                                            handleChange={handleChange}
                                            errors={{ ...errors, ...validationErrors }}
                                            darkMode={darkMode}
                                            selectedLanguage={selectedLanguage}
                                            trainingType={trainingType}
                                        />
                                    )}

                                    {currentStep === 5 && (
                                        <Step5BackgroundAvailability
                                            data={data}
                                            handleChange={handleChange}
                                            errors={{ ...errors, ...validationErrors }}
                                            darkMode={darkMode}
                                            selectedLanguage={selectedLanguage}
                                        />
                                    )}

                                    {currentStep === 6 && (
                                        <Step6CVUpload
                                            data={data}
                                            handleChange={handleChange}
                                            errors={{ ...errors, ...validationErrors }}
                                            darkMode={darkMode}
                                            selectedLanguage={selectedLanguage}
                                            setData={setData}
                                        />
                                    )}
                                    {currentStep === 7 && (
                                        <GameIntro setCurrentStep={setCurrentStep} />
                                    )}
                                    {currentStep === 8 && (
                                        <PatternGame data={data} />
                                    )}
                                </div>
                                {/* Navigation Buttons */}
                                {
                                    currentStep < 7 &&
                                    <NavigationButtons
                                        currentStep={currentStep}
                                        darkMode={darkMode}
                                        prevStep={prevStep}
                                        nextStep={nextStep}
                                        validateCurrentStep={validateCurrentStep}
                                        errors={{ ...errors, ...validationErrors }}
                                        onGameRedirect={handleGameRedirect}
                                    />
                                }
                            </form>
                        </div>
                    </div>
                ) : (
                    <LoadingPage />
                )}

                {!sending && confirmation && (
                    <Modal
                        validate={validate}
                        confirm={confirmation}
                        action={
                            <button
                                onClick={() => {
                                    setConfirmation(false);
                                    setValidate(false);
                                }}
                                className={`rounded px-4 py-2 text-white transition-colors duration-300 ${darkMode ? 'bg-beta' : 'bg-beta'
                                    } ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-600'
                                    } hover:text-alpha focus:outline-none`}
                            >
                                <TransText en="Close" fr="Fermer" ar="إغلاق" />
                            </button>
                        }
                    />
                )}
            </div>
        </AppLayout>
    );
};

export default InfoSession;
