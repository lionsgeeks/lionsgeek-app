import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { useAppContext } from '@/context/appContext';
import { usePage } from '@inertiajs/react';

export default function ReservationResult() {
  const { selectedLanguage, darkMode } = useAppContext();
  const { type = 'success', title, message, redirectUrl } = usePage().props;

  const t = (translations) => translations?.[selectedLanguage] || translations?.en || '';

  return (
    <AppLayout>
      <div className={`min-h-screen px-4 pt-24 lg:px-16 lg:pt-28 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-xl p-8 shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title?.en || (type === 'success' ? 'Reservation Confirmed' : 'Reservation Issue')}</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t(message)}</p>

            <div className="mt-6">
              <a
                href={redirectUrl || '/'}
                className={`inline-flex items-center px-4 py-2 rounded-lg bg-alpha hover:opacity-90 transition ${darkMode ? 'text-white' : 'text-black'}`}
              >
                {type === 'success' ? (selectedLanguage === 'fr' ? 'Continuer' : selectedLanguage === 'ar' ? 'متابعة' : 'Continue') : (selectedLanguage === 'fr' ? 'Retour' : selectedLanguage === 'ar' ? 'رجوع' : 'Back')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}


