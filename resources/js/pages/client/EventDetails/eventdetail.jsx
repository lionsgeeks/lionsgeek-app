import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import FirstSectionEventDetail from './components/firstSection';

export default function EventDetailPage({ event }) {
    return (
        <AppLayout>
            <Head title="Event Details" />
            <FirstSectionEventDetail event={event} />
        </AppLayout>
    );
}
