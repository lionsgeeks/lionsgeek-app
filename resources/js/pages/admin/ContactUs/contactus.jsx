import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    Trash2, 
    Mail, 
    User, 
    Users, 
    TypeOutline, 
    FileMinus, 
    MessageCircle, 
    CheckCircle2, 
    Clock, 
    Send, 
    Download, 
    Filter,
    Search,
    Plus,
    Inbox,
    MailOpen
} from 'lucide-react';

export default function Index() {
    const { messages, selected } = usePage().props;
    const [activeId, setActiveId] = useState(selected?.id || null);
    const [isComposing, setIsComposing] = useState(false);
    const [filter, setFilter] = useState('all');
    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);

    const [emailData, setEmailData] = useState({
        receiver: '',
        cc: '',
        bcc: '',
        subject: '',
        content: '',
        sender: '',

    });

    const handleReply = () => {
        setIsComposing(true);
        setActiveId(null);
        setEmailData({
            sender: '',
            receiver: selectedMessage.email,
            cc: '',
            bcc: '',
            subject: `Re: ${selectedMessage.subject || ''}`,
            content: '',
        });
    };

    const handleSelect = (id) => {
        setActiveId(id);
        setIsComposing(false);
    };

    const handleComposeClick = () => {
        setIsComposing(true);
        setActiveId(null);
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        router.post(route('messages.send'), emailData, {
            preserveScroll: true,
            preserveState: true,
        });
    };


    const selectedMessage = activeId
        ? messages.find(message => message.id === activeId)
        : null;

    const toggleReadStatus = () => {
        router.put(route('email.markread', selectedMessage.id), {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('contact.destroy', selectedMessage.id));
        }
    };

    const filteredMessages = messages.filter((message) => {
        if (filter === 'sended') return message.sender;
        if (filter === 'received') return !message.sender;
        return true;
    });

    // Breadcrumbs
    const breadcrumbs = [
        {
            title: 'Contact Messages',
            href: '/admin/contacts',
        },
    ];

    // Calculate statistics
    const totalMessages = messages?.length || 0;
    const unreadMessages = messages?.filter(msg => !msg.mark_as_read)?.length || 0;
    const sentMessages = messages?.filter(msg => msg.sender)?.length || 0;
    const receivedMessages = messages?.filter(msg => !msg.sender)?.length || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Messages" />

            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#fee819] p-3">
                                    <MessageCircle className="h-8 w-8 text-[#212529]" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Contact Messages</h1>
                                    <p className="mt-1 text-gray-300">Manage customer inquiries and communications</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button 
                                    onClick={handleComposeClick}
                                    className="transform bg-[#212529] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Compose
                                </Button>
                                <Button
                                    onClick={() => window.location.href = route('messages.export')}
                                    className="transform bg-[#fee819] text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]"
                                >
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
                                        <p className="text-sm font-medium text-gray-600">Total Messages</p>
                                        <p className="text-3xl font-bold text-[#212529]">{totalMessages}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Mail className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Unread</p>
                                        <p className="text-3xl font-bold text-[#212529]">{unreadMessages}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <MailOpen className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Received</p>
                                        <p className="text-3xl font-bold text-[#212529]">{receivedMessages}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Inbox className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Sent</p>
                                        <p className="text-3xl font-bold text-[#212529]">{sentMessages}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Send className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="mx-auto max-w-7xl px-6 pb-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Messages Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="border-0 bg-white shadow-lg">
                                <CardContent className="p-0">
                                    {/* Inbox Header */}
                                    <div className="border-b border-gray-200 p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Inbox className="h-5 w-5 text-[#212529]" />
                                            <h2 className="text-lg font-semibold text-[#212529]">Inbox</h2>
                                        </div>
                                        
                                        {/* Filter Buttons */}
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant={filter === 'all' ? 'default' : 'outline'}
                                                onClick={() => setFilter('all')}
                                                className={filter === 'all' ? 'bg-[#212529] text-white' : 'border-gray-300 text-gray-600'}
                                            >
                                                All
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={filter === 'received' ? 'default' : 'outline'}
                                                onClick={() => setFilter('received')}
                                                className={filter === 'received' ? 'bg-[#212529] text-white' : 'border-gray-300 text-gray-600'}
                                            >
                                                Received
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={filter === 'sended' ? 'default' : 'outline'}
                                                onClick={() => setFilter('sended')}
                                                className={filter === 'sended' ? 'bg-[#212529] text-white' : 'border-gray-300 text-gray-600'}
                                            >
                                                Sent
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Messages List */}
                                    <div className="max-h-96 overflow-y-auto">
                                        {filteredMessages.length === 0 ? (
                                            <div className="p-8 text-center">
                                                <Mail className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                                                <p className="text-gray-500">No messages found</p>
                                            </div>
                                        ) : (
                                            filteredMessages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    onClick={() => handleSelect(message.id)}
                                                    className={`
                                                        cursor-pointer border-b border-gray-100 p-4 transition-colors hover:bg-gray-50
                                                        ${activeId === message.id ? 'bg-blue-50 border-l-4 border-l-[#212529]' : ''}
                                                        ${!message.mark_as_read ? 'bg-blue-50/30' : ''}
                                                    `}
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="font-semibold text-[#212529] truncate">{message.full_name}</h3>
                                                                {!message.mark_as_read && (
                                                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                                        New
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-gray-600 truncate">{message.email}</p>
                                                            <p className="text-sm text-gray-500 truncate mt-1">{message.message}</p>
                                                        </div>
                                                        <div className="flex-shrink-0 text-xs text-gray-400">
                                                            {new Date(message.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Message Content Area */}
                        <div className="lg:col-span-2">
                            <Card className="border-0 bg-white shadow-lg min-h-96">
                                <CardContent className="p-6">
                                    {isComposing ? (
                                        /* Compose Email Form */
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                                                <Send className="h-5 w-5 text-[#212529]" />
                                                <h2 className="text-lg font-semibold text-[#212529]">Compose Message</h2>
                                            </div>

                                            <form onSubmit={handleSendEmail} className="space-y-4">
                                                <div>
                                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                        <User className="h-4 w-4" />
                                                        Sender
                                                    </label>
                                                    <Select value={emailData.sender} onValueChange={(value) => setEmailData(prev => ({...prev, sender: value}))}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select sender email" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="info">info@lionsgeek.ma</SelectItem>
                                                            <SelectItem value="coding">coding@lionsgeek.ma</SelectItem>
                                                            <SelectItem value="media">media@lionsgeek.ma</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                        <Users className="h-4 w-4" />
                                                        Recipient
                                                    </label>
                                                    <Input
                                                        type="email"
                                                        name="receiver"
                                                        value={emailData.receiver}
                                                        onChange={handleEmailChange}
                                                        placeholder="recipient@example.com"
                                                    />
                                                </div>

                                                {showCc && (
                                                    <div>
                                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                            <Mail className="h-4 w-4" />
                                                            CC
                                                        </label>
                                                        <Input
                                                            type="email"
                                                            name="cc"
                                                            value={emailData.cc}
                                                            onChange={handleEmailChange}
                                                            placeholder="cc@example.com"
                                                        />
                                                    </div>
                                                )}

                                                {showBcc && (
                                                    <div>
                                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                            <Mail className="h-4 w-4" />
                                                            BCC
                                                        </label>
                                                        <Input
                                                            type="email"
                                                            name="bcc"
                                                            value={emailData.bcc}
                                                            onChange={handleEmailChange}
                                                            placeholder="bcc@example.com"
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex gap-2">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setShowCc(!showCc)}
                                                        className="text-xs"
                                                    >
                                                        + CC
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setShowBcc(!showBcc)}
                                                        className="text-xs"
                                                    >
                                                        + BCC
                                                    </Button>
                                                </div>

                                                <div>
                                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                        <TypeOutline className="h-4 w-4" />
                                                        Subject
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        name="subject"
                                                        value={emailData.subject}
                                                        onChange={handleEmailChange}
                                                        placeholder="Email subject"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                        <FileMinus className="h-4 w-4" />
                                                        Message
                                                    </label>
                                                    <Textarea
                                                        name="content"
                                                        value={emailData.content}
                                                        onChange={handleEmailChange}
                                                        className="min-h-40"
                                                        placeholder="Type your message..."
                                                    />
                                                </div>

                                                <div className="flex gap-3 pt-4">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setIsComposing(false)}
                                                        className="border-gray-300 text-gray-700"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529]"
                                                    >
                                                        <Send className="mr-2 h-4 w-4" />
                                                        Send Email
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    ) : selectedMessage ? (
                                        /* Message Details */
                                        <div className="space-y-6">
                                            {/* Message Header */}
                                            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                                                <div>
                                                    <h2 className="text-lg font-semibold text-[#212529]">{selectedMessage.full_name}</h2>
                                                    <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={toggleReadStatus}
                                                        className="border-gray-300 text-gray-600"
                                                    >
                                                        {selectedMessage.mark_as_read ? (
                                                            <>
                                                                <MailOpen className="mr-2 h-4 w-4" />
                                                                Mark Unread
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Mail className="mr-2 h-4 w-4" />
                                                                Mark Read
                                                            </>
                                                        )}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={handleDelete}
                                                        className="border-red-300 text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Message Content */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between text-sm text-gray-600">
                                                    <span>From: <span className="font-medium text-[#212529]">{selectedMessage.email}</span></span>
                                                    <span>{new Date(selectedMessage.created_at).toLocaleString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}</span>
                                                </div>
                                                
                                                <div className="rounded-lg bg-gray-50 p-4">
                                                    <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                                                </div>

                                                <div className="flex gap-3 pt-4">
                                                    <Button
                                                        onClick={handleReply}
                                                        className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529]"
                                                    >
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        Reply
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Empty State */
                                        <div className="flex flex-col items-center justify-center py-16 text-center">
                                            <Mail className="mb-4 h-16 w-16 text-gray-300" />
                                            <h3 className="mb-2 text-lg font-medium text-gray-900">No message selected</h3>
                                            <p className="text-gray-500">Select a message from the inbox to view its content</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
