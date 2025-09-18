import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface AdminPageHeaderProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actions?: ReactNode;
    className?: string;
}

export default function AdminPageHeader({ 
    icon: Icon, 
    title, 
    description, 
    actions,
    className = ""
}: AdminPageHeaderProps) {
    return (
        <div className={`bg-[#212529] py-8 text-white ${className}`}>
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex items-center justify-between">
                    <div className="flex lg:items-center gap-3">
                        <div className="rounded-lg bg-[#fee819] p-3 lg:flex hidden">
                            <Icon className="h-8 w-8 text-[#212529]" />
                        </div>
                        <div>
                            <h1 className="lg:text-3xl text-2xl lg:font-bold capitalize">{title}</h1>
                            <p className="mt-1 text-gray-300 lg:text-lg text-[0.8rem] lg:w-fit w-[90%]">{description}</p>
                        </div>
                    </div>
                    {actions && (
                        <div className="flex lg:flex-row flex-col items-start gap-3">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
