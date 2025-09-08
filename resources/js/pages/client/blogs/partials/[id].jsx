import { useAppContext } from '@/context/appContext';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function BlogDetails() {
    const { blogs, blog } = usePage().props;

    const { selectedLanguage, darkMode } = useAppContext();

    return (
        <AppLayout>
            <Head title="Blog Details" />
            {blog && (
                <div className="p-0 lg:p-16" style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff' }}>
                    <div className="">
                        <img
                            loading="lazy"
                            className="-z-2 h-96 w-full rounded-2xl object-cover object-center"
                            src={'/storage/images/blog/' + blog.image}
                            alt=""
                        />
                    </div>

                    <h1 className="py-16 text-3xl font-extrabold" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                        {blog.title[selectedLanguage]}
                    </h1>
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full p-0 lg:w-3/4 lg:pe-14">
                            <div className="view ql-editor reset-tw">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: blog.description[selectedLanguage],
                                    }}
                                    style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex h-[70vh] w-full flex-col gap-6 overflow-auto p-4 lg:m-0 lg:w-1/4 lg:p-0">
                            <h1 className="text-2xl font-bold text-white" style={{ color: darkMode ? '#ffffff' : '#0f0f0f' }}>
                                More Blog Articles:
                            </h1>
                            {blogs.map(
                                (blg, index) =>
                                    blg.id != blog.id && (
                                        <Link key={index} href={`/blogs/${blg.id}`} className="flex gap-3">
                                            <img
                                                loading="lazy"
                                                className="w-[35%] rounded-xl object-cover object-center"
                                                src={'/storage/images/blog/' + blg.image}
                                                alt=""
                                            />
                                            <div className="reset-tw flex flex-col gap-3 overflow-hidden">
                                                <p
                                                    className="text-sm font-extrabold"
                                                    style={{ color: darkMode ? '#ffffff' : '#0f0f0f', fontWeight: 'bold', fontSize: '0.875rem' }}
                                                >
                                                    {blg.title[selectedLanguage]}
                                                </p>

                                                <div
                                                    style={{ fontSize: '9px', color: darkMode ? '#ffffff' : '#0f0f0f' }}
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            blg.description[selectedLanguage].length > 70
                                                                ? blg.description[selectedLanguage].slice(0, 70) + '...'
                                                                : blg.description[selectedLanguage],
                                                    }}
                                                />
                                            </div>
                                        </Link>
                                    ),
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
