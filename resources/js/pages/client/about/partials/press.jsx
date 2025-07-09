import { usePage } from '@inertiajs/react';

export const Press = () => {
    const selectedLanguage = "en";
    const darkMode = false;
    const { presses } = usePage().props;
    console.log("hhhhh:", presses);

    return (
        <section className={`${darkMode ? "bg-[#0f0f0f]" : ""} py-[4vh]`}>
            <div className="w-full text-center pb-10">
                <h1 className={`${darkMode ? "text-alpha" : ""} text-xl`}>Press</h1>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 justify-center md:justify-around px-4 md:px-16">
                {presses?.map((press, index) => (
                    <a
                        href={press.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        className="hover:no-underline"
                    >
                        <div className="bg-white rounded-lg relative hover:scale-105 transition-all duration-300 shadow-md h-full flex flex-col">
                            <img
                                src={`/storage/${press.cover}`}
                                className="h-[25vh] w-full object-cover rounded-t-lg"
                                alt={press.name[selectedLanguage]}
                            />
                            <div className="flex items-center gap-2 p-2 mt-2 flex-grow">
                                {press.logo && (
                                    <img
                                        src={`/storage/${press.logo}`}
                                        className="w-[25px] rounded-full aspect-square"
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
