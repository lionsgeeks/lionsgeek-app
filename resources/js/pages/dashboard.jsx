import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import CoworkingRequests from './admin/dashboard/partials/CoworkingRequests';
import NewsLetter from './admin/dashboard/partials/NewsLetter';
import StatisticCards from './admin/dashboard/partials/StatisticCards';
import UnreadMessages from './admin/dashboard/partials/UnreadMessages';
import UpcomingEvents from './admin/dashboard/partials/UpcomingEvents';

import { BarChart3, Plus, Trash2, RefreshCw, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import Chart from './admin/dashboard/partials/charts/Charts';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@headlessui/react';
import { router } from '@inertiajs/react';


const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return 'Invalid Date';
    }
};

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

const Dashboard = () => {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
    });
    
   
    const { auth, users } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmType, setConfirmType] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // Derived users list: sort oldest->newest and filter by search term
    const filteredUsers = Array.isArray(users)
        ? [...users]
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
              .filter((u) => {
                  const q = searchQuery.trim().toLowerCase();
                  if (!q) return true;
                  return (
                      (u.name || '').toLowerCase().includes(q) ||
                      (u.email || '').toLowerCase().includes(q)
                  );
              })
        : [];

    const onAddAdmin = (e) => {
        e.preventDefault();
        post(route('add.admin'), {
            onSuccess: () => {
                reset();
               
                router.reload({ only: ['users'] });
            },
            onError: (errors) => {
                // console.log('Validation errors:', errors);
            }
        });
    };

    const openConfirm = (type, user) => {
        setConfirmType(type);
        setSelectedUser(user);
        setConfirmOpen(true);
    };

    const performConfirmedAction = () => {
        if (!confirmType || !selectedUser) return;
        setIsLoading(true);
        if (confirmType === 'reset') {
            router.post(route('admin.reset-password'), { user_id: selectedUser.id }, {
                onFinish: () => {
                    setIsLoading(false);
                    setConfirmOpen(false);
                }
            });
        } else if (confirmType === 'delete') {
            router.delete(route('user.delete', selectedUser.id), {
                onSuccess: () => {
                    router.reload({ only: ['users'] });
                },
                onFinish: () => {
                    setIsLoading(false);
                    setConfirmOpen(false);
                }
            });
        }
    };

    const handleDeleteUser = (user) => openConfirm('delete', user);

  

    const handleResetPassword = (user) => openConfirm('reset', user);

 
 
