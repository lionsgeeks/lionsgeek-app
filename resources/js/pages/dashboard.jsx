import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Calendar, Mail, MousePointerClick, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"

import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { totalContacts, members, sessions, upcomingEvents, pendingCoworkings, blogs, views, unreadMessages } = usePage().props;

    const { data, setData, post } = useForm({
        name: '',
        email: '',
    });

    const [isOpen, setIsOpen] = useState(false);
    const onAddAdmin = (e) => {
        e.preventDefault();
        post(route('add.admin'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className='p-6'>
                <div className='flex justify-end p-2'>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className='hover:bg-alpha hover:text-black transition-all duration-150'
                            >ADD ADMIN</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Create a new Admin Account?</DialogTitle>

                            <form onSubmit={onAddAdmin} className='space-y-2'>
                                <div>
                                    <Label htmlFor="name">Name:</Label>
                                    <Input type="text" name="name" id="name"
                                        value={data.name} onChange={(e) => { setData('name', e.target.value) }}
                                        placeholder='Username for the Account' required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" name="email" id="email"
                                        value={data.email} onChange={(e) => { setData('email', e.target.value) }}
                                        placeholder='Email for the Account' required
                                    />
                                </div>

                                <div className='flex justify-end gap-2'>
                                    <Button
                                        variant="outline"
                                        onClick={() => { setIsOpen(false) }}
                                        type='button'
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type='submit'
                                    >
                                        Add Admin
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='space-y-6 min-h-[80vh]'>
                    {/* Top Cards */}
                    <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-4 lg:gap-y-0 md:gap-y-2 gap-y-4">
                        <div className="ps-4 py-6 shadow-md flex items-start justify-around rounded-lg gap-x-5">
                            <div className="flex flex-col gap-y-2 justify-center">
                                <span className="font-bold text-[18px]">Total Contacts</span>
                                {totalContacts > 0 ? (
                                    <p className="text-xl font-black">{totalContacts}</p>
                                ) : (
                                    <p>No Messages Received</p>
                                )}
                            </div>
                            <Mail />
                        </div>

                        <div className="ps-4 py-6 shadow-md flex items-start justify-around gap-x-5 rounded-lg">
                            <div className="flex flex-col gap-y-2 justify-center">
                                <span className="font-bold text-[18px]">Events</span>
                                {upcomingEvents && upcomingEvents.length > 0 ? (
                                    <p className="text-xl font-black">{upcomingEvents.length}</p>
                                ) : (
                                    <p>No upcoming event</p>
                                )}
                            </div>
                            <Calendar />
                        </div>

                        <div className="ps-4 py-6 shadow-md flex items-start justify-around gap-x-5 rounded-lg">
                            <div className="flex flex-col gap-y-2 justify-center">
                                <span className="font-bold text-[18px]">Subscribers</span>
                                {members > 0 ? (
                                    <p className="text-xl font-black">{members}</p>
                                ) : (
                                    <p>News letter is empty</p>
                                )}
                            </div>
                            <Users />
                        </div>

                        <div className="ps-4 py-6 shadow-md flex items-start justify-around gap-x-5 rounded-lg">
                            <div className="flex flex-col justify-center gap-y-2">
                                <span className="font-bold text-[18px]">Website visits</span>
                                <p className="text-xl font-black">{views?.views ?? 0}</p>
                            </div>
                            <MousePointerClick />
                        </div>
                    </div>


                    {/* Unread Messages */}
                    {unreadMessages.length > 0 && (
                        <div className="lg:p-6 p-3 rounded-lg shadow-md">
                            <div className="w-full flex flex-col gap-y-3">
                                <div className="flex items-center gap-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="#ffc803"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                        />
                                    </svg>
                                    <div className="flex justify-between items-center w-full">
                                        <h1 className="md:text-xl font-bold">Recent Messages</h1>
                                        <a
                                            href="/contacts"
                                            className="text-alpha hover:text-black text-[18px] cursor-pointer underline"
                                        >
                                            view messages
                                        </a>
                                    </div>
                                </div>

                                <table className="w-full">
                                    <thead className="h-[7vh]">
                                        <tr>
                                            <th className="lg:table-cell hidden">Name</th>
                                            <th className="lg:table-cell hidden">Email</th>
                                            <th>Message</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="w-full">
                                        {unreadMessages.map((contact, key) => (
                                            <tr
                                                key={contact.id}
                                                onClick={() => (window.location.href = `/contacts?message=${contact.id}`)}
                                                className={`w-full text-center h-[7vh] cursor-pointer border-t hover:opacity-50 ${key % 2 === 0 ? "" : "bg-gray-200 text-black"
                                                    }`}
                                            >
                                                <td className="truncate lg:table-cell hidden">{contact.full_name}</td>
                                                <td className="lg:table-cell hidden">{contact.email}</td>
                                                <td>
                                                    <p>{contact.message.substring(0, 15)}...</p>
                                                </td>
                                                {/* Uncomment below if you need the date */}
                                                {/* <td>{new Date(contact.created_at).toLocaleDateString()}</td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Sessions */}
                    <div className=''>
                        {sessions.length > 0 && (
                            <div className="p-4 shadow-md rounded-lg flex flex-col gap-y-4 bg-white">
                                <h1 className="text-xl font-semibold text-black">Upcoming Info Sessions</h1>
                                <div className="grid mt-2 lg:grid-cols-4 lg:gap-x-2 md:gap-x-4 md:grid-cols-2 gap-y-8">
                                    {sessions.map((session) => {
                                        const startDate = new Date(session.start_date);
                                        const month = startDate.toLocaleString('default', { month: 'short' });
                                        const day = startDate.getDate();

                                        return (
                                            <div key={session.id} className="flex items-center gap-x-2">
                                                <div className="flex flex-col items-center justify-center w-12 h-12 border rounded-md shadow-sm">
                                                    <div className="text-xs font-bold bg-gray-400 w-full text-center rounded-se-md rounded-ss-md">
                                                        {month}
                                                    </div>
                                                    <div className="text-2xl font-bold text-gray-900">{day}</div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h1
                                                        className={`md:w-32 w-20 font-bold text-center rounded-full
                        ${session.formation === 'Coding' ? 'bg-[#ffc80155] border-[#ffc801e2]' : ''}
                        ${session.formation === 'Media' ? 'bg-[#6ad86451] border-[#3f6b6e]' : ''}
                        border border-[#ffc801e2]`}
                                                    >
                                                        {session.formation}
                                                    </h1>
                                                    <h2 className="text-sm font-medium truncate text-[#919391]">{session.name}</h2>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pending Coworking Requests && Upcoming Events */}
                    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-x-4 lg:gap-y-0 gap-y-4">
                        {/* Coworking Requests */}
                        <div className="shadow-md rounded-lg bg-white">
                            {pendingCoworkings.length > 0 ? (
                                <div className="overflow-hidden sm:rounded-lg">
                                    <div className="p-6 text-gray-900">
                                        <div className="flex justify-between items-center">
                                            <h1 className="text-xl font-semibold text-black mb-2">Recent Coworking Requests</h1>
                                            <Link to="/coworkings" className="underline text-alpha hover:text-black">
                                                See all
                                            </Link>
                                        </div>
                                        <table className="w-full mt-4">
                                            <thead className="border-b h-[7vh]">
                                                <tr>
                                                    <th>Name</th>
                                                    <th className="sm:table-cell hidden">Date</th>
                                                    <th>Full Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody className="w-full">
                                                {pendingCoworkings.map((coworking) => (
                                                    <tr key={coworking.id} className="w-full text-center h-[7vh] align-middle border-b">
                                                        <td>{coworking.full_name}</td>
                                                        <td className="sm:table-cell hidden">{new Date(coworking.created_at).toLocaleDateString()}</td>
                                                        <td>
                                                            <Link href={`/coworking/${coworking.id}`}>
                                                                <button className="p-1 bg-white text-black hover:bg-alpha hover:text-black transition-all duration-200 ease-out rounded">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                    </svg>
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full rounded-lg flex items-center justify-center w-full">
                                    <div className="text-center">
                                        <h1 className="text-2xl font-semibold mb-3">No Pending Requests</h1>
                                        <p className="text-gray-500 mb-6">Currently, there are no pending requests to join the coworking space.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Upcoming Events */}
                        <div className="shadow-md py-4 rounded-lg bg-white">
                            {upcomingEvents.length > 0 ? (
                                <div className="overflow-hidden sm:rounded-lg">
                                    <div className="p-6 text-gray-900">
                                        <div className="flex justify-between items-center">
                                            <h1 className="text-xl font-semibold text-black mb-2">Upcoming Events</h1>
                                            <Link to="/events" className="underline text-alpha hover:text-black">
                                                See all
                                            </Link>
                                        </div>
                                        <table className="w-full mt-4">
                                            <thead className="border-b h-[7vh]">
                                                <tr>
                                                    <th>Event</th>
                                                    <th className="sm:table-cell hidden">Date</th>
                                                    <th>Time</th>
                                                    <th>Full Detail</th>
                                                </tr>
                                            </thead>

                                            <tbody className="w-full">
                                                {upcomingEvents.map((event) => (
                                                    <tr key={event.id} className="w-full text-center h-[7vh] align-middle border-b">
                                                        <td>{event.name.en}</td>
                                                        <td className="sm:table-cell hidden">{event.date.slice(0, 10)}</td>
                                                        <td className="sm:table-cell">{event.date.slice(11, 16)}</td>
                                                        <td>
                                                            <Link href={`admin/events/${event.id}`}>
                                                                <button className="p-1 bg-white text-black hover:bg-alpha hover:text-black transition-all duration-200 ease-out rounded">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="size-6"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                                        />
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-[100%] flex rounded-lg items-center justify-center w-full">
                                    <div className="text-center">
                                        <h1 className="text-2xl font-semibold mb-3">No Event Available</h1>
                                        <p className="text-gray-500 mb-6">It looks like there aren’t any events created yet.</p>
                                        <Link href="/admin/events">
                                            <button className="px-6 py-2 bg-black text-white text-base font-medium rounded-md shadow hover:bg-alpha hover:text-black transition">
                                                Create a new Event
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* Blogs */}
                    <div className="w-full flex flex-col shadow-md gap-y-2 p-4 rounded-lg bg-white">
                        {blogs.length > 0 ? (
                            <>
                                <div className="flex justify-between items-center">
                                    <h1 className="text-xl font-semibold">Latest Blogs</h1>
                                    <Link to="/blogs" className="underline text-alpha hover:text-black">
                                        See all
                                    </Link>
                                </div>
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 md:gap-x-4 p-4 rounded-lg gap-y-4">
                                    {blogs.map((blog) => (
                                        <div key={blog.id} className="flex flex-col gap-y-2">
                                            <div className="h-[20vh] w-full">
                                                <img
                                                    className="w-full object-cover rounded-lg h-full"
                                                    src={`storage/images/blog/${blog.image}`} // Adjust the image path
                                                    alt={blog.title.en}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-y-1">
                                                <h1 className="text-xl truncate rounded-full">
                                                    {blog.title.en.length > 26 ? `${blog.title.en.slice(0, 26)}...` : blog.title.en}
                                                </h1>
                                                <div className="flex items-center gap-x-1 w-fit px-2 bg-alpha/10 border border-[#eeb76b34] rounded-lg">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="10"
                                                        height="10"
                                                        fill="currentColor"
                                                        className="bi bi-pen"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                                    </svg>
                                                    <p>
                                                        Written By <span className="font-bold text-sm">{blog.user?.name}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="h-[40vh] bg-white flex rounded-lg items-center justify-center w-full">
                                <div className="text-center">
                                    <h1 className="text-2xl font-semibold text-gray-700 mb-3">No Blogs Available</h1>
                                    <p className="text-gray-500 mb-6">It looks like there aren’t any blogs published yet.</p>
                                    <Link to="/blogs/create">
                                        <button className="px-6 py-2 bg-black text-white text-base font-medium rounded-md shadow hover:bg-alpha hover:text-black transition">
                                            Write a New Blog
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
