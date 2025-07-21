import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, router } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import logo from '../../../../../assets/images/lionsgeek_logo_2.png';
const ParticipantCard = ({ participant }) => {
    const changeStep = (action) => {
        router.patch(`/admin/participant/current-step/${participant.id}`, {
            action: action,
        });
    };
    function getConfirmationStatus(participant) {
        const step = participant.current_step;
        if (step === 'jungle') return participant.confirmation?.jungle;
        if (step.includes('school')) return participant.confirmation?.school;
        return false;
    }
    return (
        <Card className="overflow-hidden">
            <div className="relative">
                {participant.image ? (
                    <img src={'/storage/' + participant.image} className="h-72 w-full object-cover" alt={participant.full_name} />
                ) : (
                    <img src={logo} className="h-72 w-full object-cover" alt={participant.full_name} />
                )}
                <div className="absolute top-2 left-2 flex w-full justify-between gap-2 pr-6">
                    <div>
                        <Badge variant="secondary" className="mr-3 bg-black text-white">
                            {participant.current_step.replaceAll('_', ' ')}
                        </Badge>
                        {(participant.current_step === 'jungle' || participant.current_step.includes('school')) && (
                            <Badge
                                variant={getConfirmationStatus(participant) ? 'default' : 'destructive'}
                                className={getConfirmationStatus(participant) ? 'bg-green-500' : 'bg-red-500'}
                            >
                                {getConfirmationStatus(participant) ? 'Confirmed' : 'Not Confirmed'}
                            </Badge>
                        )}
                    </div>
                    <Link href={`/admin/participants/${participant.id}`}>
                        <Eye className="cursor-pointer" />
                    </Link>
                </div>
            </div>
            <CardContent className="flex flex-col gap-3 p-4">
                <div>
                    <h3 className="mb-1 text-lg font-semibold">{participant.full_name}</h3>
                    <h3 className="mb-1">{participant.email}</h3>
                    <p className="mb-1 text-sm text-gray-600 capitalize">{participant.city}</p>
                    <p className="text-sm text-gray-600 capitalize">{participant.prefecture.replaceAll('_', ' ')}</p>
                </div>
                {participant.current_step !== 'info_session' && !participant.current_step.includes('school') && (
                    <div className="flexcol flex gap-2">
                        <Button onClick={() => changeStep(participant.current_step === 'interview' ? 'daz' : 'next')} variant="default">
                            Next Step
                        </Button>
                        <Button onClick={() => changeStep('deny')} variant="destructive">
                            Deny
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ParticipantCard;
