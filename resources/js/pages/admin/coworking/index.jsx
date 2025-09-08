import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Briefcase, CheckCircle2, Clock, Download, Filter, Search, Users, XCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Coworking Requests',
        href: '/admin/coworking',
    },
];

export default function CoworkingAdmin() {
    const { coworkings } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [cowID, setCowID] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { data, setData, put } = useForm({
        status: '',
    });

    const onActionForm = () => {
        put(route('coworking.update', cowID), {
            onSuccess: () => {
                setIsOpen(false);
                setData({
                    status: '',
                });
            },
        });
    };

    const onActionClick = (status, coworkID) => {
        setData('status', status);
        setCowID(coworkID);
        setIsOpen(true);
    };
    const filteredCoworkings = coworkings.filter((cow) => {
        const query = searchQuery.toLowerCase();
        return cow.full_name.toLowerCase().includes(query) || cow.email.toLowerCase().includes(query) || cow.phone.toLowerCase().includes(query);
    });

    // Calculate statistics
    const totalRequests = coworkings?.length || 0;
    const approvedRequests = coworkings?.filter((cow) => cow.status === 1)?.length || 0;
    const rejectedRequests = coworkings?.filter((cow) => cow.status === 2)?.length || 0;
    const pendingRequests = coworkings?.filter((cow) => !cow.status || cow.status === 0)?.length || 0;
    const hasSearch = searchQuery.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coworking Requests" />

            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#fee819] p-3">
                                    <Briefcase className="h-8 w-8 text-[#212529]" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Coworking Management</h1>
                                    <p className="mt-1 text-gray-300">Manage coworking space requests and applications</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button className="transform bg-[#fee819] text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Excel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mx-auto -mt-4 max-w-7xl px-6">
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                        <p className="text-3xl font-bold text-[#212529]">{totalRequests}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Users className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Pending</p>
                                        <p className="text-3xl font-bold text-[#212529]">{pendingRequests}</p>
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
                                        <p className="text-sm font-medium text-gray-600">Approved</p>
                                        <p className="text-3xl font-bold text-[#212529]">{approvedRequests}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <CheckCircle2 className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Rejected</p>
                                        <p className="text-3xl font-bold text-[#212529]">{rejectedRequests}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <XCircle className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Search Section */}
                <div className="mx-auto mb-8 max-w-7xl px-6">
                    <Card className="border-0 bg-gray-50">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-[#212529]" />
                                    <h3 className="text-lg font-semibold text-[#212529]">Filter Requests</h3>
                                    {hasSearch && (
                                        <Badge variant="secondary" className="bg-gray-100 px-2 py-1 text-[#212529]">
                                            {filteredCoworkings.length} result{filteredCoworkings.length !== 1 ? 's' : ''}
                                        </Badge>
                                    )}
                                </div>
                                <div className="relative w-full sm:w-auto">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="search"
                                        placeholder="Search by name, email or phone"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 sm:w-80"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Requests Table */}
                <div className="mx-auto max-w-7xl px-6 pb-8">
                    {filteredCoworkings?.length === 0 ? (
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-12 text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                    <Briefcase className="h-12 w-12 text-gray-400" />
                                </div>
                                <h2 className="mb-3 text-2xl font-bold text-[#212529]">No Requests Found</h2>
                                <p className="mb-6 text-gray-600">
                                    {hasSearch
                                        ? 'No coworking requests match your search criteria. Try adjusting your search terms.'
                                        : 'No coworking requests have been submitted yet.'}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200 bg-gray-50">
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#212529]">Name</th>
                                                <th className="hidden px-6 py-4 text-left text-sm font-semibold text-[#212529] sm:table-cell">
                                                    Phone
                                                </th>
                                                <th className="hidden px-6 py-4 text-left text-sm font-semibold text-[#212529] sm:table-cell">
                                                    Email
                                                </th>
                                                <th className="hidden px-6 py-4 text-left text-sm font-semibold text-[#212529] sm:table-cell">
                                                    Date
                                                </th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold text-[#212529]">Status</th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold text-[#212529]">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCoworkings.map((cow) => (
                                                <tr
                                                    key={cow.id}
                                                    onClick={() => (window.location.href = `/admin/coworking/${cow.id}`)}
                                                    className="group cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-[#212529]">{cow.full_name}</div>
                                                    </td>
                                                    <td className="hidden px-6 py-4 text-sm text-gray-600 sm:table-cell">{cow.phone}</td>
                                                    <td className="hidden px-6 py-4 text-sm text-gray-600 sm:table-cell">{cow.email}</td>
                                                    <td className="hidden px-6 py-4 text-sm text-gray-600 sm:table-cell">
                                                        {new Date(cow.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {cow.status === 1 && (
                                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                                                Approved
                                                            </Badge>
                                                        )}
                                                        {cow.status === 2 && (
                                                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                                                <XCircle className="mr-1 h-3 w-3" />
                                                                Rejected
                                                            </Badge>
                                                        )}
                                                        {(!cow.status || cow.status === 0) && (
                                                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                                                                <Clock className="mr-1 h-3 w-3" />
                                                                Pending
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    <td onClick={(e) => e.stopPropagation()} className="px-6 py-4 text-center">
                                                        {(!cow.status || cow.status === 0) && (
                                                            <div className="flex justify-center gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => onActionClick('reject', cow.id)}
                                                                    className="border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50"
                                                                >
                                                                    <XCircle className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => onActionClick('approve', cow.id)}
                                                                    className="bg-green-600 text-white hover:bg-green-700"
                                                                >
                                                                    <CheckCircle2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogTitle>Please Confirm Your Action for This Coworker?</DialogTitle>

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                onActionForm();
                            }}
                            variant={data.status == 'approve' ? 'default' : 'destructive'}
                            className="capitalize"
                        >
                            {data.status}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
