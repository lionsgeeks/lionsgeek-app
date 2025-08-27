import AppLayout from "@/layouts/app-layout"
import { Head, useForm, usePage } from "@inertiajs/react";
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from "react";
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    {
        title: 'Coworking Requests',
        href: '/admin/coworking',
    },
];

export default function CoworkingAdmin() {
    const { coworkings } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [cowID, setCowID] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { data, setData, put } = useForm({
        status: ''
    });

    const onActionForm = () => {
        put(route('coworking.update', cowID), {
            onSuccess: () => {
                setIsOpen(false);
                setData({
                    status: '',
                });
            }
        })
    }

    const onActionClick = (status, coworkID) => {
        setData('status', status);
        setCowID(coworkID);
        setIsOpen(true);
    }
    const filteredCoworkings = coworkings.filter((cow) => {
        const query = searchQuery.toLowerCase();
        return (
            cow.full_name.toLowerCase().includes(query) ||
            cow.email.toLowerCase().includes(query) ||
            cow.phone.toLowerCase().includes(query)
        );
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coworking Requests" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-7 pt-2">
                {/* Search Input */}
                <div className="w-[86vw] md:w-1/3  flex items-center  bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 shadow-sm transition">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-gray-500"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search by name, email or phone"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ml-3 w-full bg-transparent border-0 outline-0 text-sm text-gray-700 placeholder-gray-400"
                    />
                </div>

                {/* Export Button */}
                <form action="{{ route('coworking.export') }}" method="post" className="w-full md:w-auto text-right">
                    {/* @csrf */}
                    <button className="bg-beta/95 hover:bg-alpha hover:text-beta transition text-white px-4 py-2 rounded-lg mt-1 md:mt-0 md:block hidden ">
                        Export Excel
                    </button>
                </form>
            </div>


            <div className="p-6">

                <div className=" shadow-md overflow-hidden rounded-lg">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-beta/95">
                            <tr className="border-b border-gray-300">
                                <th className="border-r border-gray-300 px-3 py-2 text-center text-white">Name</th>
                                <th className="sm:table-cell hidden border-r border-gray-300 px-3 py-2 text-center text-white">Phone</th>
                                <th className="sm:table-cell hidden border-r border-gray-300 px-3 py-2 text-center text-white">Email</th>
                                <th className="sm:table-cell hidden border-r border-gray-300 px-3 py-2 text-center text-white">Date</th>

                                <th className="px-3 py-2 text-center text-white">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCoworkings.map((cow) => (
                                <tr
                                    key={cow.id}
                                    onClick={() => window.location.href = `/admin/coworking/${cow.id}`}
                                    className=" group cursor-pointer w-full text-center h-[7vh] align-middle border-b border-gray-200"
                                >
                                    <td className="border-r  border-gray-200 px-3 py-2 group-hover:bg-gray-100/60 transition  ">{cow.full_name}</td>
                                    <td className="sm:table-cell hidden border-r  border-gray-200 px-3 py-2 group-hover:bg-gray-100/60 transition  ">{cow.phone}</td>
                                    <td className="sm:table-cell hidden border-r  border-gray-200 px-3 py-2 group-hover:bg-gray-100/60 transition  ">{cow.email}</td>
                                    <td className="sm:table-cell hidden border-r  border-gray-200 px-3 py-2 group-hover:bg-gray-100/60 transition  ">
                                        {new Date(cow.created_at).toLocaleDateString()}
                                    </td>
                                    <td onClick={(e) => {
                                        e.stopPropagation();


                                    }} className="px-3 py-2 group-hover:bg-gray-100/60  transition ">
                                        <div className="flex justify-center">
                                            {!cow.status && (
                                                <div
                                                    className=" flex items-center justify-center gap-x-2 mt-2"
                                                >
                                                    <button
                                                        onClick={() => { onActionClick('reject', cow.id) }}
                                                        className="  lg:px-1.5 p-1 white rounded-md border border-red-600 "
                                                    >
                                                        {/* X Icon */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="currentColor" className="bi bi-x-lg text-red-600 " viewBox="0 0 16 16">
                                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => { onActionClick('approve', cow.id) }}
                                                        className="bg-green-600 text-white rounded hover:bg-green-700 transition lg:px-2 p-1"
                                                    >
                                                        <span className="lg:block hidden"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                                        </svg></span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="currentColor" className="bi bi-check-circle text-white lg:hidden block" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                            {cow.status === 1 && (
                                                <button className=" cursor-none text-black lg:rounded-full flex items-center gap-x-2 lg:px-2 lg:py-0.5 lg:border border-green-900">
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


            </div>


            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogTitle>Please Confirm Your Action for This Coworker?</DialogTitle>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline"
                            onClick={() => { setIsOpen(false) }}
                        >Cancel</Button>
                        <Button
                            onClick={() => { onActionForm() }}
                            variant={data.status == "approve" ? 'default' : 'destructive'}
                            className="capitalize"
                        >{data.status}</Button>
                    </div>
                </DialogContent>
            </Dialog>

        </AppLayout>
    )
}
