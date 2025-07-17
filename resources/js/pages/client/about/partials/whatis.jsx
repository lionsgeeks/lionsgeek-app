import AppLayout  from "@/layouts/app-layout";
import { useAppContext } from "@/context/appContext";

const WhatIsLionsGeek = () => {
    const {darkMode} = useAppContext();

    return (
        <AppLayout>
            <div className={`${darkMode && "bg-[#0f0f0f]"} flex flex-col gap-10 justify-center items-center px-2 py-[7rem]`}>
                <h1 className={`${darkMode && "text-white"} text-5xl font-bold text-center`}>About Our Organization</h1>
                <iframe
                    className="md:w-[95%] w-full h-[20rem] md:h-[28rem] lg:w-[90%] xl:w-[75%] lg:h-[36rem]"
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
