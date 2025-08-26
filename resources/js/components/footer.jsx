import Logo from "../../assets/images/lionsgeek_logo_2.png";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { TransText } from "./TransText";
import { Link, useForm } from "@inertiajs/react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useAppContext } from "@/context/appContext";

const Footer = () => {
    const { selectedLanguage, darkMode } = useAppContext();
    const { data, setData, post } = useForm({
        email: '',
    });

    const date = new Date();
    const currentYear = date.getFullYear();
    const [sending, setSending] = useState(false);
    useEffect(() => {
        if (sending) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [sending]);

    const sendEmail = (e) => {
        e.preventDefault();
        post(route('newsletter.subscribe'), {
            onSuccess: () => {
                setSending(true);
                setData('email', '');
            }
        });
    };
    return (
        <>
            <footer className={`lg:px-16 px-5 py-10  ${darkMode && "bg-[#0f0f0f]"}`}>
                <div
                    className={` pt-10 ${darkMode && "bg-[#0f0f0f]"
                        } pb-4 flex flex-col gap-10  rounded-lg lg:px-10 px-5 ${darkMode ? "bg-[#212529]" : "bg-light_gray"
                        } `}
                >
                    <div
                        className={`flex lg:flex-row flex-col gap-10 justify-between lg:px-4 ${selectedLanguage == "ar" ? "lg:flex-row-reverse" : ""
                            }`}
                    >
                        <div
                            className={`flex lg:flex-row flex-col justify-center lg:gap-10 gap-2 ${selectedLanguage == "ar" ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            <div
                                className={`${selectedLanguage == "ar" ? "flex justify-end" : ""
                                    }`}
                            >
                                <img
                                    loading="lazy"
                                    src={Logo}
                                    alt=""
                                    className={`lg:w-[7vw] lg:h-[7vw] w-[20vw] h-[20vw]  lg:mb-0 mb-5 ${darkMode && "invert"
                                        }`}
                                />
                            </div>
                            {/* cours */}
                            <div
                                className={`flex flex-col  gap-3 lg:ms-5 ${selectedLanguage == "ar" ? "text-end" : ""
                                    }`}
                            >
                                <h1
                                    className={`font-bold text-gray-600  text-[1.2rem] ${darkMode && "text-white"
                                        }`}
                                >
                                    <TransText
                                        en="Courses"
                                        fr="Cours"
                                        ar="دورات"
                                    />

                                </h1>
                                <div className="flex flex-col gap-1">
                                    <Link
                                        to={"/coding"}
                                        className={`cursor-pointer  text-gray-400 text-[0.9rem] ${selectedLanguage == "ar" ? "text-end" : ""
                                            }`}
                                    >
                                        <TransText
                                            en="Coding"
                                            fr="Codage"
                                            ar="البرمجة"
                                        />
                                    </Link>
                                    <Link
                                        to={"/media"}
                                        className={`cursor-pointer text-gray-400 text-[0.9rem] ${selectedLanguage == "ar" ? "text-end" : ""
                                            }`}
                                    >
                                        <TransText
                                            en="Media"
                                            fr="Média"
                                            ar="وسائط الإعلام"
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-col gap-3">
                                    <h1
                                        className={`font-bold text-gray-600 text-[1.2rem]  ${selectedLanguage == "ar" ? "text-end" : ""
                                            } ${darkMode && "text-white"}`}
                                    >
                                        <TransText
                                            en="Contact"
                                            fr="Contact"
                                            ar="اتصل بنا"
                                        />
                                    </h1>
                                    <div className="flex flex-col gap-1">
                                        <div>
                                            <p className='font-medium text-gray-400 text-[0.9rem]'>Address:</p>
                                            <p className='text-gray-400 text-[0.9rem] w-[20vw] '>4ème étage, Ain Sebaa Center, Route de Rabat, Casablanca</p>
                                        </div>
                                        <div>
                                            <p
                                                className={`font-medium text-gray-400  text-[0.9rem]  ${selectedLanguage == "ar" ? "text-end" : ""
                                                    }`}
                                            >
                                                <TransText
                                                    en="Email:"
                                                    fr="Email :"
                                                    ar=":البريد الإلكتروني"
                                                />
                                            </p>
                                            <p
                                                className={`text-gray-400 text-[0.9rem]  ${selectedLanguage == "ar" ? "text-end" : ""
                                                    }`}
                                            >
                                                <a href="mailto:contact@lionsgeek.ma">
                                                    contact@lionsgeek.ma
                                                </a>
                                            </p>
                                        </div>

                                        <div>
                                            <p
                                                className={`font-medium text-gray-400 text-[0.9rem]  ${selectedLanguage == "ar" ? "text-end" : ""
                                                    }`}
                                            >
                                                <TransText
                                                    en="Phone Number:"
                                                    fr="Numéro de téléphone :"
                                                    ar=":رقم الهاتف"
                                                />
                                            </p>
                                            <p
                                                className={`text-gray-400 text-[0.9rem]  ${selectedLanguage == "ar" ? "text-end" : ""
                                                    }`}
                                            >
                                                +212 522 662 660
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 lg:w-[40%] xl:w-[25%]">
                            <h1
                                className={`font-bold text-gray-600 text-[1.2rem] w-full ${darkMode && "text-white"
                                    }  ${selectedLanguage == "ar" ? "text-end" : ""}`}
                            >
                                <TransText
                                    en="STAY IN TOUCH"
                                    fr="RESTEZ CONNECTÉ"
                                    ar="ابق على اتصال"
                                />
                            </h1>
                            <form onSubmit={sendEmail}>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <input
                                        type="email"
                                        onChange={(e) => {
                                            setData('email', e.target.value);
                                        }}
                                        value={data.email}
                                        required
                                        className={`
                                    ${darkMode && "text-white/90"}
                                    ${selectedLanguage == "ar" ? "text-end" : ""
                                            } peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-alpha focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                                        placeholder=" "
                                    />

                                    <label
                                        className={`pt-1 pointer-events-none absolute ${selectedLanguage == "ar" ? "right-0" : "left-0"
                                            }  -top-1.5 transition-all after:content[' '] peer-placeholder-shown:text-sm  peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-alpha text-gray-500`}
                                    >
                                        <TransText
                                            en="Type your email"
                                            fr="Tapez votre email"
                                            ar="اكتب بريدك الالكتروني"
                                        />
                                    </label>
                                </div>
                                <Button
                                    className={"shadow-md font-normal w-full mt-5 text-[0.8rem]"}
                                >
                                    <TransText
                                        en="SIGN UP"
                                        fr="INSCRIRE"
                                        ar="اشترك"
                                    />
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-2 pt-4 border-t-[3px] border-gray-500  border-opacity-50">
                        <div className="flex gap-3">
                            <a target="blank" href="https://www.facebook.com/LionsGeek">
                                <Facebook size={20} color="#99a1af" />
                            </a>
                            <a target="blank" href="https://www.instagram.com/lions_geek/">
                                <Instagram size={20} color="#99a1af" />
                            </a>
                            <a target="blank" href="https://x.com/LionsGeek">
                                <Twitter size={20} color="#99a1af" />
                            </a>
                            <a
                                target="blank"
                                href="https://www.linkedin.com/company/lionsgeek/"
                            >
                                <Linkedin size={20} color="#99a1af" />
                            </a>
                            <a
                                target="blank"
                                href="https://www.youtube.com/channel/UCmd_wMUuFYbZ_jJgFxErDyA"
                            >
                                <Youtube size={20} color="#99a1af" />
                            </a>
                            <a target="blank" href="https://www.tiktok.com/@lions_geek">

                                <svg fill="#99a1af" width="25px" height="25px" viewBox="0 0 24 24" id="tiktok" xmlns="http://www.w3.org/2000/svg"><path id="primary" d="M21,7V9a1,1,0,0,1-1,1,8,8,0,0,1-4-1.08V15.5A6.5,6.5,0,1,1,6.53,9.72a1,1,0,0,1,1.47.9v2.52a.92.92,0,0,1-.28.62,2.49,2.49,0,0,0,2,4.23A2.61,2.61,0,0,0,12,15.35V3a1,1,0,0,1,1-1h2.11a1,1,0,0,1,1,.83A4,4,0,0,0,20,6,1,1,0,0,1,21,7Z"></path>
                                </svg>

                            </a>
                            {/*
                            <a target="blank" href="https://discord.com/channels/1219261183803129929/1219261184314839133">
                <FaDiscord className="text-[1.4rem] fill-gray-400 hover:fill-black transition duration-200" />
              </a>
                        */}
                        </div>
                        <p className="text-gray-400 text-[0.9rem] text-center">
                            &copy; Copyright {currentYear} LionsGeek. All Rights Reserved.
                        </p>
                        {/* policy*/}
                        <div>
                            <Link href="/policy" className="text-gray-400 hover:underline">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
            {sending && (
                <div className="fixed z-[1000] overflow-hidden inset-0 flex justify-center items-center bg-black/50  w-full h-full ">
                    <div
                        class={`z-[1000] max-w-xl  w-full mx-auto rounded-xl overflow-hidden ${darkMode ? "bg-[#0f0f0f]" : "bg-white"
                            }`}
                    >
                        <div class="max-w-md mx-auto pt-12 pb-2 px-5 text-center">
                            <div class="inline-flex items-center justify-center rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="#22c55e"
                                    className="size-9"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font- text-gray-500">Success!</h2>
                            <h4
                                class={`text-xl  font-semibold mb-5 ${darkMode ? " text-gray-100" : " text-gray-500"
                                    }`}
                            >
                                <TransText
                                    ar="شكراً لاشتراكك في النشرة الإخبارية"
                                    fr="Merci de vous être inscrit(e) à la newsletter !"
                                    en="Thank you for signing up for the newsletter!"
                                />
                            </h4>
                            <p
                                class={` font- ${darkMode ? " text-gray-300" : " text-gray-500"
                                    }`}
                            >
                                <TransText
                                    ar="ستتلقى رسالة بريد إلكتروني قريباً"
                                    fr="Vous recevrez un e-mail bientôt."
                                    en="You will receive an email soon."
                                />
                            </p>
                        </div>
                        <div
                            class={`pb-6 px-6 text-right flex justify-center items-center  -mb-2 ${darkMode ? "bg-[#0f0f0f]" : "bg-white"
                                }`}
                        >
                            <button
                                onClick={() => {
                                    setSending(false);
                                }}
                                class="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center leading-6 text-black bg-alpha hover:bg-alpha/70 rounded-lg transition duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default Footer;
