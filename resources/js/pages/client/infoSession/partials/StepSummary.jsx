import { Button } from '../../../../components/Button';
import { TransText } from '../../../../components/TransText';

export default function StepSummary({ data, errors, setCurrentStep, darkMode, selectedLanguage }) {
    const fields = [
        { key: 'full_name', label: { en: 'Full name', fr: 'Nom complet', ar: 'الاسم الكامل' } },
        { key: 'email', label: { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' } },
        { key: 'phone', label: { en: 'Phone', fr: 'Téléphone', ar: 'الهاتف' } },
        { key: 'birthday', label: { en: 'Birthday', fr: 'Date de naissance', ar: 'تاريخ الميلاد' } },
        { key: 'city', label: { en: 'City', fr: 'Ville', ar: 'المدينة' } },
        { key: 'region', label: { en: 'Region', fr: 'Région', ar: 'المنطقة' } },
        { key: 'education_level', label: { en: 'Education level', fr: 'Niveau d\'éducation', ar: 'المستوى التعليمي' } },
        { key: 'current_situation', label: { en: 'Current situation', fr: 'Situation actuelle', ar: 'الوضع الحالي' } },
        { key: 'has_training', label: { en: 'Has prior training', fr: 'A une formation préalable', ar: 'لديه تدريب سابق' } },
        { key: 'previous_training_details', label: { en: 'Previous training details', fr: 'Détails de la formation précédente', ar: 'تفاصيل التدريب السابق' } },
        { key: 'why_join_formation', label: { en: 'Motivation', fr: 'Motivation', ar: 'الدافع' } },
        { key: 'objectives_after_formation', label: { en: 'Objectives after formation', fr: 'Objectifs après la formation', ar: 'الأهداف بعد التدريب' } },
        { key: 'priority_learning_topics', label: { en: 'Priority learning topics', fr: 'Sujets d\'apprentissage prioritaires', ar: 'مواضيع التعلم ذات الأولوية' } },
        { key: 'arabic_level', label: { en: 'Arabic level', fr: 'Niveau d\'arabe', ar: 'مستوى العربية' } },
        { key: 'french_level', label: { en: 'French level', fr: 'Niveau de français', ar: 'مستوى الفرنسية' } },
        { key: 'english_level', label: { en: 'English level', fr: 'Niveau d\'anglais', ar: 'مستوى الإنجليزية' } },
        { key: 'how_heard_about_formation', label: { en: 'How did you hear about us?', fr: 'Comment avez-vous entendu parler de nous?', ar: 'كيف سمعت عنا؟' } },
        { key: 'current_commitments', label: { en: 'Current commitments', fr: 'Engagements actuels', ar: 'الالتزامات الحالية' } },
    ];

    const goToField = (fieldKey) => {
        // Map field to step index
        const map = {
            full_name: 1,
            email: 1,
            phone: 1,
            birthday: 1,
            city: 1,
            region: 1,
            education_level: 2,
            current_situation: 2,
            has_training: 3,
            previous_training_details: 3,
            why_join_formation: 3,
            objectives_after_formation: 4,
            priority_learning_topics: 4,
            arabic_level: 4,
            french_level: 4,
            english_level: 4,
            how_heard_about_formation: 5,
            current_commitments: 5,
        };
        setCurrentStep(map[fieldKey] || 1);
        // Scroll to top when navigating to a field
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Filter only provided fields
    const provided = fields.filter(({ key }) => {
        const v = data[key];
        if (v === null || v === undefined) return false;
        const s = String(v).trim();
        return s.length > 0;
    });

    return (
        <div className="space-y-6">
            <div className={`rounded-xl transition-all duration-200 ${
                darkMode 
                    ? 'bg-beta text-white' 
                    : 'bg-white text-gray-900'
            }`}>
                {/* Header */}
                <div className="border-b border-gray-600 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-alpha/20">
                            <svg className="h-4 w-4 text-alpha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                <TransText en="Review your details" fr="Vérifiez vos détails" ar="راجع تفاصيلك" />
                            </h3>
                            <p className="text-sm text-gray-400">
                                <TransText en="Please verify your information before proceeding" fr="Veuillez vérifier vos informations avant de continuer" ar="يرجى التحقق من معلوماتك قبل المتابعة" />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details List */}
                <div className="divide-y divide-gray-600">
                    {provided.map(({ key, label }, index) => (
                        <div key={key} className="group px-6 py-4 transition-colors duration-150 hover:bg-gray-700/20">
                            <div className="flex flex-col gap-3">
                                {/* Header Row - Label and Edit Button */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-alpha text-xs font-bold text-gray-900">
                                            {index + 1}
                                        </div>
                                        <label className={`text-sm font-semibold ${darkMode ? 'text-alpha' : 'text-gray-700'}`}>
                                            <TransText {...label} />
                                        </label>
                                    </div>
                                    
                                    <button
                                        type="button"
                                        onClick={() => goToField(key)}
                                        className="flex items-center gap-2 rounded-lg bg-alpha px-4 py-2 text-sm font-normal text-gray-900 transition-all duration-150 hover:bg-beta hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-alpha/50 focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <TransText en="Edit" fr="Modifier" ar="تعديل" />
                                    </button>
                                </div>
                                
                                {/* Value Section - Separate row for better readability */}
                                <div className="ml-9">
                                    <div className={`break-words text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} 
                                         style={{ 
                                             wordWrap: 'break-word', 
                                             wordBreak: 'break-word',
                                             overflowWrap: 'anywhere',
                                             maxWidth: '100%'
                                         }}>
                                        {String(data[key])}
                                    </div>
                                    
                                    {/* Error Message */}
                                    {errors[key] && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <svg className="h-4 w-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-sm text-red-400">{errors[key]}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-600 px-6 py-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-center sm:text-left">
                            <p className="text-sm text-gray-400">
                                <TransText 
                                    en={`${provided.length} field${provided.length !== 1 ? 's' : ''} completed`}
                                    fr={`${provided.length} champ${provided.length !== 1 ? 's' : ''} complété${provided.length !== 1 ? 's' : ''}`}
                                    ar={`${provided.length} حقل${provided.length !== 1 ? 's' : ''} مكتمل${provided.length !== 1 ? 's' : ''}`}
                                />
                            </p>
                        </div>
                        
                        <button
                            type="button"
                            onClick={() => setCurrentStep(8)}
                            className="w-full rounded-lg bg-alpha px-6 py-3 text-sm font-normal text-gray-900 transition-all duration-150 hover:bg-beta hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-alpha/50 focus:ring-offset-2 focus:ring-offset-gray-800 sm:w-auto"
                        >
                            <TransText en="Proceed to Game Intro" fr="Continuer vers l'intro du jeu" ar="المتابعة إلى مقدمة اللعبة" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
