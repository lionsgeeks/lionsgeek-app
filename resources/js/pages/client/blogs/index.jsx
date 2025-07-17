import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { BlogHeroSection } from "./partials/blogHeroSection";
import { BlogContentsSection } from "./partials/blogContentsSection";
import { useAppContext } from "@/context/appContext";


const breadcrumbs = [
    {
        title: 'Blogs',
        href: '/blogs',
    },
];

export default function BlogPage() {
    const {darkMode} = useAppContext();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blogs" />

            <div className="lg:p-16 p-6  " style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff" , } }>
                <BlogHeroSection />
                <BlogContentsSection />
            </div>
        </AppLayout>
    )
}
