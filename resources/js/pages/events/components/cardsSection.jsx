import "./skeleton.css";
import { TransText } from "../../../components/TransText";
import { router } from '@inertiajs/react';

// import { MdLocationPin, MdOutlineDateRange } from "react-icons/md";

export default function CardsSection({ events = [], IMAGEURL = "" }) {
    //   const navigate = useNavigate();

    // Format date to dd/mm/yyyy
    function DateComponent(backdate) {
        const date = new Date(backdate);
        return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }

    return (
        <div className="flex justify-center items-center md:px-20 px-6 py-14 bg-white">
            <div className="flex flex-wrap w-full lg:gap-x-[calc(10%/2)] lg:gap-y-14 md:gap-x-[calc(4%/1)] gap-10">
                <div id="cards" className="w-full text-center lg:pt-5 lg:px-0 px-6">
                    <h1 className="text-xl text-black">Our Upcoming Events</h1>
                    <h1 className="text-5xl font-bold text-black">Discover What's Next</h1>
                </div>

                {events.length > 0 ? (
                    events.map((element, index) => (
                        <div
                            key={index}
                            id="eventCard"
                            className="shadow-lg h-fit overflow-hidden flex flex-col justify-between lg:w-[30%] md:w-[48%] w-full rounded-xl cursor-pointer"
                            onClick={() => router.visit(`/event/1`)}
                            dir="ltr"
                        >
                            <div className="w-full h-[13rem]">
                                <img
                                    loading="lazy"
                                    src={`${IMAGEURL}/events/${element.cover}`}
                                    className="w-full h-full object-cover rounded-t-xl"
                                    alt="event"
                                />
                            </div>
                            <div className="bg-white">
                                <div className="flex flex-col font-mono gap-3 py-4 px-4">
                                    <h3 className="text-[22px] font-bold truncate text-black">
                                        <TransText {...element.name} />
                                    </h3>
                                    <div className="flex flex-col gap-2 text-[#8b96af]">
                                        <p className="text-[15px] flex items-center gap-1">
                                            {/* <MdOutlineDateRange className="fill-[#8b96af]" /> */}
                                            Date: {DateComponent(element?.date)}
                                        </p>
                                        <p className="text-[15px] flex items-center gap-1 truncate">
                                            {/* <MdLocationPin className="fill-[#8b96af]" /> */}
                                            Location: <TransText {...element.location} />
                                        </p>
                                    </div>
                                </div>
                                <button className="bg-[#fee819] transition duration-150 text-black w-full py-2 font-semibold">
                                    <TransText fr="Voir tout" ar="شاهد الكل" en="See all" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center text-center w-full h-[16rem] text-[30px] font-bold text-black">
                        <TransText fr="Aucun événement disponible" ar="لا يوجد حدث متاح" en="No Available Event" />
                    </div>
                )}
            </div>
        </div>
    );
};
