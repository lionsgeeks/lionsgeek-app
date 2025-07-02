import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import AppHeaderLayout from './app/app-header-layout';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth } = usePage<{ auth: { user: { role: string } } }>().props;

    const LayoutComponent = auth?.user?.role === "admin" ? AppSidebarLayout : AppHeaderLayout;

    return (
        <LayoutComponent breadcrumbs={breadcrumbs} {...props}>
            {/* <GlobalToaster /> */}
            {children}
        </LayoutComponent>
    );
};
