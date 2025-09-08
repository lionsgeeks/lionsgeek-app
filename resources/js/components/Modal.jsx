import { useAppContext } from '@/context/appContext';
import { useEffect } from 'react';
import { TransText } from '../components/TransText';

const Modal = ({ validate, confirm, action, title, message, submessage, errorDetails, selectedLanguage = 'en' }) => {
  const { darkMode } = useAppContext();
  const validIcon = (
    <svg
      className="w-10 h-10 text-green-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#22c55e"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
        clipRule="evenodd"
      />
    </svg>
  );
  const notValidIcon = (
    <svg
      className="w-10 h-10 text-red-500 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#ef4444"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
        clipRule="evenodd"
      />
    </svg>
  );
  useEffect(() => {
    if (confirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [confirm]);
  // RTL support for Arabic
  const isRTL = selectedLanguage === 'ar';

  return (
    <div className="fixed z-50 inset-0 p-3 sm:p-5 transition-shadow w-full h-screen bg-gray-600/90 flex justify-center items-center" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`${darkMode ? "bg-gray-900" : "bg-white"} w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg sm:rounded-xl py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-3 sm:gap-4 max-h-[90vh] overflow-y-auto`}>
        {validate ? validIcon : notValidIcon}
        
        <h1 className={`text-lg sm:text-xl lg:text-2xl font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
          {title ? (
            title
          ) : validate ? (
            <TransText en="Success!" fr="Succès !" ar="نجاح" />
          ) : (
            <TransText en="Registration Failed" fr="Échec de l'inscription" ar="فشل التسجيل" />
          )}
        </h1>
        
        <div className="space-y-2 sm:space-y-3 w-full">
          <p className={`text-sm sm:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {message ? (
              message
            ) : validate ? (
              <TransText
                ar="شكراً لتسجيلك في جلسة المعلومات"
                fr="Merci de vous être inscrit(e) à la session d'information !"
                en="Thank you for signing up for the info session!"
              />
            ) : (
              <TransText
                ar="حدث خطأ أثناء معالجة طلبك"
                fr="Une erreur s'est produite lors du traitement de votre demande"
                en="There was an error processing your application"
              />
            )}
          </p>
          
          {/* Show specific error details if available */}
          {!validate && errorDetails && (
            <div className="text-center">
              <p className={`text-sm sm:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {(() => {
                  // Handle string errors
                  if (typeof errorDetails === 'string') {
                    return errorDetails;
                  }
                  
                  // Handle object with errors property
                  if (errorDetails && errorDetails.errors) {
                    const errorMessages = Object.values(errorDetails.errors).flat();
                    return errorMessages.join(' ');
                  }
                  
                  // Handle object with message property
                  if (errorDetails && errorDetails.message) {
                    return errorDetails.message;
                  }
                  
                  // Handle any other object - try to extract meaningful text
                  if (typeof errorDetails === 'object') {
                    // Try to find any string values in the object
                    const findStringValue = (obj) => {
                      for (const value of Object.values(obj)) {
                        if (typeof value === 'string') {
                          return value;
                        }
                        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
                          return value[0];
                        }
                        if (typeof value === 'object' && value !== null) {
                          const nested = findStringValue(value);
                          if (nested) return nested;
                        }
                      }
                      return null;
                    };
                    
                    const stringValue = findStringValue(errorDetails);
                    if (stringValue) {
                      return stringValue;
                    }
                  }
                  
                  // Fallback - convert to string safely
                  return String(errorDetails);
                })()}
              </p>
            </div>
          )}
          
          <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {submessage ? (
              submessage
            ) : validate ? (
              <TransText
                en="Please check your email inbox (or spam folder) for a confirmation message with all the event details."
                ar="يرجى التحقق من صندوق الوارد الخاص بك (أو مجلد الرسائل المزعجة) للعثور على رسالة تأكيد تحتوي على جميع تفاصيل الحدث"
                fr="Veuillez vérifier votre boîte de réception (ou le dossier spam) pour un message de confirmation contenant tous les détails de l'événement."
              />
            ) : (
              <TransText
                en="Please try again or contact us for assistance."
                fr="Veuillez réessayer ou nous contacter pour obtenir de l'aide."
                ar="يرجى المحاولة مرة أخرى أو الاتصال بنا للحصول على المساعدة"
              />
            )}
          </p>
        </div>
        
        <div className="w-full flex justify-center mt-2 sm:mt-4">
          {action}
        </div>
      </div>
    </div>
  );
};

export default Modal;
