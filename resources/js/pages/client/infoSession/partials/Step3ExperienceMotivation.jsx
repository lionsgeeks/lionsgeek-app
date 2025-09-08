import { TransText } from '../../../../components/TransText';

const Required = () => <span className="ml-1 text-red-500">*</span>;

const Step3ExperienceMotivation = ({ data, handleChange, errors, darkMode, selectedLanguage, trainingType }) => {
    const isDigitalMarketing = trainingType === 'digital' || trainingType === 'media';

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <TransText 
                        en={"Digital Marketing Experience"} 
                        fr={"Expérience"} 
                        ar={"خبرة "} 
                    />
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <TransText
                        en="Tell us about your experience and motivation"
                        fr="Parlez-nous de votre expérience et motivation"
                        ar="أخبرنا عن خبرتك ودافعك"
                    />
                </p>
            </div>

            <div className="space-y-6">
                {/* Training Experience */}
                <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText 
                            en={isDigitalMarketing ? "Have you already taken training?" : "Have you already taken training?"} 
                            fr={isDigitalMarketing ? "Avez-vous déjà suivi une formation ?" : "Avez-vous déjà suivi une formation ?"} 
                            ar={isDigitalMarketing ? "هل سبق لك أن تلقيت تدريباً ؟" : "هل سبق لك أن تلقيت تدريباً ؟"} 
                        />
                        <Required />
                    </label>
                    <select
                        name="has_training"
                        value={data.has_training}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                            darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                        }`}
                        required
                    >
                        <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Select an option" fr="Sélectionnez une option" ar="اختر خياراً" />
                        </option>
                        <option value="yes" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Yes (please specify which one)" fr="Oui (préciser laquelle)" ar="نعم (يرجى التحديد)" />
                        </option>
                        <option value="no" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="No" fr="Non" ar="لا" />
                        </option>
                    </select>
                    {errors.has_training && <span className="mt-1 text-sm text-red-500">{errors.has_training}</span>}
                </div>

                {/* Previous Training Details (conditional) */}
                {data.has_training === 'yes' && (
                    <div>
                        <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                            <TransText en="Please specify which training" fr="Veuillez préciser quelle formation" ar="يرجى تحديد نوع التدريب" />
                            <Required />
                        </label>
                        <input
                            type="text"
                            name="previous_training_details"
                            value={data.previous_training_details}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                                darkMode
                                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder={
                                selectedLanguage === 'en'
                                    ? 'Describe your previous training'
                                    : selectedLanguage === 'fr'
                                      ? 'Décrivez votre formation précédente'
                                      : 'صف تدريبك السابق'
                            }
                            required
                        />
                        {errors.previous_training_details && <span className="mt-1 text-sm text-red-500">{errors.previous_training_details}</span>}
                    </div>
                )}

                {/* Motivation */}
                <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText 
                            en={isDigitalMarketing ? "Why do you want to join this training at Lionsgeek?" : "Why do you want to join this training at Lionsgeek?"} 
                            fr={isDigitalMarketing ? "Pourquoi souhaitez-vous rejoindre cette formation à Lionsgeek ?" : "Pourquoi souhaitez-vous rejoindre cette formation à Lionsgeek ?"} 
                            ar={isDigitalMarketing ? "لماذا تريد الانضمام إلى هذا التدريب في Lionsgeek؟" : "لماذا تريد الانضمام إلى هذا التدريب في Lionsgeek؟"} 
                        />
                        <Required />
                        <span
                            className={`ml-2 text-sm ${data.why_join_formation && data.why_join_formation.length < 100 ? 'text-red-500' : 'text-alpha'}`}
                        >
                            ({data.why_join_formation ? data.why_join_formation.length : 0}/100{' '}
                            <TransText en="characters minimum" fr="caractères minimum" ar="حرف كحد أدنى" />)
                        </span>
                    </label>
                    <textarea
                        name="why_join_formation"
                        value={data.why_join_formation}
                        onChange={handleChange}
                        onPaste={(e) => e.preventDefault()}
                        rows={5}
                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                            darkMode
                                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder={
                            selectedLanguage === 'en'
                                ? 'Please provide a detailed explanation of your motivation (minimum 100 characters)'
                                : selectedLanguage === 'fr'
                                  ? 'Veuillez fournir une explication détaillée de votre motivation (minimum 100 caractères)'
                                  : 'يرجى تقديم شرح مفصل لدافعك (100 حرف كحد أدنى)'
                        }
                        required
                        minLength={100}
                    />
                    {errors.why_join_formation && <span className="mt-1 text-sm text-red-500">{errors.why_join_formation}</span>}
                </div>

                {/* LionsGEEK Participation */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText
                            en="Have you already participated in a LionsGEEK activity?"
                            fr="Avez-vous déjà participé à une activité LionsGEEK ?"
                            ar="هل سبق لك أن شاركت في نشاط مع LionsGEEK؟"
                        />
                        <Required />
                    </label>
                    <select
                        name="participated_lionsgeek"
                        value={data.participated_lionsgeek}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                            darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                        }`}
                        required
                    >
                        <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Select an option" fr="Sélectionnez une option" ar="اختر خياراً" />
                        </option>
                        <option value="yes" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Yes" fr="Oui" ar="نعم" />
                        </option>
                        <option value="no" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="No" fr="Non" ar="لا" />
                        </option>
                    </select>
                    {errors.participated_lionsgeek && <span className="mt-1 text-sm text-red-500">{errors.participated_lionsgeek}</span>}
                </div>

                {/* LionsGEEK Activity (conditional) */}
                {data.participated_lionsgeek === 'yes' && (
                    <div>
                        <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                            <TransText en="Which one?" fr="Laquelle ?" ar="أي نشاط؟" />
                            <Required />
                        </label>
                        <select
                            name="lionsgeek_activity"
                            value={data.lionsgeek_activity}
                            onChange={handleChange}
                            className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                                darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                            }`}
                            required
                        >
                            <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Select activity" fr="Sélectionnez l'activité" ar="اختر النشاط" />
                            </option>
                            <option value="hackanews" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                HackaNews / هاكا نيوز
                            </option>
                            <option value="we_choose_art" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                We Choose Art / وي تشوز آرت
                            </option>
                            <option value="media_week" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                Media WEEK
                            </option>
                            <option value="jungle" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                Jungle
                            </option>
                            <option value="hackathon" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                Hackathon / هاكاثون
                            </option>
                            <option value="visit" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Visit" fr="Visite" ar="زيارة" />
                            </option>
                            <option value="other" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Other" fr="Autre" ar="أخرى" />
                            </option>
                        </select>
                        {errors.lionsgeek_activity && <span className="mt-1 text-sm text-red-500">{errors.lionsgeek_activity}</span>}
                    </div>
                )}

                {/* Other Activity (conditional) */}
                {data.lionsgeek_activity === 'other' && (
                    <div>
                        <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                            <TransText en="Please specify the activity" fr="Veuillez préciser l'activité" ar="يرجى تحديد النشاط" />
                            <Required />
                        </label>
                        <input
                            type="text"
                            name="other_activity"
                            value={data.other_activity}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                                darkMode
                                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder={selectedLanguage === 'en' ? 'Activity name' : selectedLanguage === 'fr' ? "Nom de l'activité" : 'اسم النشاط'}
                            required
                        />
                        {errors.other_activity && <span className="mt-1 text-sm text-red-500">{errors.other_activity}</span>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Step3ExperienceMotivation;
