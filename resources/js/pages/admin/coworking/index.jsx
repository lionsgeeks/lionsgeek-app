import AppLayout from "@/layouts/app-layout"
import { Head, usePage } from "@inertiajs/react";

const breadcrumbs = [
    {
        title: 'Coworking Requests',
        href: '/admin/coworking',
    },
];

export default function CoworkingAdmin() {
    const { coworkings } = usePage().props;


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coworking Requests" />
            <div className="p-6">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th className="sm:table-cell hidden">Phone</th>
                            <th className="sm:table-cell hidden">Email</th>
                            <th className="sm:table-cell hidden">Date</th>
                            <th>Full Detail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coworkings.map((cow) => (
                            <tr key={cow.id} className="w-full text-center h-[7vh] align-middle">
                                <td>{cow.full_name}</td>
                                <td className="sm:table-cell hidden">{cow.phone}</td>
                                <td className="sm:table-cell hidden">{cow.email}</td>
                                <td className="sm:table-cell hidden">{new Date(cow.created_at).toLocaleDateString()}</td>
                                <td>
                                    <a href={`/admin/coworking/${cow.id}`}>
                                        <button className="p-1 bg-black text-white hover:bg-alpha hover:text-black transition-all duration-200 ease-out rounded">
                                            {/* Eye SVG */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </button>
                                    </a>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        {!cow.status && (
                                            <form
                                                className="flex items-center justify-center gap-x-2 mt-2"
                                            >
                                                <button
                                                    type="submit"
                                                    name="action"
                                                    value="reject"
                                                    className="border p-1 rounded-md"
                                                >
                                                    {/* X Icon */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" className="bi bi-x-lg text-red-500" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    type="submit"
                                                    name="action"
                                                    value="approve"
                                                    className="bg-[#356966] text-white lg:px-2 p-1 rounded-md"
                                                >
                                                    <span className="lg:block hidden">Approve</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" className="bi bi-check-circle text-white lg:hidden block" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                                    </svg>
                                                </button>
                                            </form>
                                        )}
                                        {cow.status === 1 && (
                                            <button className="bg-[#f3f8f0] cursor-none text-black lg:rounded-full flex items-center gap-x-2 lg:px-2 lg:py-0.5 lg:border border-green-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" className="bi bi-check-circle text-green-900" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                                </svg>
                                                <span className="lg:block hidden">Approved</span>
                                            </button>
                                        )}
                                        {cow.status === 2 && (
                                            <button className="bg-[#fef8f5] cursor-none text-black rounded-full flex items-center gap-x-2 lg:px-2 lg:py-0.5 lg:border border-red-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" className="bi bi-x-circle text-red-500" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                </svg>
                                                <span className="lg:block hidden">Rejected</span>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    )
}
