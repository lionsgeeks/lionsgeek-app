import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Loader2, Upload, User } from 'lucide-react';
import { useEffect, useState } from 'react';

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
        formation_field: participant?.formation_field || '',
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
                formation_field: participant.formation_field || '',
                image: null,
            });
        }
    }, [participant]);

    // Clear prefecture when city is not Casablanca
    useEffect(() => {
        const city = (data.city || '').toString().trim().toLowerCase();
        if (city !== 'casablanca' && data.prefecture) {
            setData('prefecture', '');
        }
    }, [data.city]);

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

        post(`/admin/participants/${participant.id}`, {
            forceFormData: true,
            onSuccess: () => {
                router.visit(`/admin/participants/${participant.id}`);
            },
            onError: (errors) => {},
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
                            className="mb-6 rounded-lg text-white transition-all duration-200 ease-in-out hover:bg-[#fee819] hover:text-[#212529]"
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
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <div>
                                        <Label htmlFor="full_name" className="mb-2 block text-sm font-semibold text-[#212529]">
                                            Full Name:
                                        </Label>
                                        <Input
                                            id="full_name"
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]"
                                        />
                                        {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="birthday" className="mb-2 block text-sm font-semibold text-[#212529]">
                                            Birthday:
                                        </Label>
                                        <Input
                                            id="birthday"
                                            type="date"
                                            value={data.birthday}
                                            onChange={(e) => setData('birthday', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]"
                                        />
                                        {errors.birthday && <p className="mt-1 text-sm text-red-600">{errors.birthday}</p>}
                                    </div>
                                </div>

                                {/* Email and Phone Row */}
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <div>
                                        <Label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#212529]">
                                            Email:
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]"
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#212529]">
                                            Phone:
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]"
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* City and Prefecture Row */}
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <div>
                                        <Label htmlFor="city" className="mb-2 block text-sm font-semibold text-[#212529]">
                                            City:
                                        </Label>
                                        <Select value={(data.city || '').toString()} onValueChange={(value) => setData('city', value)}>
                                            <SelectTrigger className="w-full rounded-lg border border-gray-300 capitalize focus:border-[#fee819] focus:ring-[#fee819]">
                                                <SelectValue placeholder="Select your city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="casablanca">Casablanca</SelectItem>
                                                <SelectItem value="rabat">Rabat</SelectItem>
                                                <SelectItem value="marrakech">Marrakech</SelectItem>
                                                <SelectItem value="fes">Fès</SelectItem>
                                                <SelectItem value="tanger">Tanger</SelectItem>
                                                <SelectItem value="agadir">Agadir</SelectItem>
                                                <SelectItem value="meknes">Meknès</SelectItem>
                                                <SelectItem value="oujda">Oujda</SelectItem>
                                                <SelectItem value="kenitra">Kenitra</SelectItem>
                                                <SelectItem value="tetouan">Tétouan</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                    </div>
                                    {(data.city || '').toString().trim().toLowerCase() === 'casablanca' && (
                                        <div>
                                            <Label htmlFor="prefecture" className="mb-2 block text-sm font-semibold text-[#212529]">
                                                Prefecture:
                                            </Label>
                                            <Select value={data.prefecture || ''} onValueChange={(value) => setData('prefecture', value)}>
                                                <SelectTrigger className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]">
                                                    <SelectValue placeholder="Select prefecture" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ain_chock">Aïn Chock</SelectItem>
                                                    <SelectItem value="ain_sebaa_hay_mohammadi">Aïn Sebaâ - Hay Mohammadi</SelectItem>
                                                    <SelectItem value="al_fida_mers_sultan">Al Fida - Mers Sultan</SelectItem>
                                                    <SelectItem value="anfa">Anfa</SelectItem>
                                                    <SelectItem value="ben_msick">Ben M'Sick</SelectItem>
                                                    <SelectItem value="bernoussi">Bernoussi</SelectItem>
                                                    <SelectItem value="hay_hassani">Hay Hassani</SelectItem>
                                                    <SelectItem value="mohammedia">Mohammedia</SelectItem>
                                                    <SelectItem value="nouaceur">Nouaceur</SelectItem>
                                                    <SelectItem value="sidi_bernoussi">Sidi Bernoussi</SelectItem>
                                                    <SelectItem value="sidi_othmane">Sidi Othmane</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.prefecture && <p className="mt-1 text-sm text-red-600">{errors.prefecture}</p>}
                                        </div>
                                    )}
                                </div>

                                {/* Session and Current Step Row */}
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <div>
                                        <Label htmlFor="session" className="mb-2 block text-sm font-semibold text-[#212529]">
                                            Session:
                                        </Label>
                                        <Select
                                            value={data.session ? data.session.toString() : ''}
                                            onValueChange={(value) => setData('session', value)}
                                        >
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
                                        {errors.session && <p className="mt-1 text-sm text-red-600">{errors.session}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="step" className="mb-2 block text-sm font-semibold text-[#212529]">
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
                                        {errors.step && <p className="mt-1 text-sm text-red-600">{errors.step}</p>}
                                    </div>
                                </div>

                                {/* Formation Field */}
                                <div>
                                    <Label htmlFor="formation_field" className="mb-2 block text-sm font-semibold text-[#212529]">
                                        Formation Field:
                                    </Label>
                                    <Select value={data.formation_field || ''} onValueChange={(value) => setData('formation_field', value)}>
                                        <SelectTrigger className="w-full rounded-lg border border-gray-300 focus:border-[#fee819] focus:ring-[#fee819]">
                                            <SelectValue placeholder="Select formation field" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="coding">Coding</SelectItem>
                                            <SelectItem value="media">Media</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.formation_field && <p className="mt-1 text-sm text-red-600">{errors.formation_field}</p>}
                                </div>

                                {/* Profile Image */}
                                <div>
                                    <Label className="mb-2 block text-sm font-semibold text-[#212529]">Profile Image:</Label>
                                    <div className="w-full">
                                        <label
                                            htmlFor="image"
                                            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 font-medium text-[#212529] transition-all duration-200 hover:border-[#fee819] hover:bg-gray-50"
                                        >
                                            <Upload className="h-5 w-5" />
                                            {selectedFile ? selectedFile.name : 'Upload Image'}
                                        </label>
                                        <input id="image" name="image" type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full transform rounded-lg bg-[#212529] py-3 font-medium text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
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
