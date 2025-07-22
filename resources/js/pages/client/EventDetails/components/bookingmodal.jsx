import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationModal from "@/components/NotificationModal";
import { useAppContext } from "@/context/appContext";

export default function BookingModal({ isOpen, onClose, event }) {
  const { selectedLanguage, darkMode } = useAppContext();

  const t = (translations) => translations[selectedLanguage] || translations.en;

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    event_id: event?.id || ''
  });

  useEffect(() => {
    if (event?.id) {
      setFormData(prev => ({ ...prev, event_id: event.id }));
    }
  }, [event?.id]);

  if (!isOpen) return null;

  const getPlaceholder = (field) => {
    const placeholders = {
      name: t({ en: "Enter your name", fr: "Entrez votre nom", ar: "أدخل اسمك" }),
      email: t({ en: "Enter your email", fr: "Entrez votre email", ar: "أدخل بريدك الإلكتروني" }),
      phone: t({ en: "Enter phone number", fr: "Entrez le numéro de téléphone", ar: "أدخل رقم الهاتف" })
    };
    return placeholders[field];
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.gender || !formData.phone) {
      setNotificationMessage(t({
        en: "Please fill out all fields.",
        fr: "Veuillez remplir tous les champs.",
        ar: "يرجى ملء جميع الحقول."
      }));
      setNotificationType('error');
      setShowNotification(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(route('booking.store'), formData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
        }
      });

      setNotificationMessage(response.data.message);
      setNotificationType('success');
      setShowNotification(true);

      setFormData({ name: '', email: '', phone: '', gender: '', event_id: event?.id || '' });
    } catch (error) {
      const message = error.response?.data?.message || t({
        en: "Error submitting the booking.",
        fr: "Erreur lors de la soumission de la réservation.",
        ar: "حدث خطأ أثناء إرسال الحجز."
      });
      setNotificationMessage(message);
      setNotificationType('error');
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    if (notificationType === 'success') {
      onClose();
      window.location.href = '/events';
    }
  };

  const inputClassName = `border p-2 w-full rounded-lg ${darkMode ? "bg-[#1a1a1a] text-white border-white/20" : "border-black text-black"} ${selectedLanguage === "ar" ? "text-right" : "text-left"}`;
  const labelClass = selectedLanguage === "ar" ? "self-end" : "";
  const bgModal = darkMode ? "bg-[#1f1f1f] text-white" : "bg-white text-black";

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-black opacity-10 transition-opacity"></div>
        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <div
            className={`relative transform overflow-hidden rounded-lg ${bgModal} text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-0 top-0 p-2">
              <button
                onClick={onClose}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{t({ en: "Book Event", fr: "Réserver l'événement", ar: "احجز الحدث" })}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {t({
                  en: "Enter your details to book this event. You will receive a confirmation email.",
                  fr: "Entrez vos coordonnées pour réserver cet événement. Vous recevrez un email de confirmation.",
                  ar: "أدخل تفاصيلك لحجز هذا الحدث. ستتلقى رسالة تأكيد عبر البريد الإلكتروني."
                })}
              </p>

              {["name", "email", "phone"].map((field) => (
                <div key={field} className="flex flex-col items-start gap-y-2 mt-3 w-full">
                  <label htmlFor={field} className={labelClass}>
                    {t({ en: field[0].toUpperCase() + field.slice(1), fr: field === "phone" ? "Téléphone" : field === "name" ? "Nom" : "Email", ar: field === "phone" ? "رقم الهاتف" : field === "name" ? "الاسم" : "البريد الإلكتروني" })}
                  </label>
                  <input
                    id={field}
                    className={inputClassName}
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    placeholder={getPlaceholder(field)}
                    value={formData[field]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                    dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                  />
                </div>
              ))}

              <div className="flex flex-col items-start gap-y-2 mt-3 w-full">
                <label htmlFor="gender" className={labelClass}>{t({ en: "Gender", fr: "Genre", ar: "الجنس" })}</label>
                <select
                  id="gender"
                  className={inputClassName}
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                  dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                >
                  <option value="">{t({ en: "Select gender", fr: "Sélectionner le genre", ar: "اختر الجنس" })}</option>
                  <option value="male">{t({ en: "Male", fr: "Homme", ar: "ذكر" })}</option>
                  <option value="female">{t({ en: "Female", fr: "Femme", ar: "أنثى" })}</option>
                </select>
              </div>

              <div className="flex justify-center gap-3 mt-5">
                <button
                  onClick={submit}
                  disabled={loading}
                  className={`text-black bg-alpha w-full justify-center font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? t({ en: "Booking...", fr: "Réservation...", ar: "جاري الحجز..." }) : t({ en: "Book Event", fr: "Réserver", ar: "احجز" })}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationModal
        isOpen={showNotification}
        onClose={handleNotificationClose}
        type={notificationType}
        title={notificationType === 'success' ? t({ en: "Booking Confirmed!", fr: "Réservation Confirmée !", ar: "تم تأكيد الحجز!" }) : t({ en: "Booking Error", fr: "Erreur de réservation", ar: "خطأ في الحجز" })}
        message={notificationMessage}
      />
    </>
  );
}
