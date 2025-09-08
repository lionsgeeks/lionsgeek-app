import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CheckCircle2, Mail, MapPin, Phone, User } from 'lucide-react';

export function ParticipantProfileHeader({ participant }) {
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

    const getFormationColor = (formation) => {
        return formation === 'Coding' ? 'bg-[#fee819] text-[#212529]' : 'bg-[#fee819] text-[#212529]';
    };

    return (
        <Card className="rounded-lg border bg-white shadow-md">
            <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="h-32 w-32 overflow-hidden rounded-lg bg-gray-100">
                            {participant?.image ? (
                                <img
                                    src={'/storage/images/participants/' + participant.image}
                                    alt={participant.full_name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <User className="h-12 w-12 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div className="absolute -right-2 -bottom-2">
                            <div className="rounded-full bg-white p-1 shadow-md">
                                <CheckCircle2 className="h-5 w-5 text-[#fee819]" />
                            </div>
                        </div>
                    </div>

                    {/* Name and badges */}
                    <div>
                        <h1 className="mb-2 text-xl font-bold text-[#212529]">{participant.full_name}</h1>
                        <div className="flex flex-col gap-2">
                            <Badge className={`${getStepColor(participant.current_step)} rounded-lg px-3 py-1`}>
                                {participant.current_step.replaceAll('_', ' ')}
                            </Badge>
                            <Badge className={`${getFormationColor(participant.info_session.formation)} rounded-lg px-3 py-1`}>
                                {participant.info_session.formation}
                            </Badge>
                        </div>
                    </div>

                    {/* Contact info */}
                    <div className="w-full space-y-3">
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="rounded-lg bg-gray-50 p-2">
                                <Mail className="h-4 w-4 text-[#212529]" />
                            </div>
                            <span className="text-sm">{participant.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="rounded-lg bg-gray-50 p-2">
                                <Phone className="h-4 w-4 text-[#212529]" />
                            </div>
                            <span className="text-sm">{participant.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="rounded-lg bg-gray-50 p-2">
                                <Calendar className="h-4 w-4 text-[#212529]" />
                            </div>
                            <span className="text-sm">{formatDate(participant.birthday)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="rounded-lg bg-gray-50 p-2">
                                <MapPin className="h-4 w-4 text-[#212529]" />
                            </div>
                            <span className="text-sm capitalize">
                                {participant.city}, {participant.prefecture?.replaceAll('_', ' ')}
                            </span>
                        </div>
                    </div>

                    {/* Session details */}
                    <div className="w-full rounded-lg bg-gray-50 p-4">
                        <h3 className="mb-2 font-medium text-[#212529]">Session Details</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>
                                <span className="font-medium">Session:</span> {participant.info_session.name}
                            </p>
                            <p>
                                <span className="font-medium">Start Date:</span> {participant.info_session.start_date}
                            </p>
                            <p>
                                <span className="font-medium">Gender:</span> <span className="capitalize">{participant.gender}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
