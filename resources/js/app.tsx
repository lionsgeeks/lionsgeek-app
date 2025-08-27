import '../css/app.css';

import React, { useState, useEffect } from 'react';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// import { initializeTheme } from './hooks/use-appearance';
import { AppContextProvider } from "./context/appContext";
import LoadingPage from './components/loadingPage.jsx';

const appName = 'LionsGeek';

// App wrapper component to handle loading state
function AppWrapper({ App, props }: { App: React.ComponentType<any>; props: any }) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Listen to Inertia navigation events
        const handleStart = () => setIsLoading(true);
        const handleFinish = () => setIsLoading(false);

        const removeStartListener = router.on('start', handleStart);
        const removeFinishListener = router.on('finish', handleFinish);
        const removeErrorListener = router.on('error', handleFinish);

        return () => {
            removeStartListener();
            removeFinishListener();
            removeErrorListener();
        };
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <AppContextProvider>
            <App {...props} />
        </AppContextProvider>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<AppWrapper App={App} props={props} />);
    },
    progress: {
        color: '#fee819',
    },
});

// This will set light / dark mode on load...
// initializeTheme();
