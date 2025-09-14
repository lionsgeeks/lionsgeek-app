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
            console.log('Flasher messages:', messages);
            flasher.render(messages);
        }
    }, [messages]);
    // Track website visit once per session
    useEffect(() => {
        try {
            const sent = sessionStorage.getItem('visit_tracked');
            if (!sent) {
                fetch('/api/track-visit', {
                    method: 'POST',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                })
                    .catch(() => {})
                    .finally(() => {
                        sessionStorage.setItem('visit_tracked', '1');
                    });
            }
        } catch {
            // Silently catch potential sessionStorage errors
        }
    }, []);
    const currentUrl = window.location.href.toLowerCase();
    const useSidebarLayout = auth?.user && (currentUrl.includes('/admin/') || currentUrl.includes('/settings/'));
    const LayoutComponent = useSidebarLayout ? AppSidebarLayout : AppHeaderLayout;

    return (
        <LayoutComponent breadcrumbs={breadcrumbs} {...props}>
            {children}
        </LayoutComponent>
    );
};
