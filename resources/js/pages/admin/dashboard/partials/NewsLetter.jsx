import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsLetter = () => {
    const { newsLetter } = usePage().props;

    return (
        <Card className="border-0 bg-white shadow-lg">
            <CardContent className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2">
                            <Mail className="h-5 w-5 text-[#212529]" />
                        </div>
                        <h2 className="text-lg font-semibold text-[#212529]">Recent Newsletters</h2>
                    </div>
                    <Link href="/admin/newsletter">
                        <Button 
                            variant="outline" 
                            size="sm"
                            className="border-[#212529] text-[#212529] hover:bg-[#212529] hover:text-white"
                        >
                            View All
                        </Button>
                    </Link>
                </div>

                {/* Newsletter List */}
                <div className="space-y-4">
                    {newsLetter.length === 0 && (
                        <div className="py-8 text-center">
                            <Mail className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                            <p className="text-gray-500">No newsletters available</p>
                        </div>
                    )}
                    {newsLetter?.map((item) => (
                        <Link
                            key={item.id}
                            href={`/admin/newsletter`}
                            className="block rounded-lg border border-gray-100 p-4 transition-all hover:border-[#212529] hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-[#212529] truncate">{item.subject}</h3>
                                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.content}</p>
                                </div>
                                <div className="flex-shrink-0 text-xs text-gray-400">
                                    {dayjs(item.created_at).format('YYYY-MM-DD')}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default NewsLetter;
