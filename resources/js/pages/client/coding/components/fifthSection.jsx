import aymen from '../../../../../assets/images/testimonial/aymen.jpg';
import ilyass from '../../../../../assets/images/testimonial/ilyass.jpg';
import osama from '../../../../../assets/images/testimonial/osama.jpg';
import nassim from '../../../../../assets/images/testimonial/P1062983.jpeg';
import sara from '../../../../../assets/images/testimonial/unknown.jpg';
import wissal from '../../../../../assets/images/testimonial/wissal.jpg';

import { useAppContext } from '@/context/appContext';
import { QuoteIcon } from 'lucide-react';
import { TransText } from '../../../../components/TransText';

export const FifthSection = () => {
    const { selectedLanguage, darkMode } = useAppContext();

    const testimoniels = [
        {
            name: 'Oussama Jebrane',
            class: 'Coding school 1',
            description:
                'LionsGeek offers top-notch web development education. The practical approach, including real-world projects and industry visits, prepared me well for the tech industry.',
            image: osama,
        },

        {
            name: "Nassim El'mharmache",
            class: 'Coding School 1',
            description:
                "Attending LionsGeek's master classes was a game-changer. The UI/UX Design and Personal Branding sessions boosted my career. I highly recommend LionsGeek for web development and media training.",
            image: nassim,
        },
        {
            name: 'Ilyass Elyatime',
            class: 'Coding School 2',
            description:
                "LionsGeek transformed my web development skills. The hands-on projects and expert guidance were invaluable. Now, I'm confident in HTML, CSS, JavaScript, React, and Laravel.",
            image: ilyass,
        },
        {
            name: 'Wissale Chreiba',
            class: 'Coding School 2',
            description:
                'I loved the media and code crossover classes at LionsGeek. They gave me a comprehensive understanding of both fields, making me a versatile professional.',
            image: wissal,
        },
        {
            name: 'Ayman Boujjar',
            class: 'Coding School 3',
            description:
                'The personal attention and mentorship at LionsGeek are outstanding. The CV and cover letter workshops helped me land my dream job in web development.',
            image: aymen,
        },
        {
            name: 'sara chafik idrissi',
            class: 'Coding School 3',
            description:
                'I loved the media and code crossover classes at LionsGeek. They gave me a comprehensive understanding of both fields, making me a versatile professional.',
            image: sara,
        },
    ];

    return (
        <div className="flex flex-col gap-6 px-7 py-8 lg:px-16" style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff' }}>
            <div className="w-full pb-10 text-center">
                <h1 className="text-xl" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                    <TransText fr="Témoignages" ar="شهادات" en="Testimonials" />{' '}
                </h1>
                <h1 className="text-2xl font-bold lg:text-5xl" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                    <TransText fr=" Les gens qui nous aiment déjà" ar="الأشخاص الذين يحبوننا بالفعل" en="People Who Already Love Us" />{' '}
                </h1>
            </div>
            <div className="flex flex-col justify-center gap-3 lg:flex-row lg:flex-wrap">
                {testimoniels.map((element, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col gap-2 overflow-hidden rounded-lg border-2 border-gray-100 bg-white p-8 lg:w-[30%]"
                        style={{
                            backgroundColor: darkMode ? '#212529' : '#ffffff',
                            border: darkMode ? 'none' : '2px solid #f3f4f6',
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <img loading="lazy" className="h-14 w-14 rounded-full bg-cover object-cover object-top" src={element.image} alt="" />
                            <div className="flex flex-col">
                                <p className="font-medium" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                    {element.name}
                                </p>
                                <p className="font- text-xs text-black/70" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                    {element.class}
                                </p>
                            </div>
                        </div>
                        <div className="absolute -top-4 -right-4 rounded-full bg-alpha/70 object-cover p-5 opacity-80">
                            <QuoteIcon className="text-5xl" />
                        </div>
                        <p style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>{element.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
