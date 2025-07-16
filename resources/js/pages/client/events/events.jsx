import CardsSection from './components/cardsSection.jsx';
import FirstSectionEvent from "./components/firstSection.jsx";
import AppLayout from "@/layouts/app-layout";
import { usePage } from '@inertiajs/react';

export default function EventPage() {
    const { events } = usePage().props;
    console.log(events);

    return (
        <>

            <AppLayout>

                <FirstSectionEvent />
                <CardsSection events={events || []} />
            </AppLayout>
        </>
    );
};
