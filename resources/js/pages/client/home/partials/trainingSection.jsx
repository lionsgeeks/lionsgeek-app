import { TransText } from '@/components/TransText';
import { useAppContext } from '@/context/appContext';
import { Link } from '@inertiajs/react';

const TrainingSection = () => {
    const { selectedLanguage, darkMode } = useAppContext();

    return (
        <div
            style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff' }}
            id="trainings"
            className="flex flex-col items-center justify-between px-7 py-12 md:px-16 md:py-24"
        >
            <div className="w-full pb-10 text-center">
                <h1 className="text-lg md:text-xl" style={{ color: darkMode ? '#fff' : '#0f0f0f' }}>
                    <TransText en="Trainings" fr="Formations" ar="برامج التدريب" />
                </h1>
                <h1 className="text-3xl font-bold md:text-5xl" style={{ color: darkMode ? '#fff' : '#0f0f0f' }}>
                    <TransText en="Level up your digital skills." fr="Développez vos compétences digitales" ar="ارتقِ بمهاراتك الرقمية" />
                </h1>
            </div>

            <div className="flex w-full flex-col gap-3">
                <Link
                    href={'/coding'}
                    className={`group/coding flex flex-col-reverse rounded-lg border-2 ${
                        selectedLanguage === 'ar' ? 'text-end md:flex-row-reverse' : 'md:flex-row'
                    }`}
                >
                    <div className="relative flex-1 overflow-hidden px-6">
                        <div className="flex flex-col gap-4 px-7 py-14 lg:px-12">
                            <h1 className="text-3xl font-bold md:text-5xl lg:text-balance" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                <TransText fr="Développeur Web Full Stack." en="Full Stack Web Developer." ar="مطور ويب متكامل" />
                            </h1>

                            <div className={`flex items-center gap-4 ${selectedLanguage === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                    style={{ stroke: darkMode ? '#fee819' : '#0f0f0f' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <p style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                    <TransText fr="Durée : 6 mois" en="Duration: 6 months" ar="المدة: 6 أشهر" />
                                </p>
                            </div>
                            <div className={`flex items-center gap-4 ${selectedLanguage === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                    style={{ stroke: darkMode ? '#fee819' : '#0f0f0f' }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                    />
                                </svg>
                                <p style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                    <TransText fr="Frais : Gratuit" en="Fee: Free" ar="الرسوم: مجانية" />
                                </p>
                            </div>
                            <div className={`flex items-center gap-4 ${selectedLanguage === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                    style={{ stroke: darkMode ? '#fee819' : '#0f0f0f' }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                    />
                                </svg>
                                <p style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                    <TransText fr="Engagement : 5 jours/semaine" en="Commitment: 5 days/week" ar="الالتزام:  5 أيام/ أسبوع" />
                                </p>
                            </div>
                        </div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`absolute h-[150%] ${darkMode ? 'fill-white/5' : 'fill-black/5'} -top-1/2 left-0 rotate-45 transition-all duration-700 group-hover/coding:top-0 group-hover/coding:left-2/4 group-hover/coding:scale-[62.5%] group-hover/coding:rotate-[200deg]`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <div className="h-[288px] overflow-hidden rounded-r-lg md:h-auto md:w-[62.5%]">
                        <div className="bg-image-coding size-full rounded-r-lg bg-cover bg-center transition-transform duration-700 group-hover/coding:scale-[1.125]"></div>
                    </div>
                </Link>

                <Link
                    href={'/media'}
                    className={`group/media flex flex-col-reverse rounded-lg border-2 ${
                        selectedLanguage === 'ar' ? 'text-end md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                    <div className="relative flex-1 overflow-hidden">
                        <div className="flex flex-col gap-4 px-7 py-14 lg:px-12">
                            <h1 className="text-3xl font-bold md:text-5xl lg:text-balance" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                <TransText en="Digital Content Creator" fr="Créateur de contenu digital" ar="منشئ المحتوى الرقمي" />
                            </h1>

                            <div className={`flex items-center gap-4 ${selectedLanguage === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                    style={{ stroke: darkMode ? '#fee819' : '#0f0f0f' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <p style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                    <TransText fr="Durée : 6 mois" en="Duration: 6 months" ar="المدة: 6 أشهر" />
                                </p>
                            </div>
                            <div className={`flex items-center gap-4 ${selectedLanguage === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                    style={{ stroke: darkMode ? '#fee819' : '#0f0f0f' }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                    />
                                </svg>
                                <p style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                    <TransText fr="Frais : Gratuit" en="Fee: Free" ar="الرسوم: مجانية" />
                                </p>
                            </div>
                            <div className={`flex items-center gap-4 ${selectedLanguage === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                    style={{ stroke: darkMode ? '#fee819' : '#0f0f0f' }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                    />
                                </svg>
                                <p style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                    <TransText fr="Engagement : 5 jours/semaine" en="Commitment: 5 days/week" ar="الالتزام: 5 أيام / أسبوع" />
                                </p>
                            </div>
                        </div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className={`absolute h-[150%] ${darkMode ? 'stroke-white/5' : 'stroke-black/5'} -top-1/2 right-0 -rotate-45 transition-all duration-700 group-hover/media:top-0 group-hover/media:right-1/2 group-hover/media:scale-75 group-hover/media:rotate-[382.5deg]`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                            />
                        </svg>
                    </div>

                    <div className="h-[288px] overflow-hidden rounded-l-lg md:h-auto md:w-[62.5%]">
                        <div className="bg-image-media size-full rounded-l-lg bg-cover bg-center transition-transform duration-700 group-hover/media:scale-[1.125]"></div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default TrainingSection;
