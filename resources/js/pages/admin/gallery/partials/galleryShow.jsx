import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Cross, Eye, X } from 'lucide-react';
import { useForm } from '@inertiajs/react';

export default function GalleryShow({ gallery }) {
    const { delete: destroy, processing } = useForm();

    const onDelete = (imageID) => {
        destroy(route('images.destroy', imageID));
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="">
                    <Eye />
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[65vw]">
                <p></p>
                <div>

                    <div className='grid grid-cols-4 gap-2'>
                        {
                            gallery?.images?.map((ima, ind) => (
                                <div key={ind} className='relative'>
                                    <button
                                    disabled={processing}
                                    onClick={() => {onDelete(ima.id)}}
                                    className='absolute top-[10px] right-[10px] bg-red-500 text-white rounded p-1 cursor-pointer'>
                                        <X />
                                    </button>
                                    <img
                                        src={`/storage/images/${ima.path}`}
                                        alt=""
                                        className='w-[350px] rounded aspect-square object-cover'
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
