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
        <div className="space-y-6 text-center">
            <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-beta">Before you start</h1>
                <p className={`mt-2 text-sm sm:text-base opacity-90 ${darkMode ? 'text-white' : 'text-black'}`}>
                    You will play a short pattern recognition game. Read the notes below, then start.
                </p>
            </div>

            <div className={`text-left ${darkMode ? 'text-white' : 'text-black'}`}>
                <ul className="list-disc pl-5 text-sm sm:text-base space-y-1">
                    <li>The timer is hidden.</li>
                    <li>Finish all levels or just keep answering until the end.</li>
                    <li>Submission happens automatically at the end.</li>
                </ul>
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    className="rounded-md bg-beta px-5 py-2.5 font-semibold text-white hover:opacity-90"
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


