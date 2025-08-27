import { Link, usePage, router } from "@inertiajs/react";
import { Bell, User, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdNavbar( ) {
    const { props } = usePage();
    const notifications = props.notifications || [];

    const [open, setOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const handleNotifClick = (notif) => {
        if (notif.type == "coworking") {
            router.visit(`/admin/coworking/${notif.id}`);
        } else if (notif.type == "contact") {
            router.visit(`/admin/contactus`);
        }
    };
    useEffect(() => {
        const handleClick = () => {
            setNotifOpen(false);
        };

        if (notifOpen) {
            document.addEventListener("click", handleClick);
        }

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [notifOpen]);

    return (
        <nav>
            <div className="mx-auto px-4 sm:px-4 lg:px-4 border-b-2">
                <div className="flex justify-end h-16 items-center">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button

                                onClick={(e) => {
                                    e.stopPropagation();
                                    setNotifOpen(!notifOpen);
                                }}
                                className="relative p-2 text-gray-600 hover:text-gray-800"
                            >
                                <Bell className="h-6 w-6" />
                                {notifications.length > 0 ? (
                                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                        {notifications.length}
                                    </span>):<span className="absolute -top-1 -right-1 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                        0
                                    </span>}
                            </button>

                            {notifOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-xl py-2 max-h-96 overflow-y-auto z-50">
                                    <div className="px-4 py-2 border-b border-gray-200 font-semibold text-gray-700">
                                        Notifications ({notifications.length})
                                    </div>

                                    {notifications.length > 0 ? (
                                        notifications.map((notif) => (
                                            <button
                                                key={`${notif.id}`}
                                                onClick={() => handleNotifClick(notif)}
                                                className="flex items-center gap-3 w-full text-left px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-150 rounded-lg"
                                            >
                                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                                                    {notif.type == "contact" ? (
                                                        <User className="h-5 w-5 text-blue-600" />
                                                    ) : (
                                                        <Briefcase className="h-5 w-5 text-green-600" />
                                                    )}
                                                </div>

                                                <div className="flex-1 flex flex-col">
                                                    <p className="text-sm font-medium text-gray-800 line-clamp-3">
                                                        {notif.type == "contact"
                                                            ? `${notif.full_name}: ${notif.message}`
                                                            : `${notif.full_name}: ${notif.proj_name}`}
                                                    </p>
                                                    <span className="text-xs text-gray-400 mt-1">
                                                        {new Date(notif.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 px-4 py-2">
                                            No notifications
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>


                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center p-2 rounded-full hover:bg-gray-100"
                            >
                                <User className="h-7 w-7 text-gray-700" />
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Settings
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
