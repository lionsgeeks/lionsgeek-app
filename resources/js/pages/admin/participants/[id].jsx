import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
    ArrowLeft, 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Calendar, 
    GraduationCap,
    CheckCircle2,
    Clock,
    Target,
    MessageSquare,
    FileText,
    TrendingUp,
    Star,
    Award,
    BookOpen,
    Edit
} from 'lucide-react';
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
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="text-center p-8">
                        <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h1 className="mb-4 text-2xl font-bold text-[#212529]">Participant Not Found</h1>
                        <p className="mb-6 text-gray-600">The participant you're looking for doesn't exist.</p>
                        <Button 
                            onClick={() => router.visit('/admin/participants')}
                            className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
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
            title: participant.full_name,
            href: `/admin/participants/${participant.id}`,
        },
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getStepColor = (step) => {
        switch(step) {
            case 'info_session':
                return "bg-[#f2f2f2] text-[#212529]";
            case 'interview':
                return "bg-[#fee819] text-[#212529]";
            case 'interview_pending':
                return "bg-[#fee819] text-[#212529]";
            case 'interview_failed':
                return "bg-[#ff7376] text-white";
            case 'jungle':
                return "bg-[#fee819] text-[#212529]";
            case 'jungle_failed':
                return "bg-[#ff7376] text-white";
            default:
                return "bg-[#212529] text-white";
        }
    };

    function getConfirmationStatus(participant) {
        const step = participant?.current_step;
        if (step === 'jungle') return participant?.confirmation?.jungle;
        if (step?.includes('school')) return participant?.confirmation?.school;
        return false;
    }
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${participant.full_name} - Participant Details`} />
            
            <div className="min-h-screen bg-white">
                {/* Header Banner */}
                <div className="bg-[#212529] text-white">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Button 
                                onClick={() => router.visit('/admin/participants')}
                                variant="ghost"
                                className="text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-200 ease-in-out"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Participants
                            </Button>
                            
                            <Button 
                                onClick={() => router.visit(`/admin/participants/${participant.id}/edit`)}
                                variant="ghost"
                                className="text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-200 ease-in-out"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        </div>

                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                            {/* Profile Image & Basic Info */}
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/10">
                                        {participant.image ? (
                                            <img 
                                                src={'/storage/images/participants/' + participant.image}   
                                                alt={participant.full_name}
                                                className="w-full h-full object-cover" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="w-8 h-8 text-white/60" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2">
                                        <div className="bg-[#fee819] rounded-full p-1">
                                            <CheckCircle2 className="w-4 h-4 text-[#212529]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-2">{participant.full_name}</h1>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge className={`${getStepColor(participant.current_step)} rounded-lg px-3 py-1 font-medium`}>
                                            {participant.current_step.replaceAll('_', ' ')}
                                        </Badge>
                                        <Badge className="bg-[#fee819] text-[#212529] rounded-lg px-3 py-1 font-medium">
                                            {participant.info_session.formation}
                                        </Badge>
                                        {(participant.current_step === 'jungle' || participant.current_step?.includes('school')) && (
                                            <Badge
                                                className={`${getConfirmationStatus(participant) 
                                                    ? 'bg-[#51b04f] text-white' 
                                                    : 'bg-[#ff7376] text-white'} rounded-lg px-3 py-1 font-medium`}
                                            >
                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                {getConfirmationStatus(participant) ? 'Confirmed' : 'Pending'}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-white/80">{participant.info_session.name}</p>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:ml-auto">
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                    <Calendar className="w-5 h-5 mx-auto mb-1 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Joined</div>
                                    <div className="text-sm font-medium">{formatDate(participant.birthday)}</div>
                                </div>
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                    <MapPin className="w-5 h-5 mx-auto mb-1 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Location</div>
                                    <div className="text-sm font-medium capitalize">{participant.city}</div>
                                </div>
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                    <Target className="w-5 h-5 mx-auto mb-1 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Gender</div>
                                    <div className="text-sm font-medium capitalize">{participant.gender}</div>
                                </div>
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                    <GraduationCap className="w-5 h-5 mx-auto mb-1 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Program</div>
                                    <div className="text-sm font-medium">{participant.info_session.formation}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6 pb-3">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Contact & Personal Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-[#212529]">
                                        <Mail className="w-5 h-5" />
                                        Contact Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Mail className="w-4 h-4 text-[#212529] flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs text-gray-500 mb-1">Email</div>
                                            <div className="text-sm font-medium text-[#212529] truncate">{participant.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Phone className="w-4 h-4 text-[#212529] flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs text-gray-500 mb-1">Phone</div>
                                            <div className="text-sm font-medium text-[#212529]">{participant.phone}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <MapPin className="w-4 h-4 text-[#212529] flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs text-gray-500 mb-1">Address</div>
                                            <div className="text-sm font-medium text-[#212529] capitalize">{participant.city}, {participant.prefecture?.replaceAll('_', ' ')}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Calendar className="w-4 h-4 text-[#212529] flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs text-gray-500 mb-1">Birthday</div>
                                            <div className="text-sm font-medium text-[#212529]">{formatDate(participant.birthday)}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-[#212529]">
                                        <BookOpen className="w-5 h-5" />
                                        Session Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Session Name</div>
                                        <div className="text-sm font-medium text-[#212529]">{participant.info_session.name}</div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Start Date</div>
                                        <div className="text-sm font-medium text-[#212529]">{participant.info_session.start_date}</div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Formation Type</div>
                                        <div className="text-sm font-medium text-[#212529]">{participant.info_session.formation}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Sidebar - More Space */}
                        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Main Content Area */}
                            <div className="space-y-6">
                            <FrequentQuestionsSection participant={participant} />
                            </div>
                            
                            {/* Sidebar Components with More Space */}
                            <div className="space-y-6">
                                <MotivationSection participant={participant} />
                                <AdminNotesSection participant={participant} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Satisfaction Metrics - Full Width Bottom */}
                <div className="px-6 pb-6">
                    <SatisfactionMetricsSection participant={participant} />
                </div>
            </div>
        </AppLayout>
    );
}
