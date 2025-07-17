import React, { useEffect } from 'react';
import { FirstSection } from './components/firstSection';
import { SecondSection } from './components/secondSection';
import { ThirdSection } from './components/thirdSection';
import { FourthSection } from './components/fourthSection';
import { FifthSection } from './components/fifthSection';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';


const CodingPage = () => {
    
    return (
        <AppLayout >
            <Head title='Coding' />
            <FirstSection />
            <SecondSection />
            <ThirdSection />
            <FourthSection />
            <FifthSection />
        </AppLayout>
    );
};
export default CodingPage;

