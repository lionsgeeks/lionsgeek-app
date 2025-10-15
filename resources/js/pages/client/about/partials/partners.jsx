import { useAppContext } from '@/context/appContext';
import part0 from '../../../../../assets/images/partners/partner-0.png';
import part1 from '../../../../../assets/images/partners/partner-1.png';
import part2 from '../../../../../assets/images/partners/partner-2.png';
import part8 from '../../../../../assets/images/partners/partner-3.png';
import part4 from '../../../../../assets/images/partners/partner-4.png';
import part5 from '../../../../../assets/images/partners/partner-5.png';
import part6 from '../../../../../assets/images/partners/partner-6.png';
import part7 from '../../../../../assets/images/partners/partner-7.png';
import part3 from '../../../../../assets/images/partners/partner-8.png';
import { TransText } from '../../../../components/TransText';

export const Partners = () => {
    const { darkMode } = useAppContext();
    return (
        <div className={`${darkMode && 'bg-[#0f0f0f]'} px-16 py-20`}>
            <div className="flex flex-col items-center justify-between gap-6 overflow-hidden">
                <div className="w-full pb-10 text-center">
                    <h1 className={`${darkMode && 'text-alpha'} text-xl`}>
                        <TransText en="Partners" ar="شركاء" fr="Partenaires" />
                    </h1>
                    <h1 className={`${darkMode && 'text-white'} text-3xl font-bold xl:text-5xl`}>
                        <TransText
                            en="Develop Future-Ready Skills"
                            ar="طوّر مهارات جاهزة للمستقبل"
                            fr="Développez des compétences prêtes pour l'avenir"
                        />
                    </h1>
                </div>

                <div className="flex w-full flex-wrap justify-center gap-14 gap-x-7 md:gap-x-20 md:gap-y-14 md:px-28">
                    {[part0, part1, part2, part3, part4, part5, part6, part7,part8].map((src, index) => (
                        <img
                            loading="lazy"
                            className={`h-24 ${darkMode & (index != 0) && 'invert'} w-[calc(calc(100%-calc(3*0.60rem))/4)] object-contain md:w-[calc(calc(100%-calc(11*3rem))/5)]`}
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
