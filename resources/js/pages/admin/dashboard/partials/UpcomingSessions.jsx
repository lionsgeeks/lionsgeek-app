import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { CreateSessionModal } from "../../infoSessions/partials/create-session-modal";

const UpcomingSessions = () => {
    const { sessions } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);

    if (!sessions || sessions.length === 0) {
        return (
            <div className="flex flex-col gap-y-4 rounded-lg bg-white p-4 shadow-md items-center">
                <h1 className="text-2xl font-semibold">No upcoming sessions.</h1>
                <CreateSessionModal open={modalOpen} onOpenChange={setModalOpen} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-4 rounded-lg bg-white p-4 shadow-md">
            <h1 className="text-xl font-semibold text-black">Upcoming Info Sessions</h1>
            <CreateSessionModal open={modalOpen} onOpenChange={setModalOpen} />
            <div className="mt-2 grid gap-y-8 md:grid-cols-2 md:gap-x-4 lg:grid-cols-4 lg:gap-x-2">
                {sessions.map((session) => {
                    const startDate = new Date(session.start_date);
                    const month = startDate.toLocaleString("default", { month: "short" });
                    const day = startDate.getDate();

                    return (
                        <div key={session.id} className="flex items-center gap-x-2">
                            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md border shadow-sm">
                                <div className="w-full rounded-ss-md rounded-se-md bg-gray-400 text-center text-xs font-bold">
                                    {month}
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{day}</div>
                            </div>
                            <div className="flex flex-col">
                                <h1
                                    className={`w-20 rounded-full text-center font-bold md:w-32 border ${session.formation === "Coding"
                                        ? "border-[#ffc801e2] bg-[#ffc80155]"
                                        : session.formation === "Media"
                                            ? "border-[#3f6b6e] bg-[#6ad86451]"
                                            : ""
                                        }`}
                                >
                                    {session.formation}
                                </h1>
                                <h2 className="truncate text-sm font-medium text-[#919391]">
                                    {session.name}
                                </h2>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Button to open modal */}
            <button
                onClick={() => setModalOpen(true)}
                className="mt-4 w-max rounded bg-[#212529] px-4 py-2 text-white hover:bg-[#fee819] hover:text-[#212529]"
            >
                Create New Session
            </button>
        </div>
    );
};

export default UpcomingSessions;
