import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { BlogHeroSection } from "./partials/blogHeroSection";
import { BlogContentsSection } from "./partials/blogContentsSection";


const breadcrumbs = [
    {
        title: 'Blogs',
        href: '/blogs',
    },
];

export default function BlogPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blogs" />

            <div className="p-6">
                <BlogHeroSection />
                <BlogContentsSection />
            </div>
        </AppLayout>
    )
}
