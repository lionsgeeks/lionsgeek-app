import { useAppContext } from '@/context/appContext';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '../../../components/Modal';
import { TransText } from '../../../components/TransText';
import LoadingPage from '../../../components/loadingPage';
import { Button } from '../../../components/Button';

export default function CoworkingForm() {
    const { selectedLanguage, darkMode } = useAppContext();
    const { data, setData, post, processing } = useForm({
        // text
        full_name: '',
        gender: '',
        email: '',
        phone: '',
        birthday: '',
        formation: '',
        proj_name: '',
        proj_desc: '',
        proj_plan: '',
        prev_proj: '',
        // checkbox
        domain: '',
        otherDomains: '',
        reasons: '',
        otherReasons: '',
        needs: '',
        otherNeeds: '',
        // files
        cv: '',
        presentation: '',
    });

    const [sending, setSending] = useState(false);
    const [validate, setValidate] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const onFormSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        post(route('coworking.store'), {
            onSuccess: () => {
                setData({
                    full_name: '',
                    gender: '',
                    email: '',
                    phone: '',
                    birthday: '',
                    formation: '',
                    proj_name: '',
                    proj_desc: '',
                    proj_plan: '',
                    prev_proj: '',
                    domain: '',
                    otherDomains: '',
                    reasons: '',
                    otherReasons: '',
                    needs: '',
                    otherNeeds: '',
                    cv: '',
                    presentation: '',
                });
                setConfirmation(true);
                setValidate(true);
            },
            onFinish: () => {
                setSending(false);
            },
        });
    };

    const domainOptions = [
        {
            label: <TransText fr="Audiovisuel" ar="سمعي بصري" en="Audiovisual" />,
            value: 'audio-visuel',
        },
        {
            label: <TransText fr="Création de contenu digital" ar="إنشاء محتوى رقمي" en="Digital Content Creation" />,
            value: 'content-creation',
        },
        {
            label: <TransText fr="Photographie" ar="التصوير" en="Photography" />,
            value: 'photography',
        },
        {
            label: <TransText fr="Création de site Web" ar="إنشاء مواقع إلكترونية" en="Web Creation" />,
            value: 'web-creation',
        },
        {
            label: <TransText fr="Application web" ar="تطبيق الويب" en="Web Application" />,
            value: 'web-app',
        },
        { label: <TransText ar="أخرى" en="Other" fr="Autre" />, value: 'other' },
    ];

    const sourceOptions = [
        {
            label: (
                <TransText
                    fr="J'ai vu une annonce sur les réseaux sociaux"
                    ar="رأيت إعلانا على الشبكات الاجتماعية"
                    en="I saw an ad on social media"
                />
            ),
            value: 'social-media',
        },
        {
            label: (
                <TransText fr="J'ai reçu une invitation par email" ar="استلمت دعوة عبر البريد الإلكتروني" en="I received an invitation via email" />
            ),
            value: 'email-invitation',
        },
        {
            label: (
                <TransText fr="Quelqu'un m'en a parlé personnellement" ar="أخبرني شخص ما عن ذلك شخصياً" en="Someone told me about it personally" />
            ),
            value: 'personal-recommendation',
        },
        {
            label: (
                <TransText
                    fr="J'ai lu un article dans un magazine ou un journal"
                    ar="قرأت مقالة في مجلة أو جريدة"
                    en="I read an article in a magazine or newspaper"
                />
            ),
            value: 'magazine-article',
        },
        {
            label: (
                <TransText
                    fr="J'ai vu une affiche ou une publicité dans la rue"
                    ar="رأيت إعلاما أو إعلانا في الشارع"
                    en="I saw a poster or advertisement on the street"
                />
            ),
            value: 'street-advertisement',
        },
        {
            label: (
                <TransText
                    fr="J'ai trouvé l'information en effectuant une recherche en ligne"
                    ar="وجدت المعلومات عند البحث عبر الإنترنت"
                    en="I found the information by searching online"
                />
            ),
            value: 'online-search',
        },
        { label: <TransText ar="أخرى" en="Other" fr="Autre" />, value: 'other' },
    ];

    const workspaceOptions = [
        {
            label: <TransText fr="1 seul post de travail" ar="1 محطة عمل واحدة" en="Single Workstation" />,
            value: 'single-workstation',
        },
        {
            label: <TransText fr="Un espace de travail pour 2/3 personnes" ar="مساحة عمل لـ 2/3 أشخاص" en="Workspace for 2/3 People" />,
            value: 'workspace2_3',
        },
        {
            label: <TransText fr="Studio de tournage / Podcast" ar="استوديو تصوير / بودكاست" en="Filming Studio / Podcast" />,
            value: 'studio',
        },
        {
            label: <TransText fr="Salle de réunion" ar="قاعة الإجتماعات" en="Meeting Room" />,
            value: 'meeting-room',
        },
        { label: <TransText ar="أخرى" en="Other" fr="Autre" />, value: 'other' },
    ];

    const Required = () => {
        return (
            <>
                <span className="text-lg text-red-600"> *</span>
            </>
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleCheckboxChange = (field, value) => {
        setData((prevData) => {
            const isChecked = prevData[field]?.includes(value);
            return {
                ...prevData,
                [field]: isChecked ? prevData[field].filter((item) => item !== value) : [...prevData[field], value],
            };
        });
    };

    return (
        <AppLayout>
            <Head title="Apply to Co-work" />
            <div className={`${darkMode ? 'bg-black' : 'bg-white'}`}>
                {!sending ? (
                    <form
                        onSubmit={onFormSubmit}
                        className={`mx-auto mt-20 mb-5 flex w-[95vw] flex-col rounded-lg p-5 shadow-md ${darkMode ? 'bg-[#212529]' : 'bg-gray-50/50'}`}
                    >
                        <h1 className={`mb-3 text-2xl font-bold ${darkMode ? 'text-white' : ''}`}>Application Form</h1>

                        <h2 className={`mb-2 text-lg font-semibold underline ${darkMode ? 'text-white' : ''}`}>Personal Information</h2>
                        <div className="flex flex-col items-center justify-around gap-2 lg:flex-row">
                            <div className="mb-3 w-full">
                                <label className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="full_name">
                                    <TransText en="Full Name" fr="Nom Complet" ar="الاسم الكامل" />
                                    <Required />
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    placeholder={
                                        selectedLanguage === 'en'
                                            ? 'Enter Your Full Name'
                                            : selectedLanguage === 'fr'
                                              ? 'Entrez votre nom complet'
                                              : 'أدخل اسمك الكامل'
                                    }
                                    value={data.full_name}
                                    onChange={handleChange}
                                    className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                                    required
                                />
                            </div>

                            <div className="mb-3 w-full">
                                <label className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="email">
                                    <TransText en="Email" fr="Email" ar="البريد الإلكتروني" />
                                    <Required />
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={
                                        selectedLanguage === 'en'
                                            ? 'Enter Your Email'
                                            : selectedLanguage === 'fr'
                                              ? 'Entrez votre email'
                                              : 'أدخل بريدك الإلكتروني  '
                                    }
                                    value={data.email}
                                    onChange={handleChange}
                                    className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-around gap-2 lg:flex-row">
                            <div className="mb-3 w-full">
                                <label className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="phone">
                                    <TransText en="Phone" fr="Téléphone" ar="الهاتف" />
                                    <Required />
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder={
                                        selectedLanguage === 'en'
                                            ? 'Enter Your Phone'
                                            : selectedLanguage === 'fr'
                                              ? 'Entrez votre téléphone'
                                              : 'أدخل رقم هاتفك'
                                    }
                                    value={data.phone}
                                    onChange={handleChange}
                                    className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                                    required
                                />
                            </div>

                            <div className="mb-3 w-full">
                                <label className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="birthday">
                                    <TransText en="Date of Birth" fr="Date de Naissance" ar="تاريخ الإزدياد" />
                                    <Required />
                                </label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={data.birthday}
                                    onChange={handleChange}
                                    className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-around gap-2 lg:flex-row">
                            <div className="mb-3 w-full">
                                <label className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="formation">
                                    <TransText
                                        en="Education/Professional Experience (brief description)"
                                        fr="Formation/Expérience professionnelle (bref descriptif)"
                                        ar="التعليم/الخبرة المهنية (وصف مختصر)"
                                    />
                                    <Required />
                                </label>
                                <input
                                    type="text"
                                    name="formation"
                                    placeholder={
                                        selectedLanguage === 'en'
                                            ? 'Education/Professional'
                                            : selectedLanguage === 'fr'
                                              ? 'Formation/Expérience'
                                              : 'التعليم/الخبرة المهنية'
                                    }
                                    value={data.formation}
                                    onChange={handleChange}
                                    className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                                    required
                                />
                            </div>

                            <div className="mb-4 w-full">
                                <p className={`mb-2 text-sm font-bold ${darkMode ? 'text-white' : ''}`}>
                                    <TransText
                                        className={`${darkMode ? 'bg text-white' : ''}`}
                                        en="Upload CV"
                                        fr="Télécharger le CV"
                                        ar="رفع السيرة الذاتية"
                                    />{' '}
                                    <Required />
                                </p>
                                <label
                                    htmlFor="cv"
                                    className={`flex cursor-pointer items-center gap-2 rounded border p-[11px] shadow ${data.cv ? 'bg-alpha' : darkMode ? 'border-gray-600 bg-[#2b3035] text-white' : 'bg-white'}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                        />
                                    </svg>

                                    <span className="text-sm font-medium">
                                        <TransText
                                            className={`${darkMode ? 'text-white' : ''}`}
                                            en="Upload CV"
                                            fr="Télécharger le CV"
                                            ar="رفع السيرة الذاتية"
                                        />
                                    </span>
                                    <Required />
                                </label>

                                <input
                                    type="file"
                                    id="cv"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setData('cv', e.target.files[0])}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <div className="mb-4 flex flex-col lg:w-[48%]">
                            <label htmlFor="gender" className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                <TransText en="Gender" fr="Genre" ar="الجنس" />:
                                <Required />
                            </label>
                            <select
                                name="gender"
                                id="gender"
                                onChange={(e) => {
                                    setData('gender', e.target.value);
                                }}
                                className={`w-full appearance-none rounded p-[10px] ${darkMode ? 'border border-gray-600 bg-[#2b3035] text-white' : 'border border-gray-300 bg-white text-gray-700'}`}
                                required
                            >
                                <option value="" disabled defaultValue className={darkMode ? 'bg-[#212529] text-white' : 'bg-white text-gray-700'}>
                                    <TransText en="Select Gender" fr="Sélectionnez le sexe" ar="حدد الجنس" />
                                </option>
                                <option value="male" className={darkMode ? 'bg-[#212529] text-white' : 'bg-white text-gray-700'}>
                                    <TransText en="Male" fr="Homme" ar="ذكر" />
                                </option>
                                <option value="female" className={darkMode ? 'bg-[#212529] text-white' : 'bg-white text-gray-700'}>
                                    <TransText en="Female" fr="Female" ar="أنثى" />
                                </option>
                            </select>
                        </div>

                        {/* Project Informtation */}
                        <h1 className={`${darkMode && 'text-white'} mb-2 text-lg font-semibold underline`}>
                            <TransText en="Project Information" fr="Informations sur le projet" ar="معلومات المشروع" />
                        </h1>
                        <div className="mb-3">
                            <label className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="proj_name">
                                <TransText en="Project Name" fr="Nom du Project" ar="اسم المشروع" /> <Required />
                            </label>
                            <input
                                type="text"
                                name="proj_name"
                                placeholder={
                                    selectedLanguage === 'en'
                                        ? 'Enter Project Name'
                                        : selectedLanguage === 'fr'
                                          ? 'Entrez le nom du projet'
                                          : 'أدخل اسم المشروع'
                                }
                                value={data.proj_name}
                                onChange={handleChange}
                                className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="proj_desc">
                                <TransText fr="Project Description" en="Project Description" ar="وصف المشروع" /> <Required />
                            </label>
                            <textarea
                                name="proj_desc"
                                placeholder={
                                    selectedLanguage === 'en'
                                        ? 'Enter Project Description'
                                        : selectedLanguage === 'fr'
                                          ? 'Entrez le description du projet'
                                          : 'أدخل وصف المشروع'
                                }
                                value={data.proj_desc}
                                onChange={handleChange}
                                className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                                required
                            />
                        </div>

                        <fieldset className="mb-3">
                            <legend className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                <TransText en="Project's domain of activity" fr="Domaine d'activité du projet" ar="مجال عمل المشروع " />
                                <Required />
                            </legend>
                            {domainOptions.map((option) => (
                                <label className="m-2 inline-flex items-center" key={option.value}>
                                    <input
                                        type="checkbox"
                                        value={option.value}
                                        checked={data.domain?.includes(option.value)}
                                        onChange={() => handleCheckboxChange('domain', option.value)}
                                        className="form-checkbox"
                                    />
                                    <span className={`m-2 ${darkMode ? 'text-white' : ''}`}>{option.label}</span>
                                </label>
                            ))}

                            {data.domain?.includes('other') && (
                                <input
                                    type="text"
                                    placeholder="Other..."
                                    value={data.otherDomains}
                                    required
                                    onChange={(e) => setData('otherDomains', e.target.value)}
                                    className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                                />
                            )}
                        </fieldset>

                        <div className="mb-3">
                            <label className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="proj_plan">
                                <TransText
                                    en="Concrete action plan to develop the project"
                                    fr="Plan d'actions concret pour le développement du projet"
                                    ar="خطة عمل دقيقة لتطوير المشروع "
                                />

                                <Required />
                            </label>
                            <textarea
                                name="proj_plan"
                                placeholder={
                                    selectedLanguage === 'en'
                                        ? 'Enter Action Plan'
                                        : selectedLanguage === 'fr'
                                          ? "Entrez plan d'actions"
                                          : 'أدخل خطة العمل'
                                }
                                value={data.proj_plan}
                                onChange={handleChange}
                                className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                                required
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <p className={`${darkMode && 'text-white'} mb-2 text-sm font-bold`}>
                                <TransText en="Upload Project Presentation" fr="Télécharger la Présentation du Projet" ar="رفع عرض المشروع" />
                                <Required />
                            </p>
                            <label
                                htmlFor="projPresentation"
                                className={`flex cursor-pointer items-center gap-2 rounded border p-2 ${data.presentation ? 'bg-alpha' : darkMode ? 'border-gray-600 bg-[#2b3035] text-white' : 'border-gray bg-white'}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                    />
                                </svg>

                                <span className="text-sm font-medium">
                                    <TransText en="Upload Project Presentation" fr="Télécharger la Présentation du Projet" ar="رفع عرض المشروع" />
                                </span>
                                <Required />
                            </label>

                            <input
                                type="file"
                                id="projPresentation"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setData('presentation', e.target.files[0])}
                                className="hidden"
                            />
                        </div>

                        <div className="mb-3">
                            <label className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="proj_plan">
                                <TransText en="Previous Similar Project?" fr="Projet Précédent Similaire ?" ar="مشروع مشابه سابق؟" />
                            </label>
                            <textarea
                                name="prev_proj"
                                placeholder={
                                    selectedLanguage === 'en'
                                        ? 'Enter Previous Similar Project'
                                        : selectedLanguage === 'fr'
                                          ? 'Entrez Projet Précédent Similaire'
                                          : 'أدخل مشروع مشابه سابق'
                                }
                                value={data.prev_proj}
                                onChange={handleChange}
                                className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                            />
                        </div>

                        <fieldset className="mb-3">
                            <legend className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                <TransText
                                    ar="كيف سمعت عن فرصة السكن التعاوني في عين السبع"
                                    fr="Comment avez-vous entendu parler de l' opportunité pour l'espace de coworking à Ain Sbaa"
                                    en="How did you find out about the coworking opportunity in Ain Sbaa"
                                />
                                <Required />
                            </legend>
                            {sourceOptions.map((option) => (
                                <label className="m-2 inline-flex items-center" key={option.value}>
                                    <input
                                        type="checkbox"
                                        value={option.value}
                                        checked={data.reasons?.includes(option.value)}
                                        onChange={() => handleCheckboxChange('reasons', option.value)}
                                        className="form-checkbox"
                                    />
                                    <span className={`m-2 ${darkMode ? 'text-white' : ''} `}>{option.label}</span>
                                </label>
                            ))}

                            {data.reasons.includes('other') && (
                                <input
                                    type="text"
                                    placeholder="Other..."
                                    value={data.otherReasons}
                                    required
                                    onChange={(e) => setData('otherReasons', e.target.value)}
                                    className={`shadow border rounded w-full py-2 px-3 ${darkMode ? 'bg-[#57646e] text-white placeholder:text-gray-300' : 'bg-white text-gray-900 placeholder:text-gray-500'} focus:outline-beta`}
                                />
                            )}
                        </fieldset>

                        <fieldset className="mb-3">
                            <legend className={`mb-2 block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                <TransText ar="احتياجاتك" en="Needs" fr="Besoins" />
                            </legend>
                            {workspaceOptions.map((option) => (
                                <div className="m-2" key={option.value}>
                                    <label className={`${darkMode ? 'text-white' : ''}`}>
                                        <input
                                            type="radio"
                                            className={`mr-1`}
                                            value={option.value}
                                            checked={data.needs === option.value}
                                            onChange={() => setData('needs', option.value)}
                                        />
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                            {data.needs === 'other' && (
                                <input
                                    type="text"
                                    placeholder="Other..."
                                    value={data.otherNeeds}
                                    required
                                    onChange={(e) => setData('otherNeeds', e.target.value)}
                                    className={`fo w-full rounded border px-3 py-2 shadow focus:outline-beta ${darkMode ? 'border-gray-600 bg-[#2b3035] text-white placeholder:text-gray-300' : 'border-gray-300 bg-white text-gray-700'}`}
                                />
                            )}
                        </fieldset>

                        <Button
                            disabled={processing}
                            className="w-full"
                            type="submit"
                        >
                            <TransText en="Submit" fr="Soumettre" ar="تحميل" />
                        </Button>
                    </form>
                ) : (
                    <LoadingPage load={true} />
                )}
            </div>

            {!sending && confirmation && (
                <Modal
                    validate={validate}
                    confirm={confirmation}
                    action={
                        <button
                            onClick={() => {
                                setConfirmation(false);
                            }}
                            className="rounded bg-alpha px-5 py-2 font-medium"
                        >
                            Close
                        </button>
                    }
                />
            )}
        </AppLayout>
    );
}
