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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      
      {/* Left side: Icon + Title/Description */}
      <div className="flex flex-col sm:flex-row lg:items-center gap-3 w-full lg:w-auto">
        <div className="hidden lg:flex rounded-lg bg-[#fee819] p-3">
          <Icon className="h-8 w-8 text-[#212529]" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold lg:font-bold capitalize">
            {title}
          </h1>
          <p className="mt-1 text-gray-300 text-sm sm:text-base lg:text-lg w-full sm:w-[90%] lg:w-fit">
            {description}
          </p>
        </div>
      </div>

      {/* Right side: Actions */}
      {actions && (
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 w-full lg:w-auto">
          {actions}
        </div>
      )}
    </div>
  </div>
</div>

    );
}
