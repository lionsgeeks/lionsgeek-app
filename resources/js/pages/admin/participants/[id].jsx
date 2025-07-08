import AppLayout from '@/layouts/app-layout';
import { useForm, usePage } from '@inertiajs/react';
import { AdminNotesSection } from './partials/admin-notes-section';
import { FrequentQuestionsSection } from './partials/frequent-questions-section';
import { MotivationSection } from './partials/motivation-section';
import { ParticipantProfileHeader } from './partials/participant-profile-header';
import { SatisfactionMetricsSection } from './partials/satisfaction-metrics-section';
export default function ParticipantProfilePage() {
    const { participant } = usePage().props;
    console.log(participant);
    const { data, setData, processing } = useForm();
    //   const params = useParams()
    //   const router = useRouter()
    // const participantId = params.id;
    // const { getParticipant, updateParticipant, addAdminNote, loading } = useParticipants();
    // const participant = getParticipant(participantId);

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
    const updateParticipant = () => {
        console.log('e');
    };
    const addAdminNote = () => {
        console.log('e');
    };
    return (
        <AppLayout>
            <div className="bg-gray-50">
                {/* Header with participant name and actions */}
                {/* <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.push('/admin/participants')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                    </Button>
                    <h1 className="text-xl font-semibold text-gray-900">{participant?.full_name}'s Profile</h1>
                    </div>
                    <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent text-red-600 hover:text-red-700">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                    </Button>
                    </div>
                    </div>
                    </div> */}

                {/* Profile Content */}
                <div className="mx-auto p-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Left Column - Profile Info */}
                        <div className="space-y-6 lg:col-span-2">
                            <ParticipantProfileHeader participant={participant} />
                            <MotivationSection participant={participant} onUpdate={updateParticipant} loading={processing} />
                            <SatisfactionMetricsSection participant={participant} onUpdate={updateParticipant} loading={processing} />
                            <AdminNotesSection participant={participant} onAddNote={addAdminNote} loading={processing} />
                        </div>

                        {/* Right Column - Frequent Questions */}
                        <div className="lg:col-span-2">
                            <FrequentQuestionsSection participant={participant} onUpdate={updateParticipant} loading={processing} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
