import { Button } from "../../../../components/Button";
import { AiFillPicture } from "react-icons/ai";
import { TransText } from "../../../../components/TransText";
import { Link, usePage } from "@inertiajs/react";
import { useAppContext } from "@/context/appContext";

export const BlogHeroSection = () => {
    const { blogs } = usePage().props
    const {selectedLanguage, darkMode} = useAppContext();

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
            {blogs ? (
                <>
                    <div className={`lg:flex-row flex-col lg:gap-y-0 gap-y-4  pt-[10vh] ${blogs[0] ? "flex" : "hidden"}`}>
                        <img
                            loading="lazy"
                            className="lg:w-0.5/1 lg:h-[60vh] h-1/2 object-cover rounded-xl "
                            src={'storage/images/blog/' + blogs[0]?.image}
                            alt=""
                        />

                        <div className="flex flex-col lg:w-[40%] gap-8 py-4 lg:px-8 ">
                            <p className="text-beta/50 " style={{ color: darkMode ? "#ffffff" : "#0f0f0f", }}>{formatDate(blogs[0]?.created_at)}</p>
                            <h1 className="font-bold lg:text-3xl md:text-2xl text-xl leading-normal" style={{ color: darkMode ? "#ffffff" : "#0f0f0f", }}>
                                {blogs[0]?.title[selectedLanguage]}
                            </h1>
                            <div className='reset-tw'
                                style={{ color: darkMode ? "#ffffff" : "#0f0f0f", fontSize: "12px" }}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            blogs[0]?.description[selectedLanguage].length > 150
                                                ? blogs[0]?.description[selectedLanguage].slice(0, 150) +
                                                "..."
                                                : blogs[0]?.description[selectedLanguage],
                                    }}

                                />
                            </div>
                            <div className=" flex justify-center md:justify-start items-center">
                                <Link href={`/blogs/${blogs[0]?.id}`} className="cursor-pointer">
                                    <Button children={"Read Article"} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={`${blogs[0] ? "hidden" : "flex"} h-[20rem] items-center justify-center `}>
                        <p className="text-[30px] font-bold text-center " style={{ color: darkMode ? "#ffffff" : "#0f0f0f", }}>
                            <TransText en="No available Blogs for the Moment" ar="لا توجد مدونات متوفرة في الوقت الحالي" fr="Aucun blog disponible pour le moment" />
                        </p>
                    </div>
                </>
            )
                :
                <>
                    <div className="flex md:flex-row flex-col md:gap-12 gap-6 w-full h-[26rem] mt-[4.5rem] rounded-md md:p-10 md:py-0  ">
                        <div className="skeleton md:w-[48%] w-full md:h-full h-[50%] bg-skeleton2  rounded-lg flex items-center justify-center "><AiFillPicture className="text-[6rem] opacity-30 " /></div>
                        <div className="flex gap-3 flex-col md:w-[40%] w-[100%] py-4 ">
                            <div className="skeleton w-full h-7 bg-skeleton2  rounded-md "></div>
                            <div className="skeleton w-full h-7 bg-skeleton2  rounded-md "></div>
                            <div className="skeleton w-[70%] h-7 bg-skeleton2  rounded-md "></div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};
