import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
// import { usePage } from '@inertiajs/react';
// import Navbar from './navbar';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    Briefcase,
    User,
    Search,
    X,
    LayoutGrid,
    BookOpen,
    MicVocal,
    GalleryHorizontalEnd,
    Calendar,
    Mic,
    Users,
    BriefcaseBusiness,
    HeartHandshake,
    Contact,
    Mail,
    Settings,
    ArrowRight,
    Clock,
    Presentation
} from 'lucide-react';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';

// TypeScript interfaces
interface AdminPage {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    category: string;
}

interface Participant {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    current_step: string;
    status: string;
    info_session_id?: number;
    infoSession?: {
        name: string;
    };
}

interface InfoSession {
    id: number;
    name: string;
    formation: string;
    start_date: string;
}

interface Notification {
    id: number;
    type: string;
    full_name: string;
    message?: string;
    proj_name?: string;
    created_at: string;
}

interface SearchResults {
    participants: Participant[];
    infoSessions: InfoSession[];
}

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    // const page = usePage();
    // const isAdminPage = page.url.startsWith('/admin');
    const { props } = usePage();
    const notifications: Notification[] = (props.notifications as Notification[]) || [];

    const [open, setOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResults>({ participants: [], infoSessions: [] });
    const [isSearching, setIsSearching] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dialogInputRef = useRef<HTMLInputElement>(null);

    // Admin pages data - matching sidebar structure and icons
    const adminPages: AdminPage[] = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutGrid, category: 'Dashboard' },
        { name: 'Participants', path: '/admin/participants', icon: Users, category: 'Events & Sessions' },
        { name: 'Contact Us', path: '/admin/contactus', icon: Contact, category: 'Communications' },
        { name: 'Projects', path: '/admin/projects', icon: BriefcaseBusiness, category: 'Business & Projects' },
        { name: 'Events', path: '/admin/events', icon: Calendar, category: 'Events & Sessions' },
        { name: 'Blogs', path: '/admin/blogs', icon: BookOpen, category: 'Content Management' },
        { name: 'Newsletter', path: '/admin/newsletter', icon: Mail, category: 'Communications' },
        { name: 'Coworking', path: '/admin/coworking', icon: HeartHandshake, category: 'Business & Projects' },
        { name: 'Gallery', path: '/admin/gallery', icon: GalleryHorizontalEnd, category: 'Content Management' },
        { name: 'Press', path: '/admin/press', icon: MicVocal, category: 'Content Management' },
        { name: 'Info Sessions', path: '/admin/infosessions', icon: Mic, category: 'Events & Sessions' },
        { name: 'Settings', path: '/settings/profile', icon: Settings, category: 'Settings' },
    ];

    // Filter pages based on search query
    const filteredPages = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return adminPages.filter(page =>
            page.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, adminPages]);

    // Search for participants and info sessions
    const searchParticipantsAndSessions = useCallback(async (query: string) => {
        if (query.length < 2) {
            setSearchResults({ participants: [], infoSessions: [] });
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(`/admin/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults({ participants: [], infoSessions: [] });
        } finally {
            setIsSearching(false);
        }
    }, []);

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.trim()) {
                searchParticipantsAndSessions(searchQuery);
            } else {
                setSearchResults({ participants: [], infoSessions: [] });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, searchParticipantsAndSessions]);

    // Get all search results as a flat array for keyboard navigation
    const allSearchResults = useMemo(() => {
        const results: Array<{ type: string; data: AdminPage | Participant | InfoSession; index: number }> = [];

        // Add pages
        filteredPages.forEach((page, index) => {
            results.push({ type: 'page', data: page, index });
        });

        // Add participants
        searchResults.participants.forEach((participant, index) => {
            results.push({ type: 'participant', data: participant, index });
        });

        // Add info sessions
        searchResults.infoSessions.forEach((infoSession, index) => {
            results.push({ type: 'session', data: infoSession, index });
        });

        return results;
    }, [filteredPages, searchResults]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setShowSearchResults(value.length > 0);
    };

    const handlePageSelect = useCallback((page: AdminPage) => {
        router.visit(page.path);
        setSearchQuery('');
        setShowSearchResults(false);
    }, []);

    const handleParticipantSelect = useCallback((participant: Participant) => {
        router.visit(`/admin/participants/${participant.id}`);
        setSearchQuery('');
        setShowSearchResults(false);
    }, []);

    const handleInfoSessionSelect = useCallback((infoSession: InfoSession) => {
        router.visit(`/admin/infosessions/${infoSession.id}`);
        setSearchQuery('');
        setShowSearchResults(false);
    }, []);

    // Dialog handlers
    const openSearchDialog = useCallback(() => {
        setIsSearchDialogOpen(true);
        setSearchQuery('');
        setShowSearchResults(false);
        // Focus the dialog input after it opens
        setTimeout(() => {
            dialogInputRef.current?.focus();
        }, 100);
    }, []);

    const closeSearchDialog = useCallback(() => {
        setIsSearchDialogOpen(false);
        setSearchQuery('');
        setShowSearchResults(false);
        setSelectedIndex(-1);
    }, []);

    const handleDialogPageSelect = useCallback((page: AdminPage) => {
        router.visit(page.path);
        closeSearchDialog();
    }, [closeSearchDialog]);

    const handleDialogParticipantSelect = useCallback((participant: Participant) => {
        router.visit(`/admin/participants/${participant.id}`);
        closeSearchDialog();
    }, [closeSearchDialog]);

    const handleDialogInfoSessionSelect = useCallback((infoSession: InfoSession) => {
        router.visit(`/admin/infosessions/${infoSession.id}`);
        closeSearchDialog();
    }, [closeSearchDialog]);

    // Keyboard shortcut (Ctrl + K) to open search dialog
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check for Ctrl + K (or Cmd + K on Mac)
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                openSearchDialog();
                return;
            }
            
            // Only handle navigation if search is focused and results are shown
            if (!showSearchResults || document.activeElement !== searchInputRef.current) {
                return;
            }
            
            switch (event.key) {
                case 'Escape':
                    event.preventDefault();
                    setShowSearchResults(false);
                    setSearchQuery('');
                    setSelectedIndex(-1);
                    searchInputRef.current?.blur();
                    break;
                    
                case 'ArrowDown':
                    event.preventDefault();
                    setSelectedIndex(prev => 
                        prev < allSearchResults.length - 1 ? prev + 1 : 0
                    );
                    break;
                    
                case 'ArrowUp':
                    event.preventDefault();
                    setSelectedIndex(prev => 
                        prev > 0 ? prev - 1 : allSearchResults.length - 1
                    );
                    break;
                    
                case 'Enter':
                    event.preventDefault();
                    if (selectedIndex >= 0 && selectedIndex < allSearchResults.length) {
                        const selectedResult = allSearchResults[selectedIndex];
                        if (selectedResult.type === 'page') {
                            handlePageSelect(selectedResult.data as AdminPage);
                        } else if (selectedResult.type === 'participant') {
                            handleParticipantSelect(selectedResult.data as Participant);
                        } else if (selectedResult.type === 'session') {
                            handleInfoSessionSelect(selectedResult.data as InfoSession);
                        }
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [showSearchResults, selectedIndex, allSearchResults, handlePageSelect, handleParticipantSelect, handleInfoSessionSelect, openSearchDialog]);

    const handleNotifClick = (notif: Notification) => {
        if (notif.type == 'coworking') {
            router.visit(`/admin/coworking/${notif.id}`);
        } else if (notif.type == 'contact') {
            router.visit(`/admin/contactus`);
        }
    };
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Close notifications
            if (notifOpen) {
            setNotifOpen(false);
            }
            // Close search results if clicking outside
            if (showSearchResults && !(e.target as Element)?.closest('.search-container')) {
                setShowSearchResults(false);
            }
        };

        if (notifOpen || showSearchResults) {
            document.addEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [notifOpen, showSearchResults]);
    return (
        // isAdminPage &&
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex h-16 items-center gap-4">
                {/* Search Button */}
                <button
                    onClick={openSearchDialog}
                    className="relative p-2 text-gray-600 hover:text-gray-800"
                    title="Search (Ctrl+K)"
                >
                    <Search className="h-6 w-6 text-black" />
                </button>

                {/* Notification Button */}
                    <div className="relative">
                        <button
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                setNotifOpen(!notifOpen);
                            }}
                            className="relative p-2 text-gray-600 hover:text-gray-800"
                        >
                            <Bell className="h-6 w-6 text-black" />
                            {notifications.length > 0 ? (
                                <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs leading-none font-bold text-white">
                                    {notifications.length}
                                </span>
                            ) : (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-600 p-1 text-xs leading-none font-bold text-white">
                                    0
                                </span>
                            )}
                        </button>

                        {notifOpen && (
                            <div className="absolute right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-xl border bg-white py-2 shadow-xl">
                                <div className="border-b border-gray-200 px-4 py-2 font-semibold text-gray-700">
                                    Notifications ({notifications.length})
                                </div>

                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <button
                                            key={`${notif.id}`}
                                            onClick={() => handleNotifClick(notif)}
                                            className="flex w-full items-center gap-3 rounded-lg border-b px-4 py-3 text-left transition-colors duration-150 last:border-b-0 hover:bg-gray-50"
                                        >
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                                                {notif.type == 'contact' ? (
                                                    <User className="h-5 w-5 text-blue-600" />
                                                ) : (
                                                    <Briefcase className="h-5 w-5 text-green-600" />
                                                )}
                                            </div>

                                            <div className="flex flex-1 flex-col">
                                                <p className="line-clamp-3 text-sm font-medium text-gray-800">
                                                    {notif.type == 'contact'
                                                        ? `${notif.full_name}: ${notif.message}`
                                                        : `${notif.full_name}: ${notif.proj_name}`}
                                                </p>
                                                <span className="mt-1 text-xs text-gray-400">{new Date(notif.created_at).toLocaleString()}</span>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <p className="px-4 py-2 text-sm text-gray-500">No notifications</p>
                                )}
                            </div>
                        )}
                    </div>

                {/* User Menu Button */}
                    <div className="relative rounded-full bg-beta">
                        <button onClick={() => setOpen(!open)} className="flex items-center rounded-full p-2 hover:bg-yellow-500 hover:text-black">
                            <User className="h-6 w-6 text-white hover:text-black" />
                        </button>

                        {open && (
                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border bg-white py-1 shadow-lg">
                                <Link href={route('profile.edit')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Profile
                                </Link>
                                <Link href={route('profile.edit')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Settings
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
            </div>

            {/* Search Dialog */}
            <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] p-0">
                    <DialogHeader className="px-6 py-4 border-b">
                        <DialogTitle className="flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Search
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="p-6">
                        {/* Search Input */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                ref={dialogInputRef}
                                type="text"
                                placeholder="Search pages, participants, sessions..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="pl-10 pr-4 h-12 text-base border-2 focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                            />
                        </div>

                        {/* Search Results */}
                        <div className="max-h-96 overflow-y-auto">
                            {/* Loading State */}
                            {isSearching && (
                                <div className="py-8 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="animate-spin h-5 w-5 border-2 border-[#212529] border-t-transparent rounded-full"></div>
                                        <span className="text-sm text-gray-500">Searching...</span>
                                    </div>
                                </div>
                            )}

                            {/* Admin Pages */}
                            {filteredPages.length > 0 && (
                                <div className="mb-6">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                        Pages
                                    </div>
                                    <div className="space-y-1">
                                        {filteredPages.map((page, index) => {
                                            const IconComponent = page.icon;
                                            return (
                                                <button
                                                    key={`page-${index}`}
                                                    onClick={() => handleDialogPageSelect(page)}
                                                    className="w-full px-4 py-3 text-left flex items-center gap-4 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                                                >
                                                    <div className="flex-shrink-0 p-2 rounded-lg bg-gray-100 group-hover:bg-[#212529]/10 transition-colors duration-150">
                                                        <IconComponent className="h-4 w-4 text-[#212529] group-hover:scale-110 transition-transform duration-150" />
                                                    </div>
                                                    <div className="flex flex-col min-w-0 flex-1">
                                                        <span className="text-sm font-semibold text-[#212529] truncate">{page.name}</span>
                                                        <span className="text-xs text-gray-500 truncate">{page.category}</span>
                                                    </div>
                                                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-150" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Participants */}
                            {searchResults.participants.length > 0 && (
                                <div className="mb-6">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                        Participants
                                    </div>
                                    <div className="space-y-1">
                                        {searchResults.participants.map((participant) => (
                                            <button
                                                key={`participant-${participant.id}`}
                                                onClick={() => handleDialogParticipantSelect(participant)}
                                                className="w-full px-4 py-3 text-left flex items-center gap-4 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                                            >
                                                <div className="flex-shrink-0 p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors duration-150">
                                                    <User className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform duration-150" />
                                                </div>
                                                <div className="flex flex-col min-w-0 flex-1">
                                                    <span className="text-sm font-semibold text-[#212529] truncate">{participant.full_name}</span>
                                                    <span className="text-xs text-gray-500 truncate">{participant.email} • {participant.current_step}</span>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-150" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Info Sessions */}
                            {searchResults.infoSessions.length > 0 && (
                                <div className="mb-6">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                        Info Sessions
                                    </div>
                                    <div className="space-y-1">
                                        {searchResults.infoSessions.map((infoSession) => (
                                            <button
                                                key={`session-${infoSession.id}`}
                                                onClick={() => handleDialogInfoSessionSelect(infoSession)}
                                                className="w-full px-4 py-3 text-left flex items-center gap-4 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                                            >
                                                <div className="flex-shrink-0 p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors duration-150">
                                                    <Presentation className="h-4 w-4 text-green-600 group-hover:scale-110 transition-transform duration-150" />
                                                </div>
                                                <div className="flex flex-col min-w-0 flex-1">
                                                    <span className="text-sm font-semibold text-[#212529] truncate">{infoSession.name}</span>
                                                    <span className="text-xs text-gray-500 truncate">{infoSession.formation} • {infoSession.start_date}</span>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-150" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* No Results */}
                            {!isSearching && filteredPages.length === 0 && searchResults.participants.length === 0 && searchResults.infoSessions.length === 0 && searchQuery.trim() && (
                                <div className="py-12 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Search className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <div className="text-lg font-medium text-gray-600 mb-2">No results found</div>
                                    <div className="text-sm text-gray-500">Try searching with different keywords</div>
                                </div>
                            )}

                            {/* Empty State */}
                            {!searchQuery.trim() && (
                                <div className="py-12 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Search className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <div className="text-lg font-medium text-gray-600 mb-2">Start typing to search</div>
                                    <div className="text-sm text-gray-500">Search for pages, participants, or info sessions</div>
                                </div>
                            )}
                </div>
            </div>
                </DialogContent>
            </Dialog>
        </header>
    );
}
