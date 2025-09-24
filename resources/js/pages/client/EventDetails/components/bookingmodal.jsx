import NotificationModal from '@/components/NotificationModal';
import { useAppContext } from '@/context/appContext';
import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function BookingModal({ isOpen, onClose, event }) {
    const { selectedLanguage, darkMode } = useAppContext();

    const t = (translations) => translations[selectedLanguage] || translations.en;

    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('success');
    const [notificationMessage, setNotificationMessage] = useState('');

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        gender: '',
        event_id: event?.id || '',
    });

    useEffect(() => {
        if (event?.id) {
            setData('event_id', event.id);
        }
    }, [event?.id]);

    if (!isOpen) return null;

    const getPlaceholder = (field) => {
        const placeholders = {
            name: t({ en: 'Enter your name', fr: 'Entrez votre nom', ar: 'أدخل اسمك' }),
            email: t({ en: 'Enter your email', fr: 'Entrez votre email', ar: 'أدخل بريدك الإلكتروني' }),
            phone: t({ en: 'Enter phone number', fr: 'Entrez le numéro de téléphone', ar: 'أدخل رقم الهاتف' }),
        };
        return placeholders[field];
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('booking.store'), {
            onSuccess: (page) => {
                setNotificationMessage(page.props.flash?.success || t({ en: 'Booking successful!', fr: 'Réservation réussie !', ar: 'تم الحجز بنجاح!' }));
                setNotificationType('success');
                setShowNotification(true);
                reset();
            },
            onError: (formErrors) => {
                const message =
                    Object.values(formErrors)[0] ||
                    t({ en: 'Error submitting the booking.', fr: 'Erreur lors de la soumission.', ar: 'حدث خطأ أثناء الإرسال.' });
                setNotificationMessage(message);
                setNotificationType('error');
                setShowNotification(true);
            },
        });
    };

    const handleNotificationClose = () => {
        setShowNotification(false);
        if (notificationType === 'success') {
            onClose();
            window.location.href = '/events';
        }
    };

    const inputClassName = `border p-2 w-full rounded-lg ${darkMode ? 'bg-[#1a1a1a] text-white border-white/20' : 'border-black text-black'} ${selectedLanguage === 'ar' ? 'text-right' : 'text-left'}`;
    const labelClass = selectedLanguage === 'ar' ? 'self-end' : '';
    const bgModal = darkMode ? 'bg-[#1f1f1f] text-white' : 'bg-white text-black';

    return (
        <>
            <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-black opacity-10 transition-opacity"></div>
                <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
                    <form
                        onSubmit={submit}
                        className={`relative transform overflow-hidden rounded-lg ${bgModal} text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-0 right-0 p-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold">{t({ en: 'Book Event', fr: "Réserver l'événement", ar: 'احجز الحدث' })}</h3>
                            <p className="mb-4 text-sm text-gray-400">
                                {t({
                                    en: 'Enter your details to book this event. You will receive a confirmation email.',
                                    fr: 'Entrez vos coordonnées pour réserver cet événement. Vous recevrez un email de confirmation.',
                                    ar: 'أدخل تفاصيلك لحجز هذا الحدث. ستتلقى رسالة تأكيد عبر البريد الإلكتروني.',
                                })}
                            </p>

                            {['name', 'email', 'phone'].map((field) => (
                                <div key={field} className="mt-3 flex w-full flex-col items-start gap-y-2">
                                    <label htmlFor={field} className={labelClass}>
                                        {t({
                                            en: field[0].toUpperCase() + field.slice(1),
                                            fr: field === 'phone' ? 'Téléphone' : field === 'name' ? 'Nom' : 'Email',
                                            ar: field === 'phone' ? 'رقم الهاتف' : field === 'name' ? 'الاسم' : 'البريد الإلكتروني',
                                        })}
                                    </label>
                                    <input
                                        id={field}
                                        className={inputClassName}
                                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                        placeholder={getPlaceholder(field)}
                                        value={data[field]}
                                        onChange={(e) => setData(field, e.target.value)}
                                        dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                                    />
                                    {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
                                </div>
                            ))}

                            <div className="mt-3 flex w-full flex-col items-start gap-y-2">
                                <label htmlFor="gender" className={labelClass}>
                                    {t({ en: 'Gender', fr: 'Genre', ar: 'الجنس' })}
                                </label>
                                <select
                                    id="gender"
                                    className={inputClassName}
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                                >
                                    <option value="">{t({ en: 'Select gender', fr: 'Sélectionner le genre', ar: 'اختر الجنس' })}</option>
                                    <option value="male">{t({ en: 'Male', fr: 'Homme', ar: 'ذكر' })}</option>
                                    <option value="female">{t({ en: 'Female', fr: 'Femme', ar: 'أنثى' })}</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                            </div>

                            <div className="mt-5 flex justify-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`inline-flex w-full items-center justify-center rounded-lg bg-alpha px-5 py-2.5 text-center text-sm font-medium text-black transition-colors duration-200 ${processing ? 'cursor-not-allowed opacity-50' : ''}`}
                                >
                                    {processing
                                        ? t({ en: 'Booking...', fr: 'Réservation...', ar: 'جاري الحجز...' })
                                        : t({ en: 'Book Event', fr: 'Réserver', ar: 'احجز' })}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <NotificationModal
                isOpen={showNotification}
                onClose={handleNotificationClose}
                type={notificationType}
                title={
                    notificationType === 'success'
                        ? t({ en: 'Booking Confirmed!', fr: 'Réservation Confirmée !', ar: 'تم تأكيد الحجز!' })
                        : t({ en: 'Booking Error', fr: 'Erreur de réservation', ar: 'خطأ في الحجز' })
                }
                message={notificationMessage}
            />
        </>
    );
}
