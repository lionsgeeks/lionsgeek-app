import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { Edit, FolderOpen, Plus, Upload, X } from 'lucide-react';
import { useState } from 'react';

export default function ProjectModal({ project }) {
    const [isOpen, setIsOpen] = useState(false);
    const [tab, setTab] = useState('English');
    const languages = ['English', 'Français', 'العربية'];
    const { data, setData, post } = useForm({
        name: project ? project.name : '',
        description_en: project ? project.description?.en : '',
        description_fr: project ? project.description?.fr : '',
        description_ar: project ? project.description?.ar : '',
        logo: project ? project.logo : '',
        preview: project ? project.preview : '',
    });

    const handleFileChange = (event) => {
        if (event.target.name === 'logo') {
            setData('logo', event.target.files[0]);
        }
        if (event.target.name === 'preview') {
            setData('preview', event.target.files[0]);
        }
    };

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
                    },
                },
            );
        } else {
            post(route('projects.store'), {
                onSuccess: () => {
                    setData({
                        name: '',
                        description_en: '',
                        description_fr: '',
                        description_ar: '',
                        logo: '',
                        preview: '',
                    });
                    setIsOpen(false);
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {project ? (
                    <div className="cursor-pointer">
                        <Edit className="h-4 w-4" />
                    </div>
                ) : (
                    <Button className="transform bg-[#fee819] text-[#212529] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212529] hover:text-[#fee819]">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Project
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="custom-scrollbar max-h-[90vh] overflow-y-auto p-0 sm:max-w-[700px] [&>button]:hidden">
                {/* Header */}
                <div className="relative rounded-t-lg bg-[#212529] p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-[#fee819] p-2">
                                <FolderOpen className="h-6 w-6 text-[#212529]" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold text-white">{project ? 'Edit Project' : 'Create New Project'}</DialogTitle>
                                <p className="mt-1 text-sm text-gray-300">
                                    {project ? 'Update project information and images' : 'Add a new project with logo and preview'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10 hover:text-[#fee819]"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <form onSubmit={onFormSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#212529]">
                                Project Name *
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter project name"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-lg border-gray-300 transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-1 rounded-lg bg-gray-100 p-1">
                            {languages.map((language) => (
                                <button
                                    key={language}
                                    onClick={() => setTab(language)}
                                    className={`flex-1 rounded-md px-3 py-2 font-medium transition-all duration-200 ${
                                        tab === language ? 'bg-[#212529] text-white shadow-sm' : 'bg-transparent text-gray-600 hover:bg-gray-200'
                                    }`}
                                    type="button"
                                >
                                    {language}
                                </button>
                            ))}
                        </div>

                        {tab === 'English' && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="description_en" className="mb-2 block text-sm font-medium text-[#212529]">
                                        Description *
                                    </label>
                                    <textarea
                                        id="description_en"
                                        name="description_en"
                                        placeholder="Enter project description"
                                        required
                                        rows={4}
                                        value={data.description_en}
                                        onChange={(e) => setData('description_en', e.target.value)}
                                        className="w-full resize-none rounded-lg border border-gray-300 p-3 transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                    />
                                </div>
                            </div>
                        )}

                        {tab === 'Français' && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="description_fr" className="mb-2 block text-sm font-medium text-[#212529]">
                                        Description *
                                    </label>
                                    <textarea
                                        id="description_fr"
                                        name="description_fr"
                                        placeholder="Entrez la description du projet"
                                        required
                                        rows={4}
                                        value={data.description_fr}
                                        onChange={(e) => setData('description_fr', e.target.value)}
                                        className="w-full resize-none rounded-lg border border-gray-300 p-3 transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                    />
                                </div>
                            </div>
                        )}

                        {tab === 'العربية' && (
                            <div className="space-y-4 text-right" dir="rtl">
                                <div>
                                    <label htmlFor="description_ar" className="mb-2 block text-sm font-medium text-[#212529]">
                                        الوصف *
                                    </label>
                                    <textarea
                                        id="description_ar"
                                        name="description_ar"
                                        placeholder="أدخل وصف المشروع"
                                        required
                                        rows={4}
                                        value={data.description_ar}
                                        onChange={(e) => setData('description_ar', e.target.value)}
                                        className="w-full resize-none rounded-lg border border-gray-300 p-3 text-right transition-all duration-200 ease-in-out focus:border-[#212529] focus:ring-2 focus:ring-[#212529]/20"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#212529]">Project Logo *</label>
                            <label
                                htmlFor="logo"
                                className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-all duration-200 hover:border-[#212529]"
                            >
                                <div className="rounded-lg bg-gray-100 p-2 transition-all duration-200 group-hover:bg-[#212529] group-hover:text-white">
                                    <Upload className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#212529]">{data.logo ? 'Logo selected' : 'Upload project logo'}</p>
                                    <p className="text-sm text-gray-500">PNG, JPG or JPEG (Max 10MB)</p>
                                </div>
                            </label>
                            <Input
                                id="logo"
                                name="logo"
                                type="file"
                                accept="image/png,image/jpg,image/jpeg"
                                onChange={handleFileChange}
                                required={!project}
                                className="hidden"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#212529]">Project Preview (Optional)</label>
                            <label
                                htmlFor="preview"
                                className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-all duration-200 hover:border-[#212529]"
                            >
                                <div className="rounded-lg bg-gray-100 p-2 transition-all duration-200 group-hover:bg-[#212529] group-hover:text-white">
                                    <FolderOpen className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#212529]">{data.preview ? 'Preview selected' : 'Upload project preview'}</p>
                                    <p className="text-sm text-gray-500">PNG, JPG or JPEG (Optional)</p>
                                </div>
                            </label>
                            <Input
                                id="preview"
                                name="preview"
                                type="file"
                                accept="image/png,image/jpg,image/jpeg"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 border-gray-300 text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 transform bg-[#212529] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#fee819] hover:text-[#212529]"
                            >
                                {project ? 'Update Project' : 'Create Project'}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
