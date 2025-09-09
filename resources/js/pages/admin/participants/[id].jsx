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
    Edit,
    XCircle,
    ArrowRight,
    X
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
        switch (step) {
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

     const changeStep = (action) => {
        router.patch(`/admin/participant/current-step/${participant.id}`, {
            action: action,
        });
    };

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
                            <div className='flex item-center gap-2 justify-center'>

                            {/* <Button
                                onClick={() => router.visit(`/admin/participants/${participant.id}/edit`)}
                                variant="ghost"
                                className="text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-200 ease-in-out"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button> */}

                            {
                                participant?.current_step !== 'info_session' && !participant?.current_step?.includes('school') && !participant?.current_step?.includes('failed') && (
                                    <div className="flex gap-2 ">
                                        <Button
                                            onClick={() => changeStep(participant?.current_step === 'interview' ? 'daz' : 'next')}
                                            className="flex-1 bg-[#51b04f] text-white hover:bg-[#459942] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-[10%]"
                                            size="sm"
                                        >
                                            <ArrowRight className="h-4 w-4 mr-1" />
                                            Next Step
                                        </Button>
                                        <Button
                                            onClick={() => changeStep('deny')}
                                            variant="outline"
                                            className="border-[#ff7376] bg-[#ff7376] text-white hover:bg-[#ff7376] hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                                            size="sm"
                                        >
                                            <X className="h-4 w-4 mr-1" />
                                            Deny
                                        </Button>
                                    </div>
                                )}
                            </div>
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
                                        <div onClick={() => router.visit(`/admin/participants/${participant.id}/edit`)} className="bg-[#fee819] rounded-full p-1">
                                            <Edit className="w-4 h-4 text-[#212529] cursor-pointer" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-2">{participant.full_name}</h1>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge className={`${getStepColor(participant.current_step)} rounded-lg px-3 py-1 font-medium`}>
                                            {participant.current_step.replaceAll('_', ' ')}
                                        </Badge>
                                        {participant.info_session ? (
                                            <Badge className="bg-[#fee819] text-[#212529] rounded-lg px-3 py-1 font-medium">
                                                {participant.info_session.formation}
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-gray-500 text-white rounded-lg px-3 py-1 font-medium">
                                                {participant.formation_field || 'No Session'}
                                            </Badge>
                                        )}
                                        {(participant.current_step === 'jungle' || participant.current_step?.includes('school')) && (
                                            <Badge
                                                className={`${getConfirmationStatus(participant)
                                                    ? 'bg-[#51b04f] text-white'
                                                    : 'bg-yellow-500 text-white'} rounded-lg px-3 py-1 font-medium`}
                                            >
                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                {getConfirmationStatus(participant) ? 'Confirmed' : 'Pending'}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-white/80">{participant.info_session?.name || 'No session assigned'}</p>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:ml-auto">
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                    <Calendar className="w-5 h-5 mx-auto mb-1 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Birthday</div>
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
                                    <div className="text-sm font-medium">{participant.info_session?.formation || participant.formation_field || 'Not assigned'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6 pb-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Contact & Personal Info */}
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

                        {/* Session Details */}
                        <Card className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <BookOpen className="w-5 h-5" />
                                    Session Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {participant.info_session ? (
                                    <>
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
                                    </>
                                ) : (
                                    <div className="text-center py-4">
                                        <div className="text-sm text-gray-500 mb-2">No session assigned yet</div>
                                        <div className="text-xs text-gray-400">
                                            {participant.formation_field && `Applied for: ${participant.formation_field}`}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Application Details */}
                        <Card className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <FileText className="w-5 h-5" />
                                    Application Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Formation Field</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.formation_field || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Region</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.region?.replaceAll('_', ' ') || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Other City</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.other_city || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Gender</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.gender || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Source</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.source || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">CV</div>
                                    <div className="text-sm font-medium text-[#212529]">
                                        {participant.cv_file ? (
                                            <a
                                                href={`/storage/cvs/${participant.cv_file}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[#212529] underline hover:text-[#fee819]"
                                            >
                                                View CV
                                            </a>
                                        ) : (
                                            '-'
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Education & Situation */}
                        <Card className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <GraduationCap className="w-5 h-5" />
                                    Education & Situation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Education Level</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.education_level || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Institution</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.diploma_institution || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Specialty</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.diploma_specialty || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Current Situation</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.current_situation || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Other Status</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.other_status || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Referring Organization</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.has_referring_organization ? `${participant.has_referring_organization} - ${participant.referring_organization || '-'}` : '-'}</div>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="text-xs text-gray-500 mb-1">Other Organization</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.other_organization || '-'}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Game Results */}
                        <Card className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <Star className="w-5 h-5" />
                                    Game Results
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Completed</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.game_completed ? 'Yes' : 'No'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Correct Answers</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.correct_answers ?? '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Levels Completed</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.levels_completed ?? '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Total Attempts</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.total_attempts ?? '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Wrong Attempts</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.wrong_attempts ?? '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Time Spent</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.time_spent_formatted || (participant.time_spent ? `${participant.time_spent}s` : '-')}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Languages */}
                        <Card className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <MessageSquare className="w-5 h-5" />
                                    Languages
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Arabic</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.arabic_level || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">French</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.french_level || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">English</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.english_level || '-'}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Background & Availability */}
                        <Card className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <Clock className="w-5 h-5" />
                                    Background & Availability
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">How heard about formation</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.how_heard_about_formation || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Current Commitments</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.current_commitments || '-'}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Training & Experience */}
                        <Card className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <TrendingUp className="w-5 h-5" />
                                    Training & Experience
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Has Training</div>
                                        <div className="text-sm font-medium text-[#212529] capitalize">{participant.has_training || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Participated in LionsGEEK</div>
                                        <div className="text-sm font-medium text-[#212529] capitalize">{participant.participated_lionsgeek || '-'}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Previous Training Details</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.previous_training_details || '-'}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">LionsGEEK Activity</div>
                                        <div className="text-sm font-medium text-[#212529]">{participant.lionsgeek_activity || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Other Activity</div>
                                        <div className="text-sm font-medium text-[#212529]">{participant.other_activity || '-'}</div>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Objectives After Formation</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.objectives_after_formation || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Priority Learning Topics</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.priority_learning_topics || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Last Self Learned</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.last_self_learned || '-'}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Questions, Motivation, Notes */}
                        <FrequentQuestionsSection participant={participant} />
                        <MotivationSection participant={participant} />
                        <AdminNotesSection participant={participant} />
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
