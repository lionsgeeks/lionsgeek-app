import { useState } from 'react';
import Modal from '../../../components/Modal';
import { useAppContext } from '@/context/appContext';
import AppLayout from '@/layouts/app-layout';
import { useForm, usePage, router } from '@inertiajs/react';
import { TransText } from '../../../components/TransText';
import LoadingPage from '../../../components/loadingPage';

const InfoSession = () => {
    const { selectedLanguage, darkMode } = useAppContext();
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
        post(route('participants.store'), {
            onSuccess: () => {
                // Server will redirect to game and set session flag; do nothing here
            },
            onError: (errors) => {
                setValidate(false);
                // setSending(false);
                setConfirmation(true);
            },
        });
    };

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
                {!processing ? (
                    <>
                        {sessions[0] && sessions?.every((e) => e.isFull) == false ? (
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
                                                className={`w-full appearance-none rounded border border-gray-300 px-4 py-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                                                name="formation"
                                                value={formation}
                                                required
                                                onChange={(e) => {
                                                    setFormation(e.target.value);
                                                    setChosenSession('');
                                                }}
                                            >
                                                <option disabled value="" className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Choose Formation" fr="Choisir la formation" ar="اختر التكوين" />
                                                </option>
                                                <option value="coding" className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Coding" fr="Codage" ar="البرمجة" />
                                                </option>
                                                <option value="media" className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Digital" fr="Média" ar="صانع محتوى" />
                                                </option>
                                            </select>
                                            <label htmlFor="info_session_id" className={` ${darkMode ? 'text-white' : 'text-gray-700'} lg:hidden`}>
                                                <TransText en="Choose a Session Date" fr="Choisissez une date de session" ar="اختر تاريخ الجلسة" />
                                                : <Required />
                                            </label>
                                            <select
                                                name="info_session_id"
                                                id="info_session_id"
                                                value={data.info_session_id}
                                                onChange={handleChange}
                                                className={`w-full appearance-none rounded border border-gray-300 px-4 py-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                                                required
                                            >
                                                <option disabled value="" className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Choose a Session" fr="Choisir une session" ar="اختر جلسة" />
                                                </option>
                                                {sessions
                                                    .filter(
                                                        (ses) =>
                                                            ses.formation == formation.charAt(0).toUpperCase() + formation.slice(1).toLowerCase(),
                                                    )
                                                    .map(
                                                        (opt, ind) =>
                                                            opt.isAvailable && (
                                                                <option key={ind} className={`text-lg ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`} value={opt.id}>
                                                                    {formatDate(opt.start_date)}
                                                                </option>
                                                            ),
                                                    )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {formFields.map((field, index) => (
                                            <div key={index} className="flex w-full flex-col space-y-2 sm:w-[49.7%]">
                                                <label htmlFor={field.name} className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                                    <TransText {...field.label} /> : <Required />
                                                </label>
                                                <input
                                                    type={field.type}
                                                    id={field.name}
                                                    name={field.name}
                                                    min={field.type === 'date' ? minDateString : undefined}
                                                    max={field.type === 'date' ? maxDateString : undefined}
                                                    placeholder={field.label[selectedLanguage]}
                                                    value={data[field.name]}
                                                    onChange={handleChange}
                                                    className={`rounded border px-4 py-2 focus:ring-2 focus:ring-beta focus:outline-none ${emailError && field.name === 'email'
                                                        ? 'border-red-500 text-red-500'
                                                        : 'border-gray-300 text-black'
                                                        } ${darkMode ? 'text-white placeholder:text-white' : 'text-gray-700'}`}
                                                    required
                                                />
                                                {errors[field.name] && <span className="text-sm text-red-500">{errors[field.name]}</span>}
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
                                                className={`w-full appearance-none rounded border border-gray-300 px-4 py-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                                                required
                                            >
                                                <option value="" disabled className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="City" fr="Ville" ar="مدينة" />
                                                </option>
                                                <option value="casablanca" className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Casablanca" fr="Casablanca" ar="الدار البيضاء" />
                                                </option>
                                                <option value="mohammedia" className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Mohammedia" fr="Mohammedia" ar="المحمدية" />
                                                </option>
                                                <option value="other" className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Other" fr="Autres" ar="اخر" />
                                                </option>
                                            </select>
                                            {errors.city && <span className="text-sm text-red-500">{errors.city}</span>}
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
                                                className={`w-full appearance-none rounded border border-gray-300 px-4 py-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                                                required
                                            >
                                                <option value="" disabled className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Prefecture" fr="Préfecture" ar="العمالة" />
                                                </option>
                                                <option value="none" className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="None" fr="Aucun" ar="لا شيء" />
                                                </option>
                                                {data.city === "casablanca" && (
                                                    [
                                                        'Casablanca Anfa',
                                                        'Sidi Bernoussi',
                                                        'Ain Sbaa Hay Mohammedi',
                                                        'Al Fida Mers Sultan',
                                                        'Moulay Rachid',
                                                        'Ain Chock',
                                                        "Ben M'Sick Sidi Othmane",
                                                        'Hay Hassani',
                                                    ].map((el, ind) => (
                                                        <option
                                                            key={ind}
                                                            value={el.toLowerCase().replace(/ /g, '_')}
                                                            className={`${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}
                                                        >
                                                            {el}
                                                        </option>
                                                    ))
                                                ) }

                                            </select>
                                            {errors.prefecture && <span className="text-sm text-red-500">{errors.prefecture}</span>}
                                        </div>

                                        <div className="flex w-full flex-col space-y-2 sm:w-[49.7%]">
                                            <label htmlFor="gender" className={` ${darkMode ? 'text-white' : 'text-gray-700'} `}>
                                                <TransText en="Gender" fr="Genre" ar="الجنس" />
                                                <Required />
                                            </label>
                                            <select
                                                name="gender"
                                                id="gender"
                                                value={data.gender}
                                                onChange={handleChange}
                                                className={`w-full appearance-none rounded border border-gray-300 px-4 py-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                                                required
                                            >
                                                <option value="" disabled className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Gender" fr="Genre" ar="الجنس" />
                                                </option>
                                                <option value="male" className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Male" fr="Homme" ar="ذكر" />
                                                </option>
                                                <option value="female" className={` ${darkMode ? 'text-white bg-[#212529]' : 'text-gray-700'}`}>
                                                    <TransText en="Female" fr="Female" ar="أنثى" />
                                                </option>
                                            </select>
                                            {errors.gender && <span className="text-sm text-red-500">{errors.gender}</span>}
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
                                                className={`rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-beta focus:outline-none ${darkMode ? 'text-white placeholder:text-white' : 'text-gray-700'}`}
                                                required
                                            />
                                            {errors.source && <span className="text-sm text-red-500">{errors.source}</span>}
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
                                                className={`rounded border border-gray-400 p-[6px] ${darkMode ? 'text-white placeholder:text-white' : 'text-gray-700'}`}
                                                onChange={handleChange}
                                                placeholder={
                                                    selectedLanguage == 'en' ? 'Motivation' : selectedLanguage == 'fr' ? 'Motivation' : 'دافع'
                                                }
                                                value={data.motivation}
                                                required
                                            ></textarea>
                                            {errors.motivation && <span className="text-sm text-red-500">{errors.motivation}</span>}
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className={`w-full rounded-md bg-alpha px-4 py-2 font-semibold ${darkMode ? 'hover:bg-[#2d343a]' : 'hover:bg-[#212529]'
                                                } hover:text-alpha focus:outline-none`}
                                        >
                                            <TransText en="Next" fr="Suivant" ar="التالي" />
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <div
                                    className={`flex h-[16rem] w-full items-center justify-center text-center text-[30px] font-bold ${darkMode ? 'text-white' : 'text-black'
                                        }`}
                                >
                                    <TransText fr="Aucune session disponible" ar="لا توجد دورات متاحة" en="No Sessions Available" />
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <LoadingPage />
                    </>
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
