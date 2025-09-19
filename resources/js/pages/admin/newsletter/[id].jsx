import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Mail, User, Users } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    {
        title: 'Newsletter',
        href: '/admin/newsletter',
    },
    {
        title: 'Preview',
        href: '#',
    },
];

export default function NewsletterPreview() {
    const { newsletter } = usePage().props;

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

    if (!newsletter) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Newsletter Preview" />
                <div className="min-h-screen bg-white">
                    <div className="mx-auto max-w-4xl px-6 py-8">
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-8 text-center">
                                <Mail className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                                <h2 className="mb-2 text-2xl font-bold text-[#212529]">Newsletter Not Found</h2>
                                <p className="mb-6 text-gray-600">The newsletter you're looking for doesn't exist or has been deleted.</p>
                                <Link href="/admin/newsletter">
                                    <Button className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529]">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Newsletter
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Newsletter Preview - ${newsletter.subject}`} />

            <div className="min-h-screen bg-white">
                {/* Header Banner */}
                <div className="bg-[#212529] text-white">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Button
                                onClick={() => router.visit('/admin/newsletter')}
                                variant="ghost"
                                className="text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-200 ease-in-out"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Newsletter
                            </Button>
                            <div className='flex item-center gap-2 justify-center'>
                                <Button 
                                    className="bg-[#fee819] text-[#212529] hover:bg-white hover:text-[#212529] rounded-lg transition-all duration-200 ease-in-out"
                                    onClick={() => window.print()}
                                >
                                    <Mail className="mr-2 h-4 w-4" />
                                    Print Preview
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                            {/* Newsletter Icon & Basic Info */}
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="rounded-lg bg-[#fee819] p-3 lg:flex hidden" >
                                        <Mail className="w-12 h-12 text-[#212529]" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-2">{newsletter.subject}</h1>
                                    <div className="flex items-center gap-2 text-white/80">
                                        <Users className="h-4 w-4" />
                                        <span>{newsletter.subscribers_count || 0} subscribers received this newsletter</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Newsletter Preview */}
                <div className="mx-auto max-w-4xl px-6 py-8">
                    <Card className="border-0 bg-white shadow-lg">
                        <CardContent className="p-8">
                            {/* Newsletter Header */}
                            <div className="mb-8 border-b border-gray-200 pb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Sent on {formatDate(newsletter.created_at)}</span>
                                </div>
                                <h1 className="text-3xl font-bold text-[#212529] mb-4">
                                    {newsletter.subject}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="h-4 w-4" />
                                    <span>From: LionsGeek Newsletter</span>
                                </div>
                            </div>

                            {/* Newsletter Content */}
                            <div className="prose prose-lg max-w-none">
                                <div 
                                    className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={{ 
                                        __html: newsletter.content.replace(/\n/g, '<br />') 
                                    }}
                                />
                            </div>

                            {/* Newsletter Footer */}
                            <div className="mt-12 border-t border-gray-200 pt-6">
                                <div className="text-center text-sm text-gray-600">
                                    <p className="mb-2">
                                        This newsletter was sent to all subscribers of LionsGeek.
                                    </p>
                                    <p>
                                        If you no longer wish to receive these emails, you can unsubscribe at any time.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
