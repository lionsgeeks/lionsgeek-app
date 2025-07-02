import React, { useEffect } from 'react';
import { FirstSection } from './components/firstSection';
import { SecondSection } from './components/secondSection';
import { ThirdSection } from './components/thirdSection';
import { FourthSection } from './components/fourthSection';
import { FifthSection } from './components/fifthSection';
import AppLayout from '@/layouts/app-layout';

// import { useAppContext } from '../../utils/contextProvider';

 const MediaPage = () => {
    //  const {fetchInfosession} = useAppContext()
    //     useEffect(() => {
    //         fetchInfosession()
    //     }, [])
    return (
        <AppLayout>
            <FirstSection/>
            <SecondSection/>
            <ThirdSection/>
            <FourthSection/>
            <FifthSection/>
        </AppLayout>
    );
};
export default MediaPage;
