import { TransText } from '../../../../components/TransText';

const Required = () => <span className="ml-1 text-red-500">*</span>;

const Step2EducationSituation = ({ data, handleChange, errors, darkMode, selectedLanguage }) => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className={`mb-2 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <TransText en="Education & Current Situation" fr="Formation et Situation Actuelle" ar="التعليم والوضع الحالي" />
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <TransText en="Tell us about your background" fr="Parlez-nous de votre parcours" ar="أخبرنا عن خلفيتك" />
                </p>
            </div>

            <div className="space-y-6">
                {/* Education Level */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="Current Education Level" fr="Votre niveau d'études actuel" ar="مستوى تعليمك الحالي" />
                        <Required />
                    </label>
                    <select
                        name="education_level"
                        value={data.education_level}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${
                            darkMode 
                                ? 'bg-[#57646e] border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                    >
                        <option value="" disabled className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Select your education level" fr="Sélectionnez votre niveau d'études" ar="اختر مستوى تعليمك" />
                        </option>
                        <option value="no_diploma" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="No diploma" fr="Je n'ai aucun diplôme" ar="ليس لدي أي شهادة" />
                        </option>
                        <option value="baccalaureate" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Baccalaureate" fr="Baccalauréat" ar="البكالوريا" />
                        </option>
                        <option value="technician" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Technician Diploma" fr="Diplôme Technicien (sans bac)" ar="شهادة التكوين المهني" />
                        </option>
                        <option value="deug_dut_dts_bts" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            DEUG / DUT / DTS / BTS
                        </option>
                        <option value="licence" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Bachelor / Licence" fr="Licence / Licence Pro / Bachelor" ar="الإجازة" />
                        </option>
                        <option value="master" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Master / Engineer" fr="Master / Ingénieur / Diplôme équivalent" ar="الماجستير / مهندس" />
                        </option>
                        <option value="doctorate" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Doctorate" fr="Doctorat" ar="الدكتوراه" />
                        </option>
                        <option value="other" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Other" fr="Autre" ar="أخرى" />
                        </option>
                    </select>
                    {errors.education_level && <span className="mt-1 text-sm text-red-500">{errors.education_level}</span>}
                </div>

                {/* Conditional Institution and Specialty fields - ONLY for "Other" */}
                {data.education_level === 'other' && (
                    <>
                        <div>
                            <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                <TransText
                                    en="In which institution did you obtain this diploma?"
                                    fr="Dans quelle institution avez-vous obtenu ce diplôme ?"
                                    ar="في أي مؤسسة حصلت على هذه الشهادة؟"
                                />
                                <Required />
                            </label>
                            <input
                                type="text"
                                name="diploma_institution"
                                value={data.diploma_institution}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                                    darkMode
                                        ? 'bg-[#57646e] border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                }`}
                                placeholder={
                                    selectedLanguage === 'en'
                                        ? 'Institution name'
                                        : selectedLanguage === 'fr'
                                          ? "Nom de l'institution"
                                          : 'اسم المؤسسة'
                                }
                                required
                            />
                            {errors.diploma_institution && <span className="mt-1 text-sm text-red-500">{errors.diploma_institution}</span>}
                        </div>

                        <div>
                            <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                <TransText en="What specialty?" fr="Quelle spécialité ?" ar="ما هو التخصص؟" />
                                <Required />
                            </label>
                            <input
                                type="text"
                                name="diploma_specialty"
                                value={data.diploma_specialty}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                                    darkMode
                                        ? 'bg-[#57646e] border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                }`}
                                placeholder={selectedLanguage === 'en' ? 'Your specialty' : selectedLanguage === 'fr' ? 'Votre spécialité' : 'تخصصك'}
                                required
                            />
                            {errors.diploma_specialty && <span className="mt-1 text-sm text-red-500">{errors.diploma_specialty}</span>}
                        </div>
                    </>
                )}

                {/* Current Situation */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="Current Situation" fr="Situation actuelle" ar="الوضع الحالي" />
                        <Required />
                    </label>
                    <select
                        name="current_situation"
                        value={data.current_situation}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${
                            darkMode 
                                ? 'bg-[#57646e] border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                    >
                        <option value="" disabled className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Select your current situation" fr="Sélectionnez votre situation actuelle" ar="اختر وضعك الحالي" />
                        </option>
                        <option value="job_seeking" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Looking for opportunities" fr="En recherche d'opportunité" ar="أبحث عن فرص" />
                        </option>
                        <option value="student" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Student" fr="Étudiant" ar="طالب" />
                        </option>
                        <option value="employee" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Employee" fr="Salarié" ar="موظف" />
                        </option>
                        <option value="freelancer" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Freelancer" fr="Freelancer" ar="عامل حر" />
                        </option>
                        <option value="apprenticeship" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="In apprenticeship" fr="En apprentissage" ar="في التدريب المهني" />
                        </option>
                        <option value="internship" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="In internship" fr="En stage en entreprise" ar="في تدريب بالشركة" />
                        </option>
                        <option value="entrepreneur" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Self-employed" fr="Auto-entrepreneur" ar="مقاول ذاتي" />
                        </option>
                        <option value="other" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Other" fr="Autre" ar="أخرى" />
                        </option>
                    </select>
                    {errors.current_situation && <span className="mt-1 text-sm text-red-500">{errors.current_situation}</span>}
                </div>

                {/* Conditional Other Status field */}
                {data.current_situation === 'other' && (
                    <div>
                        <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                            <TransText en="Please specify" fr="Veuillez préciser" ar="يرجى التحديد" />
                            <Required />
                        </label>
                        <input
                            type="text"
                            name="other_status"
                            value={data.other_status}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                                darkMode
                                    ? 'bg-[#57646e] border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-[#57646e] border-gray-300 text-white placeholder-gray-500'
                            }`}
                            placeholder={
                                selectedLanguage === 'en'
                                    ? 'Specify your situation'
                                    : selectedLanguage === 'fr'
                                      ? 'Précisez votre situation'
                                      : 'حدد وضعك'
                            }
                            required
                        />
                        {errors.other_status && <span className="mt-1 text-sm text-red-500">{errors.other_status}</span>}
                    </div>
                )}

                {/* Has Referring Organization - Step 1 */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText
                            en="Do you have a referring organization/association?"
                            fr="Avez-vous une organisation / association référente ?"
                            ar="هل لديك جمعية أو مؤسسة أوصت بك؟"
                        />
                        <Required />
                    </label>
                    <select
                        name="has_referring_organization"
                        value={data.has_referring_organization}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${
                            darkMode
                                ? 'bg-[#57646e] border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                    >
                        <option value="" disabled className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Select an option" fr="Sélectionnez une option" ar="اختر خياراً" />
                        </option>
                        <option value="yes" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="Yes" fr="Oui" ar="نعم" />
                        </option>
                        <option value="no" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                            <TransText en="No" fr="Non" ar="لا" />
                        </option>
                    </select>
                    {errors.has_referring_organization && <span className="mt-1 text-sm text-red-500">{errors.has_referring_organization}</span>}
                </div>

                {/* Organization Selection - Step 2 (conditional) */}
                {data.has_referring_organization === 'yes' && (
                    <div>
                        <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                            <TransText en="Which organization/association?" fr="Quelle organisation / association ?" ar="أي جمعية أو مؤسسة؟" />
                            <Required />
                        </label>
                        <select
                            name="referring_organization"
                            value={data.referring_organization}
                            onChange={handleChange}
                            className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${
                                darkMode
                                    ? 'bg-[#57646e] border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            required
                        >
                            <option value="" disabled className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                                <TransText en="Select organization" fr="Sélectionnez l'organisation" ar="اختر المنظمة" />
                            </option>
                            <option value="anapec" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                                الوكالة الوطنية لإنعاش التشغيل والكفاءات (أنابيك) - Anapec
                            </option>
                            <option value="heure_joyeuse" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                                Heure Joyeuse / جمعية ساعة الفرح
                            </option>
                            <option value="fondation_jadara" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                                Fondation Jadara / مؤسسة جدارة
                            </option>
                            <option value="plateforme_ain_sbaa" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                                Plateforme des Jeunes Ain Sbaa / منصة شباب عين السبع
                            </option>
                            <option value="plateforme_hay_mohammadi" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                                Plateforme des Jeunes Hay Mohammadi / منصة شباب الحي المحمدي
                            </option>
                            <option value="plateforme_roches_noires" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                                Plateforme des Jeunes Roches Noires / منصة شباب الصخور السوداء
                            </option>
                            <option value="autre_plateforme" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                                Autre Plateforme des Jeunes / منصة شباب أخرى
                            </option>
                            <option value="autre_association" className={darkMode ? 'bg-[#57646e]' : 'bg-white'}>
                                Autre Association / جمعية أخرى
                            </option>
                        </select>
                        {errors.referring_organization && <span className="mt-1 text-sm text-red-500">{errors.referring_organization}</span>}
                    </div>
                )}

                {/* Conditional Other Organization field */}
                {data.has_referring_organization === 'yes' && (data.referring_organization === 'autre_plateforme' || data.referring_organization === 'autre_association') && (
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                            <TransText en="Please specify the name of the association" fr="Merci de préciser le nom de l'association" ar="المرجو تحديد اسم الجمعية" />
                            <Required />
                        </label>
                        <input
                            type="text"
                            name="other_organization"
                            value={data.other_organization}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-alpha focus:border-alpha ${
                                darkMode
                                    ? 'bg-[#57646e] border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-[#57646e] border-gray-300 text-white placeholder-gray-500'
                            }`}
                            placeholder={selectedLanguage === 'en' ? 'Organization name' : selectedLanguage === 'fr' ? 'Nom de l\'organisation' : 'اسم المنظمة'}
                            required
                        />
                        {errors.other_organization && <span className="text-sm text-red-500 mt-1">{errors.other_organization}</span>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Step2EducationSituation;
