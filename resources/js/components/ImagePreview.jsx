import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, X } from 'lucide-react';

const ImagePreview = ({ isOpen, onClose, imageUrl, participantName }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Preload image for smoother experience
    useEffect(() => {
        if (isOpen && imageUrl) {
            const img = new Image();
            img.onload = () => setImageLoaded(true);
            img.onerror = () => setHasError(true);
            img.src = imageUrl;
        }
    }, [isOpen, imageUrl]);

    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
        setHasError(false);
    }, []);

    const handleImageError = useCallback(() => {
        setIsLoading(false);
        setHasError(true);
    }, []);

    const handleClose = useCallback(() => {
        // Reset states with a slight delay to prevent flicker
        setTimeout(() => {
            setIsLoading(true);
            setHasError(false);
            setImageLoaded(false);
        }, 150);
        onClose();
    }, [onClose]);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/95 border-0">
                <DialogHeader className="sr-only">
                    <DialogTitle>Image Preview - {participantName}</DialogTitle>
                </DialogHeader>
                
                <div className="relative flex items-center justify-center min-h-[60vh] max-h-[85vh] overflow-hidden">
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 cursor-pointer backdrop-blur-sm"
                        aria-label="Close image preview"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Loading state */}
                    {isLoading && !imageLoaded && (
                        <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in-0 duration-300">
                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                            <p className="text-white/80 text-sm">Loading image...</p>
                        </div>
                    )}

                    {/* Error state */}
                    {hasError && (
                        <div className="flex flex-col items-center justify-center space-y-4 text-center animate-in fade-in-0 duration-300">
                            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                                <X className="h-8 w-8 text-red-400" />
                            </div>
                            <div>
                                <p className="text-white text-lg font-medium">Failed to load image</p>
                                <p className="text-white/60 text-sm">The image could not be displayed</p>
                            </div>
                        </div>
                    )}

                    {/* Image */}
                    {!hasError && imageLoaded && (
                        <img
                            src={imageUrl}
                            alt={`${participantName} - Participant Photo`}
                            className="max-w-full max-h-full object-contain animate-in fade-in-0 zoom-in-95 duration-300 will-change-transform"
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            style={{
                                transform: 'translateZ(0)', // Force hardware acceleration
                            }}
                        />
                    )}
                </div>

                {/* Participant name at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-lg font-medium text-center">
                        {participantName}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImagePreview;