// console.log(auth);

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="min-h-screen bg-white">
                    {/* Header Section */}
                    <div className="bg-[#212529] py-8 text-white">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-[#fee819] lg:flex hidden p-3">
                                        <BarChart3 className="lg:h-8 h-4 lg:w-8 w-4 text-[#212529]" />
                                    </div>
                                    <div>
                                        <h1 className="lg:text-3xl text-2xl lg:font-bold  capitalize">Hello {auth.user.name}</h1>
                                        <p className="mt-1 text-gray-300 lg:text-lg text-[0.8rem] ">Overview of your system metrics and activities</p>
                                    </div>
                                </div>

                                {/* User Management Dialog */}
                                <Dialog open={isOpen} onOpenChange={setIsOpen}> 
                                    <DialogTrigger asChild>
                                        <Button className="flex justify-center transform cursor-pointer items-center rounded-lg bg-[#fee819] px-2 py-2 h-fit lg:w-fit w-1/3 text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
                                            <Plus className="mr-2 h-4 w-4" />
                                            <p>Add Admin</p>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[85vw] max-h-[90vh] overflow-y-auto overflow-auto p-3 sm:p-6">
                                        <DialogTitle>
                                            <div className='flex flex-col md:flex-row md:items-center  gap-1 md:gap-2'>
                                                  <UserPlus className="w-5 h-5 mr-2" />
                                                User Management 
                                                <p className="text-gray-600  text-sm">(Manage user accounts and permissions)</p>
                                            </div>
                                        </DialogTitle>
                                        
                                        {/* Content Wrapper: form + table (stack on mobile) */}
                                        <div className="flex flex-col gap-6 md:gap-8">
                                       
                                            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg w-[80vw] md:w-full">
                                          
                                            
                                            <form onSubmit={onAddAdmin} className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                                    <div>
                                                        <Label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                            Name :
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            placeholder="Username for the Account"
                                                            className="w-full"
                                                            required
                                                            disabled={processing}
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <Label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                            Email :
                                                        </Label>
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            value={data.email}
                                                            onChange={(e) => setData('email', e.target.value)}
                                                            placeholder="Email for the Account"
                                                            className="w-full text-sm py-2"
                                                            required
                                                            disabled={processing}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="flex justify-end">
                                                    <Button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="inline-flex items-center px-3 py-2 text-sm bg-alpha text-black rounded-lg hover:bg-beta hover:text-alpha focus:ring-2 focus:ring-alpha disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                    >
                                                        {processing ? (
                                                            <>
                                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                                                Adding...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Plus className="w-4 h-4 mr-2" />
                                                                Add Admin
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </form>
                                            </div>

                                        {/* Users Table */}
                                        <div className="w-full">
                                            <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
                                                <h3 className="text-lg font-semibold text-gray-800">All Users ({users?.length || 0})</h3>
                                                <div className="flex gap-2 w-full sm:w-auto">
                                                    <Input
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        placeholder="Search by name or email..."
                                                        className="w-57 md:w-80 sm:w-72"
                                                    />
                                                    <Button
                                                        onClick={() => router.reload({ only: ['users'] })}
                                                        disabled={isLoading}
                                                        className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                    >
                                                        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                                                        Refresh
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
                                                <table className="min-w-[640px] w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                                                ID
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Name
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Email
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                                                Created At
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                                                last login
                                                            </th>
                                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {filteredUsers && filteredUsers.length > 0 ? filteredUsers.map((user,id) => (
                                                            <tr key={user.id} className="hover:bg-gray-50">
                                                                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                                                                    <div className="text-sm text-gray-900">#{id+1}</div>
                                                                </td>
                                                                <td className="px-4 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                                </td>
                                                                <td className="px-4 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-600">{user.email}</div>
                                                                </td>
                                                                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                                                                    <div className="text-sm text-gray-600">{formatDate(user.created_at)}</div>
                                                                </td>
                                                                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                                                                    <div className="text-sm text-gray-600">{formatDate(user.last_login_at)}</div>
                                                                </td>
                                                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <div className="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                                                                        <button
                                                                            onClick={() => handleResetPassword(user)}
                                                                            disabled={processing || isLoading}
                                                                            className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 text-xs bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                                            title="Reset Password"
                                                                        >
                                                                            <RefreshCw className="w-3 h-3 mr-1" />
                                                                            Reset
                                                                        </button>
                                                                        
                                                               
                                                                        
                                                                        {user.id !== auth.user.id && (
                                                                            <button
                                                                                onClick={() => handleDeleteUser(user)}
                                                                                disabled={processing || isLoading}
                                                                                className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200 focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                                                title="Delete User"
                                                                            >
                                                                                <Trash2 className="w-3 h-3 mr-1" />
                                                                                Delete
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) : (
                                                            <tr>
                                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                                    {users === undefined ? (
                                                                        <div className="flex items-center justify-center">
                                                                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600 mr-3"></div>
                                                                            Loading users...
                                                                        </div>
                                                                    ) : (
                                                                        'No users found'
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        </div>

                                        {/* Modal Footer */}
                                        <div className="flex justify-end mt-6 pt-4 border-t">
                                            <Button
                                                onClick={() => setIsOpen(false)}
                                                className="px-4 py-2 bg-alpha text-black rounded-lg hover:bg-beta hover:text-alpha focus:ring-2 focus:ring-alpha transition-colors duration-200"
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                {/* Global Confirmation Dialog */}
                                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {confirmType === 'reset' && `Reset password for ${selectedUser?.name}?`}
                                              
                                                {confirmType === 'delete' && `Delete user ${selectedUser?.name}?`}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="text-sm text-gray-600">
                                            {confirmType === 'reset' && `A new password will be generated and emailed to ${selectedUser?.email}.`}
                                         
                                            {confirmType === 'delete' && `This action cannot be undone.`}
                                        </div>
                                        <DialogFooter>
                                            <button
                                                className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                                                onClick={() => setConfirmOpen(false)}
                                                type="button"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className={`inline-flex items-center rounded-md px-4 py-2 text-sm text-white ${confirmType==='delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'}`}
                                                onClick={performConfirmedAction}
                                                type="button"
                                                disabled={isLoading}
                                            >
                                                Confirm
                                            </button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="mx-auto -mt-4 max-w-7xl px-6">
                        <StatisticCards />
                    </div>

                    {/* Main Content */}
                    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
                        {/* session analysing chart */}
                        <Chart />

                        {/* Coworking request */}
                        <CoworkingRequests />
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* News Letter */}
                            <NewsLetter />
                            {/* Unread Messages */}
                            <UnreadMessages />
                        </div>

                        {/* Upcoming Events */}
                        <UpcomingEvents />
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default Dashboard;