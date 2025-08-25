import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const breadcrumbs = [
    {
        title: 'Newsletter',
        href: '/admin/newsletter',
    },
];


export default function NewsletterAdmin() {
    const { subscribers, lastnews } = usePage().props;
    const { data, setData, post } = useForm({
        subject: '',
        content: '',
    });

    const handleSendNewsletter = (e) => {
        e.preventDefault();
        post(route('newsletter.store'))
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Newsletter" />
            <div className="p-6">
                <div className="flex md:flex-row flex-col gap-2 p-4 rounded-lg">
                    {/* Newsletter Form */}
                    <form
                        className="md:w-1/2 p-3 flex flex-col gap-3 shadow-lg rounded"
                        onSubmit={handleSendNewsletter}
                    >
                        <div>
                            <h1 className="text-xl font-bold">Send Newsletter</h1>
                            <p>Compose and send a newsletter to all subscribers</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label className="font-bold">Subject</Label>
                            <Input
                                name="subject"
                                className="rounded-sm"
                                type="text"
                                placeholder="Newsletter subject"
                                value={data.subject} required
                                onChange={(e) => setData('subject', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label className="font-bold">Content</Label>
                            <Textarea
                                name="content"
                                className="rounded-sm"
                                cols="30"
                                rows="7"
                                placeholder="Write your newsletter content here ..."
                                value={data.content} required
                                onChange={(e) => setData('content', e.target.value)}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="hover:bg-alpha hover:text-black transition-all duration-150"
                        >
                            Send Newsletter
                        </Button>
                    </form>

                    {/* Sidebar */}
                    <div className="md:w-1/2 flex flex-col gap-3 shadow-lg rounded">
                        <div className="text-xl bg-white p-4 flex flex-col gap-4">
                            <h1 className="font-bold">Total Subscribers</h1>
                            <p className="font-medium">{subscribers.length}</p>
                        </div>

                        <div className="bg-white p-6">
                            <div>
                                <h1 className="text-xl font-bold">Newsletter History</h1>
                                <p>Recent newsletters sent to subscribers</p>
                            </div>

                            {lastnews.length > 0 ? (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="py-3 text-start">Subject</th>
                                            <th className="py-3 text-start">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lastnews.map((item, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="py-3 text-start">
                                                    {item.subject.length > 35
                                                        ? item.subject.slice(0, 35) + '...'
                                                        : item.subject}
                                                </td>
                                                <td className="py-3 text-start">
                                                    {item.created_at}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex flex-col items-center justify-center min-h-[40vh] text-black/50">
                                    <h1 className="text-xl font-bold">Not Available</h1>
                                    <p>It looks like you haven't sent any newsletters yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
