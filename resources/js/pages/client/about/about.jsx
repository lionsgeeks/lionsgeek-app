import {FirstSectionAbout } from './partials/firstSection';
import { Partners } from './partials/partners';
import { Press } from './partials/press';
import { Stats } from './partials/stats';
import { Pillers } from './partials/pillers';
import AppLayout from "@/layouts/app-layout";

export const AboutPage = () => {
    return (
        <AppLayout>
            <FirstSectionAbout/>
            <Pillers/>
            <Stats/>
            <Press/>
            <Partners/>
        </AppLayout>
    );
}


export default AboutPage;
