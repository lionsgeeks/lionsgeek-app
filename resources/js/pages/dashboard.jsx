import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import CoworkingRequests from './admin/dashboard/partials/CoworkingRequests';
import NewsLetter from './admin/dashboard/partials/NewsLetter';
import StatisticCards from './admin/dashboard/partials/StatisticCards';
import UnreadMessages from './admin/dashboard/partials/UnreadMessages';
import UpcomingEvents from './admin/dashboard/partials/UpcomingEvents';

import { BarChart3, Plus } from 'lucide-react';
import Chart from './admin/dashboard/partials/charts/Charts';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@headlessui/react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];
const Dashboard = () => {
    const { data, setData, post } = useForm({
        name: '',
        email: '',
    });
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const onAddAdmin = (e) => {
        e.preventDefault();
        post(route('add.admin'), {
            onSuccess: () => {
                setIsOpen(false);
                setData({
                    name: '',
                    email: '',
                });
            },
        });
    };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="min-h-screen bg-white">
                    {/* Header Section */}
                    <div className="bg-[#212529] py-8 text-white">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-[#fee819] p-3">
                                        <BarChart3 className="h-8 w-8 text-[#212529]" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold capitalize">Hello {auth.user.name}</h1>
                                        <p className="mt-1 text-gray-300">Overview of your system metrics and activities</p>
                                    </div>
                                </div>

                                {/* Dialog outside of Select for admin info */}
                                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="flex transform cursor-pointer items-center rounded-lg bg-[#fee819] p-2 text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Admin
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>Create a new Admin Account?</DialogTitle>

                                        <form onSubmit={onAddAdmin} className="space-y-2">
                                            <div>
                                                <Label htmlFor="name">Name:</Label>
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) => {
                                                        setData('name', e.target.value);
                                                    }}
                                                    placeholder="Username for the Account"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={data.email}
                                                    onChange={(e) => {
                                                        setData('email', e.target.value);
                                                    }}
                                                    placeholder="Email for the Account"
                                                    required
                                                />
                                            </div>

                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    className="cursor-pointer rounded-lg bg-black p-2 text-white transition-all duration-300 hover:bg-alpha hover:text-beta"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setIsOpen(false);
                                                    }}
                                                    type="button"
                                                >
                                                    Cancel
                                                </Button>

                                                <Button
                                                    className="cursor-pointer rounded-lg bg-black p-2 text-white transition-all duration-300 hover:bg-alpha hover:text-beta"
                                                    type="submit"
                                                >
                                                    Add Admin
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="mx-auto -mt-4 max-w-7xl px-6">
                        <StatisticCards />
                    </div>

                    {/* Main Content */}
                    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
                        {/* session analysing chart */}
                        <Chart />

                        {/* Upcoming Session */}
                        {/* <UpcomingSessions /> */}

                        {/* Coworking request */}
                        <CoworkingRequests />
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* News Letter */}
                            <NewsLetter />
                            {/* Unread Messages */}
                            <UnreadMessages />
                        </div>

                        {/* Upcoming Events */}
                        <UpcomingEvents />
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default Dashboard;
