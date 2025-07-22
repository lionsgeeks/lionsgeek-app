import React from 'react';
import { useAppContext } from "@/context/appContext";
export default function NotificationModal({ isOpen, onClose, type = 'success', title, message }) {
    if (!isOpen) return null;
    const { selectedLanguage, darkMode } = useAppContext();

    const t = (translations) => translations[selectedLanguage] || translations.en;
    const getIcon = () => {
        if (type === 'success') {
            return (
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
            );
        } else if (type === 'error') {
            return (
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            );
        }
    };

    const getColors = () => {
        if (type === 'success') {
            return {
                button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
                title: 'text-green-900',
                message: 'text-green-700'
            };
        } else if (type === 'error') {
            return {
                button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
                title: 'text-red-900',
                message: 'text-red-700'
            };
        }
    };

    const colors = getColors();

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-transparent transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                        {getIcon()}
                        <div className="mt-3 text-center sm:mt-5">
                            <h3 className={`text-lg leading-6 font-medium ${colors.title}`}>
                                {title || (type === 'success' ? 'Success!' : 'Error')}
                            </h3>
                            <div className="mt-2">
                                <p className={`text-sm ${colors.message}`}>
                                    {message[selectedLanguage]}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                        <button
                            type="button"
                            className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${colors.button}`}
                            onClick={onClose}
                        >
                            {type === 'success'
                                ? t({ en: 'Great!', fr: 'Super !', ar: '! رائع' })
                                : t({ en: 'OK', fr: 'OK', ar: 'حسنًا' })}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
