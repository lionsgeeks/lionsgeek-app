// import { FirstSectionEvent } from "./components/firstSection";
import CardsSection from './components/cardsSection.jsx';
import FirstSectionEvent from "./components/firstSection.jsx";
import AppLayout from "@/layouts/app-layout";

export default function EventPage() {

    const mockEvents = [
        {
            id: 1,
            cover: 'event1.jpg',
            name: { fr: 'Événement Un', ar: 'الحدث الأول', en: 'Event One' },
            location: { fr: 'Paris', ar: 'الرباط', en: 'Paris' },
            date: '2025-07-01',
        },
        {
            id: 2,
            cover: 'event2.jpg',
            name: { fr: 'Événement Deux', ar: 'الحدث الثاني', en: 'Event Two' },
            location: { fr: 'Lyon', ar: 'الدار البيضاء', en: 'Lyon' },
            date: '2025-07-15',
        },
        {
            id: 3,
            cover: 'event3.jpg',
            name: { fr: 'Événement Trois', ar: 'الحدث الثالث', en: 'Event Three' },
            location: { fr: 'Marseille', ar: 'مراكش', en: 'Marseille' },
            date: '2025-08-10',
        },
    ];
    return (
        <>

            <AppLayout>

                <FirstSectionEvent />
                <CardsSection events={mockEvents} />
            </AppLayout>
        </>
    );
};
