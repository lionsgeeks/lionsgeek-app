import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useAppContext } from '@/context/appContext';

const breadcrumbs = [
    { title: 'Homepage', href: '/' },
    { title: 'Game', href: '/game/intro' },
];

export default function GameIntro({ setCurrentStep }) {
    const { darkMode } = useAppContext();
    return (
        <div className="space-y-8 text-center">
            <div className="space-y-4">
                <h1 className={`text-3xl sm:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Before you start
                </h1>
                <p className={`text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    You will play a short pattern recognition game. Read the notes below, then start.
                </p>
            </div>

            <div className={`p-6 rounded-xl border-2 ${
                darkMode 
                    ? 'bg-gray-800/70 border-gray-600 text-gray-200 shadow-lg shadow-gray-900/20' 
                    : 'bg-blue-50 border-blue-300 text-gray-700 shadow-lg shadow-blue-100/50'
            }`}>
                <div className={`mb-3 font-semibold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    Game Instructions:
                </div>
                <ul className="space-y-3 text-sm sm:text-base">
                    <li className="flex items-start space-x-3">
                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${darkMode ? 'bg-alpha' : 'bg-blue-500'}`}></span>
                        <span>The timer is hidden during the game</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${darkMode ? 'bg-alpha' : 'bg-blue-500'}`}></span>
                        <span>Complete all levels or answer as many as you can</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${darkMode ? 'bg-alpha' : 'bg-blue-500'}`}></span>
                        <span>Your application will be submitted automatically at the end</span>
                    </li>
                </ul>
            </div>

            <div className="flex justify-center pt-2">
                <button
                    type="button"
                    className={`rounded-xl bg-alpha px-8 py-4 text-lg font-bold text-beta transition-all duration-200 shadow-lg hover:bg-alpha/90 hover:shadow-xl transform hover:scale-105 ${
                        darkMode ? 'shadow-alpha/20' : 'shadow-alpha/30'
                    }`}
                    onClick={() => {
                        if (typeof setCurrentStep === 'function') {
                            setCurrentStep(8);
                        } else {
                            router.visit('/game');
                        }
                    }}
                >
                    Start the game
                </button>
            </div>
        </div>
    );
}


