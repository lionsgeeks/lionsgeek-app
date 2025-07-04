import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { useEffect, type ReactNode } from 'react';
import AppHeaderLayout from './app/app-header-layout';
import { usePage } from '@inertiajs/react';
import flasher from '@flasher/flasher';
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
            {/* <GlobalToaster /> */}
            {children}
        </LayoutComponent>
    );
};
