import { useAppContext } from '@/context/appContext';
import AppLayout from '@/layouts/app-layout';

const WhatIsLionsGeek = () => {
    const { darkMode } = useAppContext();

    return (
        <AppLayout>
            <div className={`${darkMode && 'bg-[#0f0f0f]'} flex flex-col items-center justify-center gap-10 px-2 py-[7rem]`}>
                <h1 className={`${darkMode && 'text-white'} text-center text-5xl font-bold`}>About Our Organization</h1>
                <iframe
                    className="h-[20rem] w-full md:h-[28rem] md:w-[95%] lg:h-[36rem] lg:w-[90%] xl:w-[75%]"
                    src="https://www.youtube.com/embed/LGoZc4j1dIk"
                    title="LionsGEEK"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </div>
        </AppLayout>
    );
};

export default WhatIsLionsGeek;
