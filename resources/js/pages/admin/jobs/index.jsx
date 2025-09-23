import { usePage, router, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Play, StopCircle, RefreshCcw, Trash2, RotateCcw } from "lucide-react";

export default function JobsIndex() {
    const { pending, failed } = usePage().props;

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="p-8 space-y-10">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.post(route("jobs.start"))}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                        >
                            <Play size={18} /> Start Worker
                        </button>
                        <button
                            onClick={() => router.post(route("jobs.stop"))}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                        >
                            <StopCircle size={18} /> Stop Worker
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white shadow rounded-xl p-6 text-center">
                        <span className="text-gray-500 text-sm">Pending Jobs</span>
                        <div className="text-3xl font-bold text-yellow-600 mt-2">
                            {pending.length}
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 text-center">
                        <span className="text-gray-500 text-sm">Failed Jobs</span>
                        <div className="text-3xl font-bold text-red-600 mt-2">
                            {failed.length}
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 text-center">
                        <span className="text-gray-500 text-sm">Active Worker</span>
                        <div className="text-3xl font-bold text-green-600 mt-2">?</div>
                    </div>
                </div>

                {/* Pending Jobs */}
                <div className="bg-white shadow rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Pending Jobs</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3">Queue</th>
                                    <th className="px-6 py-3">Payload</th>
                                    <th className="px-6 py-3">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pending.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-gray-500">
                                            No pending jobs
                                        </td>
                                    </tr>
                                ) : (
                                    pending.map((job) => (
                                        <tr
                                            key={job.id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-3 font-medium">{job.id}</td>
                                            <td className="px-6 py-3">{job.queue}</td>
                                            <td className="px-6 py-3 truncate max-w-xs">
                                                {job.payload}
                                            </td>
                                            <td className="px-6 py-3">{job.created_at}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Failed Jobs */}
                <div className="bg-white shadow rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Failed Jobs</h2>
                        {failed.length > 0 && (
                            <button
                                onClick={() => router.post(route("jobs.resetAll"))}
                                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm shadow-md transition"
                            >
                                <RotateCcw size={16} /> Reset All
                            </button>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3">Connection</th>
                                    <th className="px-6 py-3">Queue</th>
                                    <th className="px-6 py-3">Error</th>
                                    <th className="px-6 py-3">Failed At</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {failed.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">
                                            No failed jobs
                                        </td>
                                    </tr>
                                ) : (
                                    failed.map((job) => (
                                        <tr
                                            key={job.id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-3 font-medium">{job.id}</td>
                                            <td className="px-6 py-3">{job.connection}</td>
                                            <td className="px-6 py-3">{job.queue}</td>
                                            <td className="px-6 py-3 text-red-600 max-w-xs truncate">
                                                {job.exception}
                                            </td>
                                            <td className="px-6 py-3">{job.failed_at}</td>
                                            <td className="px-6 py-3 flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        router.post(route("jobs.retry", job.id))
                                                    }
                                                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition"
                                                >
                                                    <RefreshCcw size={16} /> Retry
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        router.delete(route("jobs.delete", job.id))
                                                    }
                                                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                                                >
                                                    <Trash2 size={16} /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
