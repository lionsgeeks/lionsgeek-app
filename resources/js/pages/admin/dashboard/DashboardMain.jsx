import { Link, useForm, usePage } from '@inertiajs/react';
import CoworkingRequests from './partials/CoworkingRequests';
import NewsLetter from './partials/NewsLetter';
import StatisticCards from './partials/StatisticCards';
import UnreadMessages from './partials/UnreadMessages';
import UpcomingEvents from './partials/UpcomingEvents';
import UpcomingSessions from './partials/UpcomingSessions';
import Chart from './partials/charts/Charts';
import { BarChart3 } from 'lucide-react';

import { useState } from 'react';

const DashboardMain = () => {
    const { sessions, upcomingEvents, blogs } = usePage().props;

    const { data, setData, post } = useForm({
        name: '',
        email: '',
    });

    const [isOpen, setIsOpen] = useState(false);
    const onAddAdmin = (e) => {
        e.preventDefault();
        post(route('add.admin'));
    };

    return (
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
                                <h1 className="text-3xl font-bold">Dashboard</h1>
                                <p className="mt-1 text-gray-300">Overview of your system metrics and activities</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="mx-auto -mt-4 max-w-7xl px-6">
                <StatisticCards />
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
                {/* session analysing chart */}
                <Chart />
                
                {/* Upcoming Session */}
                <UpcomingSessions />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* News Letter */}
                    <NewsLetter />
                    {/* Unread Messages */}
                    <UnreadMessages />
                </div>
                
                {/* Coworking request */}
                <CoworkingRequests />
                
                {/* Upcoming Events */}
                <UpcomingEvents />
            </div>
        </div>
    );
};

export default DashboardMain;
