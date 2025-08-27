import { useState } from "react";

export default function Participants({ bookings, tab }) {
    const [fil, setFil] = useState("");

    const filteredBookings = bookings.filter(
        (b) =>
            b.name.toLowerCase().includes(fil.toLowerCase()) ||
            b.email.toLowerCase().includes(fil.toLowerCase())
    );

    return (
        <div className="w-full p-4 overflow-y-auto">

            {tab === "English" && <p className="text-xl font-bold">Participants</p>}
            {tab === "Français" && <p className="text-xl font-bold">Participants</p>}
            {tab === "العربية" && (
                <p className="text-xl font-bold text-end">المشاركين</p>
            )}

            <div className="my-3">
                <input
                    type="text"
                    value={fil}
                    onChange={(e) => setFil(e.target.value)}
                    placeholder="Search participants..."
                    className="px-4 py-2 border border-gray-300 rounded-[10px] w-full"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-2 md:px-4 py-2 font-medium text-gray-700 text-sm md:text-base">
                                #
                            </th>
                            <th className="px-2 md:px-4 py-2 font-medium text-gray-700 text-sm md:text-base">
                                Name
                            </th>
                            <th className="px-2 md:px-4 py-2 font-medium text-gray-700 text-sm md:text-base">
                                Email
                            </th>
                            <th className="px-2 md:px-4 py-2 font-medium text-gray-700 text-sm md:text-base">
                                Gender
                            </th>
                            <th className="px-2 md:px-4 py-2 font-medium text-gray-700 text-sm md:text-base">
                                Phone
                            </th>
                            <th className="px-2 hidden md:block md:px-4 py-2 font-medium text-gray-700 text-sm md:text-base">
                                Booked at
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking, index) => (
                            <tr
                                key={index}
                                className="border-t border-gray-300 hover:bg-gray-50 transition"
                            >
                                <td className="px-2 md:px-4 py-2 text-gray-800 font-medium text-sm md:text-base">
                                    {index + 1}
                                </td>
                                <td className="px-2 md:px-4 py-2 text-gray-800 text-sm md:text-base">
                                    {booking.name}
                                </td>
                                <td className="px-2 md:px-4 py-2 text-gray-800 text-sm md:text-base">
                                    {booking.email}
                                </td>
                                <td className="px-2 md:px-4 py-2 text-gray-800 text-sm md:text-base">
                                    {booking.gender}
                                </td>
                                <td className="px-2 md:px-4 py-2 text-gray-800 text-sm md:text-base">
                                    {booking.phone}
                                </td>
                                <td className="px-2 md:px-4 hidden md:block py-2 text-gray-800 text-sm md:text-base">
                                    {new Date(booking.created_at).toLocaleDateString("en-GB", {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
