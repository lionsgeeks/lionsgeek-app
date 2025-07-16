import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from '@inertiajs/react';
import { Pen, PenLine, PlusIcon } from 'lucide-react';

export default function ProjectModal({ project }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post } = useForm({
        name: project ? project.name : '',
        description_en: project ? project.description.en : '',
        description_fr: project ? project.description.fr : '',
        description_ar: project ? project.description.ar : '',
        logo: project ? project.logo : '',
        preview: project ? project.preview : '',
    })

    const onFormSubmit = (e) => {
        e.preventDefault();

        if (project) {
            post(
                route('projects.update', {
                    _method: 'put',
                    project: project.id,
                }),
                {
                    onSuccess: () => {
                        setIsOpen(false);
                    }
                }
            );
        } else {
            post(route('projects.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    setData({
                        name: '',
                        description_en: '',
                        description_fr: '',
                        description_ar: '',
                        logo: '',
                        preview: '',
                    });
                }
            })
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>


                <div className='cursor-pointer'>
                    {
                        project ? <PenLine /> :
                            <div className='flex items-center justify-center h-full group w-full border-dashed border-1 border-black rounded-lg'>
                                <div className='flex flex-col gap-2 items-center group-hover:scale-110 transition-all duration-150'>
                                    <PlusIcon size={40} />
                                    <p className='text-lg '>Create Project</p>
                                </div>
                            </div>
                    }
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-[40vw]">
                <DialogTitle>Add a Project</DialogTitle>

                <form onSubmit={onFormSubmit}
                    className='space-y-3'
                >

                    <div>
                        <Label htmlFor="name">Name: </Label>
                        <Input type="text" name="name"
                            onChange={(e) => { setData('name', e.target.value) }}
                            value={data.name} placeholder="Project Name"
                        />
                    </div>


                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="description_en">
                            Description (English)
                        </Label>
                        <Textarea name='description_en'
                            onChange={(e) => { setData('description_en', e.target.value) }}
                            value={data.description_en} placeholder="Description in English"
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="description_fr">
                            Description (Français)
                        </Label>
                        <Textarea name='description_fr'
                            onChange={(e) => { setData('description_fr', e.target.value) }}
                            value={data.description_fr} placeholder="Description en Français"
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="description_ar" className="text-end">
                            الوصف بالعربية
                        </Label>
                        <Textarea name='description_ar' className="text-end"
                            onChange={(e) => { setData('description_ar', e.target.value) }}
                            value={data.description_ar} placeholder="وصف بالعربية"
                        />
                    </div>


                    <div className="flex flex-col gap-1 my-1">
                        <p>Logo</p>

                        <label
                            htmlFor="logo"
                            className="p-[0.75rem] cursor-pointer flex gap-2 items-center border-[2px] border-black rounded-[10px]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 flex-shrink-0"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                            <span className="text-base text-gray-500">
                                Upload Logo
                            </span>
                        </label>

                        <Input
                            onChange={(e) => { setData('logo', e.target.files[0]) }}
                            className="hidden"
                            required={!project}
                            type="file"
                            placeholder="logo"
                            accept="image/png, image/jpg, image/jpeg"
                            name="logo"
                            id="logo"
                        />
                    </div>



                    <div className="flex flex-col gap-1 my-1">
                        <p>Preview (optional)</p>

                        <label
                            htmlFor="preview"
                            className="p-[0.75rem] cursor-pointer flex gap-2 items-center border-[2px] border-black rounded-[10px]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 flex-shrink-0"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                            <span id="imagesPlaceholder" className="text-base text-gray-500">
                                Upload preview
                            </span>
                        </label>

                        <Input
                            onChange={(e) => (setData('preview', e.target.files[0]))}
                            className="hidden"
                            type="file"
                            placeholder="preview"
                            accept="image/png, image/jpg, image/jpeg"
                            name="preview"
                            id="preview"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full hover:bg-alpha hover:text-black transition-all duration-150 ">
                        Submit
                    </Button>
                </form>

            </DialogContent>
        </Dialog>
    )
}
