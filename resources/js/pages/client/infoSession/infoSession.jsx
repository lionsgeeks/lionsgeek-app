import { useState } from 'react';
// import { useAppContext } from "../../utils/contextProvider";
import Modal from '../../../components/Modal';
// import LoadingPage from "../Loading";
import AppLayout from '@/layouts/app-layout';
import { router, useForm, usePage } from '@inertiajs/react';
import { TransText } from '../../../components/TransText';

const InfoSession = () => {
    // const { selectedLanguage, URL, sessions, darkMode , fetchInfosession } = useAppContext();
    const { sessions } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        birthday: '',
        phone: '',
        city: '',
        prefecture: '',
        info_session_id: '',
        gender: '',
        motivation: '',
        source: '',
    });
    const selectedLanguage = 'en';
    const darkMode = false;
    // const sessions = [1, 2];
    const URL = 0;

    const [chosenSession, setChosenSession] = useState('');
    const [sending, setSending] = useState(false);
    const [validate, setValidate] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [refresh, setRefresh] = useState(false);
    // const navigate = useNavigate();
    const dateLanguage = {
        en: 'US',
        fr: 'FR',
        ar: 'AR',
    };

    // useEffect(() => {
    //     fetchInfosession()
    // }, [])

    const formFields = [
        {
            name: 'full_name',
            label: { en: 'Full Name', fr: 'Nom Complet', ar: 'الاسم الكامل' },
            type: 'text',
        },
        {
            name: 'email',
            label: { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
            type: 'email',
        },
        {
            name: 'birthday',
            label: { en: 'Birthday', fr: 'Date de Naissance', ar: 'تاريخ الميلاد' },
            type: 'date',
        },
        {
            name: 'phone',
            label: { en: 'Phone', fr: 'Téléphone', ar: 'رقم الهاتف' },
            type: 'tel',
        },
    ];

    const initialState = formFields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmailError(false);
        }
        setData({ ...data, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('admin/participants', data);
    };

    // useEffect(() => {
    //     if (error) {
    //         setValidate(false);
    //         setSending(false);
    //         setConfirmation(true);
    //     }

    //     return () => {
    //         setError('');
    //     };
    // }, [error, sessions]);

    const Required = () => {
        return <span className="text-lg font-bold text-red-500">*</span>;
    };

    function formatDate(dateString) {
        const date = new Date(dateString);

        // Get formatted date: Monday 20 novembre 2024
        const formattedDate = date.toLocaleDateString(`en-${dateLanguage['en']}`, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        // Get formatted time: 16:49
        const formattedTime = date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${formattedDate} ${formattedTime}`;
    }

    // prevent l user mn anah idir copy past hehehe  nihahahahaha
    const handlePaste = (event) => {
        const messages = {
            en: 'Pasting is disabled. Please type your input 🙂.',
            fr: 'Le collage est désactivé. Veuillez saisir votre texte 🙂.',
            ar: 'لصق النص غير مسموح. يرجى كتابة النص 🙂.',
        };
        event.preventDefault();
        alert(messages[selectedLanguage] || messages.en);
    };

    const today = chosenSession ? new Date(sessions?.find((s) => s.id == chosenSession)?.start_date) : new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
    // Format dates as YYYY-MM-DD
    const maxDateString = maxDate.toISOString().split('T')[0];
    const minDateString = minDate.toISOString().split('T')[0];

    const [formation, setFormation] = useState('');

    return (
        <AppLayout>
            <div
                className={`overflow-hidden px-4 pt-24 lg:px-16 lg:pt-28 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-white'}`}
                dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
            >
                {!sending ? (
                    <>
                        {sessions ? (
                            sessions[0] && sessions?.every((e) => e.isFull) == false ? (
                                <>
                                    <form
                                        onSubmit={handleSubmit}
                                        className={`mx-auto space-y-4 rounded-lg p-6 shadow-md ${darkMode ? 'bg-[#212529]' : 'bg-white'}`}
                                    >
                                        <div className={`flex flex-col space-y-2`}>
                                            <label htmlFor="sessions" className={` ${darkMode ? 'text-white' : 'text-gray-700'} `}>
                                                <TransText en="Choose a Session" fr="Choisir une session" ar="اختر جلسة" />
                                                : <Required />
                                            </label>

                                            <div className="flex flex-col gap-y-4 md:flex-row lg:items-center lg:gap-2">
                                                <select
                                                    className="w-full appearance-none rounded border border-gray-300 px-4 py-2"
                                                    name="formation"
                                                    required
                                                    onChange={(e) => {
                                                        setFormation(e.target.value);
                                                        setChosenSession('');
                                                    }}
                                                >
                                                    <option disabled selected value="">
                                                        <TransText en="Choose Formation" fr="Choisir la formation" ar="اختر التكوين" />
                                                    </option>
                                                    <option value="coding">
                                                        <TransText en="Coding" fr="Codage" ar="البرمجة" />
                                                    </option>
                                                    <option value="media">
                                                        <TransText en="Digital" fr="Média" ar="صانع محتوى" />
                                                    </option>
                                                </select>
                                                <label
                                                    htmlFor="info_session_id"
                                                    className={` ${darkMode ? 'text-white' : 'text-gray-700'} lg:hidden`}
                                                >
                                                    <TransText
                                                        en="Choose a Session Date"
                                                        fr="Choisissez une date de session"
                                                        ar="اختر تاريخ الجلسة"
                                                    />
                                                    : <Required />
                                                </label>
                                                <select
                                                    name="info_session_id"
                                                    id="info_session_id"
                                                    value={data.info_session_id}
                                                    onChange={handleChange}
                                                    className="w-full appearance-none rounded border border-gray-300 px-4 py-2"
                                                    required
                                                >
                                                    <option disabled selected value="">
                                                        <TransText en="Choose a Session" fr="Choisir une session" ar="اختر جلسة" />
                                                    </option>
                                                    {sessions
                                                        .filter(
                                                            (ses) =>
                                                                (ses.formation ==
                                                                    formation.charAt(0).toUpperCase() + formation.slice(1).toLowerCase()),
                                                        )
                                                        .map(
                                                            (opt, ind) =>
                                                                opt.isAvailable && (
                                                                    <option key={ind} className="text-lg" value={opt.id}>
                                                                        {formatDate(opt.start_date)}
                                                                    </option>
                                                                ),
                                                        )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1">
                                            {formFields.map((field) => (
                                                <div key={field.name} className="flex w-full flex-col space-y-2 sm:w-[49.7%]">
                                                    <label htmlFor={field.name} className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                                        <TransText {...field.label} /> : <Required />
                                                    </label>
                                                    <input
                                                        type={field.type}
                                                        id={field.name}
                                                        name={field.name}
                                                        min={minDateString}
                                                        max={maxDateString}
                                                        placeholder={field.label[selectedLanguage]}
                                                        value={data[field.name]}
                                                        onChange={handleChange}
                                                        className={`rounded-md border px-4 py-2 focus:ring-2 focus:ring-beta focus:outline-none ${
                                                            emailError && field.name === 'email'
                                                                ? 'border-red-500 text-red-500'
                                                                : 'border-gray-300 text-black'
                                                        }`}
                                                        required
                                                    />
                                                    {emailError && field.name === 'email' && (
                                                        <span className="text-sm text-red-500">The email is already exist</span>
                                                    )}
                                                </div>
                                            ))}

                                            <div className="flex w-full flex-col space-y-2 sm:w-[49.7%]">
                                                <label htmlFor="city" className={` ${darkMode ? 'text-white' : 'text-gray-700'} `}>
                                                    <TransText en="City" fr="Ville" ar="مدينة" />
                                                    : <Required />
                                                </label>
                                                <select
                                                    name="city"
                                                    id="city"
                                                    onChange={handleChange}
                                                    value={data.city}
                                                    className="w-full appearance-none rounded border border-gray-300 px-4 py-[11px]"
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        <TransText en="City" fr="Ville" ar="مدينة" />
                                                    </option>
                                                    <option value="casablanca">
                                                        <TransText en="Casablanca" fr="Casablanca" ar="الدار البيضاء" />
                                                    </option>
                                                    <option value="mohammedia">
                                                        <TransText en="Mohammedia" fr="Mohammedia" ar="المحمدية" />
                                                    </option>
                                                    <option value="other">
                                                        <TransText en="Other" fr="Autres" ar="اخر" />
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="flex w-full flex-col space-y-2 sm:w-[49.7%]">
                                                <label htmlFor="prefecture" className={` ${darkMode ? 'text-white' : 'text-gray-700'} `}>
                                                    <TransText en="Prefecture" fr="Préfecture" ar="العمالة" />
                                                    : <Required />
                                                </label>
                                                <select
                                                    name="prefecture"
                                                    value={data.prefecture}
                                                    id="prefecture"
                                                    onChange={handleChange}
                                                    className="w-full appearance-none rounded border border-gray-300 px-4 py-[11px]"
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        <TransText en="Prefecture" fr="Préfecture" ar="العمالة" />
                                                    </option>
                                                    <option value="none">
                                                        <TransText en="None" fr="Aucun" ar="لا شيء" />
                                                    </option>
                                                    {[
                                                        'Casablanca Anfa',
                                                        'Sidi Bernoussi',
                                                        'Ain Sbaa Hay Mohammedi',
                                                        'Al Fida Mers Sultan',
                                                        'Moulay Rachid',
                                                        'Ain Chock',
                                                        "Ben M'Sick Sidi Othmane",
                                                        'Hay Hassani',
                                                    ].map((el, ind) => (
                                                        <option key={ind} value={el.toLowerCase().replace(/ /g, '_')}>
                                                            {el}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="flex w-full flex-col space-y-2 sm:w-[49.7%]">
                                                <label htmlFor="gender" className={` ${darkMode ? 'text-white' : 'text-gray-700'} `}>
                                                    <TransText en="Gender" fr="Genre" ar="الجنس" />
                                                    <Required />
                                                </label>
                                                <select
                                                    name="gender"
                                                    id="gender"
                                                    onChange={handleChange}
                                                    className="w-full appearance-none rounded border border-gray-300 px-4 py-[11px]"
                                                    required
                                                >
                                                    <option value="" selected disabled>
                                                        <TransText en="Gender" fr="Genre" ar="الجنس" />
                                                    </option>
                                                    <option value="male">
                                                        <TransText en="Male" fr="Homme" ar="ذكر" />
                                                    </option>
                                                    <option value="female">
                                                        <TransText en="Female" fr="Female" ar="أنثى" />
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="flex w-full flex-col space-y-2 sm:w-[49.7%]">
                                                <label htmlFor="source" className={`${darkMode ? 'text-white' : 'text-black'} `}>
                                                    <TransText
                                                        en="Where Have you Heard of LionsGeek"
                                                        fr="Où avez-vous entendu parler de LionsGeek"
                                                        ar="أين سمعت عن LionsGeek"
                                                    />
                                                    : <Required />
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.source}
                                                    name="source"
                                                    id="source"
                                                    placeholder={selectedLanguage == 'en' ? 'Source' : selectedLanguage == 'fr' ? 'Source' : 'مصدر'}
                                                    onChange={handleChange}
                                                    className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-beta focus:outline-none"
                                                    required
                                                />
                                            </div>

                                            <div className="flex w-full flex-col space-y-2">
                                                <label htmlFor="motivation" className={`${darkMode ? 'text-white' : 'text-black'} `}>
                                                    <TransText en="Motivation" fr="Motivation" ar="الدافع" />
                                                    :
                                                    <Required />
                                                    <span className={`text-sm ${data.motivation.length < 150 ? 'text-red-600' : 'text-green-500'} `}>
                                                        {' '}
                                                        {data.motivation.length}/150
                                                    </span>
                                                </label>
                                                <textarea
                                                    name="motivation"
                                                    id="motivation"
                                                    // bach mankhalich l user idir copy past  l l motivation
                                                    onPaste={handlePaste}
                                                    className="rounded border border-gray-400 p-[6px]"
                                                    onChange={handleChange}
                                                    placeholder={
                                                        selectedLanguage == 'en' ? 'Motivation' : selectedLanguage == 'fr' ? 'Motivation' : 'دافع'
                                                    }
                                                    value={data.motivation}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className={`w-full rounded-md bg-alpha px-4 py-2 font-semibold ${
                                                    darkMode ? 'hover:bg-[#2d343a]' : 'hover:bg-[#212529]'
                                                } hover:text-alpha focus:outline-none`}
                                            >
                                                <TransText en="Submit" fr="Soumettre" ar="إرسال" />
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div
                                        className={`flex h-[16rem] w-full items-center justify-center text-center text-[30px] font-bold ${
                                            darkMode ? 'text-white' : 'text-black'
                                        }`}
                                    >
                                        <TransText fr="Aucune session disponible" ar="لا توجد دورات متاحة" en="No Sessions Available" />
                                    </div>
                                </>
                            )
                        ) : (
                            // <div className="h-[65vh] flex items-center justify-center flex-col gap-2">
                            //   <h1 className="text-white text-3xl text-center">
                            //     &#x28;⊙__⊙&#x29;
                            //   </h1>

                            //   <h1 className="text-white text-3xl font-semibold text-center">
                            //     <TransText
                            //       en="Oops!! You Should Not Be Seeing This Page Yet!"
                            //       fr="Oups!! Vous ne devriez pas encore voir cette page !"
                            //       ar="عذرًا!! يجب ألا ترى هذه الصفحة بعد!"
                            //     />
                            //   </h1>
                            //   <br />
                            //   <NavLink to={"/"}>
                            //     <button className="px-4 py-2 bg-alpha rounded font-bold border-2 border-alpha hover:bg-black hover:text-alpha">
                            //       <TransText
                            //         en="Return to the homepage"
                            //         fr="Retour à la page d'accueil"
                            //         ar="الرجوع إلى الصفحة الرئيسية"
                            //       />
                            //       .
                            //     </button>
                            //   </NavLink>
                            // </div>
                            <>
                                <div className="flex flex-col flex-wrap gap-x-3 gap-y-6 pt-[5vh] lg:flex-row">
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <>
                                            <div className="h-[8vh] w-full animate-pulse rounded-lg bg-skeleton1 lg:w-[48%]"></div>
                                        </>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <></>
                )}
                {!sending && confirmation && (
                    <Modal
                        validate={validate}
                        confirm={confirmation}
                        action={
                            <button
                                onClick={() => {
                                    setConfirmation(false);
                                    if (validate && refresh) {
                                        window.location.reload();
                                        // navigate(-1);
                                    }
                                }}
                                className="rounded bg-alpha px-5 py-2 font-medium"
                            >
                                Close
                            </button>
                        }
                    />
                )}
            </div>
        </AppLayout>
    );
};

export default InfoSession;
