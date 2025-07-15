import { Head, usePage } from "@inertiajs/react";
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import audioviuelPic from '../../../../assets/images/audiovisuelle.jpg';
import codePic from '../../../../assets/images/code.jpg';
import eventspic from '../../../../assets/images/events.jpg';
import marketingPic from '../../../../assets/images/marketing.jpg';
import { TransText } from '../../../components/TransText';
import { ChartBar, Code, Trophy, Video } from 'lucide-react';

const Propage = () => {
    const { projects } = usePage().props;

    const selectedLanguage = 'en';
    const darkMode = false;

    const services = [
        {
            id: 1,
            icon: <Code size={25} />,
            photo: codePic,
            header: <TransText
                en="Web Development"
            />,
            subHeader: '',
            descriptions: [
                {
                    title: <TransText
                        en="Website Design and Development"
                    />,
                    description: <TransText
                        en="Creation and redesign of websites to improve user experience and communication of NGO missions"
                    />,
                },
                {
                    title: <TransText
                        en="Maintenance and Technical Support"
                    />,
                    description: <TransText
                        en="Ongoing support and regular updates to ensure the smooth functioning of websites"
                    />,
                },
                {
                    title: <TransText
                        en="Web and Mobile Application Development"
                    />,
                    description: 'main.lionsgeekpro.firstsection.desc1',
                },
            ],
        },
        {
            id: 2,
            icon: <Video size={25} />,
            photo: audioviuelPic,
            header: 'main.lionsgeekpro.Secondsection.title1',
            subHeader: '',
            descriptions: [
                {
                    title: 'main.lionsgeekpro.Secondsection.title2',
                    description: 'main.lionsgeekpro.Secondsection.desc1',
                },
                {
                    title: 'main.lionsgeekpro.Secondsection.title3',
                    description: 'main.lionsgeekpro.Secondsection.desc3',
                },
                {
                    title: 'main.lionsgeekpro.Secondsection.title4',
                    description: 'main.lionsgeekpro.Secondsection.desc4',
                },
                {
                    title: 'main.lionsgeekpro.Secondsection.title5',
                    description: 'main.lionsgeekpro.Secondsection.desc5',
                },
                {
                    title: 'main.lionsgeekpro.Secondsection.title6',
                    description: 'main.lionsgeekpro.Secondsection.desc6',
                },
            ],
        },
        {
            id: 3,
            icon: <ChartBar size={25} />,
            photo: marketingPic,
            header: 'main.lionsgeekpro.section3.title1',
            subHeader: '',
            descriptions: [
                {
                    title: 'main.lionsgeekpro.section3.title2',
                    description: 'main.lionsgeekpro.section3.desc1',
                },
                {
                    title: 'main.lionsgeekpro.section3.title3',
                    description: 'main.lionsgeekpro.section3.desc3',
                },
                {
                    title: 'main.lionsgeekpro.section3.title4',
                    description: 'main.lionsgeekpro.section3.desc4',
                },
                {
                    title: 'main.lionsgeekpro.section3.title5',
                    description: 'main.lionsgeekpro.section3.desc5',
                },
            ],
        },
        {
            id: 4,
            icon: <Trophy size={25} />,
            photo: eventspic,
            header: 'main.lionsgeekpro.section4.title1',
            subHeader: '',
            descriptions: [
                {
                    title: 'main.lionsgeekpro.section4.title2',
                    description: 'main.lionsgeekpro.section4.desc1',
                },
                {
                    title: 'main.lionsgeekpro.section4.title3',
                    description: 'main.lionsgeekpro.section4.desc3',
                },
            ],
        },
    ];

    return (
        <AppLayout>
            <Head title="LionsGeek Pro" />
            <div className="pt-16">
                <div className="w-full lg:px-16" style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff1f' }}>
                    {/* hero section */}
                    <div className="flex w-full flex-col items-center gap-4 self-center py-8">
                        <h1 className="text-3xl font-bold lg:text-5xl" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                            OUR SERVICES
                        </h1>
                        <p className="w-[95%] py-2 text-center font-normal lg:w-[50%] lg:text-xl" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                            Feeling overwhelmed? We offer a range of services to streamline your operations, boost efficiency, and help you achieve your
                            goals.
                        </p>
                    </div>

                    <div className="flex w-full flex-wrap justify-between gap-3 px-3">
                        {services.map((ele, idx) => (
                            <div
                                key={idx}
                                className={`relative w-full border py-5 lg:w-[48%] min-h-[50vh] ${selectedLanguage === 'ar' && 'text-end'} overflow-hidden rounded-xl`}
                            >

                                <div className="absolute top-0 z-10 h-full w-full bg-black/60"></div>
                                <div className="flex w-full items-center justify-between p-8 z-20 absolute">
                                    <div className="rounded-lg bg-[#e7e7e8] p-3 text-alpha">{ele.icon}</div>
                                    <h1 className="text-4xl font-bold text-alpha shadow">0{ele.id}</h1>
                                </div>

                                <div className="px-8 py-5 text-white z-20 absolute top-24">
                                    <h1 className="text-3xl font-bold ">{ele.header}</h1>
                                    <h1 className="py-3 /80">{ele.header}</h1>
                                </div>

                                <div className="px-8 py-2 text-white z-20 absolute top-45">
                                    {ele.descriptions.map((e, i) => (
                                        <div
                                            key={i}
                                            className={`mt-2 flex items-center gap-x-3  ${selectedLanguage === 'ar' && 'flex-row-reverse'}`}
                                        >
                                            <div className={` ${selectedLanguage === 'ar' && 'rotate-180'}`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="white"
                                                    className="bi bi-arrow-right"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                                    />
                                                </svg>
                                            </div>

                                            <h3 className="">e.title</h3>
                                        </div>
                                    ))}
                                </div>
                                <img
                                    loading="lazy"
                                    className={`absolute top-0 h-full w-full object-cover`}
                                    src={ele.photo}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 py-5 text-center">
                        <Link className="rounded-lg bg-alpha px-7 py-3" to={'/contact-us'}>
                            <TransText en="Contact Us" fr="Contactez-nous" ar="اتصل بنا" />
                        </Link>
                    </div>

                    <div className="mt-3 py-3 text-center">
                        <h1 className="text-3xl font-bold lg:text-5xl" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                            <TransText en="Those Who Trust in Us" fr="Ceux Qui Nous Font Confiance" ar="من يثقون بنا" />
                        </h1>
                        <p className="lg:text-l mt-2 px-4 py-3 font-normal lg:px-0" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                            <TransText
                                en="We are honored to work alongside organizations that share our values, striving for success together."
                                fr="Nous sommes honorés de collaborer avec des organisations partageant nos valeurs, œuvrant ensemble vers la réussite."
                                ar="نفتخر بالعمل جنباً إلى جنب مع المؤسسات التي تشاركنا قيمنا، ساعين معاً نحو النجاح."
                            />
                        </p>
                    </div>

                    {/* projects */}
                    <div className={`flex flex-wrap items-center gap-5 px-5 py-10`}>
                        {projects &&
                            projects.map((ele, indx) => (
                                <div
                                    key={indx}
                                    className={`projects relative w-full overflow-hidden rounded-lg border border-black p-5 transition-all lg:w-[32%] ${darkMode ? 'bg-[#E1E1E1]' : ''} `}
                                >
                                    <div className="flex w-full items-center justify-between">
                                        <p className="font-bold">{ele.name}</p>
                                        <img
                                            loading="lazy"
                                            className="aspect-square w-16 rounded-full object-cover"
                                            src={'storage/images/projects/' + ele.logo}
                                            alt=""
                                        />
                                    </div>
                                    <p className={`h-[25vh] overflow-y-auto py-6 text-base ${selectedLanguage == 'ar' && 'text-end'}`}>
                                        {ele.description[selectedLanguage]}
                                    </p>
                                    <div className="preview h-full w-full rounded-lg bg-white">
                                        <img
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                            src={'storage/images/projects/' + (ele.preview || ele.logo)}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
export default Propage;












