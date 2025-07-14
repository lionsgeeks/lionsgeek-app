import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';


const breadcrumbs = [
    {
        title: 'Coworking Details',
        href: '/admin/coworking/details',
    },
];

export default function CoworkingShow() {
    const [isOpen, setIsOpen] = useState(false);
    const { coworking } = usePage().props;
    const { delete: destroy } = useForm()
    const fields = {
        'Full Name': coworking.full_name,
        'Email': coworking.email,
        'Phone': coworking.phone,
        'Birthday': coworking.birthday,
        'Formation': coworking.formation,
        'cv': coworking.cv,
        'Project Name': coworking.proj_name,
        'Project Description': coworking.proj_description,
        'Domain': coworking.domain,
        'Plan': coworking.plan,
        'presentation': coworking.presentation,
        'Previous Projects': coworking.prev_proj,
        'Reasons': coworking.reasons,
        'Needs': coworking.needs,
        'Status':
            coworking.status === 1
                ? 'Approved'
                : coworking.status === 2
                    ? 'Rejected'
                    : 'Pending',
    };

    const formatValue = (label, value) => {
        if (label === 'cv' || label === 'presentation') {
            if (!value) return null;

            const filename = `${coworking.full_name}_${label}`;
            const url = `/storage/${value}`;

            return (
                <div className="flex gap-2 border items-center justify-center bg-black text-alpha p-2 rounded">
                    <a className="font-semibold" href={url} download={filename}>
                        {filename}
                    </a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth="2.5" stroke="#ffc801" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </div>
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

    const onConfirmDelete = () => {
        destroy(route("coworking.delete", coworking.id))
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coworking Details" />
            <div className="p-6">
                <div className="flex justify-end">
                    <Button variant="destructive"
                        onClick={() => { setIsOpen(true) }}
                    >
                        <Trash2 /> Delete
                    </Button>
                </div>
                <div className="mt-6">
                    <table className="min-w-full mx-auto border border-black shadow-md">
                        <thead>
                            <tr className="bg-alpha">
                                <th className="border border-black p-3 w-[35vw]">Field</th>
                                <th className="border border-black p-3">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(fields).map(([label, value], index) => {
                                const bgClass = index % 2 === 0 ? 'bg-alpha/10' : '';
                                return (
                                    <tr key={label} className={bgClass}>
                                        <td className="border p-3 border-alpha font-semibold">{label}</td>
                                        <td className="border p-3 border-alpha">{formatValue(label, value)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogTitle>Are you sure you want to delete this Coworking Request?</DialogTitle>
                        <p>This Actions is irreversible and all associated data will be permanently deleted</p>
                    <div className="flex items-center justify-end gap-2">
                        <Button
                        onClick={() => {setIsOpen(false)}}
                        >Cancel</Button>
                        <Button
                            variant="destructive"
                            onClick={onConfirmDelete}
                        >Delete</Button>
                    </div>

                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}
