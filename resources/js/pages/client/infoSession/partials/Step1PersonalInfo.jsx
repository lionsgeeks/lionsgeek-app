import { TransText } from '../../../../components/TransText';

const Required = () => <span className="ml-1 text-red-500">*</span>;

const Step1PersonalInfo = ({ data, handleChange, errors, darkMode, selectedLanguage, sessions = [] }) => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className={`mb-2 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <TransText en="Personal Information" fr="Informations Personnelles" ar="المعلومات الشخصية" />
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <TransText en="Tell us about yourself" fr="Parlez-nous de vous" ar="أخبرنا عن نفسك" />
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Full Name */}
                <div className="md:col-span-2">
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="Full Name" fr="Nom + Prénom" ar="الاسم الكامل" />
                        <Required />
                    </label>
                    <input
                        type="text"
                        name="full_name"
                        value={data.full_name}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                            darkMode
                                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder={
                            selectedLanguage === 'en'
                                ? 'Enter your full name'
                                : selectedLanguage === 'fr'
                                  ? 'Entrez votre nom complet'
                                  : 'أدخل اسمك الكامل'
                        }
                        required
                        autoComplete="off"
                    />
                    {errors.full_name && <span className="mt-1 text-sm text-red-500">{errors.full_name}</span>}
                </div>

                {/* Birthday */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="Date of Birth" fr="Date de naissance" ar="تاريخ الميلاد" />
                        <Required />
                    </label>
                    <input
                        type="date"
                        name="birthday"
                        value={data.birthday}
                        onChange={handleChange}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                        min={new Date(new Date().setFullYear(new Date().getFullYear() - 30)).toISOString().split('T')[0]}
                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                            darkMode
                                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                        required
                        autoComplete="off"
                    />
                    {errors.birthday && <span className="mt-1 text-sm text-red-500">{errors.birthday}</span>}
                    {data.birthday && (
                        <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <TransText
                                en={`Age: ${Math.floor((new Date() - new Date(data.birthday)) / (365.25 * 24 * 60 * 60 * 1000))} years`}
                                fr={`Âge: ${Math.floor((new Date() - new Date(data.birthday)) / (365.25 * 24 * 60 * 60 * 1000))} ans`}
                                ar={`العمر: ${Math.floor((new Date() - new Date(data.birthday)) / (365.25 * 24 * 60 * 60 * 1000))} سنة`}
                            />
                        </p>
                    )}
                </div>

                {/* City */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="City" fr="Ville" ar="المدينة" />
                        <Required />
                    </label>
                    <select
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                            darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                        }`}
                        required
                        autoComplete="off"
                    >
                        <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Select your city" fr="Sélectionnez votre ville" ar="اختر مدينتك" />
                        </option>
                        <option value="casablanca" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Casablanca" fr="Casablanca" ar="الدار البيضاء" />
                        </option>
                        <option value="rabat" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Rabat" fr="Rabat" ar="الرباط" />
                        </option>
                        <option value="marrakech" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Marrakech" fr="Marrakech" ar="مراكش" />
                        </option>
                        <option value="fes" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Fès" fr="Fès" ar="فاس" />
                        </option>
                        <option value="tanger" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Tanger" fr="Tanger" ar="طنجة" />
                        </option>
                        <option value="agadir" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Agadir" fr="Agadir" ar="أكادير" />
                        </option>
                        <option value="meknes" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Meknès" fr="Meknès" ar="مكناس" />
                        </option>
                        <option value="oujda" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Oujda" fr="Oujda" ar="وجدة" />
                        </option>
                        <option value="kenitra" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Kenitra" fr="Kenitra" ar="القنيطرة" />
                        </option>
                        <option value="tetouan" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Tétouan" fr="Tétouan" ar="تطوان" />
                        </option>
                        <option value="other" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Other" fr="Autre" ar="أخرى" />
                        </option>
                    </select>
                    {errors.city && <span className="mt-1 text-sm text-red-500">{errors.city}</span>}
                </div>

                {/* Region (only for Casablanca) */}
                {data.city === 'casablanca' && (
                    <div>
                        <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                            <TransText en="Region" fr="Région" ar="المنطقة" />
                            <Required />
                        </label>
                        <select
                            name="region"
                            value={data.region}
                            onChange={handleChange}
                            className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                                darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                            }`}
                            required
                            autoComplete="off"
                        >
                            <option value="" disabled className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Select your region" fr="Sélectionnez votre région" ar="اختر منطقتك" />
                            </option>
                            <option value="ain_chock" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Aïn Chock" fr="Aïn Chock" ar="عين الشق" />
                            </option>
                            <option value="ain_sebaa_hay_mohammadi" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Aïn Sebaâ - Hay Mohammadi" fr="Aïn Sebaâ - Hay Mohammadi" ar="عين السبع - الحي المحمدي" />
                            </option>
                            <option value="al_fida_mers_sultan" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Al Fida - Mers Sultan" fr="Al Fida - Mers Sultan" ar="الفداء - مرس السلطان" />
                            </option>
                            <option value="anfa" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Anfa" fr="Anfa" ar="أنفا" />
                            </option>
                            <option value="ben_msick" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Ben M'Sick" fr="Ben M'Sick" ar="بن مسيك" />
                            </option>
                            <option value="bernoussi" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Bernoussi" fr="Bernoussi" ar="برنوصي" />
                            </option>
                            <option value="bouskoura" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Bouskoura" fr="Bouskoura" ar="بوسكورة" />
                            </option>
                            <option value="hay_hassani" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Hay Hassani" fr="Hay Hassani" ar="الحي الحسني" />
                            </option>
                            <option value="mohammedia" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Mohammedia" fr="Mohammedia" ar="المحمدية" />
                            </option>
                            <option value="nouaceur" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Nouaceur" fr="Nouaceur" ar="النواصر" />
                            </option>
                            <option value="sidi_bernoussi" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Sidi Bernoussi" fr="Sidi Bernoussi" ar="سيدي برنوصي" />
                            </option>
                            <option value="sidi_othmane" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                                <TransText en="Sidi Othmane" fr="Sidi Othmane" ar="سيدي عثمان" />
                            </option>
                        </select>
                        {errors.region && <span className="mt-1 text-sm text-red-500">{errors.region}</span>}
                    </div>
                )}

                {/* Other City (conditional) */}
                {data.city === 'other' && (
                    <div>
                        <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                            <TransText en="Please specify your city" fr="Veuillez préciser votre ville" ar="يرجى تحديد مدينتك" />
                            <Required />
                        </label>
                        <input
                            type="text"
                            name="other_city"
                            value={data.other_city}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                                darkMode
                                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder={
                                selectedLanguage === 'en'
                                    ? 'Enter your city name'
                                    : selectedLanguage === 'fr'
                                      ? 'Entrez le nom de votre ville'
                                      : 'أدخل اسم مدينتك'
                            }
                            required
                            autoComplete="off"
                        />
                        {errors.other_city && <span className="mt-1 text-sm text-red-500">{errors.other_city}</span>}
                    </div>
                )}

                {/* Email */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="Email Address" fr="Adresse e-mail" ar="البريد الإلكتروني" />
                        <Required />
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                            errors.email
                                ? 'border-red-500 text-red-500'
                                : darkMode
                                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder={
                            selectedLanguage === 'en'
                                ? 'your.email@example.com'
                                : selectedLanguage === 'fr'
                                  ? 'votre.email@exemple.com'
                                  : 'بريدك@مثال.com'
                        }
                        required
                        autoComplete="off"
                    />
                    {errors.email && <span className="mt-1 text-sm text-red-500">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="Phone Number" fr="Numéro de téléphone" ar="رقم الهاتف" />
                        <Required />
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={(e) => {
                            // Only allow numbers, spaces, +, -, (, )
                            const value = e.target.value.replace(/[^0-9+\-\s()]/g, '');
                            handleChange({ target: { name: 'phone', value } });
                        }}
                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                            darkMode
                                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder={
                            selectedLanguage === 'en' ? '+212 6XX XXX XXX' : selectedLanguage === 'fr' ? '+212 6XX XXX XXX' : '+212 6XX XXX XXX'
                        }
                        required
                        autoComplete="off"
                    />
                    {errors.phone && <span className="mt-1 text-sm text-red-500">{errors.phone}</span>}
                </div>

                {/* Gender */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="Gender" fr="Genre" ar="الجنس" />
                    </label>
                    <select
                        name="gender"
                        value={data.gender}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-lg border px-4 py-3 transition-all duration-200 focus:border-alpha focus:ring-2 focus:ring-alpha ${
                            darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                        }`}
                        autoComplete="off"
                    >
                        <option value="" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Select gender" fr="Sélectionnez le genre" ar="اختر الجنس" />
                        </option>
                        <option value="male" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Male" fr="Homme" ar="ذكر" />
                        </option>
                        <option value="female" className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <TransText en="Female" fr="Femme" ar="أنثى" />
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Step1PersonalInfo;
