import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import flasher from '@flasher/flasher';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import AppHeaderLayout from './app/app-header-layout';
interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth, messages } = usePage<{ auth: { user: { role: string } } }>().props;
    useEffect(() => {
        if (messages) {
            flasher.render(messages);
        }
    }, [messages]);
    const LayoutComponent = auth?.user ? AppSidebarLayout : AppHeaderLayout;

    return (
        <LayoutComponent breadcrumbs={breadcrumbs} {...props}>
            {children}
        </LayoutComponent>
    );
};
