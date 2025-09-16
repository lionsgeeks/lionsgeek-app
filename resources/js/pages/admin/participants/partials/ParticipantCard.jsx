import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Edit, 
  Mail, 
  MapPin, 
  Trash, 
  User, 
  X, 
  XCircle, 
  Loader2 
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuSeparator, 
  ContextMenuTrigger 
} from '@/components/ui/context-menu';
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader 
} from '@/components/ui/dialog';


const ParticipantCard = ({ participant }) => {
    if (!participant) return null;

    const { post, processing } = useForm();
    const [isProcessing, setIsProcessing] = useState(false);
    const [localParticipant, setLocalParticipant] = useState(participant);

    // Formation track (coding/media)
    const formationRaw = (localParticipant?.formation_field ?? localParticipant?.info_session?.formation)?.toString().toLowerCase();
    const formationLabel = formationRaw === 'coding' ? 'Coding' : formationRaw === 'media' ? 'Media' : null;
    const formationBadgeClass = 'bg-[#fee819] text-[#212529] border-[#fee819]';

    const changeStep = async (action) => {
        try {
            setIsProcessing(true);
            // Fire a background PATCH without triggering Inertia navigation
            const token = document.head.querySelector('meta[name="csrf-token"]').content;
            await fetch(`/admin/participant/current-step/${localParticipant.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ action }),
            });

            // Optimistically update local state to avoid reload and keep filters
            setLocalParticipant((prev) => {
                if (!prev) return prev;
                let nextStep = prev.current_step;
                if (action === 'daz') {
                    nextStep = 'interview_pending';
                } else if (action === 'next') {
                    if (prev.current_step === 'interview' || prev.current_step === 'interview_pending') {
                        nextStep = 'jungle';
                    } else if (prev.current_step === 'jungle') {
                        const f = formationRaw === 'coding' ? 'coding_school' : 'media_school';
                        nextStep = f;
                    }
                } else if (action === 'deny') {
                    if (prev.current_step === 'interview' || prev.current_step === 'interview_pending') {
                        nextStep = 'interview_failed';
                    } else if (prev.current_step === 'jungle') {
                        nextStep = 'jungle_failed';
                    }
                }
                return { ...prev, current_step: nextStep };
            });
        } catch (e) {
            // ignore; server state remains source of truth
        } finally {
            setIsProcessing(false);
        }
    };

    const handleApprove = (e) => {
        e.stopPropagation();
        setIsProcessing(true);
        post(route('participants.approve', participant.id), {
            onSuccess: () => window.location.reload(),
            onError: () => setIsProcessing(false),
        });
    };

    const handleReject = (e) => {
        e.stopPropagation();
        setIsProcessing(true);
        post(route('participants.reject', participant.id), {
            onError: () => setIsProcessing(false),
        });
    };

    const [isUpdateOpened, setIsUpdateOpened] = useState(false);
    const [isDeleteOpened, setIsDeleteOpened] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    const handleDelete = (e) => {
        e.stopPropagation();
        router.delete(route('participants.destroy', participant.id), {});
    };

    const getStepBadge = (step) => {
        switch (step) {
            case 'info_session':
                return 'bg-[#f2f2f2] text-[#212529]';
            case 'interview':
            case 'interview_pending':
            case 'jungle':
                return 'bg-[#fee819] text-[#212529]';
            case 'interview_failed':
            case 'jungle_failed':
                return 'bg-[#ff7376] text-white';
            default:
                return 'bg-[#212529] text-white';
        }
    };

    const getConfirmationStatus = (participant) => {
        const step = participant?.current_step;
        if (step === 'jungle') return participant?.confirmation?.jungle;
        if (step?.includes('school')) return participant?.confirmation?.school;
        return false;
    };

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger className="relative w-full">
                    <Card
                        className="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border bg-white p-0 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
                        onClick={() => router.visit(`/admin/participants/${participant.id}`)}
                    >
                        <div className="relative">
                            {participant.image ? (
                                <img
                                    src={`/storage/images/participants/${participant.image}`}
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
                                    {localParticipant?.status === 'pending' ? (
                                        <>
                                            {formationLabel && (
                                                <Badge className={`rounded-lg border text-xs font-medium ${formationBadgeClass}`}>
                                                    {formationLabel}
                                                </Badge>
                                            )}
                                            <Badge className="rounded-lg bg-orange-600 text-xs font-medium text-white">
                                                <Clock className="mr-1 h-3 w-3" />
                                                Pending Approval
                                            </Badge>
                                        </>
                                    ) : (
                                        <>
                                            <Badge className={`${getStepBadge(localParticipant?.current_step)} w-fit rounded-lg text-xs font-medium`}>
                                                {localParticipant?.current_step?.replaceAll('_', ' ') || 'Unknown'}
                                            </Badge>

                                            {participant?.status === 'rejected' && (
                                                <Badge className="rounded-lg bg-[#ff7376] text-xs font-medium text-white">
                                                    <XCircle className="mr-1 h-3 w-3" />
                                                    Rejected
                                                </Badge>
                                            )}
                                            {participant?.status === 'approved' && participant?.current_step === 'info_session' && (
                                                <Badge className="rounded-lg bg-[#51b04f] text-xs font-medium text-white">
                                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                                    Approved
                                                </Badge>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {(localParticipant?.current_step === 'jungle' || localParticipant?.current_step?.includes('school')) && (
                                        <Badge
                                            className={`${
                                                getConfirmationStatus(participant) ? 'bg-[#51b04f] text-white' : 'bg-[#ff7376] text-white'
                                            } w-fit rounded-lg text-xs font-medium`}
                                        >
                                            <CheckCircle2 className="mr-1 h-3 w-3" />
                                            {getConfirmationStatus(localParticipant) ? 'Confirmed' : 'Pending'}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        <CardContent className="flex flex-1 flex-col p-4">
                            <div className="flex-1">
                                <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-[#212529]">
                                    {participant?.full_name || 'Unknown Participant'}
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex min-h-[20px] items-center text-gray-600">
                                        <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                                        <span className="truncate">{participant?.email || 'No email'}</span>
                                    </div>
                                    <div className="flex min-h-[20px] items-center text-gray-600">
                                        <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                                        <span className="truncate capitalize">
                                            {participant?.city || 'Unknown'}
                                            {participant?.region ? `, ${participant.region.replaceAll('_', ' ')}` : 
                                             participant?.prefecture ? `, ${participant.prefecture.replaceAll('_', ' ')}` : 
                                             ', none'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex min-h-[44px] items-center border-t pt-3" onClick={(e) => e.stopPropagation()}>
                                {participant?.status === 'pending' ? (
                                    <div className="flex w-full gap-2">
                                        <Button
                                            onClick={handleApprove}
                                            disabled={isProcessing}
                                            className="flex-1 rounded-lg bg-[#51b04f] text-white hover:bg-[#459942]"
                                            size="sm"
                                        >
                                            <CheckCircle2 className="mr-1 h-4 w-4" />
                                            {isProcessing ? 'Approving...' : 'Approve'}
                                        </Button>
                                        <Button
                                            onClick={handleReject}
                                            disabled={isProcessing}
                                            variant="outline"
                                            className="rounded-lg border-[#ff7376] text-[#ff7376] hover:bg-[#ff7376] hover:text-white"
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
                                            className="flex-1 rounded-lg bg-[#51b04f] text-white hover:bg-[#459942]"
                                            size="sm"
                                        >
                                            <ArrowRight className="mr-1 h-4 w-4" />
                                            Next Step
                                        </Button>
                                        <Button
                                            onClick={() => changeStep('deny')}
                                            variant="outline"
                                            className="rounded-lg border-[#ff7376] text-[#ff7376] hover:bg-[#ff7376] hover:text-white"
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
                </ContextMenuTrigger>

                <ContextMenuContent className="w-48">
                    <ContextMenuItem
                        onClick={() => changeStep(participant?.current_step === 'interview' ? 'daz' : 'next')}
                        size="sm"
                        disabled={
                            isProcessing ||
                            participant?.status === 'pending' ||
                            participant?.status === 'rejected' ||
                            participant?.current_step?.includes('school') ||
                            participant?.current_step?.includes('failed') ||
                            participant?.current_step === 'info_session'
                        }
                        className={` ${isProcessing ? 'pointer-events-none opacity-50' : ''} `}
                    >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        {isProcessing ? 'Processing...' : 'Next Step'}
                    </ContextMenuItem>

                    <ContextMenuItem
                        onClick={() => changeStep('deny')}
                        variant="outline"
                        size="sm"
                        disabled={
                            isProcessing ||
                            participant?.status === 'pending' ||
                            participant?.status === 'rejected' ||
                            participant?.current_step?.includes('school') ||
                            participant?.current_step?.includes('failed') ||
                            participant?.current_step === 'info_session'
                        }
                        className={` ${isProcessing ? 'pointer-events-none opacity-50' : ''} text-black focus:text-black`}
                    >
                        <X className="mr-2 h-4 w-4" />
                        {isProcessing ? 'Processing...' : 'Deny'}
                    </ContextMenuItem>

                    <ContextMenuSeparator />

                    <ContextMenuItem
                        onClick={() => router.visit(`/admin/participants/${participant.id}/edit`)}
                        className={isProcessing ? 'pointer-events-none opacity-50' : 'text-black focus:text-black'}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </ContextMenuItem>
                    <ContextMenuItem
                        onClick={() => {
                            setIsDeleteOpened(true);
                            setSelectedParticipant(participant);
                        }}
                        disabled={isProcessing}
                        className={isProcessing ? 'pointer-events-none text-red-400 opacity-50' : 'text-red-500 focus:text-red-500'}
                    >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <Dialog open={isDeleteOpened} onOpenChange={setIsDeleteOpened}>
                <DialogContent className="sm:max-w-md"
                onCloseAutoFocus={() => {document.body.style.pointerEvents = '';}}>
                    <DialogHeader>
                        <DialogDescription>Are you sure you want to delete this Participant {selectedParticipant?.full_name}</DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button onClick={() => setIsDeleteOpened(false)} type="button" variant="secondary">
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

        </>
    );
};

export default ParticipantCard;
