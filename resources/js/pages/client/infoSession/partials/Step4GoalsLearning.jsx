import { TransText } from '../../../../components/TransText';

const Required = () => <span className="text-red-500 ml-1">*</span>;

const Step4GoalsLearning = ({ data, handleChange, errors, darkMode, selectedLanguage, trainingType }) => {
    const isDigitalMarketing = trainingType === 'digital' || trainingType === 'media';

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <TransText en="Goals & Learning" fr="Objectifs et Apprentissage" ar="الأهداف والتعلم" />
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <TransText en="Tell us about your goals" fr="Parlez-nous de vos objectifs" ar="أخبرنا عن أهدافك" />
                </p>
            </div>

            <div className="space-y-6">
                {/* Objectives after formation */}
                <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="What are your objectives after the training?" fr="Quels sont vos objectifs après la formation ?" ar="ما هي أهدافك بعد التدريب؟" />
                        <Required />
                    </label>
                    <select
                        name="objectives_after_formation"
                        value={data.objectives_after_formation}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                            }`}
                        required
                    >
                        <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Select your main objective" fr="Sélectionnez votre objectif principal" ar="اختر هدفك الرئيسي" />
                        </option>
                        <option value="find_job" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText
                                en={isDigitalMarketing ? "Find a job in digital marketing" : "Find a job in programming"}
                                fr={isDigitalMarketing ? "Trouver un emploi en marketing digital" : "Trouver un emploi en programmation"}
                                ar={isDigitalMarketing ? "العثور على وظيفة في التسويق الرقمي" : "العثور على وظيفة في البرمجة"}
                            />
                        </option>
                        <option value="start_business" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Start my own business" fr="Créer ma propre entreprise" ar="بدء عملي الخاص" />
                        </option>
                        <option value="improve_skills" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Improve my current skills" fr="Améliorer mes compétences actuelles" ar="تحسين مهاراتي الحالية" />
                        </option>
                        <option value="career_change" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Change my career path" fr="Changer de parcours professionnel" ar="تغيير مساري المهني" />
                        </option>
                        <option value="freelance" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Work as a freelancer" fr="Travailler en freelance" ar="العمل كمستقل" />
                        </option>
                        <option value="personal_projects" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Develop personal projects" fr="Développer des projets personnels" ar="تطوير مشاريع شخصية" />
                        </option>
                    </select>
                    {errors.objectives_after_formation && <span className="text-sm text-red-500 mt-1">{errors.objectives_after_formation}</span>}
                </div>

                {/* Learning priorities */}
                <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="What would you like to learn as a priority in this training?" fr="Qu'aimeriez-vous apprendre en priorité dans cette formation ?" ar="ما الذي تود تعلمه كأولوية في هذا التدريب؟" />
                        <Required />
                    </label>
                    <select
                        name="priority_learning_topics"
                        value={data.priority_learning_topics}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                            }`}
                        required
                    >
                        <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Select your priority" fr="Sélectionnez votre priorité" ar="اختر أولويتك" />
                        </option>
                        {isDigitalMarketing ? (
                            <>
                                <option value="social_media" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Social Media Marketing" fr="Marketing des réseaux sociaux" ar="تسويق وسائل التواصل الاجتماعي" />
                                </option>
                                <option value="content_marketing" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Content Marketing" fr="Marketing de contenu" ar="تسويق المحتوى" />
                                </option>
                                <option value="paid_advertising" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Paid Advertising (Google Ads, Facebook Ads)" fr="Publicité payante (Google Ads, Facebook Ads)" ar="الإعلانات المدفوعة" />
                                </option>
                            </>
                        ) : (
                            <>
                                <option value="web_development" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Web Development" fr="Développement Web" ar="تطوير المواقع" />
                                </option>
                                <option value="frontend_development" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Frontend Development" fr="Développement Frontend" ar="تطوير الواجهة الأمامية" />
                                </option>
                                <option value="backend_development" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="BAckend Development" fr="Développement Back End" ar="تطوير الواجهة الأمامية" />
                                </option>
                                <option value="database_management" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Database Management" fr="Gestion de base de données" ar="إدارة قواعد البيانات" />
                                </option>
                            </>
                        )}
                    </select>
                    {errors.priority_learning_topics && <span className="text-sm text-red-500 mt-1">{errors.priority_learning_topics}</span>}
                </div>

                {/* Last self-learned thing */}
                <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="What is the last thing you learned by yourself?" fr="Quelle est la dernière chose que vous avez apprise par vous-même ?" ar="ما هو آخر شيء تعلمته بنفسك؟" />
                        <Required />
                    </label>
                    <textarea
                        name="last_self_learned"
                        value={data.last_self_learned}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                        placeholder={selectedLanguage === 'en' ? 'Describe what you learned recently on your own' : selectedLanguage === 'fr' ? 'Décrivez ce que vous avez appris récemment par vous-même' : 'صف ما تعلمته مؤخراً بنفسك'}
                        required
                    />
                    {errors.last_self_learned && <span className="text-sm text-red-500 mt-1">{errors.last_self_learned}</span>}
                </div>

                {/* Language Levels */}
                <div>
                    <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        <TransText en="Please evaluate your level in the following languages" fr="Veuillez évaluer votre niveau dans les langues suivantes" ar="المرجو تقييم مستواك في اللغات التالية" />
                        <Required />
                    </h3>

                    <div className="space-y-4">
                        {/* Arabic Level */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                <TransText en="Arabic" fr="Arabe" ar="العربية" />
                            </label>
                            <select
                                name="arabic_level"
                                value={data.arabic_level}
                                onChange={handleChange}
                                className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                required
                            >
                                <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Select level" fr="Sélectionnez le niveau" ar="اختر المستوى" />
                                </option>
                                <option value="beginner" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Beginner" fr="Débutant" ar="مبتدئ" />
                                </option>
                                <option value="intermediate" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Intermediate" fr="Intermédiaire" ar="متوسط" />
                                </option>
                                <option value="advanced" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Advanced" fr="Avancé" ar="متقدم" />
                                </option>
                                <option value="fluent" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Fluent" fr="Courant" ar="بطلاقة" />
                                </option>
                            </select>
                        </div>

                        {/* French Level */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                <TransText en="French" fr="Français" ar="الفرنسية" />
                            </label>
                            <select
                                name="french_level"
                                value={data.french_level}
                                onChange={handleChange}
                                className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                required
                            >
                                <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Select level" fr="Sélectionnez le niveau" ar="اختر المستوى" />
                                </option>
                                <option value="beginner" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Beginner" fr="Débutant" ar="مبتدئ" />
                                </option>
                                <option value="intermediate" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Intermediate" fr="Intermédiaire" ar="متوسط" />
                                </option>
                                <option value="advanced" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Advanced" fr="Avancé" ar="متقدم" />
                                </option>
                                <option value="fluent" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Fluent" fr="Courant" ar="بطلاقة" />
                                </option>
                            </select>
                        </div>

                        {/* English Level */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                <TransText en="English" fr="Anglais" ar="الإنجليزية" />
                            </label>
                            <select
                                name="english_level"
                                value={data.english_level}
                                onChange={handleChange}
                                className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                required
                            >
                                <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Select level" fr="Sélectionnez le niveau" ar="اختر المستوى" />
                                </option>
                                <option value="beginner" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Beginner" fr="Débutant" ar="مبتدئ" />
                                </option>
                                <option value="intermediate" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Intermediate" fr="Intermédiaire" ar="متوسط" />
                                </option>
                                <option value="advanced" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Advanced" fr="Avancé" ar="متقدم" />
                                </option>
                                <option value="fluent" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                    <TransText en="Fluent" fr="Courant" ar="بطلاقة" />
                                </option>
                            </select>
                        </div>

                        {/* Other Language */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                <TransText en="Other Language (optional)" fr="Autre langue (optionnel)" ar="لغة أخرى (اختياري)" />
                            </label>
                            <input
                                type="text"
                                name="other_language"
                                value={data.other_language}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                placeholder={selectedLanguage === 'en' ? 'Specify other language' : selectedLanguage === 'fr' ? 'Précisez autre langue' : 'حدد لغة أخرى'}
                            />
                        </div>

                        {/* Other Language Level (conditional) */}
                        {data.other_language && (
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                    <TransText en="Level in other language" fr="Niveau dans l'autre langue" ar="مستوى اللغة الأخرى" />
                                </label>
                                <select
                                    name="other_language_level"
                                    value={data.other_language_level}
                                    onChange={handleChange}
                                    className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                    required
                                >
                                    <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                        <TransText en="Select level" fr="Sélectionnez le niveau" ar="اختر المستوى" />
                                    </option>
                                    <option value="beginner" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                        <TransText en="Beginner" fr="Débutant" ar="مبتدئ" />
                                    </option>
                                    <option value="intermediate" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                        <TransText en="Intermediate" fr="Intermédiaire" ar="متوسط" />
                                    </option>
                                    <option value="advanced" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                        <TransText en="Advanced" fr="Avancé" ar="متقدم" />
                                    </option>
                                    <option value="fluent" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                        <TransText en="Fluent" fr="Courant" ar="بطلاقة" />
                                    </option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step4GoalsLearning;
