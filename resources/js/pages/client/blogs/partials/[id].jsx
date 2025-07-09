import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export default function BlogDetails() {
    const { blogs, blog } = usePage().props;

    const selectedLanguage = "en";
    const darkMode = false;

    return (
        <AppLayout>
            <Head title="Blog Details" />
            {
                blog &&
                <div className="p-0 lg:p-16" style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff", }} >
                    <div className="">
                        <img loading="lazy" className="w-full h-96 rounded-2xl  object-cover object-center -z-2" src={"/storage/images/blog/" + blog.image} alt="" />
                    </div>

                    <h1 className="font-extrabold text-3xl py-16" style={{ color: darkMode ? "#ffffff" : "#0f0f0f", }}>
                        {JSON.parse(blog.title)[selectedLanguage]}
                    </h1>
                    <div className="flex flex-col lg:flex-row  ">
                        <div className="p-0 lg:pe-14 w-full lg:w-3/4">

                            <div className='view ql-editor reset-tw'>
                                <div dangerouslySetInnerHTML={{
                                    __html:
                                        JSON.parse(blog.description)[selectedLanguage]
                                }} style={{ color: darkMode ? "#ffffff" : "#0f0f0f", }} />
                            </div>
                        </div>


                        <div className=" h-[70vh] overflow-auto p-4 lg:p-0 mt-4 lg:m-0 flex flex-col gap-6 w-full lg:w-1/4 ">
                            <h1 className='text-2xl text-white font-bold' style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}>More Blog Articles:</h1>
                            {
                                blogs.map((blg, index) => (
                                    blg.id != blog.id && <Link key={index} href={`/blogs/${blg.id}`} className="flex gap-3">

                                        <img loading="lazy" className="w-[35%] rounded-xl  object-cover object-center"
                                        src={"/storage/images/blog/" + blg.image} alt="" />
                                        <div className="flex flex-col gap-3 overflow-hidden reset-tw">
                                            <p className="font-extrabold text-sm" style={{ color: darkMode ? "#ffffff" : "#0f0f0f", fontWeight: "bold", fontSize: "0.875rem" }}>
                                                {JSON.parse(blg.title)[selectedLanguage]}
                                            </p>

                                            <div style={{ fontSize: "9px", color: darkMode ? "#ffffff" : "#0f0f0f" }}
                                                dangerouslySetInnerHTML={{
                                                    __html: JSON.parse(blg.description)[selectedLanguage].length > 70 ?
                                                        JSON.parse(blg.description)[selectedLanguage].slice(0, 70) + '...' :
                                                        JSON.parse(blg.description)[selectedLanguage]
                                                }} />
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </AppLayout>
    )
}
