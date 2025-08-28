import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Briefcase } from 'lucide-react';

const CoworkingRequests = () => {
    const { coworkingsRequest } = usePage().props;

    return (
        <div className="rounded-xl bg-white p-5 shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-x-5"><Briefcase color='#ffc803' />Coworking Requests</h2>
                <Link href="/admin/coworking" className="rounded bg-beta px-3 py-1 text-white hover:bg-alpha hover:text-black">
                    View All
                </Link>{' '}
            </div>

            {coworkingsRequest.length === 0 ? (
                <p className="py-6 text-center text-gray-500">No coworking requests available.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse text-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-black">Name</th>
                                <th className="px-4 py-3 text-left font-medium text-black">Email</th>
                                <th className="px-4 py-3 text-left font-medium text-black">Needs</th>
                                <th className="px-4 py-3 text-left font-medium text-black">Request Date</th>
                                <th className="px-4 py-3 text-left font-medium text-black">View Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {coworkingsRequest.map((request) => (
                                <tr key={request.id}>
                                    <td className="px-4 py-3 font-medium text-gray-800">{request.full_name}</td>
                                    <td className="px-4 py-3 text-gray-600">{request.email}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${request.needs?.toLowerCase().includes('studio')
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : request.needs?.toLowerCase().includes('workstation')
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {request.needs || '-'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{dayjs(request.created_at).format('YYYY-MM-DD')}</td>
                                    <td className="px-4 py-3 text-gray-600">
                                        <Link
                                            className="rounded bg-beta px-5 py-2 text-white hover:bg-alpha hover:text-black"
                                            href={'/admin/coworking/' + request.id}
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

export default CoworkingRequests;
