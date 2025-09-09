import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { useAppContext } from '@/context/appContext';
import { usePage } from '@inertiajs/react';

export default function ReservationResult() {
  const { selectedLanguage, darkMode } = useAppContext();
  const { type = 'success', title, message, redirectUrl } = usePage().props;
  const [showContent, setShowContent] = useState(false);

  const t = (translations) => translations?.[selectedLanguage] || translations?.en || '';

  useEffect(() => {
    setTimeout(() => setShowContent(true), 200);
  }, []);

  const isRTL = selectedLanguage === 'ar';

  const SuccessIcon = () => {
    const isAlreadyReserved = t(title)?.toLowerCase().includes('already') || t(message)?.toLowerCase().includes('already');
    
    return (
      <div className={`w-16 h-16 mx-auto mb-8 rounded-full flex items-center justify-center transition-all duration-700 transform ${showContent ? 'scale-100' : 'scale-0'} ${darkMode ? 'bg-yellow-500' : 'bg-yellow-400'} shadow-lg`}>
        {isAlreadyReserved ? (
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    );
  };

  const ErrorIcon = () => (
    <div className={`w-16 h-16 mx-auto mb-8 rounded-full flex items-center justify-center transition-all duration-700 transform ${showContent ? 'scale-100' : 'scale-0'} ${darkMode ? 'bg-red-500' : 'bg-red-500'} shadow-lg`}>
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );

  return (
    <AppLayout>
      <div className={`min-h-screen px-4 pt-20 lg:px-16 lg:pt-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto">
          <div className={`transition-all duration-700 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Main Card */}
            <div className={`rounded-2xl p-8 lg:p-12 shadow-xl border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              
              {/* Icon */}
              {type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
              
              {/* Title */}
              <h1 className={`text-3xl lg:text-4xl font-bold mb-4 text-center transition-all duration-700 delay-200 transform ${
                showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } ${darkMode ? 'text-white' : 'text-gray-900'} ${isRTL ? 'font-arabic' : ''}`}>
                {t(title) || (type === 'success' ? 'Reservation Confirmed' : 'Reservation Issue')}
              </h1>

              {/* Message */}
              <div className={`text-center mb-8 transition-all duration-700 delay-300 transform ${
                showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <p className={`text-lg leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                } ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {t(message)}
                </p>
              </div>

              {/* Success specific content */}
              {type === 'success' && (
                <div className={`transition-all duration-700 delay-400 transform ${
                  showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className={`rounded-xl p-6 mb-8 border ${
                    darkMode ? 'bg-yellow-900/20 border-yellow-700/30' : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-yellow-500' : 'bg-yellow-400'
                      }`}>
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'} ${isRTL ? 'text-right' : ''}`}>
                          {selectedLanguage === 'ar' ? 'ما التالي؟' : selectedLanguage === 'fr' ? 'Que se passe-t-il ensuite ?' : 'What\'s Next?'}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-700'} ${isRTL ? 'text-right font-arabic' : ''}`}>
                          {selectedLanguage === 'ar' 
                            ? 'ستتلقى رسالة تأكيد عبر البريد الإلكتروني مع رمز QR الخاص بك. احتفظ بهذا البريد الإلكتروني للدخول إلى الجلسة.'
                            : selectedLanguage === 'fr' 
                            ? 'Vous recevrez un email de confirmation avec votre code QR. Gardez cet email pour accéder à la session.'
                            : 'You\'ll receive a confirmation email with your QR code. Keep this email to access the session.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className={`text-center transition-all duration-700 delay-500 transform ${
                showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <a
                  href={redirectUrl || '/'}
                  className={`inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    type === 'success'
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg hover:shadow-xl'
                      : darkMode
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'bg-gray-800 hover:bg-gray-900 text-white'
                  } ${isRTL ? 'font-arabic' : ''}`}
                >
                  {type === 'success' 
                    ? (selectedLanguage === 'ar' ? 'متابعة' : selectedLanguage === 'fr' ? 'Continuer' : 'Continue')
                    : (selectedLanguage === 'ar' ? 'رجوع' : selectedLanguage === 'fr' ? 'Retour' : 'Back')
                  }
                  <svg 
                    className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Success celebration text */}
              {type === 'success' && (
                <div className={`text-center mt-6 transition-all duration-700 delay-600 transform ${
                  showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <p className={`text-sm font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  } ${isRTL ? 'font-arabic' : ''}`}>
                    {selectedLanguage === 'ar' 
                      ? 'نتطلع إلى لقائك قريباً!' 
                      : selectedLanguage === 'fr' 
                      ? 'Nous avons hâte de vous rencontrer bientôt !' 
                      : 'We look forward to meeting you soon!'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}