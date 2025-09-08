import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Filter, Image, Images, RotateCcw, Search, Trash } from 'lucide-react';
import { useState } from 'react';
import GalleryShow from './partials/galleryShow';
import GalleryStore from './partials/galleryStore';

const breadcrumbs = [
    {
        title: 'Gallery',
        href: '/admin/gallery',
    },
];

export default function GalleryAdmin() {
    const { galleries = [] } = usePage().props;
    const { delete: destroy } = useForm();
    const [search, setSearch] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [galleryToDelete, setGalleryToDelete] = useState(null);

    const filteredGallery = galleries.filter(
        (gal) =>
            gal.title?.en?.toLowerCase().includes(search?.toLowerCase()) ||
            gal.title?.fr?.toLowerCase().includes(search?.toLowerCase()) ||
            gal.title?.ar?.toLowerCase().includes(search?.toLowerCase()) ||
            gal.description?.en?.toLowerCase().includes(search?.toLowerCase()) ||
            gal.description?.fr?.toLowerCase().includes(search?.toLowerCase()) ||
            gal.description?.ar?.toLowerCase().includes(search?.toLowerCase()),
    );

    const onDeleteGallery = (galleryID) => {
        setGalleryToDelete(galleryID);
        setConfirmOpen(true);
    };

    const confirmDeletion = () => {
        if (!galleryToDelete) return;
        destroy(route('gallery.destroy', galleryToDelete));
        setConfirmOpen(false);
        setGalleryToDelete(null);
    };

    const totalImages = galleries.reduce((sum, gallery) => sum + (gallery.images?.length || 0), 0);
    const hasSearch = search.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />

            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#fee819] p-3">
                                    <Images className="h-8 w-8 text-[#212529]" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Gallery Management</h1>
                                    <p className="mt-1 text-gray-300">Manage photo galleries and collections</p>
                                </div>
                            </div>
                            <GalleryStore />
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mx-auto -mt-4 max-w-7xl px-6">
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Galleries</p>
                                        <p className="text-3xl font-bold text-[#212529]">{galleries.length}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Images className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Images</p>
                                        <p className="text-3xl font-bold text-[#212529]">{totalImages}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Image className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Search Results</p>
                                        <p className="text-3xl font-bold text-[#212529]">{filteredGallery.length}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Search className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="mx-auto mb-8 max-w-7xl px-6">
                    <Card className="border-0 bg-gray-50">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-[#212529]" />
                                    <h3 className="text-lg font-semibold text-[#212529]">Filter Galleries</h3>
                                    {hasSearch && (
                                        <Badge variant="secondary" className="bg-gray-100 px-2 py-1 text-[#212529]">
                                            {filteredGallery.length} result{filteredGallery.length !== 1 ? 's' : ''}
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                    <div className="relative">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                                        <Input
                                            type="text"
                                            placeholder="Search galleries..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-10 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#212529]/20 sm:w-80"
                                        />
                                    </div>
                                    {hasSearch && (
                                        <Button
                                            variant="outline"
                                            onClick={() => setSearch('')}
                                            className="border-gray-300 text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100"
                                        >
                                            <RotateCcw className="mr-2 h-4 w-4" />
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Gallery Grid */}
                <div className="mx-auto max-w-7xl px-6 pb-8">
                    {galleries.length === 0 ? (
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-12 text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                    <Images className="h-12 w-12 text-gray-400" />
                                </div>
                                <h2 className="mb-3 text-2xl font-bold text-[#212529]">No Galleries Available</h2>
                                <p className="mx-auto mb-6 max-w-md text-gray-600">
                                    Get started by creating your first gallery. Upload images and organize them into beautiful collections.
                                </p>
                                <GalleryStore />
                            </CardContent>
                        </Card>
                    ) : filteredGallery.length === 0 ? (
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-12 text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                    <Search className="h-12 w-12 text-gray-400" />
                                </div>
                                <h2 className="mb-3 text-2xl font-bold text-[#212529]">No Results Found</h2>
                                <p className="mb-6 text-gray-600">No galleries match your search criteria. Try adjusting your search terms.</p>
                                <Button variant="outline" onClick={() => setSearch('')} className="border-gray-300 text-gray-700 hover:bg-gray-100">
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Clear Search
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredGallery.map((gallery, index) => (
                                <Card
                                    key={index}
                                    className="flex h-full transform cursor-pointer flex-col overflow-hidden border-0 bg-white p-0 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
                                    onClick={() => router.visit(`/admin/gallery/${gallery.id}`)}
                                >
                                    <div className="relative">
                                        <img
                                            className="h-48 w-full object-cover"
                                            src={`/storage/images/gallery/${gallery.couverture}`}
                                            alt={gallery.title?.en || 'Gallery cover'}
                                            onError={(e) => {
                                                e.target.src =
                                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjJmMmYyIi8+CjxwYXRoIGQ9Ik0xMiA5QzEwLjM0IDkgOSAxMC4zNCA5IDEyUzEwLjM0IDE1IDEyIDE1IDE1IDEzLjY2IDE1IDEyIDEzLjY2IDkgMTIgOVoiIGZpbGw9IiM5Y2E0YWYiLz4KPC9zdmc+';
                                            }}
                                        />
                                        <div className="absolute top-3 right-3">
                                            <Badge className="bg-[#212529] px-2 py-1 text-xs text-white">{gallery.images?.length || 0} images</Badge>
                                        </div>
                                    </div>

                                    <CardContent className="flex-1 p-4">
                                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-[#212529]">
                                            {gallery.title?.en || 'Untitled Gallery'}
                                        </h3>
                                        <p className="line-clamp-2 min-h-[20px] text-sm text-gray-600">
                                            {gallery.description?.en || 'No description available'}
                                        </p>
                                    </CardContent>

                                    <CardFooter className="p-4 pt-0">
                                        <div className="flex w-full items-center justify-between gap-2">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    className="transform text-[#212529] transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-100"
                                                >
                                                    <GalleryShow gallery={gallery} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    className="transform text-[#212529] transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-100"
                                                >
                                                    <GalleryStore gallery={gallery} />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteGallery(gallery.id);
                                                }}
                                                className="transform text-[#ff7376] transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#ff7376]/10"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Delete Confirmation Modal */}
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Delete gallery?</DialogTitle>
                    <div className="text-sm text-[#6b7280]">
                        This action cannot be undone. The gallery and its images will be permanently deleted.
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setConfirmOpen(false);
                                setGalleryToDelete(null);
                            }}
                            className="bg-gray-100 text-[#111827] hover:bg-gray-200"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDeletion}
                            className="bg-[#ff7376] text-white hover:bg-[#ff5a5e]"
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
