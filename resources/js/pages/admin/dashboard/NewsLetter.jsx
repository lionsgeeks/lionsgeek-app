import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';

const NewsLetter = () => {
    const { newsLetter } = usePage().props;

    return (
        <div className="w-full rounded-lg bg-white p-5 shadow-lg lg:w-1/2">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffc803" className="h-6 w-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    <h2 className="text-xl font-bold">Recent Newsletters</h2>
                </div>
                <Link href="/admin/newsletter" className="rounded-lg bg-beta px-3 py-1 text-white hover:bg-alpha hover:text-black">
                    View All
                </Link>
            </div>

            {/* Newsletter List */}
            <div className="flex flex-col gap-4">
                {newsLetter.length === 0 && <p className="py-4 text-center text-gray-500">No newsletters available</p>}
                {newsLetter?.map((item) => (
                    <Link
                        key={item.id}
                        href={`/admin/newsletter`}
                        className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border-b border-gray-200 p-2 pb-3 transition last:border-b-0 hover:bg-gray-200"
                    >
                        <div className="flex flex-col gap-3">
                            <span className="font-semibold text-gray-800">{item.subject}</span>
                            <span className="line-clamp-2 text-gray-600">{item.content}</span>
                        </div>

                        {/* Date */}
                        <div className="flex flex-col items-end gap-1 text-sm whitespace-nowrap text-gray-400">
                            <span>{dayjs(item.created_at).format('YYYY-MM-DD')}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsLetter;
