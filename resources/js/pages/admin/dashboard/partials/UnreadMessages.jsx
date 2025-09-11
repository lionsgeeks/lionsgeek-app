import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { MessageCircle } from 'lucide-react';

const UnreadMessages = () => {
    const { unreadMessages } = usePage().props;

    return (
        <Card className="border-0 bg-white shadow-lg">
            <CardContent className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2">
                            <MessageCircle className="h-5 w-5 text-[#212529]" />
                        </div>
                        <h2 className="text-lg font-semibold text-[#212529]">Recent Messages</h2>
                    </div>
                    <Link href="/admin/contacts">
                        <Button variant="outline" size="sm" className="bg-beta lg:flex hidden text-white hover:bg-alpha hover:text-beta">
                            View All
                        </Button>
                    </Link>
                </div>

                {/* Messages List */}
                <div className="space-y-4">
                    {unreadMessages.length === 0 && (
                        <div className="py-8 text-center">
                            <MessageCircle className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                            <p className="text-gray-500">No unread messages</p>
                        </div>
                    )}
                    {unreadMessages?.map((message) => (
                        <Link
                            key={message.id}
                            href={'/admin/contactus?message='+message.id}
                            className="block rounded-lg border-b-2 p-4 transition-all duration-300 hover:bg-gray-200"
                        >
                            <div className="flex lg:flex-row flex-col-reverse items-start justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-semibold text-[#212529]">{message.full_name}</h3>
                                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{message.message}</p>
                                </div>
                                <div className="flex-shrink-0 text-xs text-gray-400">{dayjs(message.created_at).format('YYYY-MM-DD')}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default UnreadMessages;
