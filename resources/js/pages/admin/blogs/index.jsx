import AppLayout from "@/layouts/app-layout"
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { BookOpen, CalendarIcon, Delete, Edit, Images, Plus, Trash2 } from "lucide-react";


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
            }
        })
    }


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
                                <div className="rounded-lg bg-[#fee819] p-3">
                                    <BookOpen  className="h-8 w-8 text-[#212529]" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Blogs</h1>
                                    <p className="mt-1 text-gray-300">Manage blog posts created and published on your platform</p>
                                </div>
                            </div>
                            <a href="/admin/blogs/create">
                                <Button
                                    className="bg-[#212529] text-white hover:bg-[#fee819] hover:text-[#212529] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Write a New Blog
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="mx-auto max-w-7xl px-6 pt-8">

                <div className="mb-4 ">
                    <h2 className="text-lg font-semibold text-[#212529]">All Blogs ({totalBlogs}) </h2>
                </div>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.slice().reverse().map((blog) => (
                        <div
                            key={blog.id}
                            className="border rounded-lg shadow hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 p-3 flex flex-col justify-between bg-gray-50 text-[#212529]"
                        >
                            <div className="w-full h-40 overflow-hidden rounded-md">
                                <img
                                    className="w-full h-full object-cover"
                                    src={`/storage/images/blog/${blog.image}`}
                                    alt=""
                                />
                            </div>
                            <h3 className="mt-3 font-semibold text-lg">
                                {blog.title?.en}
                            </h3>
                            <div className="mt-4 flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                                        <CalendarIcon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-gray-500">Creation Date</p>
                                        <p className="font-medium text-[#212529]">{new Date(blog.created_at).toLocaleDateString()}</p>
                                    </div>

                                </div>
                                <div className="flex items-center gap-3">
                                    <a href={`blogs/${blog.id}`}>
                                        <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-110 border">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    </a>
                                    <button
                                        className="text-red-600 hover:text-red-800 cursor-pointer p-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 border"
                                        onClick={() => onConfirmDelete(blog.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                            <DialogTitle>Are you sure you want to delete this blog?</DialogTitle>

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    className="px-3 py-1 rounded border"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-600 text-white rounded"
                                    onClick={onDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                </div>

            </div>
        </AppLayout>
    )
}
