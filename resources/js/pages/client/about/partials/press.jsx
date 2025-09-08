import { useAppContext } from '@/context/appContext';
import { usePage } from '@inertiajs/react';

export const Press = () => {
    const { selectedLanguage, darkMode } = useAppContext();
    const { presses } = usePage().props;

    return (
        <section className={`${darkMode ? 'bg-[#0f0f0f]' : ''} py-[4vh]`}>
            <div className="w-full pb-10 text-center">
                <h1 className={`${darkMode ? 'text-alpha' : ''} text-xl`}>Press</h1>
            </div>

            <div className="grid grid-cols-2 justify-center gap-3 px-4 md:justify-around md:px-16 lg:grid-cols-5">
                {presses?.map((press, index) => (
                    <a href={press.link} target="_blank" rel="noopener noreferrer" key={index} className="hover:no-underline">
                        <div className="relative flex h-full flex-col rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-105">
                            <img
                                src={`/storage/images/press/${press.cover}`}
                                className="h-[25vh] w-full rounded-t-lg object-cover"
                                alt={press.name[selectedLanguage]}
                            />
                            <div className="mt-2 flex flex-grow items-center gap-2 p-2">
                                {press.logo && (
                                    <img
                                        src={`/storage/images/press/${press.logo}`}
                                        className="aspect-square w-[25px] rounded-full"
                                        alt={`Logo ${press.name[selectedLanguage]}`}
                                    />
                                )}
                                <p className="truncate text-gray-800">{press.name[selectedLanguage]}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};
