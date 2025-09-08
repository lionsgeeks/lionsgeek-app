import { useAppContext } from '@/context/appContext';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BlogContentsSection } from './partials/blogContentsSection';
import { BlogHeroSection } from './partials/blogHeroSection';

const breadcrumbs = [
    {
        title: 'Blogs',
        href: '/blogs',
    },
];

export default function BlogPage() {
    const { darkMode } = useAppContext();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blogs" />

            <div className="p-6 lg:p-16" style={{ backgroundColor: darkMode ? '#0f0f0f' : '#ffffff' }}>
                <BlogHeroSection />
                <BlogContentsSection />
            </div>
        </AppLayout>
    );
}
