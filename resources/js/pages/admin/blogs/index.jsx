import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BookOpen, CalendarIcon, Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Blogs',
        href: '/admin/blogs',
    },
];

export default function BlogAdmin() {
    const { blogs } = usePage().props;
    const { delete: destroy } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState('');

    const totalBlogs = blogs?.length || 0;
    const onDelete = () => {
        destroy(route('blogs.destroy', selectedBlog), {
            onSuccess: () => {
                setIsOpen(false);
            },
        });
    };

    const onConfirmDelete = (blog) => {
        setSelectedBlog(blog);
        setIsOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blogs" />
            <div className="min-h-screen bg-white">
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#fee819] p-3 lg:flex hidden">
                                    <BookOpen className="h-8 w-8 text-[#212529]" />
                                </div>
                                <div>
                                    <h1 className="lg:text-3xl text-2xl lg:font-bold  capitalize">Blogs</h1>
                                    <p className="mt-1 text-gray-300 lg:text-lg text-[0.8rem] lg:w-fit w-[90%] ">Manage blog posts created and published on your platform</p>
                                </div>
                            </div>
                            <a href="/admin/blogs/create">
                                <Button className="flex justify-center transform cursor-pointer items-center rounded-lg bg-[#fee819] px-2 py-2 h-fit lg:w-fit text-sm font-medium text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
                                    <Plus className="mr-2 h-4 w-4 lg:flex hidden" />
                                    Write a New Blog
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 pt-8">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-[#212529]">All Blogs ({totalBlogs}) </h2>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {blogs
                            .slice()
                            .reverse()
                            .map((blog) => (
                                <div
                                    key={blog.id}
                                    className="flex flex-col justify-between rounded-lg border bg-gray-50 p-3 text-[#212529] shadow transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="h-40 w-full overflow-hidden rounded-md">
                                        <img className="h-full w-full object-cover" src={`/storage/images/blog/${blog.image}`} alt="" />
                                    </div>
                                    <h3 className="mt-3 text-lg font-semibold">{blog.title?.en}</h3>
                                    <div className="mt-4 flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <div className="flex-shrink-0 rounded-lg bg-gray-100 p-2">
                                                <CalendarIcon className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-500">Creation Date</p>
                                                <p className="font-medium text-[#212529]">{new Date(blog.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <a href={`blogs/${blog.id}`}>
                                                <button className="transform rounded-lg border bg-white p-2 transition-all duration-200 ease-in-out hover:scale-110 hover:bg-gray-100">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </a>
                                            <button
                                                className="transform cursor-pointer rounded-lg border p-2 text-red-600 transition-all duration-200 ease-in-out hover:scale-110 hover:text-red-800"
                                                onClick={() => onConfirmDelete(blog.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
             <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 ">
                                <DialogTitle>Are you sure you want to delete this blog?</DialogTitle>

                                <div className="mt-4 flex justify-end gap-3">
                                    <button className="rounded border px-3 py-1" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </button>
                                    <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={onDelete}>
                                        Delete
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
