import { useState, useEffect } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Upload, Loader2 } from 'lucide-react';

export default function ParticipantEdit() {
    const { participant, sessions } = usePage().props;
    const [selectedFile, setSelectedFile] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        full_name: participant?.full_name || '',
        birthday: participant?.birthday || '',
        email: participant?.email || '',
        phone: participant?.phone || '',
        city: participant?.city || '',
        prefecture: participant?.prefecture || '',
        session: participant?.info_session?.id?.toString() || '',
        step: participant?.current_step || '',
        image: null,
    });

    // Ensure form is properly initialized when participant data loads
    useEffect(() => {
        if (participant) {
            setData({
                _method: 'PUT',
                full_name: participant.full_name || '',
                birthday: participant.birthday || '',
                email: participant.email || '',
                phone: participant.phone || '',
                city: participant.city || '',
                prefecture: participant.prefecture || '',
                session: participant.info_session?.id?.toString() || '',
                step: participant.current_step || '',
                image: null,
            });
        }
    }, [participant]);

    const breadcrumbs = [
        {
            title: 'Participants',
            href: '/admin/participants',
        },
        {
            title: participant?.full_name,
            href: `/admin/participants/${participant?.id}`,
        },
        {
            title: 'Edit',
            href: `/admin/participants/${participant?.id}/edit`,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('participants.update', participant.id), {
            forceFormData: true,
            onSuccess: () => {
                router.visit(`/admin/participants/${participant.id}`);
            },
            onError: (errors) => {
                console.log('Validation errors:', errors);
            }
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setData('image', file);
    };

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editing ${participant.full_name}'s profile`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header Banner */}
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <Button 
                            onClick={() => router.visit(`/admin/participants/${participant.id}`)}
                            variant="ghost"
                            className="mb-6 text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-200 ease-in-out"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Profile
                        </Button>

                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-[#fee819] p-3">
                                <User className="h-8 w-8 text-[#212529]" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">Editing {participant.full_name}'s profile</h1>
                                <p className="mt-1 text-gray-300">Update participant information and details</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="mx-auto max-w-4xl px-6 py-8">
                    <Card className="border-0 bg-white shadow-lg">
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name and Birthday Row */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="full_name" className="text-sm font-semibold text-[#212529] mb-2 block">
                                            Full Name:
                                        </Label>
                                        <Input
                                            id="full_name"
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]"
                                            required
                                        />
                                        {errors.full_name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="birthday" className="text-sm font-semibold text-[#212529] mb-2 block">
                                            Birthday:
                                        </Label>
                                        <Input
                                            id="birthday"
                                            type="date"
                                            value={data.birthday}
                                            onChange={(e) => setData('birthday', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]"
                                            required
                                        />
                                        {errors.birthday && (
                                            <p className="mt-1 text-sm text-red-600">{errors.birthday}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Email and Phone Row */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="email" className="text-sm font-semibold text-[#212529] mb-2 block">
                                            Email:
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="phone" className="text-sm font-semibold text-[#212529] mb-2 block">
                                            Phone:
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]"
                                            required
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>

                                {/* City and Prefecture Row */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="city" className="text-sm font-semibold text-[#212529] mb-2 block">
                                            City:
                                        </Label>
                                        <Input
                                            id="city"
                                            type="text"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819] capitalize"
                                            required
                                        />
                                        {errors.city && (
                                            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="prefecture" className="text-sm font-semibold text-[#212529] mb-2 block">
                                            Prefecture:
                                        </Label>
                                        <Input
                                            id="prefecture"
                                            type="text"
                                            value={data.prefecture}
                                            onChange={(e) => setData('prefecture', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819] capitalize"
                                            required
                                        />
                                        {errors.prefecture && (
                                            <p className="mt-1 text-sm text-red-600">{errors.prefecture}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Session and Current Step Row */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="session" className="text-sm font-semibold text-[#212529] mb-2 block">
                                            Session:
                                        </Label>
                                        <Select value={data.session ? data.session.toString() : ''} onValueChange={(value) => setData('session', value)}>
                                            <SelectTrigger className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]">
                                                <SelectValue placeholder="Select a session" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sessions?.map((session) => (
                                                    <SelectItem key={session.id} value={session.id.toString()}>
                                                        {session.formation} - {session.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.session && (
                                            <p className="mt-1 text-sm text-red-600">{errors.session}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="step" className="text-sm font-semibold text-[#212529] mb-2 block">
                                            Current Step:
                                        </Label>
                                        <Select value={data.step || ''} onValueChange={(value) => setData('step', value)}>
                                            <SelectTrigger className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]">
                                                <SelectValue placeholder="Select current step" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="info_session">Info Session</SelectItem>
                                                <SelectItem value="interview">Interview</SelectItem>
                                                <SelectItem value="interview_pending">Interview Pending</SelectItem>
                                                <SelectItem value="interview_failed">Interview Failed</SelectItem>
                                                <SelectItem value="jungle">Jungle</SelectItem>
                                                <SelectItem value="jungle_failed">Jungle Failed</SelectItem>
                                                <SelectItem value="coding_school">Coding School</SelectItem>
                                                <SelectItem value="media_school">Media School</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.step && (
                                            <p className="mt-1 text-sm text-red-600">{errors.step}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Profile Image */}
                                <div>
                                    <Label className="text-sm font-semibold text-[#212529] mb-2 block">
                                        Profile Image:
                                    </Label>
                                    <div className="w-full">
                                        <label
                                            htmlFor="image"
                                            className="w-full p-4 rounded-lg cursor-pointer font-medium border-2 border-dashed border-gray-300 hover:border-[#fee819] text-[#212529] flex items-center justify-center gap-3 transition-all duration-200 hover:bg-gray-50"
                                        >
                                            <Upload className="h-5 w-5" />
                                            {selectedFile ? selectedFile.name : 'Upload Image'}
                                        </label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        {errors.image && (
                                            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#212529] text-white py-3 rounded-lg font-medium hover:bg-[#fee819] hover:text-[#212529] transition-all duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {processing ? 'Updating...' : 'Update'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
