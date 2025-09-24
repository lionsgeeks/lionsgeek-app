import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    Ban,
    Calendar as CalendarIcon,
    CheckCircle,
    Clock,
    Code2,
    Copy,
    Edit,
    Filter,
    GraduationCap,
    Lock,
    Palette,
    RefreshCw,
    RotateCcw,
    Search,
    Trash,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { CreateSessionModal } from './partials/create-session-modal';
import { EditSessionModal } from './partials/edit-session-modal';
import AdminPageHeader from '../components/AdminPageHeader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

export default function InfoSessions() {
    const { infosessions = [] } = usePage().props;
    const [copyStates, setCopyStates] = useState({});
    const [regenerateStates, setRegenerateStates] = useState({});

    // function to extract promo from session name
    const extractPromo = (sessionName) => {
        if (!sessionName) return null;
        const colonIndex = sessionName.indexOf(':');
        if (colonIndex === -1) return null;
        const promoText = sessionName.substring(0, colonIndex).trim();

        if (promoText.toLowerCase().startsWith('promo')) {
            // Extract the number part
            const match = promoText.match(/promo\s*(\d+)/i);
            if (match) {
                return `Promo ${match[1]}`;
            }
        }
        return null;
    };

    // get unique promos from all sessions
    const getUniquePromos = () => {
        const promos = infosessions
            .map(session => extractPromo(session.name))
            .filter(promo => promo !== null)
            .map(promo => {
                const parts = promo.toLowerCase().split(' ');
                parts[0] = 'Promo';
                if (parts[1]) {
                    parts[1] = parts[1];
                }
                return parts.join(' ');
            })
            .filter((promo, index, arr) => arr.indexOf(promo) === index);

        return promos.sort((a, b) => {
            const numA = parseInt(a.replace(/\D/g, ''));
            const numB = parseInt(b.replace(/\D/g, ''));
            return numA - numB;
        });
    };

    const [promoFilter, setPromoFilter] = useState(undefined);
    const [availabilityFilter, setAvailabilityFilter] = useState(undefined);
    const uniquePromos = getUniquePromos();

    const { delete: destroy } = useForm();
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [search, setSearch] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState(null);

    const breadcrumbs = [
        {
            title: 'Info Sessions',
            href: '/admin/infosessions',
        },
    ];

    const changeAvailabilty = (id) => {
        router.patch(`infosessions/change-availabilty/${id}`);
    };

    const changeStatus = (id) => {
        router.patch(`infosessions/change-status/${id}`);
    };

    const copyPrivateUrl = (token, sessionId) => {
        const url = `${window.location.origin}/private-session/${token}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopyStates(prev => ({ ...prev, [sessionId]: false }));
            setTimeout(() => setCopyStates(prev => ({ ...prev, [sessionId]: true })), 2000);
        });
    };

    const regenerateToken = (id) => {
        router.post(`infosessions/${id}/regenerate-token`, {}, {
            onSuccess: () => {
                setRegenerateStates(prev => ({ ...prev, [id]: false }));
                setTimeout(() => setRegenerateStates(prev => ({ ...prev, [id]: true })), 2000);
            },
            onError: (errors) => console.error(errors),
        });
    };


    const onDeleteSession = (id) => {
        setSessionToDelete(id);
        setConfirmOpen(true);
    };

    const confirmDeletion = () => {
        if (!sessionToDelete) return;
        destroy(route('infosessions.destroy', sessionToDelete), {
            onSuccess: () => {
                setConfirmOpen(false);
                setSessionToDelete(null);
                router.reload({ only: ['infosessions'] });
            },
        });
    };

    const getFormationColor = (formation) => {
        return formation === 'Coding' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-purple-100 text-purple-700 border-purple-200';
    };

    const getFormationIcon = (formation) => {
        return formation === 'Coding' ? <Code2 className="h-6 w-6" /> : <Palette className="h-6 w-6" />;
    };

    // filter sessions
    const filteredSessions = infosessions.filter((session) => {
        // search filter
        const matchesSearch =
            session?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            session?.formation?.toLowerCase().includes(search?.toLowerCase());

        // promo filter
        const sessionPromo = extractPromo(session.name);
        const matchesPromo = !promoFilter || sessionPromo === promoFilter;

        let matchesAvailability = true;
        if (availabilityFilter === 'available') {
            matchesAvailability = session?.isAvailable === 1 &&
                session?.isFinish === 0;
        } else if (availabilityFilter === 'unavailable') {
            matchesAvailability = session?.isAvailable === 0 ||
                session?.isFinish === 1 ||
                session?.isFull === 1;
        }

        return matchesSearch && matchesPromo && matchesAvailability;
    });

    // Calculate statistics with safe access
    const totalSessions = infosessions?.length || 0;
    const availableSessions = infosessions?.filter((s) => s?.isAvailable)?.length || 0;
    const completedSessions = infosessions?.filter((s) => s?.isFinish)?.length || 0;
    const codingSessions = infosessions?.filter((s) => s?.formation === 'Coding')?.length || 0;
    const hasSearch = search.length > 0;
    const hasFilters = search.length > 0 || promoFilter || availabilityFilter;

    // Empty state
    if (!infosessions || infosessions.length === 0) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Info Sessions" />
                <div className="min-h-screen bg-white">
                    {/* Header Section */}
                    <AdminPageHeader
                        icon={GraduationCap}
                        title="Info Sessions Management"
                        description="Manage informational sessions and training programs"
                        actions={<CreateSessionModal open={createModalOpen} onOpenChange={setCreateModalOpen} />}
                    />

                    {/* Empty State */}
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-12 text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                    <GraduationCap className="h-12 w-12 text-gray-400" />
                                </div>
                                <h2 className="mb-3 text-2xl font-bold text-[#212529]">No Info Sessions Available</h2>
                                <p className="mx-auto mb-6 max-w-md text-gray-600">
                                    Get started by creating your first informational session to engage with potential participants.
                                </p>
                                <CreateSessionModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Info Sessions" />

            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <AdminPageHeader
                    icon={GraduationCap}
                    title="Info Sessions Management"
                    description="Manage informational sessions and training programs"
                    actions={<CreateSessionModal open={createModalOpen} onOpenChange={setCreateModalOpen} />}
                />

                {/* Statistics Cards */}
                <div className="mx-auto -mt-4 max-w-7xl px-6">
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                                        <p className="text-3xl font-bold text-[#212529]">{totalSessions}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <GraduationCap className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Available</p>
                                        <p className="text-3xl font-bold text-[#212529]">{availableSessions}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <CheckCircle className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Completed</p>
                                        <p className="text-3xl font-bold text-[#212529]">{completedSessions}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Clock className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Search Results</p>
                                        <p className="text-3xl font-bold text-[#212529]">{filteredSessions.length}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Search className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="mx-auto mb-8 max-w-7xl px-6">
                    <Card className="border-0 bg-gray-50">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-[#212529]" />
                                    <h3 className="text-lg font-semibold text-[#212529]">Filter Info Sessions</h3>
                                    {hasFilters && (
                                        <Badge variant="secondary" className="bg-gray-100 px-2 py-1 text-[#212529]">
                                            {filteredSessions.length} result{filteredSessions.length !== 1 ? 's' : ''}
                                        </Badge>
                                    )}
                                    {promoFilter && (
                                        <Badge className="bg-[#fee819] px-2 py-1 text-[#212529]">
                                            {promoFilter}
                                        </Badge>
                                    )}
                                    {availabilityFilter && (
                                        <Badge className="bg-blue-100 px-2 py-1 text-blue-700">
                                            {availabilityFilter.charAt(0).toUpperCase() + availabilityFilter.slice(1)}
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex flex-col w-full gap-3 sm:w-auto lg:flex-row lg:items-center">
                                    {/* promo select */}
                                    <Select
                                        key={`promo-${promoFilter}`}
                                        value={promoFilter}
                                        onValueChange={(value) => setPromoFilter(value === "all" ? undefined : value)}
                                    >
                                        <SelectTrigger className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#212529]/20 lg:w-45 sm:w-80">
                                            <SelectValue placeholder="Select Promo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Promos</SelectItem>
                                            {uniquePromos.map((promo, index) => (
                                                <SelectItem key={index} value={promo}>
                                                    {promo}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {/* availability select */}
                                    <Select
                                        key={`availability-${availabilityFilter}`}
                                        value={availabilityFilter}
                                        onValueChange={(value) => setAvailabilityFilter(value === "all" ? undefined : value)}
                                    >
                                        <SelectTrigger className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#212529]/20 lg:w-45 sm:w-80">
                                            <SelectValue placeholder="Select Availability" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Sessions</SelectItem>
                                            <SelectItem value="available">Available</SelectItem>
                                            <SelectItem value="unavailable">Unavailable</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="relative">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                                        <Input
                                            type="text"
                                            placeholder="Search sessions..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-10 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#212529]/20 sm:w-60"
                                        />
                                    </div>
                                    {hasFilters && (
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setSearch('');
                                                setPromoFilter(undefined);
                                                setAvailabilityFilter(undefined);
                                            }}
                                            className="border-gray-300 text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100"
                                        >
                                            <RotateCcw className="mr-2 h-4 w-4" />
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sessions Grid */}
                <div className="mx-auto max-w-7xl px-6 pb-8">
                    {filteredSessions.length === 0 ? (
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-12 text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                    <Search className="h-12 w-12 text-gray-400" />
                                </div>
                                <h2 className="mb-3 text-2xl font-bold text-[#212529]">No Results Found</h2>
                                <p className="mb-6 text-gray-600">No sessions match your search criteria. Try adjusting your search terms.</p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearch('');
                                        setPromoFilter(undefined);
                                        setAvailabilityFilter(undefined);
                                    }}
                                    className="border-gray-300 text-gray-700 hover:bg-gray-100">
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Clear All Filters
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredSessions.map((session, index) => (
                                <Card
                                    key={index}
                                    className="flex h-full transform cursor-pointer flex-col overflow-hidden border-0 bg-white p-0 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
                                    onClick={() => router.visit(`/admin/infosessions/${session.id}`)}
                                >
                                    <div className="relative bg-gray-50 p-4">
                                        <div className="mb-3 flex items-start justify-between">
                                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                                <div className="flex-shrink-0 text-[#212529]">{getFormationIcon(session.formation)}</div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="truncate text-lg font-semibold text-[#212529] capitalize flex items-center gap-2">
                                                        {session.name}
                                                        {session.is_private && (
                                                            <Lock className="h-4 w-4 text-yellow-600" />
                                                        )}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge className="w-fit bg-[#fee819] text-xs text-[#212529]">{session.formation}</Badge>
                                                        {session.is_private && (
                                                            <Badge className="w-fit bg-yellow-100 text-xs text-yellow-800">Private</Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Edit/Delete - Top Right */}
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedSession(session);
                                                        setEditModalOpen(true);
                                                    }}
                                                    className="transform text-[#212529] transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-100"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDeleteSession(session.id);
                                                    }}
                                                    className="transform text-[#ff7376] transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#ff7376]/10"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center gap-2">
                                            {session.isFinish ? (
                                                <CheckCircle className="h-4 w-4 text-[#51b04f]" />
                                            ) : session.isAvailable ? (
                                                <CheckCircle className="h-4 w-4 text-[#51b04f]" />
                                            ) : (
                                                <Ban className="h-4 w-4 text-[#ff7376]" />
                                            )}
                                            <span className="text-sm text-gray-600">
                                                {session.isFinish ? 'Completed' : session.isAvailable ? 'Available' : 'Not Available'}
                                            </span>
                                        </div>
                                    </div>

                                    <CardContent className="flex-1 p-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-shrink-0 rounded-lg bg-gray-100 p-2">
                                                    <CalendarIcon className="h-4 w-4 text-[#212529]" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm text-gray-500">Start Date</p>
                                                    <p className="font-medium text-[#212529]">
                                                        {session.start_date
                                                            ? new Date(session.start_date).toLocaleString("en-GB", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })
                                                            : ""}
                                                    </p>
                                                </div>

                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="flex-shrink-0 rounded-lg bg-gray-100 p-2">
                                                    <Users className="h-4 w-4 text-[#212529]" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm text-gray-500">Places</p>
                                                    <p className="font-medium text-[#212529]">
                                                        {session.participants_count || 0} / {session.places}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Private URL Management */}
                                            {session.is_private && session.private_url_token && (
                                                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                                                    <p className="text-xs font-medium text-yellow-800 mb-2">Private Session URL</p>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                copyPrivateUrl(session.private_url_token, session.id);
                                                            }}
                                                            className="flex-1 text-xs border-yellow-300 text-yellow-800 hover:bg-yellow-100"
                                                        >
                                                            <Copy className="h-3 w-3 mr-1" />
                                                            {copyStates[session.id] === false ? 'Copied!' : 'Copy URL'}
                                                        </Button>

                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                regenerateToken(session.id);
                                                            }}
                                                            className="text-xs border-yellow-300 text-yellow-800 hover:bg-yellow-100"
                                                        >
                                                            <RefreshCw className="h-3 w-3 mr-1" />
                                                            {regenerateStates[session.id] === false ? 'Regenerated!' : 'Regenerate'}
                                                        </Button>

                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="p-4 pt-0">
                                        <div className={`flex w-full items-center gap-2 ${session.isFinish ? 'justify-center' : 'justify-between'}`}>
                                            {/* Available/Unavailable Button - Only show if NOT completed */}
                                            {!session.isFinish && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        changeAvailabilty(session.id);
                                                    }}
                                                    className="transform text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]"
                                                >
                                                    {session.isAvailable ? 'Make Unavailable' : 'Make Available'}
                                                </Button>
                                            )}

                                            {/* Mark Complete Button */}
                                            <Button
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    changeStatus(session.id);
                                                }}
                                                className={`'bg-[#212529] hover:text-[#212529]' } transform text-white transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#fee819]`}
                                            >
                                                {session.isFinish ? 'Reopen Session' : 'Mark Complete'}
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <EditSessionModal open={editModalOpen} onOpenChange={setEditModalOpen} session={selectedSession} />

            {/* Delete Confirmation Modal */}
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Delete info session?</DialogTitle>
                    <div className="text-sm text-[#6b7280]">
                        This action cannot be undone. The info session and its data will be permanently deleted.
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setConfirmOpen(false);
                                setSessionToDelete(null);
                            }}
                            className="bg-gray-100 text-[#111827] hover:bg-gray-200"
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDeletion} className="bg-[#ff7376] text-white hover:bg-[#ff5a5e]">
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
