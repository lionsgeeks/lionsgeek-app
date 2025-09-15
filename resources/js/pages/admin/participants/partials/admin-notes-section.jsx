'use client';
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Pencil, Trash2, Check, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
// import { useToast } from "@/hooks/use-toast"

export function AdminNotesSection({ participant }) {
    const { data, setData, post, processing, patch, delete: destroy } = useForm({
        note: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const handleAddNote = async () => {
        post(route('participant.notes', participant.id));
    };

    const startEdit = (note) => {
        setEditingId(note.id);
        setEditingText(note.note);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingText('');
    };

    const saveEdit = (note) => {
        router.patch(route('participant.notes.update', note.id), {
            note: editingText,
        }, {
            onSuccess: cancelEdit,
            preserveScroll: true,
        });
    };

    const deleteNote = (note) => {
        destroy(route('participant.notes.delete', note.id));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Admin Notes:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="new-note">Add a Note:</Label>
                    <Textarea
                        id="new-note"
                        value={data.note}
                        onChange={(e) => setData('note', e.target.value)}
                        placeholder="Enter your remarks about the user"
                        rows={4}
                        className="mt-1"
                        disabled={processing}
                    />
                    <Button onClick={handleAddNote} disabled={processing} className="mt-2 w-full">
                        Add Note
                    </Button>
                </div>

                {/* Existing Notes */}
                {participant.notes.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Previous Notes:</h4>
                        {participant.notes.map((note) => (
                            <div key={note.id} className="rounded-md bg-gray-50 p-3">
                                {editingId === note.id ? (
                                    <div className="space-y-2">
                                        <Textarea value={editingText} onChange={(e) => setEditingText(e.target.value)} rows={3} />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => saveEdit(note)}
                                                disabled={processing}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#212529] text-white hover:bg-[#212529]/90"
                                                title="Save"
                                            >
                                                <Check className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                                                title="Cancel"
                                            >
                                                <XIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="mb-2 text-sm text-gray-800 break-words whitespace-pre-wrap">{note.note}</p>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div>
                                                <span className="font-medium">{note.author}</span> - {formatDate(note.created_at)}
                                            </div>
                                            <div className="flex gap-2">
                                                {note.author === (participant?.approved_by_name || '') ? null : null}
                                                {note.author === (window?.LG_AUTH_NAME || '')}
                                                {note.author === (participant?.current_admin_name || '')}
                                                {note.author === (participant?.auth_name || '')}
                                                {/* Only show actions if the current user is the author. We'll get the current name via a global injected in layout, fallback to disabling if not present. */}
                                                {typeof window !== 'undefined' && window.currentUserName === note.author && (
                                                    <>
                                                        <button
                                                            onClick={() => startEdit(note)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteNote(note)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-red-600 text-white hover:bg-red-700"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
