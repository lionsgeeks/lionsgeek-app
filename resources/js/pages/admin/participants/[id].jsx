import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { AdminNotesSection } from './partials/admin-notes-section';
import { FrequentQuestionsSection } from './partials/frequent-questions-section';
import { MotivationSection } from './partials/motivation-section';
import { ParticipantProfileHeader } from './partials/participant-profile-header';
import { SatisfactionMetricsSection } from './partials/satisfaction-metrics-section';
export default function ParticipantProfilePage() {
    const { participant } = usePage().props;

    if (!participant) {
        return (
            <AppLayout>
                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* <AdminHeader /> */}
                    <div className="py-12 text-center">
                        <h1 className="mb-4 text-2xl font-bold text-gray-900">Participant Not Found</h1>
                        <p className="mb-6 text-gray-600">The participant you're looking for doesn't exist.</p>
                        <Button onClick={() => router.push('/admin/participants')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Participants
                        </Button>
                    </div>
                </div>
            </AppLayout>
        );
    }
    const breadcrumbs = [
        {
            title: 'Participants',
            href: '/admin/participants',
        },
        {
            title: 'Participant Details',
            href: `/admin/participants/${participant.id}`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participant Details" />
            <div className="bg-gray-50">
                {/* Profile Content */}
                <div className="mx-auto p-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Left Column - Profile Info */}
                        <div className="space-y-6 lg:col-span-2">
                            <ParticipantProfileHeader participant={participant} />
                            <MotivationSection participant={participant} />
                            <SatisfactionMetricsSection participant={participant} />
                            <AdminNotesSection participant={participant} />
                        </div>
                        {/* Right Column - Frequent Questions */}
                        <div className="lg:col-span-2">
                            <FrequentQuestionsSection participant={participant} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
