import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    BriefcaseBusiness,
    Calendar,
    Contact,
    GalleryHorizontalEnd,
    HeartHandshake,
    LayoutGrid,
    Mail,
    Mic,
    MicVocal,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

// Dashboard section
const dashboardItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
];

// Content Management section
const contentItems: NavItem[] = [
    {
        title: 'Blogs',
        href: '/admin/blogs',
        icon: BookOpen,
    },
    {
        title: 'Press',
        href: '/admin/press',
        icon: MicVocal,
    },
    {
        title: 'Gallery',
        href: '/admin/gallery',
        icon: GalleryHorizontalEnd,
    },
];

// Events & Sessions section
const eventsItems: NavItem[] = [
    {
        title: 'Events',
        href: '/admin/events',
        icon: Calendar,
    },
    {
        title: 'Infosessions',
        href: '/admin/infosessions',
        icon: Mic,
    },
    {
        title: 'Participants',
        href: '/admin/participants',
        icon: Users,
    },
];

// Business & Projects section
const businessItems: NavItem[] = [
    {
        title: 'Projects',
        href: '/admin/projects',
        icon: BriefcaseBusiness,
    },
    {
        title: 'Coworking',
        href: '/admin/coworking',
        icon: HeartHandshake,
    },
];

// Communications section
const communicationItems: NavItem[] = [
    {
        title: 'ContactUs',
        href: '/admin/contactus',
        icon: Contact,
    },
    {
        title: 'Newsletter',
        href: '/admin/newsletter',
        icon: Mail,
    },
];

// const userNavItems: NavItem[] = [
//     {
//         title: 'Home',
//         href: '/',
//         icon: Home,
//     },
//     {
//         title: 'Coding',
//         href: '/coding',
//         icon: Code,
//     },
//     {
//         title: 'Media',
//         href: '/media',
//         icon: Camera,
//     },
//     {
//         title: 'Coworking',
//         href: '/coworking',
//         icon: HeartHandshake,
//     },
//     {
//         title: 'Events',
//         href: '/events',
//         icon: Calendar,
//     },
//     {
//         title: 'LionsGeek Pro',
//         href: '/pro',
//         icon: FolderKanban,
//     },
//     {
//         title: 'About',
//         href: '/about',
//         icon: MessageCircleQuestion,
//     },
//     {
//         title: 'Blogs',
//         href: '/blogs',
//         icon: BookOpen,
//     },
//     {
//         title: 'Gallery',
//         href: '/gallery',
//         icon: GalleryHorizontal,
//     },
//     {
//         title: 'Contact',
//         href: '/contact',
//         icon: UserPen,
//     },
// ]

export function AppSidebar() {
    // const [showUserItems, setShowUserItems] = useState(false);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="no-scrollbar overflow-auto">
                <NavMain items={dashboardItems} />

                <NavMain items={contentItems} title="Content Management" />

                <NavMain items={eventsItems} title="Events & Sessions" />

                <NavMain items={businessItems} title="Business & Projects" />

                <NavMain items={communicationItems} title="Communications" />
            </SidebarContent>

            <SidebarFooter>{/* <NavUser /> */}</SidebarFooter>
        </Sidebar>
    );
}
