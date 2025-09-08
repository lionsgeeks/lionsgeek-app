import { useAppContext } from '@/context/appContext';
import { useEffect } from 'react';
import { TransText } from '../components/TransText';

const Modal = ({ validate, confirm, action, title, message, submessage }) => {
    const { darkMode } = useAppContext();
    const validIcon = (
        <svg
            className="h-10 w-10 text-green-500"
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
            className="h-10 w-10 text-red-500 dark:text-white"
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
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [confirm]);
    return (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-gray-600/90 p-5 transition-shadow">
            <div className={`${darkMode ? 'bg-black' : 'bg-white'} flex flex-col items-center gap-3 rounded px-5 py-16 text-center lg:w-[60%]`}>
                {validate ? validIcon : notValidIcon}
                <h1 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-black/50'}`}>
                    {title ? title : validate ? <TransText en="Success!" fr="Succès !" ar="نجاح" /> : <TransText en="Oops!" fr="Oops!" ar="عذرًا" />}
                </h1>
                <p className={`${darkMode ? 'text-white' : 'text-black/50'}`}>
                    {message ? (
                        message
                    ) : validate ? (
                        <TransText
                            ar="شكراً لتسجيلك في جلسة المعلومات"
                            fr="Merci de vous être inscrit(e) à la session d'information !"
                            en="Thank you for signing up for the info session!"
                        />
                    ) : (
                        <TransText ar="حدث خطأ ما" fr="Quelque chose a mal tourné" en="Something went wrong." />
                    )}
                </p>
                <p className={`${darkMode ? 'text-white' : 'text-black/50'}`}>
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
