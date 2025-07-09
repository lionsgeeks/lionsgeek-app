import staff from "../../../../../assets/images/ceremonie.jpeg";
import { TransText } from "../../../../components/TransText";

export const Stats = () => {
    const selectedLanguage = "en";
    const darkMode = false;
    const stats = [
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke={`${darkMode ? "#fff" : "currentColor"} `}
                    className="size-16"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                </svg>
            ),
            title: { en: "Students", ar: "الطلاب", fr: "Étudiants" },
            numbers: 90,
        },
        {
            icon: (
                <svg
                    className="size-16 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke={`${darkMode ? "#fff" : "currentColor"} `}
                        strokeLinecap="square"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                </svg>
            ),
            title: { en: "Coaches", fr: "Coachs", ar: "المدربون" },
            numbers: 10,
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke={`${darkMode ? "#fff" : "currentColor"} `}
                    className="size-16"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                </svg>
            ),
            title: {
                en: "Graduated Students",
                fr: "Étudiants diplômés",
                ar: "الطلاب المتخرجون",
            },
            numbers: 150,
        },
    ];
    return (
        <>
            <section className={` ${darkMode && "bg-[#0f0f0f]"} p-7 flex lg:flex-row flex-col justify-center items-center gap-10`}>
                <img loading="lazy" className="lg:w-[40%] rounded-lg" src={staff} alt="" />
                <div
                    dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                    className="flex  lg:w-1/2 gap-5 flex-col"
                >
                    <h1 className={`${darkMode && "text-alpha"} font-bold text-4xl`}>
                        <TransText en="Highlights" fr="Highlights" ar="الأرقام البارزة" />
                    </h1>
                    <p
                        dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                        className={`${selectedLanguage === "ar" ? "" : "lg:w-[80%]"} ${darkMode && "text-white"}  `}
                    >
                        <TransText
                            fr="Nos points forts mettent en valeur les étapes franchies par notre communauté dévouée et notre engagement envers un changement positif."
                            ar="تُبرز أبرز إنجازاتنا المعالم التي حققتها مجتمعنا الملتزم وجهودنا لتحقيق التغيير الإيجابي"
                            en="Our highlights showcase the milestones achieved by our dedicated
            community and our commitment to positive change."
                        />
                    </p>
                    <div
                        dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                        className="flex gap-5 lg:flex-row flex-col"
                    >
                        {stats.map((e, i) => (
                            <div
                                key={i}
                                className={`${darkMode ? "bg-beta b" : "border-black/50"} flex flex-col lg:items-start items-center gap-3 rounded-lg border  p-3 lg:w-[25%] lg:aspect-square text-2xl font-semibold`}
                            >
                                <span className="">{e.icon}</span>
                                <h1 className={`${darkMode && "text-white"} text-3xl`}>+{e.numbers}</h1>
                                <p className={`${darkMode && "text-white"} `}>{e.title[selectedLanguage]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
