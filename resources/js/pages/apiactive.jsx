import React, { useState, useEffect } from "react";

export default function ApiActive({ routes: initialRoutes }) {
    const [routes, setRoutes] = useState(initialRoutes);
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState(null);

    // Fetch token on load
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const res = await fetch("/current-token");
                const data = await res.json();
                setToken(data.token);
            } catch (err) {
                console.error(err);
            }
        };
        fetchToken();
    }, []);

    const toggleRoute = async (name) => {
        try {
            const res = await fetch(`/api/toggle/${name}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            alert(data.message);

            setRoutes((prev) => ({
                ...prev,
                [name]: !prev[name],
            }));
        } catch (err) {
            console.error(err);
            alert("Error toggling route");
        }
    };

    const regenerateToken = async () => {
        try {
            const res = await fetch("/api/regenerate-token", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (res.ok) {
                setToken(data.token);
                setMessage(data.message);
            } else {
                setMessage(data.error || data.message);
            }
        } catch (err) {
            console.error(err);
            setMessage("Error regenerating token");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="bg-black text-white p-6 rounded-lg mb-6 shadow">
                <h1 className="text-2xl sm:text-3xl font-bold">API Toggle Dashboard</h1>
                <p className="text-gray-400">Manage and control active API routes</p>
            </div>

            {/* Regenerate Token Section */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow border border-gray-200">
                <button
                    onClick={regenerateToken}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                >
                    Regenerate Token
                </button>

                {message && (
                    <p className="mt-3 text-green-700 font-medium">{message}</p>
                )}

                {token && (
                    <div className="mt-2 p-2 bg-gray-100 border rounded font-mono break-all">
                       Token : {token}
                    </div>
                )}
            </div>

            {/* Responsive layout */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-4 py-3 border border-gray-700">Route Name</th>
                            <th className="px-4 py-3 border border-gray-700">Status</th>
                            <th className="px-4 py-3 border border-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {Object.entries(routes).map(([name, status]) => (
                            <tr key={name} className="text-center hover:bg-gray-50 transition">
                                <td className="px-4 py-2 border border-gray-200 font-medium">
                                    {name}
                                </td>
                                <td className="px-4 py-2 border border-gray-200">
                                    {status ? (
                                        <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 text-sm rounded bg-red-100 text-red-700">
                                            Inactive
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-2 border border-gray-200">
                                    <button
                                        className="px-3 py-1 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition"
                                        onClick={() => toggleRoute(name)}
                                    >
                                        Toggle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden flex flex-col gap-4">
                {Object.entries(routes).map(([name, status]) => (
                    <div
                        key={name}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow flex flex-col gap-3"
                    >
                        <div className="flex justify-between">
                            <span className="font-semibold">Route:</span>
                            <span>{name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Status:</span>
                            {status ? (
                                <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
                                    Active
                                </span>
                            ) : (
                                <span className="px-2 py-1 text-sm rounded bg-red-100 text-red-700">
                                    Inactive
                                </span>
                            )}
                        </div>
                        <button
                            className="mt-2 px-3 py-1 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition self-start"
                            onClick={() => toggleRoute(name)}
                        >
                            Toggle
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
