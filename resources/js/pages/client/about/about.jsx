import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { FirstSectionAbout } from './partials/firstSection';
import { Partners } from './partials/partners';
import { Pillers } from './partials/pillers';
import { Press } from './partials/press';
import { Stats } from './partials/stats';

export const AboutPage = () => {
    return (
        <AppLayout>
            <Head title="About" />
            <FirstSectionAbout />
            <Pillers />
            <Stats />
            <Press />
            <Partners />
        </AppLayout>
    );
};

export default AboutPage;
