import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Check, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Coworking Details',
        href: '/admin/coworking/details',
    },
];

export default function CoworkingShow() {
    const [isOpen, setIsOpen] = useState(false);
    const [actionType, setActionType] = useState(null); // 'delete' or 'approve'
    const { coworking } = usePage().props;
    const { delete: destroy, post } = useForm();

    const fields = {
        'Full Name': coworking.full_name,
        Email: coworking.email,
        Phone: coworking.phone,
        Birthday: coworking.birthday,
        Formation: coworking.formation,
        cv: coworking.cv,
        'Project Name': coworking.proj_name,
        'Project Description': coworking.proj_description,
        Domain: coworking.domain,
        Plan: coworking.plan,
        presentation: coworking.presentation,
        'Previous Projects': coworking.prev_proj,
        Reasons: coworking.reasons,
        Needs: coworking.needs,
        Status: coworking.status === 1 ? 'Approved' : coworking.status === 2 ? 'Rejected' : 'Pending',
    };

    const formatValue = (label, value) => {
        if (label === 'cv' || label === 'presentation') {
            if (!value) return null;

            const filename = `${coworking.full_name}_${label}`;
            const url = `/storage/${value}`;

            return (
                <a className="font-semibold" href={url} download={filename}>
                    <div className="flex items-center justify-center gap-2 rounded border-2 border-beta bg-alpha p-2 text-beta">
                        {filename}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="beta" className="size-5">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                        </svg>
                    </div>
                </a>
            );
        }

        if (label === 'Domain' || label === 'Reasons') {
            return (
                <span className="capitalize">
                    {value
                        .split(',')
                        .map((item) => item.replace('-', ' ').trim())
                        .join(', ')}
                </span>
            );
        }

        return <span dangerouslySetInnerHTML={{ __html: value }} />;
    };

    const onConfirmAction = () => {
        if (actionType === 'delete') {
            destroy(route('coworking.destroy', coworking.id));
        } else if (actionType === 'approve') {
            post(route('coworking.approve', coworking.id));
        }

        setIsOpen(false);
        setActionType(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coworking Details" />
            <div className="p-5">
                <div className="flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg md:flex-row">
                    <div className="flex flex-col items-center justify-center border-r border-gray-300 bg-gray-50 p-6 md:w-1/3">
                        <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-alpha/40 bg-beta text-3xl font-bold text-white">
                            {coworking.full_name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                        </div>
                        <h2 className="mb-1 text-xl font-semibold">{coworking.full_name}</h2>
                        <p className="mb-1 text-gray-600">{coworking.email}</p>
                    </div>

                    <div className="p-6 md:w-2/3">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                            {Object.entries(fields).map(([label, value], index) => {
                                if (label === 'cv' || label === 'presentation') return null;

                                return (
                                    <div key={index} className="flex flex-col gap-1">
                                        <span className="text-[2.5vh] font-bold text-beta">{label}</span>
                                        <div className="text-[2vh] text-beta/50">{formatValue(label, value)}</div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            {coworking.cv && (
                                <a
                                    href={`/storage/${coworking.cv}`}
                                    download={`${coworking.full_name}_cv`}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-beta px-4 py-2 text-white transition hover:bg-alpha hover:text-beta"
                                >
                                    Download CV
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2.5"
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                        />
                                    </svg>
                                </a>
                            )}

                            {coworking.presentation && (
                                <a
                                    href={`/storage/${coworking.presentation}`}
                                    download={`${coworking.full_name}_presentation`}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-alpha px-4 py-2 transition hover:bg-beta hover:text-white"
                                >
                                    Download Presentation
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2.5"
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                        />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 rounded-lg pt-7">
                    <Button
                        variant="destructive"
                        onClick={() => {
                            setActionType('delete');
                            setIsOpen(true);
                        }}
                    >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                    </Button>

                    <Button
                        variant="default"
                        onClick={() => {
                            setActionType('approve');
                            setIsOpen(true);
                        }}
                        className="bg-beta text-white transition hover:bg-alpha hover:text-beta"
                    >
                        <Check className="mr-1 h-4 w-4" />
                        Approve
                    </Button>
                </div>
            </div>

            {/* Unified Dialog for Delete / Approve */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogTitle>Are you sure you want to {actionType === 'approve' ? 'approve' : 'delete'} this Coworking Request?</DialogTitle>
                    <p>
                        {actionType === 'approve'
                            ? 'This will mark the request as approved and notify the user.'
                            : 'This action is irreversible and all associated data will be permanently deleted.'}
                    </p>
                    <div className="mt-4 flex items-center justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant={actionType === 'approve' ? 'default' : 'destructive'} onClick={onConfirmAction} className="capitalize">
                            {actionType}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
