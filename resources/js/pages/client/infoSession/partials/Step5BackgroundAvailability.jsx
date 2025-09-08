import { TransText } from '../../../../components/TransText';

const Required = () => <span className="ml-1 text-red-500">*</span>;

const Step5BackgroundAvailability = ({ data, handleChange, errors, darkMode, selectedLanguage }) => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className={`mb-2 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <TransText en="Background & Availability" fr="Contexte et Disponibilité" ar="الخلفية والتوفر" />
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <TransText en="Tell us about your background" fr="Parlez-nous de votre contexte" ar="أخبرنا عن خلفيتك" />
                </p>
            </div>

            <div className="space-y-6">
                {/* How heard about formation */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText
                            en="How did you hear about this training?"
                            fr="Comment avez-vous entendu parler de cette formation ?"
                            ar="كيف سمعت عن هذا التدريب؟"
                        />
                        <Required />
                    </label>
                    <select
                        name="how_heard_about_formation"
                        value={data.how_heard_about_formation}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${
                            darkMode 
                                ? 'bg-[#57646e] border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                    >
                        <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText
                                en="Select how you heard about us"
                                fr="Sélectionnez comment vous avez entendu parler de nous"
                                ar="اختر كيف سمعت عنا"
                            />
                        </option>
                        <option value="social_media" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Social Media" fr="Réseaux sociaux" ar="وسائل التواصل الاجتماعي" />
                        </option>
                        <option value="friend" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Friend" fr="Ami" ar="صديق" />
                        </option>
                        <option value="former_student" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Former Lionsgeek student" fr="Ancien étudiant à Lionsgeek" ar="طالب سابق في Lionsgeek" />
                        </option>
                        <option value="google_search" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Google Search" fr="Recherche Google" ar="بحث جوجل" />
                        </option>
                        <option value="website" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Lionsgeek Website" fr="Site web Lionsgeek" ar="موقع Lionsgeek" />
                        </option>
                        <option value="event" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Event/Workshop" fr="Événement/Atelier" ar="حدث/ورشة عمل" />
                        </option>
                    </select>
                    {errors.how_heard_about_formation && <span className="mt-1 text-sm text-red-500">{errors.how_heard_about_formation}</span>}
                </div>

                {/* Current commitments */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText
                            en="Do you currently have any commitments that could prevent you from being 100% present?"
                            fr="Avez-vous actuellement un engagement qui pourrait vous empêcher d'être présent à 100 % ?"
                            ar="هل لديك حالياً أي التزامات قد تمنعك من الحضور بنسبة 100%؟"
                        />
                        <Required />
                    </label>
                    <select
                        name="current_commitments"
                        value={data.current_commitments}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${
                            darkMode 
                                ? 'bg-[#57646e] border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                    >
                        <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Select your availability" fr="Sélectionnez votre disponibilité" ar="اختر توفرك" />
                        </option>
                        <option value="no_commitments" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="No, I can be 100% present" fr="Non, je peux être présent à 100%" ar="لا، يمكنني الحضور بنسبة 100%" />
                        </option>
                        <option value="part_time_studies" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Yes, I have part-time studies" fr="Oui, j'ai des études à temps partiel" ar="نعم، لدي دراسات بدوام جزئي" />
                        </option>
                        <option value="part_time_job" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Yes, I have a part-time job" fr="Oui, j'ai un emploi à temps partiel" ar="نعم، لدي وظيفة بدوام جزئي" />
                        </option>
                        <option value="other_commitments" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Yes, I have other commitments" fr="Oui, j'ai d'autres engagements" ar="نعم، لدي التزامات أخرى" />
                        </option>
                    </select>
                    {errors.current_commitments && <span className="mt-1 text-sm text-red-500">{errors.current_commitments}</span>}
                </div>
            </div>
        </div>
    );
};

export default Step5BackgroundAvailability;
