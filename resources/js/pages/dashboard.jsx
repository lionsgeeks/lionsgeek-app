// import DashboardMain from './admin/dashboard/DashboardMain';

// const breadcrumbs = [
//     {
//         title: 'Dashboard',
//         href: '/admin/dashboard',
//     },
// ];

// export default function Dashboard() {
//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Dashboard" />
//             <DashboardMain />
//         </AppLayout>
//     );
// }
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import CoworkingRequests from './admin/dashboard/CoworkingRequests';
import NewsLetter from './admin/dashboard/NewsLetter';
import StatisticCards from './admin/dashboard/StatisticCards';
import UnreadMessages from './admin/dashboard/UnreadMessages';
import UpcomingEvents from './admin/dashboard/UpcomingEvents';
// import UpcomingSessions from './partials/UpcomingSessions';
import Chart from './admin/dashboard/charts/Charts';
// import { useState } from 'react';
const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];
const Dashboard = () => {

    // const { post } = useForm({
    //     name: '',
    //     email: '',
    // });

    // const [isOpen, setIsOpen] = useState(false);
    // const onAddAdmin = (e) => {
    //     e.preventDefault();
    //     post(route('add.admin'));
    // };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="p-6">
                    {/* <div className="flex justify-end p-2">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="transition-all duration-150 hover:bg-alpha hover:text-black">ADD ADMIN</Button>
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
                                    variant="outline"
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                    type="button"
                                >
                                    Cancel
                                </Button>

                                <Button type="submit">Add Admin</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div> */}
                    <div className="min-h-[80vh] space-y-6">
                        {/* statistique cards */}
                        <StatisticCards />
                        {/* session analysing chart */}
                        <Chart />
                        {/* Upcoming Session */}
                        {/* <UpcomingSessions /> */}
                        {/* Cowoeking request */}
                        <CoworkingRequests />
                        <div className="flex w-full gap-5">
                            {/* News Letter */}
                            <NewsLetter />
                            {/* Unread Messages */}
                            <UnreadMessages />
                        </div>
                        {/* Upcoming Events */}
                        <UpcomingEvents />

                        {/* Sessions
                <div className=""> */}
                        {/* {sessions.length > 0 && ( */}
                        {/* <div className="flex flex-col gap-y-4 rounded-lg bg-white p-4 shadow-md">
                            <h1 className="text-xl font-semibold text-black">Upcoming Info Sessions</h1>
                            <div className="mt-2 grid gap-y-8 md:grid-cols-2 md:gap-x-4 lg:grid-cols-4 lg:gap-x-2">
                                {/* {sessions.map((session) => { */}
                        {/* const startDate = new Date(session.start_date);
                                    const month = startDate.toLocaleString('default', { month: 'short' });
                                    const day = startDate.getDate();

                                    return (
                                        <div key={session.id} className="flex items-center gap-x-2">
                                            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md border shadow-sm">
                                                <div className="w-full rounded-ss-md rounded-se-md bg-gray-400 text-center text-xs font-bold">
                                                    {month}
                                                </div>
                                                <div className="text-2xl font-bold text-gray-900">{day}</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <h1
                                                    className={`w-20 rounded-full text-center font-bold md:w-32 ${session.formation === 'Coding' ? 'border-[#ffc801e2] bg-[#ffc80155]' : ''} ${session.formation === 'Media' ? 'border-[#3f6b6e] bg-[#6ad86451]' : ''} border border-[#ffc801e2]`}
                                                >
                                                    {session.formation}
                                                </h1>
                                                <h2 className="truncate text-sm font-medium text-[#919391]">{session.name}</h2>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div> */}
                        {/* )} */}
                        {/* // </div> */}



                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default Dashboard;

