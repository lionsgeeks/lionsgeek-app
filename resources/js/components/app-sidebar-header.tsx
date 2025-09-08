import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
// import { usePage } from '@inertiajs/react';
// import Navbar from './navbar';
import { Link, router, usePage } from '@inertiajs/react';
import { Bell, Briefcase, User } from 'lucide-react';
import { useEffect, useState } from 'react';
export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    // const page = usePage();
    // const isAdminPage = page.url.startsWith('/admin');
    const { props } = usePage();
    const notifications = props.notifications || [];

    const [open, setOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const handleNotifClick = (notif) => {
        if (notif.type == 'coworking') {
            router.visit(`/admin/coworking/${notif.id}`);
        } else if (notif.type == 'contact') {
            router.visit(`/admin/contactus`);
        }
    };
    useEffect(() => {
        const handleClick = () => {
            setNotifOpen(false);
        };

        if (notifOpen) {
            document.addEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [notifOpen]);
    return (
        // isAdminPage &&
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex h-16 items-center">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setNotifOpen(!notifOpen);
                            }}
                            className="relative p-2 text-gray-600 hover:text-gray-800"
                        >
                            <Bell className="h-6 w-6 text-black" />
                            {notifications.length > 0 ? (
                                <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs leading-none font-bold text-white">
                                    {notifications.length}
                                </span>
                            ) : (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-600 p-1 text-xs leading-none font-bold text-white">
                                    0
                                </span>
                            )}
                        </button>

                        {notifOpen && (
                            <div className="absolute right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-xl border bg-white py-2 shadow-xl">
                                <div className="border-b border-gray-200 px-4 py-2 font-semibold text-gray-700">
                                    Notifications ({notifications.length})
                                </div>

                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <button
                                            key={`${notif.id}`}
                                            onClick={() => handleNotifClick(notif)}
                                            className="flex w-full items-center gap-3 rounded-lg border-b px-4 py-3 text-left transition-colors duration-150 last:border-b-0 hover:bg-gray-50"
                                        >
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                                                {notif.type == 'contact' ? (
                                                    <User className="h-5 w-5 text-blue-600" />
                                                ) : (
                                                    <Briefcase className="h-5 w-5 text-green-600" />
                                                )}
                                            </div>

                                            <div className="flex flex-1 flex-col">
                                                <p className="line-clamp-3 text-sm font-medium text-gray-800">
                                                    {notif.type == 'contact'
                                                        ? `${notif.full_name}: ${notif.message}`
                                                        : `${notif.full_name}: ${notif.proj_name}`}
                                                </p>
                                                <span className="mt-1 text-xs text-gray-400">{new Date(notif.created_at).toLocaleString()}</span>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <p className="px-4 py-2 text-sm text-gray-500">No notifications</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="relative rounded-full bg-beta">
                        <button onClick={() => setOpen(!open)} className="flex items-center rounded-full p-2 hover:bg-yellow-500 hover:text-black">
                            <User className="h-6 w-6 text-white hover:text-black" />
                        </button>

                        {open && (
                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border bg-white py-1 shadow-lg">
                                <Link href={route('profile.edit')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Profile
                                </Link>
                                <Link href={route('profile.edit')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Settings
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
