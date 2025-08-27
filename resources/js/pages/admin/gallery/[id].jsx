import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Download, Eye, FileText, Globe, Image, Images } from 'lucide-react';

export default function GalleryDetail() {
    const { gallery, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Gallery',
            href: '/admin/gallery',
        },
        {
            title: gallery?.title?.en || 'Gallery Detail',
            href: `/admin/gallery/${gallery?.id}`,
        },
    ];

    const downloadImage = (imagePath, index) => {
        const link = document.createElement('a');
        link.href = `/storage/images/${imagePath}`;
        link.download = `gallery-${gallery.id}-image-${index + 1}`;
        link.click();
    };

    if (!gallery) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Gallery Not Found" />

                <div className="flex min-h-screen items-center justify-center bg-white">
                    <Card className="mx-6 w-full max-w-md border-0 bg-white shadow-lg">
                        <CardContent className="p-12 text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                <Images className="h-12 w-12 text-gray-400" />
                            </div>
                            <h2 className="mb-3 text-2xl font-bold text-[#212529]">Gallery Not Found</h2>
                            <p className="mb-6 text-gray-600">The gallery you're looking for doesn't exist or has been removed.</p>
                            <Button
                                onClick={() => router.visit('/admin/gallery')}
                                className="transform bg-[#212529] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Gallery
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={gallery.title?.en || 'Gallery Detail'} />

            <div className="min-h-screen bg-white">
                {/* Header Banner */}
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        {/* Back Button */}
                        <div className="mb-6">
                            <Button
                                variant="ghost"
                                onClick={() => router.visit('/admin/gallery')}
                                className="text-white transition-all duration-200 ease-in-out hover:bg-[#fee819] hover:text-[#212529]"
                            >
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Back to Gallery
                            </Button>
                        </div>

                        {/* Gallery Info */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-[#fee819] p-4">
                                    <Images className="h-8 w-8 text-[#212529]" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">{gallery.title?.en || 'Untitled Gallery'}</h1>
                                    <p className="mt-1 text-gray-300">{gallery.description?.en || 'No description available'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">{/* Edit button or other actions can go here */}</div>
                        </div>

                        {/* Gallery Stats */}
                        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div className="rounded-lg bg-white/10 p-4">
                                <div className="flex items-center gap-3">
                                    <Image className="h-5 w-5 text-[#fee819]" />
                                    <div>
                                        <p className="text-sm text-gray-300">Total Images</p>
                                        <p className="text-xl font-bold">{gallery.images?.length || 0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white/10 p-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-[#fee819]" />
                                    <div>
                                        <p className="text-sm text-gray-300">Created</p>
                                        <p className="text-xl font-bold">
                                            {gallery.created_at ? new Date(gallery.created_at).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white/10 p-4">
                                <div className="flex items-center gap-3">
                                    <Globe className="h-5 w-5 text-[#fee819]" />
                                    <div>
                                        <p className="text-sm text-gray-300">Languages</p>
                                        <p className="text-xl font-bold">3</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white/10 p-4">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-[#fee819]" />
                                    <div>
                                        <p className="text-sm text-gray-300">Status</p>
                                        <p className="text-xl font-bold">Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Gallery Information */}
                        <div className="space-y-6 lg:col-span-1">
                            {/* Gallery Details */}
                            <Card className="border-0 bg-white shadow-lg">
                                <CardHeader className="border-b border-gray-100 pb-4">
                                    <h3 className="flex items-center gap-2 text-lg font-semibold text-[#212529]">
                                        <div className="rounded-lg bg-[#fee819] p-2">
                                            <FileText className="h-4 w-4 text-[#212529]" />
                                        </div>
                                        Gallery Information
                                    </h3>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Title (English)</label>
                                        <p className="font-medium text-[#212529]">{gallery.title?.en || 'Not provided'}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Title (Français)</label>
                                        <p className="font-medium text-[#212529]">{gallery.title?.fr || 'Not provided'}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Title (العربية)</label>
                                        <p className="text-right font-medium text-[#212529]" dir="rtl">
                                            {gallery.title?.ar || 'غير متوفر'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Gallery Descriptions */}
                            <Card className="border-0 bg-white shadow-lg">
                                <CardHeader className="border-b border-gray-100 pb-4">
                                    <h3 className="flex items-center gap-2 text-lg font-semibold text-[#212529]">
                                        <div className="rounded-lg bg-[#fee819] p-2">
                                            <Globe className="h-4 w-4 text-[#212529]" />
                                        </div>
                                        Descriptions
                                    </h3>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">English</label>
                                        <p className="text-sm leading-relaxed text-[#212529]">
                                            {gallery.description?.en || 'No description provided'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Français</label>
                                        <p className="text-sm leading-relaxed text-[#212529]">
                                            {gallery.description?.fr || 'Aucune description fournie'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">العربية</label>
                                        <p className="text-right text-sm leading-relaxed text-[#212529]" dir="rtl">
                                            {gallery.description?.ar || 'لا يوجد وصف متاح'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Gallery Images */}
                        <div className="lg:col-span-2">
                            <Card className="border-0 bg-white shadow-lg">
                                <CardHeader className="border-b border-gray-100 pb-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#212529]">
                                            <div className="rounded-lg bg-[#fee819] p-2">
                                                <Images className="h-4 w-4 text-[#212529]" />
                                            </div>
                                            Gallery Images ({gallery.images?.length || 0})
                                        </h3>
                                        <Badge className="bg-[#212529] px-3 py-1 text-white">{gallery.images?.length || 0} images</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {gallery.images && gallery.images.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {gallery.images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative overflow-hidden rounded-lg bg-gray-50 transition-all duration-300 hover:shadow-lg"
                                                >
                                                    <img
                                                        src={`/storage/images/${image.path}`}
                                                        alt={`Gallery image ${index + 1}`}
                                                        className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        onError={(e) => {
                                                            e.target.src =
                                                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjJmMmYyIi8+CjxwYXRoIGQ9Ik0xMiA5QzEwLjM0IDkgOSAxMC4zNCA5IDEyUzEwLjM0IDE1IDEyIDE1IDE1IDEzLjY2IDE1IDEyIDEzLjY2IDkgMTIgOVoiIGZpbGw9IiM5Y2E0YWYiLz4KPC9zdmc+';
                                                        }}
                                                    />

                                                    {/* Overlay with actions */}
                                                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            onClick={() => downloadImage(image.path, index)}
                                                            className="bg-white/90 text-[#212529] transition-all duration-200 hover:bg-white"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                const newWindow = window.open();
                                                                newWindow.document.write(
                                                                    `<img src="/storage/images/${image.path}" style="width:100%; height:auto;" />`,
                                                                );
                                                            }}
                                                            className="bg-[#212529] text-white transition-all duration-200 hover:bg-[#fee819] hover:text-[#212529]"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    {/* Image number badge */}
                                                    <div className="absolute top-2 left-2">
                                                        <Badge className="bg-[#212529] px-2 py-1 text-xs text-white">{index + 1}</Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center">
                                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                                <Images className="h-12 w-12 text-gray-400" />
                                            </div>
                                            <h3 className="mb-3 text-xl font-semibold text-[#212529]">No Images Found</h3>
                                            <p className="mb-6 text-gray-600">
                                                This gallery doesn't contain any images yet. Add some images to get started.
                                            </p>
                                            <GalleryStore gallery={gallery} />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
