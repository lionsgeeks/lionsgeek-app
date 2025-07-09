import FirstSectionEventDetail from "./components/firstSection";
import AppLayout from "@/layouts/app-layout";

export default function EventDetailPage({ event }) {
    return (
        <AppLayout>
            <FirstSectionEventDetail event={event} />
        </AppLayout>
    );
}
