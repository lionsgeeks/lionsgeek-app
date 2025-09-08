import { useAppContext } from '@/context/appContext';
import { Link, usePage } from '@inertiajs/react';
import { AiFillPicture } from 'react-icons/ai';

export const BlogContentsSection = () => {
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
            <div className="flex flex-col gap-3 py-2 lg:flex-wrap">
                {blogs?.length > 1 && (
                    <h1 className={`py-10 text-center text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-black'}`}>Our Blogs</h1>
                )}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {blogs?.length > 0 ? (
                        blogs.map((blog, index) => (
                            <div className={`${blogs[0].id == blog.id ? 'hidden' : 'flex'} `} key={index}>
                                <Link
                                    href={`/blogs/${blog.id}`}
                                    className={`group relative h-60 w-[25vw] cursor-pointer overflow-hidden rounded-lg border border-beta md:h-80 lg:h-80`}
                                >
                                    <img className="absolute aspect-square w-full object-cover" src={'storage/images/blog/' + blog.image} alt="" />
                                    <div className="absolute top-0 h-1/6 w-full bg-gradient-to-t from-black/10 to-black/80"></div>
                                    <div className="transparent absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-black"></div>
                                    <div className="absolute z-20 flex w-full flex-col justify-between px-4 py-5 md:px-8">
                                        <p className="text-end text-white/90">{formatDate(blog.created_at)}</p>
                                        <h1 className={`text-end font-medium text-light_gray md:text-lg`} title={blog.title[selectedLanguage]}>
                                            {blog.title[selectedLanguage]}
                                        </h1>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="flex w-full flex-col px-4 md:px-6">
                            <h1 className={`py-10 text-center text-4xl font-extrabold`}>Our Blog</h1>
                            <div className="flex gap-[calc(5%/3)]">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`${index !== 0 && 'max-md:hidden'} skeleton flex h-[18rem] w-full items-center justify-center gap-5 rounded-md bg-skeleton1 p-6 md:h-[22rem] md:w-[calc(100%/3)]`}
                                    >
                                        <AiFillPicture className="text-[8rem] opacity-30" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
