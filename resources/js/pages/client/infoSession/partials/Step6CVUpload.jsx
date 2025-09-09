import { FileText, X } from 'lucide-react';
import { TransText } from '../../../../components/TransText';

const Step6CVUpload = ({ data, handleChange, errors, darkMode, selectedLanguage, setData }) => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className={`mb-2 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <TransText en="CV Upload" fr="Téléchargement CV" ar="رفع السيرة الذاتية" />
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <TransText en="Upload your CV (Required)" fr="Téléchargez votre CV (Obligatoire)" ar="ارفع سيرتك الذاتية (مطلوب)" />
                </p>
            </div>

            <div className="space-y-6">
                {/* CV Upload */}
                <div>
                    <label className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        <TransText en="Upload your CV" fr="Téléchargez votre CV" ar="ارفع سيرتك الذاتية" />
                        <span className="ml-1 text-red-500">*</span>
                    </label>
                    <div
                        className={`rounded-lg border-2 border-dashed p-6 text-center transition-all duration-200 hover:border-alpha ${
                            darkMode ? 'border-gray-600 bg-[#57646e]' : 'border-gray-300 bg-white'
                        }`}
                    >
                        <input type="file" name="cv_file" onChange={handleChange} accept=".pdf,.doc,.docx" className="hidden" id="cv-upload" />
                        <label htmlFor="cv-upload" className="cursor-pointer">
                            <FileText className={`mx-auto mb-4 h-12 w-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                <TransText en="Click to upload your CV" fr="Cliquez pour télécharger votre CV" ar="انقر لرفع سيرتك الذاتية" />
                            </p>
                            <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>PDF, DOC, DOCX (Max 5MB)</p>
                        </label>
                        {data.cv_file && (
                            <div className="mt-3 flex items-center justify-center">
                                <span className={`text-sm text-alpha`}>✓ {data.cv_file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => setData((prev) => ({ ...prev, cv_file: null }))}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                    {errors.cv_file && <span className="mt-1 text-sm text-red-500">{errors.cv_file}</span>}
                </div>

                {/* Information about next steps
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-alpha/10 border border-alpha/20' : 'bg-alpha/10 border border-alpha/20'}`}>
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-beta'}`}>
                        <TransText en="Next Steps" fr="Prochaines étapes" ar="الخطوات التالية" />
                    </h4>
                    <ul className={`space-y-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>
                            •{' '}
                            <TransText
                                en="Review your application before submitting"
                                fr="Vérifiez votre candidature avant de soumettre"
                                ar="راجع طلبك قبل الإرسال"
                            />
                        </li>
                        <li>
                            •{' '}
                            <TransText
                                en="You will receive a confirmation email"
                                fr="Vous recevrez un e-mail de confirmation"
                                ar="ستتلقى بريد إلكتروني للتأكيد"
                            />
                        </li>
                        <li>
                            •{' '}
                            <TransText
                                en="Our team will contact you within 48 hours"
                                fr="Notre équipe vous contactera dans les 48 heures"
                                ar="سيتواصل معك فريقنا خلال 48 ساعة"
                            />
                        </li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
};

export default Step6CVUpload;
