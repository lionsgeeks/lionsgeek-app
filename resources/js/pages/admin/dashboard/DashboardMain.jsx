import { Link, useForm, usePage } from '@inertiajs/react';
import StatisticCards from './partials/StatisticCards';
import UnreadMessages from './partials/UnreadMessages';

import { useState } from 'react';

const DashboardMain = () => {
    const { sessions, upcomingEvents, pendingCoworkings, blogs } = usePage().props;

    const { data, setData, post } = useForm({
        name: '',
        email: '',
    });

    const [isOpen, setIsOpen] = useState(false);
    const onAddAdmin = (e) => {
        e.preventDefault();
        post(route('add.admin'));
    };

    return (
        <div className="p-6">
            {/* <div className="flex justify-end p-2">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="transition-all duration-150 hover:bg-alpha hover:text-black">ADD ADMIN</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Create a new Admin Account?</DialogTitle>

                        <form onSubmit={onAddAdmin} className="space-y-2">
                            <div>
                                <Label htmlFor="name">Name:</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => {
                                        setData('name', e.target.value);
                                    }}
                                    placeholder="Username for the Account"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => {
                                        setData('email', e.target.value);
                                    }}
                                    placeholder="Email for the Account"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                    type="button"
                                >
                                    Cancel
                                </Button>

                                <Button type="submit">Add Admin</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div> */}
            <div className="min-h-[80vh] space-y-6">
                {/* statistique cards */}
                <StatisticCards />
                {/* Unread Messages */}
                <div className='w-full flex items-center gap-5'>
                    <UnreadMessages />
                    <UnreadMessages />
                </div>

                {/* Sessions */}
                <div className="">
                    {sessions.length > 0 && (
                        <div className="flex flex-col gap-y-4 rounded-lg bg-white p-4 shadow-md">
                            <h1 className="text-xl font-semibold text-black">Upcoming Info Sessions</h1>
                            <div className="mt-2 grid gap-y-8 md:grid-cols-2 md:gap-x-4 lg:grid-cols-4 lg:gap-x-2">
                                {sessions.map((session) => {
                                    const startDate = new Date(session.start_date);
                                    const month = startDate.toLocaleString('default', { month: 'short' });
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
                                                    className={`w-20 rounded-full text-center font-bold md:w-32 ${session.formation === 'Coding' ? 'border-[#ffc801e2] bg-[#ffc80155]' : ''} ${session.formation === 'Media' ? 'border-[#3f6b6e] bg-[#6ad86451]' : ''} border border-[#ffc801e2]`}
                                                >
                                                    {session.formation}
                                                </h1>
                                                <h2 className="truncate text-sm font-medium text-[#919391]">{session.name}</h2>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Pending Coworking Requests && Upcoming Events */}
                <div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2 lg:gap-y-0">
                    {/* Coworking Requests */}
                    <div className="rounded-lg bg-white shadow-md">
                        {pendingCoworkings.length > 0 ? (
                            <div className="overflow-hidden sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <div className="flex items-center justify-between">
                                        <h1 className="mb-2 text-xl font-semibold text-black">Recent Coworking Requests</h1>
                                        <Link to="/coworkings" className="text-alpha underline hover:text-black">
                                            See all
                                        </Link>
                                    </div>
                                    <table className="mt-4 w-full">
                                        <thead className="h-[7vh] border-b">
                                            <tr>
                                                <th>Name</th>
                                                <th className="hidden sm:table-cell">Date</th>
                                                <th>Full Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody className="w-full">
                                            {pendingCoworkings.map((coworking) => (
                                                <tr key={coworking.id} className="h-[7vh] w-full border-b text-center align-middle">
                                                    <td>{coworking.full_name}</td>
                                                    <td className="hidden sm:table-cell">{new Date(coworking.created_at).toLocaleDateString()}</td>
                                                    <td>
                                                        <Link href={`/coworking/${coworking.id}`}>
                                                            <button className="rounded bg-white p-1 text-black transition-all duration-200 ease-out hover:bg-alpha hover:text-black">
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
                            <div className="flex h-full w-full items-center justify-center rounded-lg">
                                <div className="text-center">
                                    <h1 className="mb-3 text-2xl font-semibold">No Pending Requests</h1>
                                    <p className="mb-6 text-gray-500">Currently, there are no pending requests to join the coworking space.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Upcoming Events */}
                    <div className="rounded-lg bg-white py-4 shadow-md">
                        {upcomingEvents.length > 0 ? (
                            <div className="overflow-hidden sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <div className="flex items-center justify-between">
                                        <h1 className="mb-2 text-xl font-semibold text-black">Upcoming Events</h1>
                                        <Link to="/events" className="text-alpha underline hover:text-black">
                                            See all
                                        </Link>
                                    </div>
                                    <table className="mt-4 w-full">
                                        <thead className="h-[7vh] border-b">
                                            <tr>
                                                <th>Event</th>
                                                <th className="hidden sm:table-cell">Date</th>
                                                <th>Time</th>
                                                <th>Full Detail</th>
                                            </tr>
                                        </thead>

                                        <tbody className="w-full">
                                            {upcomingEvents.map((event) => (
                                                <tr key={event.id} className="h-[7vh] w-full border-b text-center align-middle">
                                                    <td>{event.name.en}</td>
                                                    <td className="hidden sm:table-cell">{event.date.slice(0, 10)}</td>
                                                    <td className="sm:table-cell">{event.date.slice(11, 16)}</td>
                                                    <td>
                                                        <Link href={`admin/events/${event.id}`}>
                                                            <button className="rounded bg-white p-1 text-black transition-all duration-200 ease-out hover:bg-alpha hover:text-black">
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
                            <div className="flex h-[100%] w-full items-center justify-center rounded-lg">
                                <div className="text-center">
                                    <h1 className="mb-3 text-2xl font-semibold">No Event Available</h1>
                                    <p className="mb-6 text-gray-500">It looks like there aren’t any events created yet.</p>
                                    <Link href="/admin/events">
                                        <button className="rounded-md bg-black px-6 py-2 text-base font-medium text-white shadow transition hover:bg-alpha hover:text-black">
                                            Create a new Event
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Blogs */}
                <div className="flex w-full flex-col gap-y-2 rounded-lg bg-white p-4 shadow-md">
                    {blogs.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-semibold">Latest Blogs</h1>
                                <Link to="/blogs" className="text-alpha underline hover:text-black">
                                    See all
                                </Link>
                            </div>
                            <div className="grid gap-y-4 rounded-lg p-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-4">
                                {blogs.map((blog) => (
                                    <div key={blog.id} className="flex flex-col gap-y-2">
                                        <div className="h-[20vh] w-full">
                                            <img
                                                className="h-full w-full rounded-lg object-cover"
                                                src={`storage/images/blog/${blog.image}`} // Adjust the image path
                                                alt={blog.title.en}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-y-1">
                                            <h1 className="truncate rounded-full text-xl">
                                                {blog.title.en.length > 26 ? `${blog.title.en.slice(0, 26)}...` : blog.title.en}
                                            </h1>
                                            <div className="flex w-fit items-center gap-x-1 rounded-lg border border-[#eeb76b34] bg-alpha/10 px-2">
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
                                                    Written By <span className="text-sm font-bold">{blog.user?.name}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex h-[40vh] w-full items-center justify-center rounded-lg bg-white">
                            <div className="text-center">
                                <h1 className="mb-3 text-2xl font-semibold text-gray-700">No Blogs Available</h1>
                                <p className="mb-6 text-gray-500">It looks like there aren’t any blogs published yet.</p>
                                <Link to="/blogs/create">
                                    <button className="rounded-md bg-black px-6 py-2 text-base font-medium text-white shadow transition hover:bg-alpha hover:text-black">
                                        Write a New Blog
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardMain;
