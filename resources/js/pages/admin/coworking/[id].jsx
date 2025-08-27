import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Trash2, Check } from "lucide-react";
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
  const [actionType, setActionType] = useState(null); // 'delete' or 'approve'
  const { coworking } = usePage().props;
  const { delete: destroy, post } = useForm();

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
        <a className="font-semibold" href={url} download={filename}>
          <div className="flex gap-2 border-2 border-beta items-center justify-center bg-alpha text-beta p-2 rounded">
            {filename}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="2.5" stroke="beta" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
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
      destroy(route("coworking.destroy", coworking.id));
    } else if (actionType === 'approve') {
      post(route("coworking.approve", coworking.id));
    }

    setIsOpen(false);
    setActionType(null);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Coworking Details" />
      <div className="p-5">
        <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white ">
          <div className="md:w-1/3 bg-gray-50 flex flex-col items-center justify-center p-6 border-r border-gray-300">
            <div className="w-28 h-28 rounded-full border-4 border-alpha/40 bg-beta  text-white flex items-center justify-center text-3xl font-bold mb-4">
              {coworking.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold mb-1">{coworking.full_name}</h2>
            <p className="text-gray-600 mb-1">{coworking.email}</p>
          </div>

          <div className="md:w-2/3 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              {Object.entries(fields).map(([label, value], index) => {
                if (label === 'cv' || label === 'presentation') return null;

                return (
                  <div key={index} className="flex flex-col gap-1">
                    <span className=" text-[2.5vh] text-beta font-bold ">{label}</span>
                    <div className="text-beta/50 text-[2vh]" >{formatValue(label, value)}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {coworking.cv && (
                <a
                  href={`/storage/${coworking.cv}`}
                  download={`${coworking.full_name}_cv`}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-beta  text-white rounded-lg hover:bg-alpha hover:text-beta transition"
                >
                  Download CV
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
              )}

              {coworking.presentation && (
                <a
                  href={`/storage/${coworking.presentation}`}
                  download={`${coworking.full_name}_presentation`}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-alpha hover:text-white rounded-lg hover:bg-beta transition"
                >
                  Download Presentation
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-7 rounded-lg gap-3">
          <Button variant="destructive" onClick={() => { setActionType('delete'); setIsOpen(true); }}>
            <Trash2 className="mr-1 h-4 w-4" />
            Delete
          </Button>

          <Button variant="default" onClick={() => { setActionType('approve'); setIsOpen(true); }}
            className="bg-beta hover:bg-alpha hover:text-beta text-white transition">
            <Check className="mr-1 h-4 w-4 " />
            Approve
          </Button>
        </div>
      </div>

      {/* Unified Dialog for Delete / Approve */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>
            Are you sure you want to {actionType === 'approve' ? 'approve' : 'delete'} this Coworking Request?
          </DialogTitle>
          <p>
            {actionType === 'approve'
              ? 'This will mark the request as approved and notify the user.'
              : 'This action is irreversible and all associated data will be permanently deleted.'}
          </p>
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={actionType === 'approve' ? 'default' : 'destructive'}
              onClick={onConfirmAction}
              className="capitalize "
            >
              {actionType}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
