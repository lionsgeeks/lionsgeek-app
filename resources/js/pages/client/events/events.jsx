import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import CardsSection from './components/cardsSection.jsx';
import FirstSectionEvent from './components/firstSection.jsx';

export default function EventPage() {
    const { events } = usePage().props;

    return (
        <>
            <AppLayout>
                <Head title="Events" />
                <FirstSectionEvent />
                <CardsSection events={events || []} />
            </AppLayout>
        </>
    );
}
