import { Button } from '@/components/Button';
import { useAppContext } from '@/context/appContext';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChartBar, Code, Trophy, Video } from 'lucide-react';
import audioviuelPic from '../../../../assets/images/audiovisuelle.jpg';
import codePic from '../../../../assets/images/code.jpg';
import eventspic from '../../../../assets/images/events.jpg';
import marketingPic from '../../../../assets/images/marketing.jpg';
import { TransText } from '../../../components/TransText';

const Propage = () => {
    const { projects } = usePage().props;
    const { selectedLanguage, darkMode } = useAppContext();

    // Helper function to get text alignment classes based on language
    const getTextAlignClass = () => {
        return selectedLanguage === 'ar' ? 'text-right' : 'text-left';
    };

    // Helper function to get direction class based on language
    const getDirectionClass = () => {
        return selectedLanguage === 'ar' ? 'rtl' : 'ltr';
    };

    // Helper function to get icon background classes
    const getIconBgClass = () => {
        return darkMode ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/90 backdrop-blur-sm border border-black/10 shadow-lg';
    };

    const services = [
        {
            id: 1,
            icon: <Code size={25} />,
            photo: codePic,
            header: <TransText en="Web Development" fr="Développement Web" ar="تطوير الويب" />,
            subHeader: '',
            descriptions: [
                {
                    title: (
                        <TransText
                            en="Website Design and Development"
                            fr="Conception et développement de sites Web"
                            ar="تصميم وتطوير المواقع الإلكترونية"
                        />
                    ),
                    description: (
                        <TransText
                            en="Creation and redesign of websites to improve user experience and communication of NGO missions"
                            fr="Création et refonte de sites Web pour améliorer l'expérience utilisateur et la communication des missions des ONG"
                            ar="إنشاء وإعادة تصميم المواقع لتحسين تجربة المستخدم وتعزيز التواصل حول مهام المنظمات غير الحكومية"
                        />
                    ),
                },
                {
                    title: <TransText en="Maintenance and Technical Support" fr="Maintenance et Support Technique" ar="الصيانة والدعم التقني" />,
                    description: (
                        <TransText
                            en="Ongoing support and regular updates to ensure the smooth functioning of websites"
                            fr="Support continu et mises à jour régulières pour garantir le bon fonctionnement des sites Web"
                            ar="دعم مستمر وتحديثات منتظمة لضمان عمل المواقع بسلاسة"
                        />
                    ),
                },
                {
                    title: (
                        <TransText
                            en="Web and Mobile Application Development"
                            fr="Développement d'Applications Web et Mobiles"
                            ar="تطوير تطبيقات الويب والهواتف المحمولة"
                        />
                    ),
                    description: (
                        <TransText
                            en="Custom solutions for volunteer and donor management"
                            fr="Solutions sur mesure pour la gestion des bénévoles et des donateurs"
                            ar="حلول مخصصة لإدارة المتطوعين والمتبرعين"
                        />
                    ),
                },
            ],
        },

        {
            id: 2,
            icon: <Video size={25} />,
            photo: audioviuelPic,
            header: <TransText en="Audiovisual Production" fr="Production Audiovisuelle" ar="الإنتاج السمعي البصري" />,
            subHeader: '',
            descriptions: [
                {
                    title: <TransText en="Institutional Films" fr="Films Institutionnels" ar="أفلام مؤسساتية" />,
                    description: (
                        <TransText
                            en="Design films to present the missions and impacts of NGOs"
                            fr="Conception de films pour présenter les missions et les impacts des ONG"
                            ar="تصميم أفلام لعرض مهام وتأثيرات المنظمات غير الحكومية"
                        />
                    ),
                },
                {
                    title: <TransText en="Viral Videos" fr="Vidéos Virales" ar="فيديوهات فيروسية" />,
                    description: (
                        <TransText
                            en="Production of engaging videos designed to be shared widely on social networks"
                            fr="Production de vidéos engageantes destinées à être partagées massivement sur les réseaux sociaux"
                            ar="إنتاج فيديوهات جذابة مصممة ليتم مشاركتها على نطاق واسع عبر شبكات التواصل الاجتماعي"
                        />
                    ),
                },
                {
                    title: <TransText en="Podcasts" fr="Podcasts" ar="بودكاست" />,
                    description: (
                        <TransText
                            en="Create podcasts to discuss relevant topics and engage a wide audience"
                            fr="Création de podcasts pour discuter de sujets pertinents et engager un large public"
                            ar="إنشاء بودكاست لمناقشة مواضيع مهمة وجذب جمهور واسع"
                        />
                    ),
                },
                {
                    title: <TransText en="Event Coverage" fr="Couverture d'Événements" ar="تغطية الفعاليات" />,
                    description: (
                        <TransText
                            en="Professional video and photography to document events"
                            fr="Captation vidéo et photographie professionnelle pour documenter les événements."
                            ar="تصوير فيديو ولقطات فوتوغرافية احترافية لتوثيق الفعاليات"
                        />
                    ),
                },
                {
                    title: (
                        <TransText
                            en="Live Social Media Broadcasts"
                            fr="Live sur les Réseaux Sociaux"
                            ar="البث المباشر على وسائل التواصل الاجتماعي"
                        />
                    ),
                    description: (
                        <TransText
                            en="Organize live broadcasts for real-time events and interactive sessions"
                            fr="Organisation de diffusions en direct pour des événements en temps réel et des sessions interactives"
                            ar="تنظيم بثوث مباشرة للفعاليات والأحداث التفاعلية في الوقت الفعلي"
                        />
                    ),
                },
            ],
        },

        {
            id: 3,
            icon: <ChartBar size={25} />,
            photo: marketingPic,
            header: <TransText en="Digital Marketing" fr="Marketing Digital" ar="التسويق الرقمي" />,
            subHeader: '',
            descriptions: [
                {
                    title: (
                        <TransText
                            en="User Generated Content (UGC)"
                            fr="Création de Contenu Utilisateur (UGC)"
                            ar="إنشاء محتوى من إنتاج المستخدمين (UGC)"
                        />
                    ),
                    description: (
                        <TransText
                            en="Training on creating and using user-generated content to increase community engagement"
                            fr="Formation à la création et à l'utilisation de contenu généré par les utilisateurs pour augmenter l'engagement communautaire"
                            ar="تدريب على إنشاء واستخدام المحتوى الذي ينشئه المستخدمون لزيادة التفاعل المجتمعي"
                        />
                    ),
                },
                {
                    title: <TransText en="Social Media Management" fr="Gestion des Réseaux Sociaux" ar="إدارة وسائل التواصل الاجتماعي" />,
                    description: (
                        <TransText
                            en="Develop customized strategies and manage content to optimize online presence"
                            fr="Développement de stratégies sur mesure et gestion de contenu pour optimiser la présence en ligne"
                            ar="تطوير استراتيجيات مخصصة وإدارة المحتوى لتحسين الوجود الرقمي"
                        />
                    ),
                },
                {
                    title: <TransText en="SEO and Content Marketing" fr="SEO et Marketing de Contenu" ar="تحسين محركات البحث وتسويق المحتوى" />,
                    description: (
                        <TransText
                            en="SEO audits and content strategies to improve search engine visibility"
                            fr="Audits SEO et stratégies de contenu pour améliorer la visibilité sur les moteurs de recherche"
                            ar="تحليلات تحسين محركات البحث واستراتيجيات محتوى لتحسين الظهور في نتائج البحث"
                        />
                    ),
                },
                {
                    title: <TransText en="Online Advertising" fr="Publicité en Ligne" ar="الإعلانات عبر الإنترنت" />,
                    description: (
                        <TransText
                            en="Create, manage, and optimize online advertising campaigns"
                            fr="Création, gestion et optimisation de campagnes publicitaires en ligne"
                            ar="إنشاء وإدارة وتحسين حملات الإعلانات الرقمية"
                        />
                    ),
                },
            ],
        },
        {
            id: 4,
            icon: <Trophy size={25} />,
            photo: eventspic,
            header: <TransText en="Events and Hackathons" fr="Événements et Hackathons" ar="الفعاليات والهاكاثونات" />,
            subHeader: '',
            descriptions: [
                {
                    title: <TransText en="Organizing Hackathons" fr="Organisation de Hackathons" ar="تنظيم الهاكاثونات" />,
                    description: (
                        <TransText
                            en="Plan and manage hackathons to stimulate innovation and find technological solutions to NGO challenges"
                            fr="Planification et gestion de hackathons pour stimuler l'innovation et trouver des solutions technologiques aux défis des ONG"
                            ar="تخطيط وإدارة الهاكاثونات لتحفيز الابتكار وإيجاد حلول تكنولوجية لتحديات المنظمات غير الحكومية"
                        />
                    ),
                },
                {
                    title: <TransText en="Workshops and Trainings" fr="Ateliers et Formations" ar="ورش عمل ودورات تدريبية" />,
                    description: (
                        <TransText
                            en="Training sessions to improve the technical skills of NGO volunteers and members"
                            fr="Séances de formation pour améliorer les compétences techniques des bénévoles et des membres des ONG"
                            ar="جلسات تدريبية لتحسين المهارات التقنية للمتطوعين وأعضاء المنظمات غير الحكومية"
                        />
                    ),
                },
            ],
        },
    ];

    return (
        <AppLayout>
            <Head title="LionsGeek Pro" />
            <div className={`pt-16 ${getDirectionClass()}`} dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}>
                <div className="w-full lg:px-16" style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff1f' }}>
                    {/* Hero Section */}
                    <div className={`flex w-full flex-col items-center gap-4 self-center py-8 ${getTextAlignClass()}`}>
                        <h1 className="text-3xl font-bold lg:text-5xl" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                            <TransText en="OUR SERVICES" fr="NOS SERVICES" ar="خدماتنا" />
                        </h1>
                        <p className="w-[95%] py-2 text-center font-normal lg:w-[50%] lg:text-xl" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                            <TransText
                                en="Feeling overwhelmed? We offer a range of services to streamline your operations, boost efficiency, and help you achieve your goals."
                                fr="Vous vous sentez submergé ? Nous proposons une gamme de services pour rationaliser vos opérations, améliorer l'efficacité et vous aider à atteindre vos objectifs"
                                ar="تشعر بالإرهاق؟ نحن نقدم مجموعة من الخدمات لتبسيط عملياتك وتعزيز الكفاءة ومساعدتك على تحقيق أهدافك"
                            />
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="flex w-full flex-wrap justify-between gap-3 px-3">
                        {services.map((service, idx) => (
                            <div
                                key={idx}
                                className={`relative min-h-[50vh] w-full overflow-hidden rounded-xl border py-5 lg:w-[48%] ${getTextAlignClass()}`}
                            >
                                {/* Background Image */}
                                <img loading="lazy" className="absolute top-0 h-full w-full object-cover" src={service.photo} alt="" />

                                {/* Dark Overlay */}
                                <div className="absolute top-0 z-10 h-full w-full bg-gradient-to-b from-black/50 via-black/60 to-black/80"></div>

                                {/* Header Section */}
                                <div
                                    className={`flex w-full items-center ${selectedLanguage === 'ar' ? 'flex-row-reverse justify-between' : 'justify-between'} absolute top-0 z-20 p-8`}
                                >
                                    <div className={`rounded-xl p-4 ${getIconBgClass()}`} style={{ color: darkMode ? '#ffffff' : '#1f2937' }}>
                                        {service.icon}
                                    </div>
                                    <h1 className="text-4xl font-bold text-yellow-400 drop-shadow-lg">0{service.id}</h1>
                                </div>

                                {/* Title Section */}
                                <div className={`absolute top-24 z-20 w-full px-8 py-5 text-white ${getTextAlignClass()}`}>
                                    <h1
                                        className={`${selectedLanguage === 'ar' ? 'text-2xl leading-snug font-black tracking-wide md:text-3xl' : 'text-3xl font-bold'} drop-shadow-lg`}
                                    >
                                        {service.header}
                                    </h1>
                                </div>

                                {/* Descriptions Section */}
                                <div className={`absolute top-40 z-20 w-full px-8 py-2 text-white ${getTextAlignClass()}`}>
                                    <div className={`space-y-2 ${selectedLanguage === 'ar' ? 'mt-2' : 'mt-0'}`}>
                                        {service.descriptions.map((desc, i) => (
                                            <div
                                                key={i}
                                                className={`flex items-start gap-x-3 ${selectedLanguage === 'ar' ? 'flex-row text-right' : 'flex-row text-left'}`}
                                            >
                                                <div className={`mt-1 flex-shrink-0`}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        height="12"
                                                        fill="white"
                                                        className="opacity-90 drop-shadow-sm"
                                                        viewBox="0 0 16 16"
                                                        style={{
                                                            transform: selectedLanguage === 'ar' ? 'scaleX(-1)' : 'none',
                                                        }}
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                                        />
                                                    </svg>
                                                </div>
                                                <h3
                                                    className={`${
                                                        selectedLanguage === 'ar'
                                                            ? 'flex-1 text-sm leading-relaxed font-bold tracking-wide md:text-base'
                                                            : 'text-sm font-medium md:text-base'
                                                    } drop-shadow-sm`}
                                                >
                                                    {desc.title}
                                                </h3>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Button */}
                    <div className="mt-8 flex justify-center py-6">
                        <Link href="/contact">
                            <Button>
                                <TransText en="Contact Us" fr="Contactez-nous" ar="اتصل بنا" />
                            </Button>
                        </Link>
                    </div>

                    {/* Trusted Partners Section */}
                    <div className={`mt-6 py-6 text-center ${getTextAlignClass()}`}>
                        <h1 className="text-3xl font-bold lg:text-5xl" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                            <TransText en="Those Who Trust in Us" fr="Ceux Qui Nous Font Confiance" ar="من يثقون بنا" />
                        </h1>
                        <p className="mt-4 px-4 py-3 font-normal lg:px-0 lg:text-xl" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                            <TransText
                                en="We are honored to work alongside organizations that share our values, striving for success together."
                                fr="Nous sommes honorés de collaborer avec des organisations partageant nos valeurs, œuvrant ensemble vers la réussite."
                                ar="نفتخر بالعمل جنباً إلى جنب مع المؤسسات التي تشاركنا قيمنا، ساعين معاً نحو النجاح."
                            />
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="flex flex-wrap items-center gap-6 px-5 py-10">
                        {projects &&
                            projects.map((project, indx) => (
                                <div
                                    key={indx}
                                    className={`relative flex h-[500px] w-full flex-col overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105 lg:w-[32%] ${getTextAlignClass()} ${
                                        darkMode
                                            ? 'border border-gray-700 bg-gray-900/90 hover:border-gray-600'
                                            : 'border border-gray-200 bg-white/95 shadow-lg hover:border-gray-300'
                                    }`}
                                >
                                    <div className="mb-4 flex-shrink-0">
                                        <img
                                            loading="lazy"
                                            className="h-48 w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                                            src={'storage/images/projects/' + (project.preview || project.logo)}
                                            alt=""
                                        />
                                    </div>

                                    <div
                                        className={`flex w-full items-center ${selectedLanguage === 'ar' ? 'flex-row-reverse justify-between' : 'justify-between'} mb-4 flex-shrink-0`}
                                    >
                                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</p>
                                        <img
                                            loading="lazy"
                                            className="aspect-square w-16 rounded-full border-2 border-gray-300 object-cover"
                                            src={'storage/images/projects/' + project.logo}
                                            alt=""
                                        />
                                    </div>

                                    <div
                                        className={`flex-1 overflow-y-auto ${selectedLanguage === 'ar' ? 'pl-2' : 'pr-2'} ${getTextAlignClass()}`}
                                        style={{
                                            scrollbarWidth: 'thin',
                                            scrollbarColor: darkMode ? '#4a5568 #2d3748' : '#9ca3af #e5e7eb',
                                        }}
                                    >
                                        <p
                                            className={`text-base leading-relaxed ${
                                                darkMode ? 'text-gray-300' : 'text-gray-700'
                                            } ${selectedLanguage === 'ar' ? 'font-medium' : ''}`}
                                        >
                                            {project.description[selectedLanguage]}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Propage;
