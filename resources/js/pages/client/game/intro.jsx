import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useAppContext } from '@/context/appContext';

const breadcrumbs = [
    { title: 'Homepage', href: '/' },
    { title: 'Game', href: '/game/intro' },
];

export default function GameIntro() {
    const { darkMode } = useAppContext();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Game intro" />
            <div className={`px-4 pt-24 lg:px-16 lg:pt-28 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
                <div className={`mx-auto max-w-3xl rounded-2xl border p-8 ${darkMode ? 'bg-[#1e1e1e] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                    <h1 className="text-2xl font-bold text-beta">Before you start</h1>
                    <p className="mt-4">You will play a short pattern recognition game.</p>
                    <ul className="mt-3 list-disc pl-6">
                        <li>The game is timed. The timer is hidden.</li>
                        <li>Keep answering until you finish or time is up.</li>
                    </ul>
                    <div className="mt-8">
                        <button
                            type="button"
                            className="rounded-md bg-beta px-4 py-2 font-medium text-white hover:opacity-90"
                            onClick={() => router.visit('/game')}
                        >
                            Start the game
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


