import { Button } from "../../../../components/Button";
import { AiFillPicture } from "react-icons/ai";
import { TransText } from "../../../../components/TransText";
import { Link, usePage } from "@inertiajs/react";

export const BlogContentsSection = () => {
    const { blogs } = usePage().props;

    const selectedLanguage = 'en'
    const darkMode = false;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            <div className="py-2 flex lg:flex-wrap flex-col gap-3" >
                {blogs?.length > 1 && <h1 className={`text-center py-10 font-extrabold text-4xl ${darkMode ? "text-white" : "text-black"}`}>Our Blogs</h1>}
                <div className="flex items-center justify-center gap-3 flex-wrap ">
                    {
                        blogs?.length > 0 ? blogs.map((blog, index) => (
                            <div className={`${blogs[0].id == blog.id ? "hidden" : "flex"} `} key={index}>
                                <Link
                                    href={`/blogs/${blog.id}`}
                                    className={`border rounded-lg lg:h-80 md:h-80 h-60 w-[25vw] border-beta relative overflow-hidden group cursor-pointer`}
                                >
                                    <img className="w-full absolute aspect-square object-cover"
                                        src={"storage/images/blog/" + blog.image}
                                        alt=""
                                    />
                                    <div className="w-full h-1/6 top-0 bg-gradient-to-t to-black/80 from-black/10 absolute "></div>
                                    <div className="w-full h-1/4 bottom-0 bg-gradient-to-t from-black transparent absolute "></div>
                                    <div className="flex  flex-col justify-between  w-full  md:px-8 px-4 py-5 z-20 absolute">
                                        <p className="text-white/90 text-end ">{formatDate(blog.created_at)}</p>
                                        <h1 className={`font-medium text-light_gray md:text-lg text-end  `} title={blog.title[selectedLanguage]}>
                                            {blog.title[selectedLanguage]}
                                        </h1>

                                    </div>
                                </Link>
                            </div>
                        ))
                            :

                            <div className="flex flex-col md:px-6 px-4 w-full ">
                                <h1 className={` text-center py-10 font-extrabold text-4xl `}>Our Blog</h1>
                                <div className="flex gap-[calc(5%/3)]">
                                    {
                                        Array.from({ length: 3 }).map((_, index) => (
                                            <div key={index} className={`${index !== 0 && "max-md:hidden"} skeleton flex items-center justify-center gap-5  md:w-[calc(100%/3)] w-full bg-skeleton1 md:h-[22rem] h-[18rem] p-6  rounded-md`} >
                                                <AiFillPicture className="text-[8rem] opacity-30 " />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>

        </>
    )
}
