import { Partners } from "../about/partials/partners";
import AppLayout from "@/layouts/app-layout";

import {
    EventSection,
    GallerySection,
    HeroSection,
    ServicesSection,
    TrainingSection,
    WhoSection,
} from "./partials";
import { Head } from "@inertiajs/react";


const breadcrumbs = [
    {
        title: 'Homepage',
        href: '/',
    },
];

export default function Home() {
    const upcomingEvent = false;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homepage" />
            <HeroSection />
            <WhoSection />
            <ServicesSection />
            <Partners />
            {upcomingEvent && <EventSection />}
            <TrainingSection />
            <GallerySection />
        </AppLayout>
    );
};
