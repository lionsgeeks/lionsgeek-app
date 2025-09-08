import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { FifthSection } from './components/fifthSection';
import { FirstSection } from './components/firstSection';
import { FourthSection } from './components/fourthSection';
import { SecondSection } from './components/secondSection';
import { ThirdSection } from './components/thirdSection';

const CodingPage = () => {
    return (
        <AppLayout>
            <Head title="Coding" />
            <FirstSection />
            <SecondSection />
            <ThirdSection />
            <FourthSection />
            <FifthSection />
        </AppLayout>
    );
};
export default CodingPage;
