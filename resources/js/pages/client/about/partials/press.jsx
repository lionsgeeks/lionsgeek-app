
export const Press = () => {
    const selectedLanguage = "en";
    const darkMode = true;
    const IMAGEURL = '';
    const press= [];
    return (
        <section className={`${darkMode && "bg-[#0f0f0f]"} py-[4vh]`}>
            <div className="w-full text-center pb-10">
                {/* <h1 className={`${darkMode && "text-alpha"} text-xl`}>{t("main.about.section4.title.first")}</h1>
                <h1 className={`${darkMode && "text-alpha"} xl:text-5xl text-3xl font-bold`}>
                    {t("main.about.section4.title.second")}
                </h1> */}
            </div>

            {/* Press */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 justify-center md:justify-around px-4 md:px-16">
                {press?.map((el, index) => (
                    <a href={el.link} target="_blank"
                        key={index}
                    >
                        <div className="bg-white rounded-lg  relative hover:scale-105 transition-all duration-300 shadow-md">
                            <img src={IMAGEURL + "/press/" + el.cover} className="h-[25vh] w-full object-cover rounded-t-lg" alt="" />
                            <div className="flex items-center gap-2 p-2 mt-2">
                                <img src={IMAGEURL + "/press/" + el.logo} className="w-[25px] rounded-full aspect-square" alt="" />
                                <p className="truncate">{el.name[selectedLanguage]}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};
