import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// import { initializeTheme } from './hooks/use-appearance';
import { AppContextProvider } from "./context/appContext";

const appName = 'LionsGeek';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <AppContextProvider>
                <App {...props} />
            </AppContextProvider>
        );
    },
    progress: {
        color: '#fee819',
    },
});

// This will set light / dark mode on load...
// initializeTheme();
