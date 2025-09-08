import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { Download, Eye, Images, Trash, X } from 'lucide-react';
import { useState } from 'react';

export default function GalleryShow({ gallery }) {
    const { delete: destroy, processing } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);

    const onDelete = (imageID) => {
        setImageToDelete(imageID);
        setConfirmOpen(true);
    };

    const confirmDeletion = () => {
        if (!imageToDelete) return;
        destroy(route('images.destroy', imageToDelete), {
            onSuccess: () => {
                setConfirmOpen(false);
                setImageToDelete(null);
                // Reload current page props to update images list
                router.reload({ only: ['galleries'] });
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="cursor-pointer">
                    <Eye className="h-4 w-4" />
                </div>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-[90vw] [&>button]:hidden">
                {/* Header */}
                <div className="relative rounded-t-lg bg-[#212529] p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-[#fee819] p-2">
                                <Images className="h-6 w-6 text-[#212529]" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold text-white">{gallery?.title?.en || 'Gallery Images'}</DialogTitle>
                                <p className="mt-1 text-sm text-gray-300">View and manage gallery images</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge className="bg-[#fee819] px-3 py-1 text-[#212529]">{gallery?.images?.length || 0} images</Badge>
                            {/* Custom close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10 hover:text-[#fee819]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="p-6">
                    {/* Gallery Description */}
                    {gallery?.description?.en && (
                        <div className="mb-6 rounded-lg bg-gray-50 p-4">
                            <p className="text-gray-700">{gallery.description.en}</p>
                        </div>
                    )}

                    {/* Images Grid */}
                    <div className="custom-scrollbar max-h-[60vh] overflow-y-auto">
                        {gallery?.images?.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {gallery.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
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
                                                onClick={() => {
                                                    const link = document.createElement('a');
                                                    link.href = `/storage/images/${image.path}`;
                                                    link.download = `gallery-image-${index + 1}`;
                                                    link.click();
                                                }}
                                                className="bg-white/90 text-[#212529] transition-all duration-200 hover:bg-white"
                                            >
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                disabled={processing}
                                                onClick={() => onDelete(image.id)}
                                                className="bg-[#ff7376] text-white transition-all duration-200 hover:bg-[#ff5a5e]"
                                            >
                                                <Trash className="h-4 w-4" />
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
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                    <Images className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-[#212529]">No Images Found</h3>
                                <p className="text-gray-600">This gallery doesn't contain any images yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <p className="text-center text-sm text-gray-500">Click on images to download or delete them</p>
                    </div>
                </div>
                {/* Image Delete Confirmation Modal */}
                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogTitle>Delete image?</DialogTitle>
                        <div className="text-sm text-[#6b7280]">This action cannot be undone. The image will be permanently deleted.</div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setConfirmOpen(false);
                                    setImageToDelete(null);
                                }}
                                className="rounded bg-gray-100 px-3 py-1.5 text-sm text-[#111827] hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={processing}
                                onClick={confirmDeletion}
                                className="rounded bg-[#ff7376] px-3 py-1.5 text-sm text-white hover:bg-[#ff5a5e]"
                            >
                                Delete
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </DialogContent>
        </Dialog>
    );
}
