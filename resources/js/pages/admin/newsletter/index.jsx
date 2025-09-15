import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { Calendar, History, Mail, MessageSquare, Send, Users } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Newsletter',
        href: '/admin/newsletter',
    },
];

export default function NewsletterAdmin() {
    const { subscribers = [], lastnews = [] } = usePage().props;
    const { data, setData, post } = useForm({
        subject: '',
        content: '',
    });

    const handleSendNewsletter = (e) => {
        e.preventDefault();
        post(route('newsletter.store'));
    };

    // Format date function
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch (error) {
            return dateString;
        }
    };

    // Calculate statistics
    const totalSubscribers = subscribers?.length || 0;
    const totalNewsletters = lastnews?.length || 0;
    const recentNewsletters = lastnews?.slice(0, 5) || [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Newsletter" />

            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#fee819] p-3 lg:flex hidden">
                                    <Mail className="h-8 w-8 text-[#212529]" />
                                </div>
                                <div>
                                    <h1 className="lg:text-3xl text-2xl lg:font-bold  capitalize">Newsletter Management</h1>
                                    <p className="mt-1 text-gray-300 lg:text-lg text-[0.8rem] lg:w-fit w-[90%] ">Compose and send newsletters to subscribers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mx-auto -mt-4 max-w-7xl px-6">
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                                        <p className="text-3xl font-bold text-[#212529]">{totalSubscribers}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Users className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Newsletters Sent</p>
                                        <p className="text-3xl font-bold text-[#212529]">{totalNewsletters}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Send className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Recent Activity</p>
                                        <p className="text-3xl font-bold text-[#212529]">{recentNewsletters.length}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <History className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 pb-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Newsletter Form */}
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="rounded-lg bg-[#fee819] p-2">
                                        <MessageSquare className="h-6 w-6 text-[#212529]" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-[#212529]">Compose Newsletter</h2>
                                        <p className="text-gray-600">Create and send a newsletter to all subscribers</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSendNewsletter} className="space-y-6">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Subject Line</Label>
                                        <Input
                                            name="subject"
                                            type="text"
                                            placeholder="Enter newsletter subject..."
                                            value={data.subject}
                                            required
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="mt-2 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#212529]/20"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Content</Label>
                                        <Textarea
                                            name="content"
                                            rows="8"
                                            placeholder="Write your newsletter content here..."
                                            value={data.content}
                                            required
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="mt-2 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#212529]/20"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full transform bg-[#212529] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Newsletter to {totalSubscribers} Subscriber{totalSubscribers !== 1 ? 's' : ''}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Newsletter History */}
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="rounded-lg bg-gray-100 p-2">
                                        <History className="h-6 w-6 text-[#212529]" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-[#212529]">Newsletter History</h2>
                                        <p className="text-gray-600">Recent newsletters sent to subscribers</p>
                                    </div>
                                </div>

                                {lastnews.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentNewsletters.map((newsletter, index) => (
                                            <Link
                                                key={index}
                                                href={route('newsletter.preview', newsletter.id)}
                                                className="block rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:bg-gray-50 hover:border-[#212529]"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="line-clamp-1 font-semibold text-[#212529]">{newsletter.subject}</h3>
                                                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>{formatDate(newsletter.created_at)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Users className="h-4 w-4" />
                                                                <span>{newsletter.subscribers_count || 0} subscribers</span>
                                                            </div>
                                                        </div>
                                                        {newsletter.content && (
                                                            <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                                                {newsletter.content.length > 100
                                                                    ? newsletter.content.substring(0, 100) + '...'
                                                                    : newsletter.content}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                        {lastnews.length > 5 && (
                                            <div className="text-center">
                                                <p className="text-sm text-gray-500">
                                                    Showing {recentNewsletters.length} of {totalNewsletters} newsletters
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                            <Mail className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold text-[#212529]">No Newsletters Yet</h3>
                                        <p className="text-gray-600">You haven't sent any newsletters yet. Create your first one!</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
