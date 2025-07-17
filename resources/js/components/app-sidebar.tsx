import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, BriefcaseBusiness, Calendar, Camera, CircleArrowDown, CircleArrowUp, Code, Contact, FolderKanban, GalleryHorizontal, GalleryHorizontalEnd, HeartHandshake, Home, LayoutGrid, MessageCircleQuestion, Mic, MicVocal, UserPen, Users } from 'lucide-react';
import AppLogo from './app-logo';
import { useState } from 'react';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Events',
        href: '/admin/events',
        icon: Calendar
    },
    {
        title: 'Blogs',
        href: '/admin/blogs',
        icon: BookOpen
    },
    {
        title: 'Press',
        href: '/admin/press',
        icon: MicVocal,
    },
    {
        title: 'Coworking',
        href: '/admin/coworking',
        icon: HeartHandshake,
    },
    {
        title: 'Gallery',
        href: '/admin/gallery',
        icon: GalleryHorizontalEnd
    },
    {
        title: 'Projects',
        href: '/admin/projects',
        icon: BriefcaseBusiness
    },
    {
        title: 'Infosessions',
        href: '/admin/infosessions',
        icon: Mic
    },
    {
        title: 'ContactUs',
        href: 'contactus',
        icon: Contact,
    },
    {
        title: 'Participants',
        href: '/admin/participants',
        icon: Users,
    },

];

const userNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: Home,
    },
    {
        title: 'Coding',
        href: '/coding',
        icon: Code,
    },
    {
        title: 'Media',
        href: '/media',
        icon: Camera,
    },
    {
        title: 'Coworking',
        href: '/coworking',
        icon: HeartHandshake,
    },
    {
        title: 'Events',
        href: '/events',
        icon: Calendar,
    },
    {
        title: 'LionsGeek Pro',
        href: '/pro',
        icon: FolderKanban,
    },
    {
        title: 'About',
        href: '/about',
        icon: MessageCircleQuestion,
    },
    {
        title: 'Blogs',
        href: '/blogs',
        icon: BookOpen,
    },
    {
        title: 'Gallery',
        href: '/gallery',
        icon: GalleryHorizontal,
    },
    {
        title: 'Contact',
        href: '/contact',
        icon: UserPen,
    },
]


export function AppSidebar() {
    const [showUserItems, setShowUserItems] = useState(false);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="overflow-auto no-scrollbar">
                <NavMain items={adminNavItems} title='' />

                <div className='flex items-center justify-center gap-2 cursor-pointer mt-2'
                    onClick={() => { setShowUserItems(!showUserItems) }}
                >
                    <p className='underline text-center'>
                        {showUserItems ? 'Hide' : 'Show'} Front Pages
                    </p>
                    {
                        showUserItems ?
                            <CircleArrowUp size={16} />
                            :

                            <CircleArrowDown size={16} />
                    }
                </div>
                {
                    showUserItems &&
                    <NavMain items={userNavItems} />
                }
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
