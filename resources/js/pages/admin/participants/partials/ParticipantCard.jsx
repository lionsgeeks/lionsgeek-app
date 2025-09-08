import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { router, useForm } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, User, X, XCircle } from 'lucide-react';
import { useState } from 'react';

const ParticipantCard = ({ participant }) => {
    if (!participant) {
        return null;
    }

    const { post } = useForm();
    const [isProcessing, setIsProcessing] = useState(false);

    const changeStep = (action) => {
        router.patch(`/admin/participant/current-step/${participant.id}`, {
            action: action,
        });
    };

    const handleApprove = (e) => {
        e.stopPropagation(); // Prevent card click
        setIsProcessing(true);
        post(route('participants.approve', participant.id), {
            onSuccess: () => {
                window.location.reload();
            },
            onError: () => {
                setIsProcessing(false);
            },
        });
    };

    const handleReject = (e) => {
        e.stopPropagation(); // Prevent card click
        setIsProcessing(true);
        post(route('participants.reject', participant.id), {
            onSuccess: () => {
                window.location.reload();
            },
            onError: () => {
                setIsProcessing(false);
            },
        });
    };

    function getConfirmationStatus(participant) {
        const step = participant?.current_step;
        if (step === 'jungle') return participant?.confirmation?.jungle;
        if (step?.includes('school')) return participant?.confirmation?.school;
        return false;
    }

    const getStepBadge = (step) => {
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

    return (
        <Card
            className="flex h-full transform cursor-pointer flex-col overflow-hidden rounded-lg border bg-white p-0 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
            onClick={() => router.visit(`/admin/participants/${participant.id}`)}
        >
            <div className="relative">
                {participant.image ? (
                    <img
                        src={'/storage/images/participants/' + participant.image}
                        className="h-48 w-full rounded-t-lg object-cover"
                        alt={participant.full_name}
                    />
                ) : (
                    <div className="flex h-48 w-full items-center justify-center rounded-t-lg bg-gray-100">
                        <User className="h-12 w-12 text-gray-400" />
                    </div>
                )}

                <div className="absolute top-3 right-3 left-3 flex items-start justify-between">
                    <div className="flex flex-wrap gap-1.5">
                        <Badge className={`${getStepBadge(participant?.current_step)} w-fit rounded-lg text-xs font-medium`}>
                            {participant?.current_step?.replaceAll('_', ' ') || 'Unknown'}
                        </Badge>

                        {/* Status Badge */}
                        {participant?.status === 'pending' && (
                            <Badge className="rounded-lg bg-orange-600 text-xs font-medium text-white">
                                <Clock className="mr-1 h-3 w-3" />
                                Pending Approval
                            </Badge>
                        )}
                        {participant?.status === 'rejected' && (
                            <Badge className="rounded-lg bg-[#ff7376] text-xs font-medium text-white">
                                <XCircle className="mr-1 h-3 w-3" />
                                Rejected
                            </Badge>
                        )}
                        {participant?.status === 'approved' && participant?.current_step == 'info_session' &&  (
                            <Badge className="bg-[#51b04f] text-white rounded-lg text-xs font-medium">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Approved
                            </Badge>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {(participant?.current_step === 'jungle' || participant?.current_step?.includes('school')) && (
                            <Badge
                                className={`${
                                    getConfirmationStatus(participant) ? 'bg-[#51b04f] text-white' : 'bg-[#ff7376] text-white'
                                } w-fit rounded-lg text-xs font-medium`}
                            >
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                {getConfirmationStatus(participant) ? 'Confirmed' : 'Pending'}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            <CardContent className="flex flex-1 flex-col p-4">
                <div className="flex-1">
                    <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-[#212529]">{participant?.full_name || 'Unknown Participant'}</h3>

                    <div className="space-y-2 text-sm">
                        <div className="flex min-h-[20px] items-center text-gray-600">
                            <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{participant?.email || 'No email'}</span>
                        </div>
                        <div className="flex min-h-[20px] items-center text-gray-600">
                            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="truncate capitalize">
                                {participant?.city || 'Unknown'}, {participant?.prefecture?.replaceAll('_', ' ') || 'Unknown'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Always same height */}
                <div className="mt-4 flex min-h-[44px] items-center border-t pt-3" onClick={(e) => e.stopPropagation()}>
                    {participant?.status === 'pending' ? (
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
                                className="transform rounded-lg border-[#ff7376] text-[#ff7376] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#ff7376] hover:text-white"
                                size="sm"
                            >
                                <XCircle className="mr-1 h-4 w-4" />
                                {isProcessing ? 'Rejecting...' : 'Reject'}
                            </Button>
                        </div>
                    ) : participant?.status === 'rejected' ? (
                        <div className="w-full text-center">
                            <Badge className="rounded-lg bg-[#ff7376] px-3 py-1 text-white">Rejected</Badge>
                        </div>
                    ) : participant?.current_step !== 'info_session' &&
                      !participant?.current_step?.includes('school') &&
                      !participant?.current_step?.includes('failed') ? (
                        <div className="flex w-full gap-2">
                            <Button
                                onClick={() => changeStep(participant?.current_step === 'interview' ? 'daz' : 'next')}
                                className="flex-1 transform rounded-lg bg-[#51b04f] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#459942]"
                                size="sm"
                            >
                                <ArrowRight className="mr-1 h-4 w-4" />
                                Next Step
                            </Button>
                            <Button
                                onClick={() => changeStep('deny')}
                                variant="outline"
                                className="transform rounded-lg border-[#ff7376] text-[#ff7376] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#ff7376] hover:text-white"
                                size="sm"
                            >
                                <X className="mr-1 h-4 w-4" />
                                Deny
                            </Button>
                        </div>
                    ) : participant?.current_step?.includes('school') ? (
                        <div className="w-full text-center">
                            <Badge className="rounded-lg bg-[#212529] px-3 py-1 text-white">Final Stage</Badge>
                        </div>
                    ) : participant?.current_step?.includes('failed') ? (
                        <div className="w-full text-center">
                            <p className="rounded-lg px-5 py-1 font-bold text-red-500">
                                {participant?.current_step?.replaceAll('_', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                            </p>
                        </div>
                    ) : (
                        <div className="w-full text-center text-sm text-gray-500">Awaiting Info Session</div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ParticipantCard;
