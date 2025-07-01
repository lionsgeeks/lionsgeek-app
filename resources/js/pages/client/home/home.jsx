// import { Partners } from "../About/components/partners";
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
        <>
            <HeroSection />
            <WhoSection />
            <ServicesSection />
            {/* <Partners /> */}
            {/* {upcomingEvent && <EventSection />} */}
            <TrainingSection />
            <GallerySection />
        </>
    );
};
