import React, { useState } from 'react';
import axios from "axios";

export default function BookingModal({ isOpen, onClose, event }) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const selectedLanguage = "en";
  const URL = null;

  if (!isOpen) return null;

  const getPlaceholder = (field) => {
    const placeholders = {
      name: {
        en: "Enter your name",
        fr: "Entrez votre nom",
        ar: "أدخل اسمك",
      },
      email: {
        en: "Enter your email",
        fr: "Entrez votre email",
        ar: "أدخل بريدك الإلكتروني",
      }
    };
    return placeholders[field][selectedLanguage] || placeholders[field].en;
  };

  const submit = async () => {
    if (!nameInput || !emailInput || !genderInput || !phoneInput) {
      const message = {
        en: "Please fill out all fields.",
        fr: "Veuillez remplir tous les champs.",
        ar: "يرجى ملء جميع الحقول."
      }[selectedLanguage] || "Please fill out all fields.";

      setSuccessMessage(message);
      return;
    }

    const formdata = new FormData();
    formdata.append("email", emailInput);
    formdata.append("name", nameInput);
    formdata.append("event_id", event.id);
    formdata.append("gender", genderInput);
    formdata.append("phone", phoneInput);
    setLoading(true);

    try {
      const response = await axios.post(URL + "booking/store", formdata);
      setSuccessMessage(response.data.message);
    } catch (error) {
      const errorMessage = {
        en: "Error submitting the booking.",
        fr: "Erreur lors de la soumission de la réservation.",
        ar: "خطأ في تقديم الحجز."
      }[selectedLanguage] || "Error submitting the booking.";

      setSuccessMessage(errorMessage);
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setSuccessMessage(null);
    setNameInput("");
    setEmailInput("");
    onClose();
  };

  const inputClassName = `border p-2 w-full border-black rounded-lg ${
    selectedLanguage === "ar" ? "text-right" : "text-left"
  }`;

  const containerClassName = `mb-6 text-gray-600 flex flex-col gap-x-4 items-start ${
    selectedLanguage === "ar" ? "lg:flex-col" : ""
  }`;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 transition-opacity"></div>
        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" onClick={(e) => e.stopPropagation()}>
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
              <h3 className="text-xl font-semibold text-gray-900">Book Event</h3>
              <p className="text-sm text-gray-400 mb-4">
                Enter your details to book this event. You will receive a confirmation email.
              </p>
              <div className={containerClassName}>
                <div className="flex flex-col items-start gap-y-2 w-full">
                  <label htmlFor="name" className={selectedLanguage === "ar" ? "self-end" : ""}>Name</label>
                  <input
                    id="name"
                    className={inputClassName}
                    type="text"
                    placeholder={getPlaceholder("name")}
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                  />
                </div>
                <div className="flex flex-col items-start gap-y-2 mt-3 w-full">
                  <label htmlFor="email" className={selectedLanguage === "ar" ? "self-end" : ""}>Email</label>
                  <input
                    id="email"
                    className={inputClassName}
                    type="email"
                    placeholder={getPlaceholder("email")}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                  />
                </div>
              </div>

              <div className="flex flex-col items-start gap-y-2 mt-3 w-full">
                <label htmlFor="gender" className={selectedLanguage === "ar" ? "self-end" : ""}>Gender</label>
                <select
                  id="gender"
                  className={inputClassName}
                  value={genderInput}
                  onChange={(e) => setGenderInput(e.target.value)}
                  dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                >
                  <option value="">{selectedLanguage === "ar" ? "اختر الجنس" : selectedLanguage === "fr" ? "Sélectionner le genre" : "Select gender"}</option>
                  <option value="male">{selectedLanguage === "ar" ? "ذكر" : selectedLanguage === "fr" ? "Homme" : "Male"}</option>
                  <option value="female">{selectedLanguage === "ar" ? "أنثى" : selectedLanguage === "fr" ? "Femme" : "Female"}</option>
                </select>
              </div>

              <div className="flex flex-col items-start gap-y-2 mt-3 w-full">
                <label htmlFor="phone" className={selectedLanguage === "ar" ? "self-end" : ""}>Phone Number</label>
                <input
                  id="phone"
                  className={inputClassName}
                  type="tel"
                  placeholder={
                    selectedLanguage === "ar"
                      ? "أدخل رقم الهاتف"
                      : selectedLanguage === "fr"
                      ? "Entrez le numéro de téléphone"
                      : "Enter phone number"
                  }
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                />
              </div>

              <div className="flex justify-center gap-3 mt-5">
                <button
                  onClick={submit}
                  disabled={loading}
                  className={`text-black bg-alpha w-full justify-center font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-colors duration-200 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? "Loading..." : "Yes, I confirm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
          <div className="md:w-full w-[91%] max-w-md p-6 rounded-lg bg-white text-center shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Booking Status</h2>
            <p className="text-gray-700">{successMessage}</p>
            <button
              onClick={closeSuccessModal}
              className="mt-4 px-4 py-2 bg-alpha text-black rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
