import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Trash2, Mail, User, Users, TypeOutline, FileMinus } from 'lucide-react';

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

    return (
        <AppLayout>
            <div className="flex-1 p-4">
                <h1 className="text-xl font-bold mb-4">Contact Form</h1>

                <div className="flex">
                    <div className="w-1/3 border-r overflow-y-auto h-full">
                        <div className="flex items-center justify-between p-3 border-b">
                            <span className="font-bold text-lg">Inbox</span>
                            <div>
                                <a href={route('messages.export')} className="bg-black text-white text-xs px-2 py-1 rounded">
                                    Export Excel
                                </a>
                                <button
                                    onClick={handleComposeClick}
                                    className="bg-black text-white text-xs px-2 py-1 rounded ml-1"
                                >
                                    Compose
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-around p-2 text-sm">
                            <button onClick={() => setFilter('all')} className={filter === 'all' ? 'font-bold text-yellow-500' : 'text-gray-500'}>
                                All
                            </button>
                            <button onClick={() => setFilter('sended')} className={filter === 'sended' ? 'font-bold text-yellow-500' : 'text-gray-500'}>
                                Sended
                            </button>
                            <button onClick={() => setFilter('received')} className={filter === 'received' ? 'font-bold text-yellow-500' : 'text-gray-500'}>
                                Received
                            </button>
                        </div>

                        {filteredMessages.map((message) => (
                            <div
                                key={message.id}
                                onClick={() => handleSelect(message.id)}
                                className={`
                                    cursor-pointer p-4 border-b
                                    ${!message.mark_as_read ? 'bg-blue-100' : 'bg-gray-50'}
                                    ${activeId === message.id ? 'bg-white' : ''}
                                    hover:bg-gray-100
                                `}>
                                <div className="font-bold">{message.full_name}</div>
                                <div className="text-gray-600 truncate">{message.message}</div>
                            </div>
                        ))}
                    </div>

                    <div className="w-2/3 p-6 h-[70vh]">
                        {isComposing ? (
                            <div className="border h-[78vh] p-6 flex flex-col space-y-4">
                                <div>
                                    <div className="flex items-center gap-1">
                                        <User size={17} />
                                        <div className="text-sm font-medium mb-1">Sender:</div>
                                    </div>
                                    <select
                                        name="sender"
                                        value={emailData.sender}
                                        onChange={handleEmailChange}
                                        className="border w-full p-2 mb-2"
                                    >
                                        <option value="">Sender's Email</option>
                                        <option value="info">info@lionsgeek.ma</option>
                                        <option value="coding">coding@lionsgeek.ma</option>
                                        <option value="media">media@lionsgeek.ma</option>
                                    </select>

                                    <div className="flex items-center mb-1 gap-2">
                                        <Users size={18} />
                                        <div className="text-sm font-medium">Receiver(s):</div>
                                        <button className="text-xs text-blue-600" onClick={() => setShowCc(!showCc)}>+ Cc</button>
                                        <button className="text-xs text-blue-600" onClick={() => setShowBcc(!showBcc)}>+ Bcc</button>

                                    </div>

                                    <input type="email" name="receiver" value={emailData.receiver} onChange={handleEmailChange} className="w-full p-2 border rounded mb-4" placeholder="example@email.com" />
                                    {showCc && (
                                        <>
                                            <div className='flex gap-2 items-center'>
                                                <Mail size={16}></Mail>
                                                <label>Cc :</label>
                                            </div>
                                            <input type="email" name="cc" value={emailData.cc} onChange={handleEmailChange} className="w-full p-2 border rounded mb-4" placeholder="Cc: email1@example.com, email2@example.com" />
                                        </>
                                    )}

                                    {showBcc &&
                                        (
                                            <>
                                                <div className='flex gap-2 items-center'>
                                                    <Mail size={16}></Mail>
                                                    <label>Bcc :</label>
                                                </div>
                                                <input type="email" name="bcc" value={emailData.bcc} onChange={handleEmailChange} className="w-full p-2 border rounded mb-4" placeholder="Bcc: hidden@email.com" />
                                            </>
                                        )}

                                    <div className="flex items-center gap-2">
                                        <TypeOutline size={16} />
                                        <div className="text-sm font-medium mb-1">Subject:</div>
                                    </div>
                                    <input type="text" name="subject" value={emailData.subject} onChange={handleEmailChange} className="w-full p-2 border rounded mb-4" placeholder="Subject"
                                    />

                                    <div className="flex items-center gap-2">
                                        <FileMinus size={16} />
                                        <div className="text-sm font-medium mb-1">Content:</div>
                                    </div>
                                    <textarea
                                        name="content"
                                        value={emailData.content}
                                        onChange={handleEmailChange}
                                        className="w-full p-2 border rounded h-40"
                                    />
                                </div>

                                <button
                                    onClick={handleSendEmail}
                                    type="button"
                                    className="bg-black text-white px-4 py-2 rounded mt-auto self-start flex items-center gap-2"
                                >
                                    <Mail size={16} />
                                    Send Email
                                </button>

                            </div>
                        ) : selectedMessage ? (
                            <>
                                <div className="flex justify-between items-center border-b mb-5 pb-5">
                                    <h2 className="text-lg font-bold">{selectedMessage.full_name}</h2>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={toggleReadStatus}
                                            className="flex items-center gap-x-1"
                                        >
                                            {selectedMessage.mark_as_read ? (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                        fill="currentColor" className="bi bi-toggle-on text-alpha" viewBox="0 0 16 16">
                                                        <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
                                                    </svg>
                                                    Mark as unread
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                        fill="currentColor" className="bi bi-toggle-off" viewBox="0 0 16 16">
                                                        <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5" />
                                                    </svg>
                                                    Mark as read
                                                </>
                                            )}
                                        </button>
                                        <button onClick={handleDelete} className="text-red-500">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="border h-full p-6 flex flex-col">
                                    <div className='flex items-center justify-between border-b pb-2 mb-3 '>
                                        <div className="text-sm text-gray-600">
                                            From : <b className="text-black pl-1">{selectedMessage.email}</b>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-4">
                                            {new Date(selectedMessage.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}
                                        </div>                                    </div>
                                    <div className="rounded">{selectedMessage.message}</div>
                                    <a
                                        href={`mailto:${selectedMessage.email}`}
                                        className="bg-black text-white px-4 py-2 rounded mt-auto self-start"
                                    >
                                        Reply via email
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="text-gray-500 text-center mt-20">
                                Select a message to view details.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
