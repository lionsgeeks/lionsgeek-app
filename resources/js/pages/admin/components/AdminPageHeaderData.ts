import { 
    Users, 
    BookOpen, 
    Calendar, 
    Mail, 
    HeartHandshake, 
    GalleryHorizontalEnd, 
    MicVocal, 
    Mic, 
    Contact,
    BriefcaseBusiness,
    Settings,
    LayoutGrid
} from 'lucide-react';

// Define the header data interface
export interface AdminPageHeaderData {
    icon: any;
    title: string;
    description: string;
    actions?: any;
}

// Predefined header data for common admin pages
export const adminPageHeaders: Record<string, AdminPageHeaderData> = {
    participants: {
        icon: Users,
        title: "Participants Management",
        description: "Manage and track participant progress"
    },
    blogs: {
        icon: BookOpen,
        title: "Blogs",
        description: "Manage blog posts created and published on your platform"
    },
    events: {
        icon: Calendar,
        title: "Events Management",
        description: "Manage events"
    },
    newsletter: {
        icon: Mail,
        title: "Newsletter",
        description: "Manage newsletter subscriptions and campaigns"
    },
    coworking: {
        icon: HeartHandshake,
        title: "Coworking",
        description: "Manage coworking space bookings and requests"
    },
    gallery: {
        icon: GalleryHorizontalEnd,
        title: "Gallery",
        description: "Manage image gallery and media content"
    },
    press: {
        icon: MicVocal,
        title: "Press",
        description: "Manage press releases and media coverage"
    },
    infosessions: {
        icon: Mic,
        title: "Info Sessions",
        description: "Manage information sessions and presentations"
    },
    contact: {
        icon: Contact,
        title: "Contact Us",
        description: "Manage contact form submissions and inquiries"
    },
    projects: {
        icon: BriefcaseBusiness,
        title: "Projects",
        description: "Manage projects and business initiatives"
    },
    settings: {
        icon: Settings,
        title: "Settings",
        description: "Configure system settings and preferences"
    },
    dashboard: {
        icon: LayoutGrid,
        title: "Dashboard",
        description: "Overview of your system metrics and activities"
    }
};

// Helper function to get header data by page name
export function getAdminPageHeader(pageName: string): AdminPageHeaderData {
    return adminPageHeaders[pageName] || {
        icon: LayoutGrid,
        title: "Admin Page",
        description: "Manage your content and settings"
    };
}
