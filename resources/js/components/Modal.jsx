import { useEffect } from "react";
import { TransText } from "../components/TransText";
import { useAppContext } from "@/context/appContext";

const Modal = ({ validate, confirm, action, title, message, submessage }) => {
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
  return (
    <div className={`fixed z-50 inset-0 p-5 transition-opacity w-full h-screen flex justify-center items-center ${
      darkMode ? 'bg-gray-900/80' : 'bg-gray-600/90'
    }`}>
      <div className={`${darkMode ? "bg-gray-800 border border-gray-700 shadow-gray-900/50" : "bg-white border border-gray-200 shadow-gray-300/50"} max-w-sm sm:max-w-md w-full mx-4 rounded-xl shadow-2xl py-8 sm:py-16 px-6 sm:px-8 flex flex-col items-center text-center gap-3 sm:gap-4`}>
        {validate ? validIcon : notValidIcon}
        <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
          {title ? (
            title
          ) : validate ? (
            <TransText en="Success!" fr="Succès !" ar="نجاح" />
          ) : (
            <TransText en="Oops!" fr="Oops!" ar="عذرًا" />
          )}
        </h1>
        <p className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>
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
              ar="حدث خطأ ما"
              fr="Quelque chose a mal tourné"
              en="Something went wrong."
            />
          )}
        </p>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
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
              en="Please try filling out the form again, and ensure all fields are completed correctly. If the issue persists, feel free to contact us for assistance."
              fr="Veuillez essayer de remplir à nouveau le formulaire et assurez-vous que tous les champs sont correctement complétés. Si le problème persiste, n'hésitez pas à nous contacter pour obtenir de l'aide."
              ar="يرجى محاولة ملء النموذج مرة أخرى، والتأكد من اكتمال جميع الحقول بشكل صحيح. إذا استمر المشكلة، لا تتردد في الاتصال بنا للحصول على المساعدة"
            />
          )}
        </p>
        {action}
      </div>
    </div>
  );
};

export default Modal;
