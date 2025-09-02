import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useAppContext } from '@/context/appContext';
import { PatternGame } from './partials/pattern-game';

const breadcrumbs = [
    { title: 'Homepage', href: '/' },
    { title: 'Game', href: '/game' },
];

export default function GamePage() {
    const { darkMode } = useAppContext();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Game" />
            <div className={`px-4 pt-24 lg:px-16 lg:pt-28 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
                <PatternGame />
            </div>
        </AppLayout>
    );
}


