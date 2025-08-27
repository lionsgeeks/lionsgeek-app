import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';

const UnreadMessages = () => {
    const { unreadMessages } = usePage().props;

    return (
        <div className="w-full rounded-lg bg-white p-5 shadow-lg lg:w-1/2">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffc803" className="h-6 w-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                    </svg>
                    <h2 className="text-xl font-bold">Recent Messages</h2>
                </div>
                <a href="/admin/contacts" className="rounded bg-beta px-3 py-1 text-white hover:text-black hover:bg-alpha">
                    View All
                </a>
            </div>

            {/* Messages List */}
            <div className="flex flex-col gap-4">
                {unreadMessages.length === 0 && <p className="py-4 text-center text-gray-500">No unread messages</p>}
                {unreadMessages?.map((message) => (
                    <Link
                        alt="see all message"
                        href={'/admin/contacts?message='+message.id}
                        key={message.id}
                        className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border-b border-gray-200 p-2 pb-3 transition last:border-b-0 hover:bg-gray-200"
                    >
                        <div className="flex flex-col gap-5">
                            <span className="font-semibold text-gray-800">{message.full_name}</span>
                            <span className="line-clamp-2 text-gray-600">{message.message}</span>
                        </div>

                        {/* Date + Reply button */}
                        <div className="flex flex-col items-end gap-1 text-sm whitespace-nowrap text-gray-400">
                            <span>{dayjs(message.created_at).format('YYYY-MM-DD')}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default UnreadMessages;
