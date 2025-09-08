import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    Edit,
    FileText,
    GraduationCap,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Star,
    Target,
    TrendingUp,
    User,
} from 'lucide-react';
import { AdminNotesSection } from './partials/admin-notes-section';
import { FrequentQuestionsSection } from './partials/frequent-questions-section';
import { MotivationSection } from './partials/motivation-section';
import { SatisfactionMetricsSection } from './partials/satisfaction-metrics-section';
export default function ParticipantProfilePage() {
    const { participant } = usePage().props;

    if (!participant) {
        return (
            <AppLayout>
                <div className="flex min-h-screen items-center justify-center bg-white">
                    <div className="p-8 text-center">
                        <User className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                        <h1 className="mb-4 text-2xl font-bold text-[#212529]">Participant Not Found</h1>
                        <p className="mb-6 text-gray-600">The participant you're looking for doesn't exist.</p>
                        <Button
                            onClick={() => router.visit('/admin/participants')}
                            className="transform rounded-lg bg-[#212529] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
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
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStepColor = (step) => {
        switch (step) {
            case 'info_session':
                return 'bg-[#f2f2f2] text-[#212529]';
            case 'interview':
                return 'bg-[#fee819] text-[#212529]';
            case 'interview_pending':
                return 'bg-[#fee819] text-[#212529]';
            case 'interview_failed':
                return 'bg-[#ff7376] text-white';
            case 'jungle':
                return 'bg-[#fee819] text-[#212529]';
            case 'jungle_failed':
                return 'bg-[#ff7376] text-white';
            default:
                return 'bg-[#212529] text-white';
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
                        <div className="mb-4 flex items-center justify-between">
                            <Button
                                onClick={() => router.visit('/admin/participants')}
                                variant="ghost"
                                className="rounded-lg text-white transition-all duration-200 ease-in-out hover:bg-[#fee819] hover:text-[#212529]"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Participants
                            </Button>

                            <Button
                                onClick={() => router.visit(`/admin/participants/${participant.id}/edit`)}
                                variant="ghost"
                                className="rounded-lg text-white transition-all duration-200 ease-in-out hover:bg-[#fee819] hover:text-[#212529]"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        </div>

                        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
                            {/* Profile Image & Basic Info */}
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="h-24 w-24 overflow-hidden rounded-xl bg-white/10">
                                        {participant.image ? (
                                            <img
                                                src={'/storage/images/participants/' + participant.image}
                                                alt={participant.full_name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <User className="h-8 w-8 text-white/60" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -right-2 -bottom-2">
                                        <div className="rounded-full bg-[#fee819] p-1">
                                            <CheckCircle2 className="h-4 w-4 text-[#212529]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h1 className="mb-2 text-3xl font-bold">{participant.full_name}</h1>
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        <Badge className={`${getStepColor(participant.current_step)} rounded-lg px-3 py-1 font-medium`}>
                                            {participant.current_step.replaceAll('_', ' ')}
                                        </Badge>
                                        {participant.info_session ? (
                                            <Badge className="rounded-lg bg-[#fee819] px-3 py-1 font-medium text-[#212529]">
                                                {participant.info_session.formation}
                                            </Badge>
                                        ) : (
                                            <Badge className="rounded-lg bg-gray-500 px-3 py-1 font-medium text-white">
                                                {participant.formation_field || 'No Session'}
                                            </Badge>
                                        )}
                                        {(participant.current_step === 'jungle' || participant.current_step?.includes('school')) && (
                                            <Badge
                                                className={`${
                                                    getConfirmationStatus(participant) ? 'bg-[#51b04f] text-white' : 'bg-yellow-500 text-white'
                                                } rounded-lg px-3 py-1 font-medium`}
                                            >
                                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                                {getConfirmationStatus(participant) ? 'Confirmed' : 'Pending'}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-white/80">{participant.info_session?.name || 'No session assigned'}</p>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 lg:ml-auto lg:grid-cols-4">
                                <div className="rounded-lg bg-white/10 p-3 text-center">
                                    <Calendar className="mx-auto mb-1 h-5 w-5 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Birthday</div>
                                    <div className="text-sm font-medium">{formatDate(participant.birthday)}</div>
                                </div>
                                <div className="rounded-lg bg-white/10 p-3 text-center">
                                    <MapPin className="mx-auto mb-1 h-5 w-5 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Location</div>
                                    <div className="text-sm font-medium capitalize">{participant.city}</div>
                                </div>
                                <div className="rounded-lg bg-white/10 p-3 text-center">
                                    <Target className="mx-auto mb-1 h-5 w-5 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Gender</div>
                                    <div className="text-sm font-medium capitalize">{participant.gender}</div>
                                </div>
                                <div className="rounded-lg bg-white/10 p-3 text-center">
                                    <GraduationCap className="mx-auto mb-1 h-5 w-5 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Program</div>
                                    <div className="text-sm font-medium">
                                        {participant.info_session?.formation || participant.formation_field || 'Not assigned'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6 pb-3">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {/* Contact & Personal Info */}
                        <Card className="rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <Mail className="h-5 w-5" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                    <Mail className="h-4 w-4 flex-shrink-0 text-[#212529]" />
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 text-xs text-gray-500">Email</div>
                                        <div className="truncate text-sm font-medium text-[#212529]">{participant.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                    <Phone className="h-4 w-4 flex-shrink-0 text-[#212529]" />
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 text-xs text-gray-500">Phone</div>
                                        <div className="text-sm font-medium text-[#212529]">{participant.phone}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                    <MapPin className="h-4 w-4 flex-shrink-0 text-[#212529]" />
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 text-xs text-gray-500">Address</div>
                                        <div className="text-sm font-medium text-[#212529] capitalize">
                                            {participant.city}, {participant.prefecture?.replaceAll('_', ' ')}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                    <Calendar className="h-4 w-4 flex-shrink-0 text-[#212529]" />
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 text-xs text-gray-500">Birthday</div>
                                        <div className="text-sm font-medium text-[#212529]">{formatDate(participant.birthday)}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Session Details */}
                        <Card className="rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <BookOpen className="h-5 w-5" />
                                    Session Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {participant.info_session ? (
                                    <>
                                        <div>
                                            <div className="mb-1 text-xs text-gray-500">Session Name</div>
                                            <div className="text-sm font-medium text-[#212529]">{participant.info_session.name}</div>
                                        </div>
                                        <Separator />
                                        <div>
                                            <div className="mb-1 text-xs text-gray-500">Start Date</div>
                                            <div className="text-sm font-medium text-[#212529]">{participant.info_session.start_date}</div>
                                        </div>
                                        <Separator />
                                        <div>
                                            <div className="mb-1 text-xs text-gray-500">Formation Type</div>
                                            <div className="text-sm font-medium text-[#212529]">{participant.info_session.formation}</div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-4 text-center">
                                        <div className="mb-2 text-sm text-gray-500">No session assigned yet</div>
                                        <div className="text-xs text-gray-400">
                                            {participant.formation_field && `Applied for: ${participant.formation_field}`}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Application Details */}
                        <Card className="rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <FileText className="h-5 w-5" />
                                    Application Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Formation Field</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.formation_field || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Region</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">
                                        {participant.region?.replaceAll('_', ' ') || '-'}
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Other City</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.other_city || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Gender</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.gender || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Source</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.source || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">CV</div>
                                    <div className="text-sm font-medium text-[#212529]">
                                        {participant.cv_file ? (
                                            <a
                                                href={`/storage/${participant.cv_file}`}
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
                        <Card className="rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <GraduationCap className="h-5 w-5" />
                                    Education & Situation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Education Level</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.education_level || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Institution</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.diploma_institution || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Specialty</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.diploma_specialty || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Current Situation</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.current_situation || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Other Status</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.other_status || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Referring Organization</div>
                                    <div className="text-sm font-medium text-[#212529]">
                                        {participant.has_referring_organization
                                            ? `${participant.has_referring_organization} - ${participant.referring_organization || '-'}`
                                            : '-'}
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="mb-1 text-xs text-gray-500">Other Organization</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.other_organization || '-'}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Game Results */}
                        <Card className="rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <Star className="h-5 w-5" />
                                    Game Results
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Completed</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.game_completed ? 'Yes' : 'No'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Correct Answers</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.correct_answers ?? '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Levels Completed</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.levels_completed ?? '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Total Attempts</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.total_attempts ?? '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Wrong Attempts</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.wrong_attempts ?? '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Time Spent</div>
                                    <div className="text-sm font-medium text-[#212529]">
                                        {participant.time_spent_formatted || (participant.time_spent ? `${participant.time_spent}s` : '-')}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Languages */}
                        <Card className="rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <MessageSquare className="h-5 w-5" />
                                    Languages
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Arabic</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.arabic_level || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">French</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.french_level || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">English</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{participant.english_level || '-'}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Background & Availability */}
                        <Card className="rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <Clock className="h-5 w-5" />
                                    Background & Availability
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">How heard about formation</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.how_heard_about_formation || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Current Commitments</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.current_commitments || '-'}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Training & Experience */}
                        <Card className="rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-[#212529]">
                                    <TrendingUp className="h-5 w-5" />
                                    Training & Experience
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="mb-1 text-xs text-gray-500">Has Training</div>
                                        <div className="text-sm font-medium text-[#212529] capitalize">{participant.has_training || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-xs text-gray-500">Participated in LionsGEEK</div>
                                        <div className="text-sm font-medium text-[#212529] capitalize">
                                            {participant.participated_lionsgeek || '-'}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Previous Training Details</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.previous_training_details || '-'}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="mb-1 text-xs text-gray-500">LionsGEEK Activity</div>
                                        <div className="text-sm font-medium text-[#212529]">{participant.lionsgeek_activity || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-xs text-gray-500">Other Activity</div>
                                        <div className="text-sm font-medium text-[#212529]">{participant.other_activity || '-'}</div>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Objectives After Formation</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.objectives_after_formation || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Priority Learning Topics</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.priority_learning_topics || '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs text-gray-500">Last Self Learned</div>
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
