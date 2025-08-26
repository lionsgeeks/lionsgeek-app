import { useAppContext } from '@/context/appContext';
import { Link } from '@inertiajs/react';
import { BookOpen, Camera, CodeXml, GalleryHorizontalEnd, Languages, MessageCircleQuestion } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { TransText } from './TransText';

const Navbar = () => {
    const flag_width = '20';

    const fr = (
        <svg xmlns="http://www.w3.org/2000/svg" width={flag_width} id="flag-icons-fr" viewBox="0 0 640 480">
            <path fill="#fff" d="M0 0h640v480H0z" />
            <path fill="#000091" d="M0 0h213.3v480H0z" />
            <path fill="#e1000f" d="M426.7 0H640v480H426.7z" />
        </svg>
    );

    const en = (
        <svg xmlns="http://www.w3.org/2000/svg" width={flag_width} id="flag-icons-gb" viewBox="0 0 640 480">
            <path fill="#012169" d="M0 0h640v480H0z" />
            <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
            <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
            <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
            <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
        </svg>
    );

    const ar = (
        <svg xmlns="http://www.w3.org/2000/svg" width={flag_width} id="flag-icons-ma" viewBox="0 0 640 480">
            <path fill="#c1272d" d="M640 0H0v480h640z" />
            <path fill="none" stroke="#006233" strokeWidth="11.7" d="M320 179.4 284.4 289l93.2-67.6H262.4l93.2 67.6z" />
        </svg>
    );

    const LANGS = [
        { label: 'Francais', code: 'fr', flag: fr },
        { label: 'English', code: 'en', flag: en },
        { label: 'العربية', code: 'ar', flag: ar },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [formationMenu, setFormationMenu] = useState(false);
    const [aboutMenu, setAboutMenu] = useState(false);
    const [languageIsOpen, setLanguageIsOpen] = useState(false);

    const { selectedLanguage, setSelectedLanguage, darkMode, setDarkMode } = useAppContext();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleLanguageIsOpen = () => {
        setLanguageIsOpen(!languageIsOpen);
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const closeMore_Open = () => {
        setIsOpen(false);
        setFormationMenu(false);
        setAboutMenu(false);
    };

    const formationRef = useRef(null);
    const aboutRef = useRef(null);
    const selectRef = useRef(null);

    const handleClickOutside = (event) => {
        if (formationRef.current && !formationRef.current.contains(event.target)) {
            setFormationMenu(false);
        }
        if (aboutRef.current && !aboutRef.current.contains(event.target)) {
            setAboutMenu(false);
        }
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setLanguageIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // array for navigation Link
    const navigation = [
        {
            eng: 'Home',
            fr: 'Accueil',
            ar: 'الرئيسية',
            link: '/',
        },
        {
            select: true,
            ref: formationRef,
            eng: 'Training',
            fr: 'Formation',
            ar: 'التكوين',
            menu: formationMenu,
            options: [
                {
                    id: 'codingLink',
                    eng: 'Learn to code',
                    fr: 'Apprenez à coder',
                    ar: 'تعلم البرمجة',
                    link: 'coding',
                    icon: CodeXml,
                },
                {
                    id: 'mediaLink',
                    eng: 'Master media arts',
                    fr: 'Maîtriser les arts médiatiques',
                    ar: 'إتقان فنون الإعلام',
                    link: 'media',
                    icon: Camera,
                },
            ],
        },
        {
            eng: 'Coworking',
            fr: 'Coworking',
            ar: 'العمل المشترك',
            link: '/coworking',
        },
        {
            eng: 'Events',
            fr: 'Événements',
            ar: 'الفعاليات',
            link: '/events',
        },
        {
            eng: 'LionsGeek Pro',
            fr: 'LionsGeek Pro',
            ar: 'ليونزجيك برو ',
            link: '/pro',
        },
        {
            select: true,
            ref: aboutRef,
            eng: 'About',
            fr: 'À propos',
            ar: 'حول',
            menu: aboutMenu,
            options: [
                {
                    id: 'codingLink',
                    eng: 'Who We Are',
                    fr: 'Qui sommes-nousnous',
                    ar: 'من نحن',
                    link: 'about',
                    icon: MessageCircleQuestion,
                },
                {
                    id: 'mediaLink',
                    eng: 'blogs',
                    fr: 'blogs',
                    ar: 'مدونة',
                    link: 'blogs',
                    icon: BookOpen,
                },
                {
                    id: 'mediaLink',
                    eng: 'Gallery',
                    fr: 'Galerie',
                    ar: 'معرض',
                    link: 'gallery',
                    icon: GalleryHorizontalEnd,
                },
            ],
        },
    ];

    return (
        <div className="fixed top-0 right-0 left-0 z-50">
            <div className="dark-mode:bg-gray-900 antialiased">
                <div
                    className="dark-mode:text-gray-200 dark-mode:bg-gray-800 w-full bg-gray-50 text-gray-700"
                    style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff' }}
                >
                    <div
                        className={`flex flex-col px-4 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-16 ${
                            selectedLanguage == 'ar' ? 'lg:flex-row-reverse' : ''
                        }`}
                    >
                        <div className="flex flex-row items-center justify-between py-4">
                            {/* logo */}
                            <Link
                                href={'/'}
                                className="dark-mode:text-white focus:shadow-outline ml-2 rounded-lg text-lg font-semibold tracking-widest text-gray-900 uppercase focus:outline-none lg:ml-0"
                            >
                                <svg
                                    className={`${darkMode ? 'fill-white' : 'fill-[#0f0f0f]'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="206.551"
                                    height="35.121"
                                >
                                    <g data-name="Groupe 19">
                                        <g data-name="Groupe 4">
                                            <path
                                                data-name="Tracé 12"
                                                d="M29.876 0H7.053L0 21.706l18.464 13.415 18.468-13.415zM18.465 27.506L7.243 19.353l4.286-13.192H25.4l4.286 13.192z"
                                            />
                                            <path data-name="Tracé 13" d="M13.177 19.326l5.288 3.841 5.288-3.841z" />
                                        </g>
                                        <g data-name="Groupe 5">
                                            <path
                                                data-name="Tracé 1"
                                                d="M54 26.089V8.273h2.231v17.544l9.656-.272v1.9l-10.227.272A1.485 1.485 0 0154 26.089z"
                                            />
                                            <path data-name="Tracé 2" d="M75.024 10.177V25.55h4.271v1.9h-10.8v-1.9h4.3V10.181h-4.3v-1.9h10.8v1.9z" />
                                            <path
                                                data-name="Tracé 3"
                                                d="M89.575 8c5.6 0 8.922 4.271 8.922 9.847 0 5.6-3.318 9.874-8.922 9.874-5.658 0-8.976-4.271-8.976-9.874 0-5.576 3.319-9.847 8.976-9.847zm0 17.817c4.516 0 6.692-3.373 6.692-7.97 0-4.57-2.176-7.942-6.692-7.942-4.542 0-6.746 3.373-6.746 7.942.001 4.597 2.204 7.97 6.746 7.97z"
                                            />
                                            <path
                                                data-name="Tracé 4"
                                                d="M101.677 8.273h4.488l9.575 18.55h.626l-.354-1.6V8.277h2.2V27.45h-4.488l-9.548-18.551h-.625l.354 1.6V27.45h-2.231z"
                                            />
                                            <path
                                                data-name="Tracé 5"
                                                d="M130.02 27.721c-6.692 0-8.677-2.965-8.677-7.453h2.23c0 4.543 2.421 5.549 6.447 5.549 3.264 0 5.141-.788 5.141-3.1 0-2.91-3.373-3.509-6.419-4.406-3.781-1.142-6.528-2.176-6.528-5.576 0-2.938 2.067-4.734 6.8-4.734 5.658 0 7.589 3.455 7.589 6.583h-2.23c0-3.264-2.421-4.678-5.359-4.678-2.638 0-4.57.653-4.57 2.774 0 2.013 1.687 2.748 4.842 3.727 3.754 1.169 8.106 2.2 8.106 6.2-.003 2.857-1.716 5.114-7.372 5.114z"
                                            />
                                            <path
                                                data-name="Tracé 6"
                                                d="M148.539 8c4.814 0 7.48 2.938 8.051 7.127h-2.23c-.435-3.155-2.04-5.222-5.821-5.222-4.488 0-6.828 3.264-6.828 7.942 0 4.706 1.714 7.97 6.2 7.97 3.781 0 5.576-2.2 5.495-6.8h-6.554v-1.8h9.466c1.115 0 1.632.49 1.632 1.5v8.731h-2.231v-7.154l.353-2.448h-.625c-.027 6.691-2.611 9.874-7.562 9.874-5.631 0-8.405-4.216-8.405-9.874.001-5.63 3.51-9.846 9.059-9.846z"
                                            />
                                            <path
                                                data-name="Tracé 7"
                                                d="M161.076 8.273h11.886v1.9h-9.656v6.719h8.3v1.9h-8.3v6.746h9.656v1.9h-11.886z"
                                            />
                                            <path
                                                data-name="Tracé 8"
                                                d="M176.143 8.273h11.887v1.9h-9.656v6.719h8.3v1.9h-8.3v6.746h9.656v1.9h-11.887z"
                                            />
                                            <path
                                                data-name="Tracé 9"
                                                d="M194.855 17.85l11.7 9.6h-3.209l-9.9-8.16v8.16h-2.231V8.274h2.231v8.16l9.9-8.16h3.209z"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </Link>
                            {/* toggle */}
                            <div className="flex items-center gap-x-3">
                                <button
                                    onClick={toggleDarkMode}
                                    className="rounded-full p-2 transition-colors duration-200 focus:outline-none lg:hidden"
                                >
                                    {darkMode ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill={darkMode ? 'white' : 'currentColor'}
                                            className="bi bi-brightness-high text-yellow-400"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-moon"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                                        </svg>
                                    )}
                                </button>
                                <button className="focus:shadow-outline rounded-lg focus:outline-none lg:hidden" onClick={toggleNavbar}>
                                    <svg fill="currentColor" viewBox="0 0 20 20" className={`h-6 w-6 ${darkMode ? 'fill-white' : 'fill-black'}`}>
                                        {isOpen ? (
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        ) : (
                                            <path
                                                fillRule="evenodd"
                                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                                clipRule="evenodd"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <nav
                            className={`flex-col ${
                                isOpen ? 'flex' : 'hidden'
                            } bg--500 gap-6 pb-4 lg:flex lg:flex-row lg:items-center lg:justify-end lg:gap-2 lg:pb-0 xl:gap-6 ${
                                selectedLanguage == 'ar' ? 'items-end lg:flex-row-reverse' : ''
                            }`}
                        >
                            {navigation?.map((element, index) =>
                                // this is for select tag in navbar
                                element.select ? (
                                    <div
                                        key={index}
                                        ref={() => element.menu}
                                        className={`relative after:bottom-[-13px] after:left-0 after:w-0 after:border-b-[2px] after:transition-all after:duration-[0.35s] hover:after:w-[100%] lg:after:absolute ${
                                            element.options?.some((option) => '/' + option.link === location.pathname)
                                                ? 'font-medium after:w-[100%] after:border-alpha'
                                                : 'after:border-gray-300'
                                        }`}
                                    >
                                        <button
                                            onClick={() => {
                                                if (element.ref === formationRef) {
                                                    setFormationMenu(!formationMenu);
                                                    setAboutMenu(false);
                                                } else if (element.ref === aboutRef) {
                                                    setAboutMenu(!aboutMenu);
                                                    setFormationMenu(false);
                                                }
                                            }}
                                            className={`relative flex items-center px-2 py-2 text-sm ${selectedLanguage == 'ar' ? 'flex-row-reverse' : ''} `}
                                        >
                                            <span className={` ${darkMode ? 'text-white' : '#0f0f0f'}`}>
                                                <TransText en={element.eng} fr={element.fr} ar={element.ar} />
                                            </span>
                                            <svg
                                                fill={darkMode ? 'white' : '#0f0f0f'}
                                                viewBox="0 0 20 20"
                                                className={`inline h-4 w-4 transform transition-transform duration-200 ${
                                                    selectedLanguage === 'ar' ? 'mr-1' : 'ml-1'
                                                } ${element.menu ? 'rotate-180' : 'rotate-0'}`}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                        {element.menu && (
                                            <div className={`absolute z-30 ${selectedLanguage == 'ar' ? 'right-0' : 'left-0'} mt-2 origin-top-right`}>
                                                <div
                                                    className={`dark-mode:bg-gray-700 flex min-w-[40vw] flex-col gap-2 rounded-md py-2 shadow-lg lg:min-w-[15vw] ${
                                                        darkMode ? 'bg-[#0f0f0f]' : 'bg-white'
                                                    }`}
                                                >
                                                    {element.options?.map((option) => {
                                                        const Icon = option.icon;
                                                        return (
                                                            <Link
                                                                id={option.id}
                                                                href={option.link}
                                                                onClick={() => closeMore_Open()}
                                                                className={`group flex cursor-pointer hover:border-s-[2px] hover:border-alpha hover:bg-alpha/10 ${
                                                                    selectedLanguage == 'ar' ? 'flex-row-reverse' : ''
                                                                } items-center gap-3 px-3 py-1 transition duration-300`}
                                                            >
                                                                <Icon size={18} color={darkMode ? '#fff' : '#0f0f0f'} />
                                                                <p className={`text-[0.9rem] ${darkMode && 'text-white'} `}>
                                                                    <TransText en={option.eng} fr={option.fr} ar={option.ar} />
                                                                </p>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // this is for normal links
                                    <Link
                                        key={index}
                                        style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}
                                        href={element.link}
                                        onClick={() => setIsOpen(false)}
                                        className={`relative px-2 py-2 text-sm after:bottom-[-13px] after:left-0 after:w-0 after:border-b-[2px] after:transition-all after:duration-[0.35s] hover:after:w-[100%] lg:after:absolute ${
                                            location.pathname == element.link
                                                ? 'font-medium after:w-[100%] after:border-alpha'
                                                : 'after:border-gray-300'
                                        }`}
                                    >
                                        <TransText en={element.eng} fr={element.fr} ar={element.ar} />
                                    </Link>
                                ),
                            )}
                            {/* languages */}
                            <div ref={selectRef} className={`relative flex items-center`} onClick={toggleLanguageIsOpen}>
                                <div className={`flex cursor-pointer gap-1 ${selectedLanguage == 'ar' ? 'flex-row-reverse' : ''} items-center`}>
                                    <Languages size={15} color={darkMode ? 'white' : '#0f0f0f'} />

                                    <p className={`${darkMode && 'text-white'}`}>
                                        {LANGS.find((element) => element.code == selectedLanguage)?.code}
                                        <svg
                                            fill={darkMode ? 'white' : '#0f0f0f'}
                                            viewBox="0 0 20 20"
                                            className={`inline h-4 w-4 ${
                                                selectedLanguage === 'ar' ? 'mr-1' : 'ml-1'
                                            } transform transition-transform duration-75 ${languageIsOpen ? 'rotate-180' : 'rotate-0'}`}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </p>
                                </div>
                                {languageIsOpen && (
                                    <div className={`absolute top-10 ${selectedLanguage === 'ar' ? 'right-0' : ''} z-30 mt-2`}>
                                        <div
                                            className={`flex flex-col items-start gap-2 rounded-md py-2 shadow-lg ${
                                                darkMode ? 'bg-[#0f0f0f]' : 'bg-white'
                                            }`}
                                        >
                                            {LANGS.map(({ code, label, flag }, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setSelectedLanguage(code);
                                                    }}
                                                    className={`flex cursor-pointer justify-start gap-2 px-3 py-1 ${
                                                        darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                                                    } w-full transition duration-200`}
                                                >
                                                    {flag}
                                                    <p className={`cursor-pointer ${darkMode ? 'text-white' : ''}`}>{label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Link
                                href="contact"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                <Button className={'mt-0 px-4 text-[0.8rem] font-normal shadow-md'}>
                                    <TransText en="Contact Us" fr="Contactez-nous" ar="اتصل بنا" />
                                </Button>
                            </Link>
                            {/* toggle dark mode */}
                            <button
                                onClick={toggleDarkMode}
                                className="hidden rounded-full p-2 transition-colors duration-200 focus:outline-none lg:block"
                            >
                                {darkMode ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill={darkMode ? 'white' : 'currentColor'}
                                        className="bi bi-brightness-high text-yellow-400"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-moon"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                                    </svg>
                                )}
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
