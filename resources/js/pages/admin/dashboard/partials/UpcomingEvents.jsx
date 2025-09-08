import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';

const UpcomingEvents = () => {
    const { upcomingEvents } = usePage().props;

    return (
        <div className="rounded-xl bg-white p-5 shadow-md">
            <div className="mb-4 flex items-center justify-between">
                {/* <h2 className="text-xl font-bold flex items-center gap-x-5"><Calendar color='#ffc803' />Upcoming Events</h2> */}
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                        <Calendar className="h-5 w-5 text-[#212529]" />
                    </div>
                    <h2 className="text-lg font-semibold text-[#212529]">Upcoming Events</h2>
                </div>
                <Link href="/admin/events" className="rounded-lg bg-beta px-3 py-1 text-white hover:bg-alpha hover:text-black">
                    View All
                </Link>
            </div>

            {upcomingEvents.length === 0 ? (
                <p className="py-6 text-center text-gray-500">No upcoming events available.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse text-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-black">Title</th>
                                <th className="px-4 py-3 text-left font-medium text-black">Capacity</th>
                                <th className="px-4 py-3 text-left font-medium text-black">Date</th>
                                <th className="px-4 py-3 text-left font-medium text-black">Description</th>
                                <th className="px-4 py-3 text-left font-medium text-black">View Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {upcomingEvents.map((event) => (
                                <tr key={event.id}>
                                    <td className="px-4 py-3 font-medium text-gray-800">{event.name.en}</td>
                                    <td className="px-4 py-3 text-gray-600">{event.capacity}</td>
                                    <td className="px-4 py-3 text-gray-600">{dayjs(event.start_date).format('YYYY-MM-DD')}</td>
                                    <td className="px-4 py-3 text-gray-600">{event.description.en}</td>
                                    <td className="px-4 py-3 text-gray-600">
                                        <Link
                                            href={`/admin/events/${event.id}`}
                                            className="rounded-lg bg-beta px-5 py-2 text-white hover:bg-alpha hover:text-black"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UpcomingEvents;
