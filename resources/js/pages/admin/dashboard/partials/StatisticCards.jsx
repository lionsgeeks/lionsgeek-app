import { usePage } from '@inertiajs/react';
import { Calendar, Mail, MousePointerClick, Users } from 'lucide-react';

const StatisticCards = () => {
    const { totalContacts, members, upcomingEvents, views } = usePage().props;

    const cards = [
        {
            title: 'Total Contacts',
            value: totalContacts > 0 ? totalContacts : null,
            fallback: 'No Messages Received',
            icon: <Mail />,
        },
        {
            title: 'Events',
            value: upcomingEvents && upcomingEvents.length > 0 ? upcomingEvents.length : null,
            fallback: 'No upcoming event',
            icon: <Calendar />,
        },
        {
            title: 'Subscribers',
            value: members > 0 ? members : null,
            fallback: 'News letter is empty',
            icon: <Users />,
        },
        {
            title: 'Website visits',
            value: views?.views ?? 0,
            fallback: null,
            icon: <MousePointerClick />,
        },
    ];

    return (
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 md:gap-y-2 lg:grid-cols-4 lg:gap-y-0">
            {cards.map((card, index) => (
                <div key={index} className="flex items-start justify-around gap-x-5 rounded-lg py-6 ps-4 shadow-md">
                    <div className="flex flex-col justify-center gap-y-2">
                        <span className="text-[18px] font-bold">{card.title}</span>
                        {card.value !== null ? <p className="text-xl font-black">{card.value}</p> : card.fallback && <p>{card.fallback}</p>}
                    </div>
                    {card.icon}
                </div>
            ))}
        </div>
    );
};

export default StatisticCards;
