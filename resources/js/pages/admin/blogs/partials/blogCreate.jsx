import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react";
import Tiptap from "./tiptap";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const breadcrumbs = [{
    title: 'Create Blog',
    href: '/admin/blogs/create'
}]
export default function BlogCreate() {
    const { blog } = usePage().props;

    const { data, setData, post } = useForm({
        title_en: blog ? blog.title?.en : '',
        title_fr: blog ? blog.title?.fr : '',
        title_ar: blog ? blog.title?.ar : '',
        description_en: blog ? blog.description?.en : '',
        description_fr: blog ? blog.description?.fr : '',
        description_ar: blog ? blog.description?.ar : '',
        image: blog ? blog.image : '',
    })


    const onFormSubmit = (e) => {
        e.preventDefault();
        if (blog) {
            post(
                route('blogs.update', {
                    _method: 'put',
                    blog: blog.id,
                }),
                {
                    onSuccess: () => {
                        setIsOpen(false);
                    }
                }
            );
        } else {
            post(route('blogs.store'));
        }
    };

    const [tab, setTab] = useState('English');
    const languages = ['English', 'Français', 'العربية'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Blog" />

            <div className="p-6">
                <form onSubmit={onFormSubmit} className="space-y-3">
                    <div className="flex items-center justify-center gap-2 p-2 w-[100%] bg-slate-200 rounded">
                        {languages.map((language) => (
                            <button
                                key={language}
                                onClick={() => setTab(language)}
                                className={`w-1/3 rounded-md font-medium p-1 ${tab === language ? 'bg-white text-black' : 'bg-slate-200 text-black'
                                    }`}
                                type="button"
                            >
                                {language}
                            </button>
                        ))}
                    </div>
                    {
                        tab == 'English' && (
                            <>
                                <div>
                                    <Label htmlFor="title_en">English Title:</Label>
                                    <Input type="text" name="title_en" placeholder="English Title"
                                        onChange={(e) => { setData('title_en', e.target.value) }}
                                        value={data.title_en}
                                    />
                                </div>

                                <Tiptap content={data.description_en} setData={setData} lang={tab} />
                            </>
                        )
                    }
                    {
                        tab == 'Français' && (
                            <>
                                <div>
                                    <Label htmlFor="title_fr">Titre en Français:</Label>
                                    <Input type="text" name="title_fr" placeholder="Titre en Français"
                                        onChange={(e) => { setData('title_fr', e.target.value) }}
                                        value={data.title_fr}
                                    />
                                </div>

                                <Tiptap content={data.description_fr} setData={setData} lang={tab} />
                            </>
                        )
                    }
                    {
                        tab == 'العربية' && (
                            <>
                                <div>
                                    <Label htmlFor="title_ar">العنوان بالعربية:</Label>
                                    <Input type="text" name="title_ar" placeholder="العنوان بالعربية"
                                        onChange={(e) => { setData('title_ar', e.target.value) }}
                                        value={data.title_ar}
                                    />
                                </div>

                                <Tiptap content={data.description_ar} setData={setData} lang={tab} />
                            </>
                        )
                    }

                    <div>
                        <Label htmlFor="image">Blog Cover</Label>
                        <Input type="file" name="image"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={(e) => { setData('image', e.target.files[0]) }}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" className="hover:bg-alpha hover:text-black transition-all duration-150">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}
