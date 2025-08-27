import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, router } from '@inertiajs/react';
import { MapPin, Mail, User, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import logo from '../../../../../assets/images/lionsgeek_logo_2.png';

const ParticipantCard = ({ participant }) => {
    if (!participant) {
        return null;
    }

    const changeStep = (action) => {
        router.patch(`/admin/participant/current-step/${participant.id}`, {
            action: action,
        });
    };
    
    function getConfirmationStatus(participant) {
        const step = participant?.current_step;
        if (step === 'jungle') return participant?.confirmation?.jungle;
        if (step?.includes('school')) return participant?.confirmation?.school;
        return false;
    }

    const getStepBadge = (step) => {
        switch(step) {
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
            className="border rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-[1.02] bg-white h-full flex flex-col overflow-hidden p-0 cursor-pointer"
            onClick={() => router.visit(`/admin/participants/${participant.id}`)}
        >
            <div className="relative">
                {participant.image ? (
                    <img 
                        src={'/storage/images/participants/' + participant.image} 
                        className="h-48 w-full object-cover rounded-t-lg" 
                        alt={participant.full_name} 
                    />
                ) : (
                    <div className="h-48 w-full bg-gray-100 flex items-center justify-center rounded-t-lg">
                        <User className="h-12 w-12 text-gray-400" />
                    </div>
                )}
                
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <div className="flex flex-wrap gap-1.5">
                        <Badge className={`${getStepBadge(participant?.current_step)} rounded-lg text-xs font-medium w-fit`}>
                            {participant?.current_step?.replaceAll('_', ' ') || 'Unknown'}
                        </Badge>
                        {(participant?.current_step === 'jungle' || participant?.current_step?.includes('school')) && (
                            <Badge
                                className={`${getConfirmationStatus(participant) 
                                    ? 'bg-[#51b04f] text-white' 
                                    : 'bg-[#ff7376] text-white'} rounded-lg text-xs font-medium w-fit`}
                            >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                {getConfirmationStatus(participant) ? 'Confirmed' : 'Pending'}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
            
            <CardContent className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#212529] mb-3 line-clamp-2">
                        {participant?.full_name || 'Unknown Participant'}
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600 min-h-[20px]">
                            <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{participant?.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center text-gray-600 min-h-[20px]">
                            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="capitalize truncate">{participant?.city || 'Unknown'}, {participant?.prefecture?.replaceAll('_', ' ') || 'Unknown'}</span>
                        </div>
                    </div>
                </div>

                            {/* Action Buttons - Always same height */}
            <div className="mt-4 pt-3 border-t min-h-[44px] flex items-center" onClick={(e) => e.stopPropagation()}>
                {participant?.current_step !== 'info_session' && !participant?.current_step?.includes('school') ? (
                    <div className="flex gap-2 w-full">
                        <Button 
                            onClick={() => changeStep(participant?.current_step === 'interview' ? 'daz' : 'next')} 
                            className="flex-1 bg-[#51b04f] text-white hover:bg-[#459942] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                            size="sm"
                        >
                            <ArrowRight className="h-4 w-4 mr-1" />
                            Next Step
                        </Button>
                        <Button 
                            onClick={() => changeStep('deny')} 
                            variant="outline"
                            className="border-[#ff7376] text-[#ff7376] hover:bg-[#ff7376] hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                            size="sm"
                        >
                            <X className="h-4 w-4 mr-1" />
                            Deny
                        </Button>
                    </div>
                    ) : participant?.current_step?.includes('school') ? (
                        <div className="w-full text-center">
                            <Badge className="bg-[#212529] text-white rounded-lg px-3 py-1">
                                Final Stage
                            </Badge>
                        </div>
                    ) : (
                        <div className="w-full text-center text-sm text-gray-500">
                            Awaiting Info Session
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ParticipantCard;
