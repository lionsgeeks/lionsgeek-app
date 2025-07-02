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

export default function Home() {


    return (
        <AppLayout>
            <HeroSection />
            <WhoSection />
            <ServicesSection />
            <Partners />
            {/* {upcomingEvent && <EventSection />} */}
            <TrainingSection />
            <GallerySection />
        </AppLayout>
    );
};
