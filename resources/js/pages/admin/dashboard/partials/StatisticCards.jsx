import { Card, CardContent } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { Calendar, Mail, MousePointerClick, Users } from 'lucide-react';

const StatisticCards = () => {
    const { totalContacts, members, upcomingEvents, views } = usePage().props;

    const cards = [
        {
            title: 'Total Contacts',
            value: totalContacts > 0 ? totalContacts : 0,
            fallback: 'No Messages Received',
            icon: Mail,
        },
        {
            title: 'Events',
            value: upcomingEvents && upcomingEvents.length > 0 ? upcomingEvents.length : 0,
            fallback: 'No upcoming event',
            icon: Calendar,
        },
        {
            title: 'Subscribers',
            value: members > 0 ? members : 0,
            fallback: 'News letter is empty',
            icon: Users,
        },
        {
            title: 'Website visits',
            value: views?.views ?? 0,
            fallback: null,
            icon: MousePointerClick,
        },
    ];

    return (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            {cards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                    <Card key={index} className="border-0 bg-white shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                    <p className="text-3xl font-bold text-[#212529]">{card.value}</p>
                                </div>
                                <div className="rounded-lg bg-gray-100 p-3">
                                    <IconComponent className="h-6 w-6 text-[#212529]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default StatisticCards;
