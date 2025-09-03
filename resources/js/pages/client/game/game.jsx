import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useAppContext } from '@/context/appContext';
import { PatternGame } from './partials/pattern-game';

const breadcrumbs = [
    { title: 'Homepage', href: '/' },
    { title: 'Game', href: '/game' },
];

export default function GamePage({data}) {
    const { darkMode } = useAppContext();
    return (
       
            <div className={`px-4 pt-24 lg:px-16 lg:pt-28 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
                <PatternGame data={data} />
            </div>
       
    );
}


