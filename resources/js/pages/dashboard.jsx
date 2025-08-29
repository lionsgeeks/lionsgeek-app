import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import DashboardMain from './admin/dashboard/DashboardMain';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <DashboardMain />
        </AppLayout>
    );
}
