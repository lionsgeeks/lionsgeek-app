import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader 
} from '@/components/ui/dialog';
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
    Trash,
    BookOpen,
    Edit,
    ArrowRight,
    X,
    XCircle
} from 'lucide-react';
import ImagePreview from '@/components/ImagePreview';
import { AdminNotesSection } from './partials/admin-notes-section';
import { FrequentQuestionsSection } from './partials/frequent-questions-section';
import { MotivationSection } from './partials/motivation-section';
import { SatisfactionMetricsSection } from './partials/satisfaction-metrics-section';
export default function ParticipantProfilePage() {
    const { participant, participants,stepParticipant } = usePage().props;
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDeleteOpened, setIsDeleteOpened] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const notesRef = useRef(null);
    const [notesHighlight, setNotesHighlight] = useState(false);
    const { post, processing } = useForm();
    
    
    

    // Compute derived game metrics for display
    const totalLevelsConst = 20; // matches game plan length
    const maxSpeedLevelsPerMin = 5; // as specified
    const levelsCompletedVal = Number(participant?.levels_completed || 0);
    const correctAnswersVal = Number(participant?.correct_answers || 0);
    const totalAttemptsVal = Number(participant?.total_attempts || 0);
    const timeSpentSecVal = Number(participant?.time_spent || 0);

    const accuracyPct = totalAttemptsVal > 0 ? (correctAnswersVal / totalAttemptsVal) * 100 : 0;
    const progressPct = totalLevelsConst > 0 ? (levelsCompletedVal / totalLevelsConst) * 100 : 0;
    const timeSpentMin = Math.max(0.001, timeSpentSecVal / 60);
    const rawSpeed = levelsCompletedVal / timeSpentMin; // levels per minute
    const normalizedSpeedPct = maxSpeedLevelsPerMin > 0 ? (rawSpeed / maxSpeedLevelsPerMin) * 100 : 0;

    const displayFinalScore = participant?.final_score ?? Math.round(
        Math.max(0, Math.min(100, (accuracyPct * 0.5) + (progressPct * 0.3) + (normalizedSpeedPct * 0.2)))
    );

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

    // Display helper: turn snake_case or lowercased values into Title Case
    const humanize = (val) => {
        if (val === null || val === undefined) return '';
        const str = String(val).replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
        if (!str) return '';
        return str
            .split(' ')
            .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
            .join(' ');
    };

    // Helper: interpret various yes/true representations
    const isAffirmative = (val) => {
        if (val === true) return true;
        if (val === false) return false;
        if (val == null) return false;
        const s = String(val).trim().toLowerCase();
        return s === 'yes' || s === 'true' || s === '1' || s === 'oui';
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

    // Age helper (prefer backend age, fallback to calculating from birthday)
    const ageValue = (participant?.age && !isNaN(Number(participant.age)))
        ? Number(participant.age)
        : (participant?.birthday ? Math.floor((Date.now() - new Date(participant.birthday).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : null);

   const handleDelete = (e) => {
  e.stopPropagation();
 router.delete(`/admin/participants/${participant.id}`, {
    onSuccess: () => {
      router.visit("/admin/participants");
    },
  });
};
    function getConfirmationStatus(participant) {
        const step = participant?.current_step;
        if (step === 'jungle') return participant?.confirmation?.jungle;
        if (step?.includes('school')) return participant?.confirmation?.school;
        return false;
    }

      const changeStep = (action) => {
    router.patch(`/admin/participant/current-step/${participant.id}`, { action });

    // const jugleParticipants = stepParticipant.filter(p => p.current_step === participant.current_step);

    // const currentIndex = jugleParticipants.findIndex(p => p.id === participant.id);

    // const nextParticipant = jugleParticipants[currentIndex + 1];

    // if (nextParticipant) {
    //     router.visit(`/admin/participants/${nextParticipant.id}`);
    // } else {
    //     router.visit("/admin/participants");
    // }
};
   
   
const handleNavigation = () => {
//   const currentIndex = participants.findIndex(p => p.id === participant.id);
//   const nextParticipant = participants[currentIndex + 1];

  if (nextParticipant) {
    router.visit(`/admin/participants/${nextParticipant.id}`);
  } else {
    router.visit("/admin/participants");
  }
};
const handleApprove = () => {
  setIsProcessing(true);
  router.post(`/admin/participants/${participant.id}/approve`, {}, {
    onFinish: () => {
      setIsProcessing(false);
      handleNavigation(); 
    },
    onError: () => setIsProcessing(false),
  });
};

const handleReject = () => {
  setIsProcessing(true);
  router.post(`/admin/participants/${participant.id}/reject`, {}, {
    onFinish: () => {
      setIsProcessing(false);
      handleNavigation(); 
    },
    onError: () => setIsProcessing(false),
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
                            <div className='flex items-center gap-2 justify-center'>
                            <Button
                                onClick={() => {
                                    if (notesRef.current) {
                                        notesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        setNotesHighlight(true);
                                        setTimeout(() => setNotesHighlight(false), 2000);
                                    }
                                }}
                                size="sm"
                                className="h-9 min-w-[125px] rounded-lg border border-[#fee819] bg-[#fee819] text-[#212529] hover:bg-transparent hover:text-[#fee819] transition-all duration-200"
                            >
                                Admin Notes {participant?.notes?.length ? `(${participant.notes.length})` : ''}
                            </Button>

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
                                            <XCircle className="h-4 w-4 mr-1" />
                                            Deny
                                        </Button>
                                    </div>
                                )}

                            {participant?.status === 'pending' && (
                                <div className="flex w-full gap-2">
                                    <Button
                                        onClick={handleApprove}
                                        disabled={isProcessing}
                                        className="flex-1 transform rounded-lg bg-[#51b04f] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#459942]"
                                        size="sm"
                                    >
                                        <CheckCircle2 className="mr-1 h-4 w-4" />
                                        {isProcessing ? 'Approving...' : 'Approve'}
                                    </Button>
                                    <Button
                                        onClick={handleReject}
                                        disabled={isProcessing}
                                        variant="outline"
                                        className="transform rounded-lg border-[#ff7376] bg-[#ff7376] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#ff7376] hover:text-white"
                                        size="sm"
                                    >
                                        <XCircle className="mr-1 h-4 w-4" />
                                        {isProcessing ? 'Rejecting...' : 'Reject'}
                                    </Button>
                                </div>
                            )}
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                            {/* Profile Image & Basic Info */}
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div
                                        className="w-24 h-24 rounded-xl overflow-hidden bg-white/10 relative group cursor-pointer"
                                        onClick={() => participant.image && setIsImagePreviewOpen(true)}
                                    >
                                        {participant.image ? (
                                            <>
                                                <img
                                                    src={'/storage/images/participants/' + participant.image}
                                                    alt={participant.full_name}
                                                    className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                                                    style={{ transform: 'translateZ(0)' }}
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 ease-out flex items-center justify-center">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out bg-white/90 rounded-full p-1">
                                                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="w-8 h-8 text-white/60" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 flex flex-col gap-15">
                                        <div onClick={() => router.visit(`/admin/participants/${participant.id}/edit`)} className="bg-[#fee819] rounded-full p-1">
                                            <Edit className="w-4 h-4 text-[#212529] cursor-pointer" />
                                        </div>
                                        <div onClick={() => setIsDeleteOpened(true)}  className="bg-[#fee819] rounded-full p-1">
                                            <Trash className="w-4 h-4 text-[#292121] cursor-pointer" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-2">{participant.full_name}</h1>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge className={`${getStepColor(participant.current_step)} rounded-lg px-3 py-1 font-medium`}>
                                            {participant.current_step.replaceAll('_', ' ')}
                                        </Badge>
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

                            {/* Quick Stats (hidden on phone) */}
                            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:ml-auto">
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                    <Calendar className="w-5 h-5 mx-auto mb-1 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Age</div>
                                    <div className="text-sm font-medium">{ageValue != null ? `${ageValue} years` : '-'}</div>
                                </div>
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                    <BookOpen className="w-5 h-5 mx-auto mb-1 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Education</div>
                                    <div className="text-sm font-medium capitalize">{humanize(participant.education_level) || '-'}</div>
                                </div>
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                    <Target className="w-5 h-5 mx-auto mb-1 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Situation</div>
                                    <div className="text-sm font-medium capitalize">{humanize(participant.current_situation) || '-'}</div>
                                </div>
                                <div className="text-center p-3 bg-white/10 rounded-lg">
                                    <GraduationCap className="w-5 h-5 mx-auto mb-1 text-[#fee819]" />
                                    <div className="text-sm text-white/80">Program</div>
                                    <div className="text-sm font-medium">{humanize(participant.info_session?.formation || participant.formation_field) || 'Not assigned'}</div>
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
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Email</div>
                                    <div className="text-sm font-medium text-[#212529] truncate">{participant.email}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Phone</div>
                                    <div className="text-sm font-medium text-[#212529]">{participant.phone}</div>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="text-xs text-gray-500 mb-1">Address</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{
                                        [
                                            (participant.other_city ? participant.other_city : participant.city),
                                            humanize(participant.prefecture || participant.region)
                                        ].filter(Boolean).join(', ')
                                    }</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Birthday</div>
                                    <div className="text-sm font-medium text-[#212529]">{formatDate(participant.birthday)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Gender</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{humanize(participant.gender) || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">CV</div>
                                    <div className="text-sm font-medium text-[#212529]">
                                        {participant.cv_file ? (
                                            <Button asChild size="sm" className="bg-[#fee819] text-[#212529] hover:bg-[#212529] hover:text-white rounded-md transition-colors inline-flex items-center gap-2">
                                                <a href={`/storage/cvs/${participant.cv_file}`} target="_blank" rel="noreferrer">
                                                    <FileText className="h-4 w-4" />
                                                    View CV
                                                </a>
                                            </Button>
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
                                    <div className="text-sm font-medium text-[#212529] capitalize">{humanize(participant.education_level) || '-'}</div>
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
                                    <div className="text-sm font-medium text-[#212529] capitalize">{humanize(participant.current_situation) || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Other Status</div>
                                    <div className="text-sm font-medium text-[#212529]">{humanize(participant.other_status) || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Referring Organization</div>
                                    <div className="text-sm font-medium text-[#212529]">{isAffirmative(participant.has_referring_organization) ? `Yes - ${humanize(participant.referring_organization) || '-'}` : 'No'}</div>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="text-xs text-gray-500 mb-1">Other Organization</div>
                                    <div className="text-sm font-medium text-[#212529]">{humanize(participant.other_organization) || '-'}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Application Details card removed (fields relocated) */}

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
                                            <div className="text-sm font-medium text-[#212529]">{humanize(participant.info_session.formation)}</div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-4">
                                        <div className="text-sm text-gray-500 mb-2">No session assigned yet</div>
                                        <div className="text-xs text-gray-400">
                                            {participant.formation_field && `Applied for: ${humanize(participant.formation_field)}`}
                                        </div>
                                    </div>
                                )}
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
                                    <div className="text-sm font-medium text-[#212529] capitalize">{humanize(participant.arabic_level) || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">French</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{humanize(participant.french_level) || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">English</div>
                                    <div className="text-sm font-medium text-[#212529] capitalize">{humanize(participant.english_level) || '-'}</div>
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
                                    <div className="text-sm font-medium text-[#212529]">{humanize(participant.how_heard_about_formation) || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Source</div>
                                    <div className="text-sm font-medium text-[#212529]">{humanize(participant.source) || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Current Commitments</div>
                                    <div className="text-sm font-medium text-[#212529]">{humanize(participant.current_commitments) || '-'}</div>
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
                                {/* Row: Has Training | Previous Training Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Has Training</div>
                                        <div className="text-sm font-medium text-[#212529] capitalize">{humanize(participant.has_training) || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Previous Training Details</div>
                                        <div className="text-sm font-medium text-[#212529]">{participant.previous_training_details || '-'}</div>
                                    </div>
                                </div>

                                {/* Row: Participated + LionsGEEK Activity | Other Activity */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Participated in LionsGEEK</div>
                                            <div className="text-sm font-medium text-[#212529] capitalize">{humanize(participant.participated_lionsgeek) || '-'}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">LionsGEEK Activity</div>
                                            <div className="text-sm font-medium text-[#212529]">{humanize(participant.lionsgeek_activity) || '-'}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Other Activity</div>
                                        <div className="text-sm font-medium text-[#212529]">{humanize(participant.other_activity) || '-'}</div>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Objectives After Formation</div>
                                    <div className="text-sm font-medium text-[#212529]">{humanize(participant.objectives_after_formation) || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Priority Learning Topics</div>
                                    <div className="text-sm font-medium text-[#212529]">{humanize(participant.priority_learning_topics) || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Last Self Learned</div>
                                    <div className="text-sm font-medium text-[#212529]">{humanize(participant.last_self_learned) || '-'}</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Dialog open={isDeleteOpened} onOpenChange={setIsDeleteOpened}>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogDescription>Are you sure you want to delete this Participant {selectedParticipant?.full_name}</DialogDescription>
                                            </DialogHeader>
                        
                                            <DialogFooter className="sm:justify-end">
                                                <DialogClose asChild>
                                                    <Button onClick={() => setIsUpdateOpened(false)} type="button" variant="secondary">
                                                        Close
                                                    </Button>
                                                </DialogClose>
                                                <Button onClick={handleDelete} type="button" variant="destructive">
                                                    {processing ? (
                                                        <div className="flex gap-3">
                                                            <Loader2 className="animate-spin" /> Deleting ...{' '}
                                                        </div>
                                                    ) : (
                                                        'Delete'
                                                    )}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>


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
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Accuracy</div>
                                    <div className="text-sm font-medium text-[#212529]">{accuracyPct.toFixed(2)}%</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Final Score</div>
                                    <div className="text-sm font-medium text-[#212529]">{displayFinalScore}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Questions, Motivation, Notes */}
                        <FrequentQuestionsSection participant={participant} />
                        <MotivationSection participant={participant} />
                        <div ref={notesRef} className={`${notesHighlight ? 'ring-2 ring-[#fee819] rounded-lg transition-shadow duration-300' : ''}`}>
                            <AdminNotesSection participant={participant} />
                        </div>
                    </div>
                </div>

                {/* Satisfaction Metrics - Full Width Bottom */}
                <div className="px-6 pb-6">
                    <SatisfactionMetricsSection participant={participant} />
                </div>
                {/* Image Preview Modal */}
                {participant?.image && (
                    <ImagePreview
                        isOpen={isImagePreviewOpen}
                        onClose={() => setIsImagePreviewOpen(false)}
                        imageUrl={`/storage/images/participants/${participant.image}`}
                        participantName={participant.full_name}
                    />
                )}
            </div>
        </AppLayout>
    );
}
