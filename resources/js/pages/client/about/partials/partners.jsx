import part0 from "../../../../../assets/images/partners/partner-0.png"
import part1 from "../../../../../assets/images/partners/partner-1.png"
import part2 from "../../../../../assets/images/partners/partner-2.png"
import part3 from "../../../../../assets/images/partners/partner-3.png"
import part4 from "../../../../../assets/images/partners/partner-4.png"
import part5 from "../../../../../assets/images/partners/partner-5.png"
import part6 from "../../../../../assets/images/partners/partner-6.png"
import part7 from "../../../../../assets/images/partners/partner-7.png"

export const Partners = () => {
    const darkMode = true;
    return (
        <div className={`${darkMode && "bg-[#0f0f0f]"} px-16 py-20`}>
            <div className="overflow-hidden flex flex-col gap-6 items-center justify-between">
                <div className="w-full text-center pb-10">
                    {/* <h1 className={`${darkMode && "text-alpha"} text-xl`}>{t('main.about.section5.title.name')}</h1>
                    <h1 className={`${darkMode && "text-white"} xl:text-5xl text-3xl font-bold`}>{t('main.about.section5.title.description')}</h1> */}
                </div>

                <div className="flex w-full md:px-28 gap-x-7 md:gap-x-20 gap-14 md:gap-y-14 justify-center flex-wrap">
                    {[part0, part1, part2, part3, part4, part5, part6, part7].map((src, index) => (

                        <img
                            loading="lazy"
                            className={`h-24 ${darkMode & index != 0 && "invert"}  w-[calc(calc(100%-calc(3*0.60rem))/4)] md:w-[calc(calc(100%-calc(11*3rem))/5)] object-contain`}
                            key={index}
                            src={src}
                            alt={`partner-${index}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

