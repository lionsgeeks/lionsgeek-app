import { useAppContext } from '@/context/appContext';
import { Link, usePage } from '@inertiajs/react';
import { AiFillPicture } from 'react-icons/ai';
import { Button } from '../../../../components/Button';
import { TransText } from '../../../../components/TransText';

export const BlogHeroSection = () => {
    const { blogs } = usePage().props;
    const { selectedLanguage, darkMode } = useAppContext();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            {blogs ? (
                <>
                    <div className={`flex-col gap-y-4 pt-[10vh] lg:flex-row lg:gap-y-0 ${blogs[0] ? 'flex' : 'hidden'}`}>
                        <img
                            loading="lazy"
                            className="lg:w-0.5/1 h-1/2 rounded-xl object-cover lg:h-[60vh]"
                            src={'storage/images/blog/' + blogs[0]?.image}
                            alt=""
                        />

                        <div className="flex flex-col gap-8 py-4 lg:w-[40%] lg:px-8">
                            <p className="text-beta/50" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                {formatDate(blogs[0]?.created_at)}
                            </p>
                            <h1
                                className="text-xl leading-normal font-bold md:text-2xl lg:text-3xl"
                                style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}
                            >
                                {blogs[0]?.title[selectedLanguage]}
                            </h1>
                            <div className="reset-tw" style={{ color: darkMode ? '#ffffff' : '#0f0f0f', fontSize: '12px' }}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            blogs[0]?.description[selectedLanguage].length > 150
                                                ? blogs[0]?.description[selectedLanguage].slice(0, 150) + '...'
                                                : blogs[0]?.description[selectedLanguage],
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                                <Link href={`/blogs/${blogs[0]?.id}`} className="cursor-pointer">
                                    <Button children={'Read Article'} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={`${blogs[0] ? 'hidden' : 'flex'} h-[20rem] items-center justify-center`}>
                        <p className="text-center text-[30px] font-bold" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                            <TransText
                                en="No available Blogs for the Moment"
                                ar="لا توجد مدونات متوفرة في الوقت الحالي"
                                fr="Aucun blog disponible pour le moment"
                            />
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className="mt-[4.5rem] flex h-[26rem] w-full flex-col gap-6 rounded-md md:flex-row md:gap-12 md:p-10 md:py-0">
                        <div className="skeleton flex h-[50%] w-full items-center justify-center rounded-lg bg-skeleton2 md:h-full md:w-[48%]">
                            <AiFillPicture className="text-[6rem] opacity-30" />
                        </div>
                        <div className="flex w-[100%] flex-col gap-3 py-4 md:w-[40%]">
                            <div className="skeleton h-7 w-full rounded-md bg-skeleton2"></div>
                            <div className="skeleton h-7 w-full rounded-md bg-skeleton2"></div>
                            <div className="skeleton h-7 w-[70%] rounded-md bg-skeleton2"></div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
