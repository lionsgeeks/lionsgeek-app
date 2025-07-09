import AppLayout from "@/layouts/app-layout"
import { Head, useForm, usePage } from "@inertiajs/react";
import ProjectModal from "./partials/projectModal";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Search, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const breadcrumbs = [
    {
        title: 'Projects',
        href: '/admin/projects',
    },
];
export default function ProjectsAdmin() {
    const { projects } = usePage().props;
    const { delete: destroy } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [projectID, setProjectID] = useState(null);

    const [search, setSearch] = useState('');

    const filteredProj = projects.filter((pro) =>
        pro?.name?.toLowerCase().includes(search?.toLowerCase())
    );

    const onDeleteProject = () => {
        destroy(route('projects.destroy', projectID), {
            onSuccess: () => {
                setIsOpen(false);
            }
        })
    }

    const onConfirmDelete = (projectID) => {
        setProjectID(projectID);
        setIsOpen(true);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="p-6">
                <div className="relative w-[300px]">
                    <Input
                        type="text"
                        placeholder="Search Project"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>

                <div className="mt-4">

                    <div className="w-full grid grid-cols-3 gap-2 min-h-[40vh]">
                        <ProjectModal />

                        {filteredProj.map((project) => (
                            <div
                                key={project.id}
                                className="
                                border-t-black border-t-4
                                shadow-l bg-[#fafafa] border border-gray-500/50 rounded-lg p-5"
                            >
                                <div className="py-2 flex items-center justify-between">
                                    <div className="flex items-center gap-x-3">
                                        <img
                                            className="w-14 h-14 rounded-full object-cover"
                                            src={`/storage/images/projects/${project.logo}`}
                                            alt=""
                                        />
                                        <h1 className="font-bold lg:text-lg">
                                            {project.name.length > 10 ? project.name.slice(0, 15) + '...' : project.name}
                                        </h1>
                                    </div>

                                    <div className="relative flex items-center gap-x-3">
                                        <ProjectModal project={project} />

                                        <button
                                            onClick={() => { onConfirmDelete(project.id) }}
                                        >
                                            <Trash color="red" />
                                        </button>

                                    </div>
                                </div>

                                <div className="py-3">
                                    <img
                                        className="w-full shadow-l h-[12rem] rounded-lg object-cover"
                                        src={`/storage/images/projects/${project.preview || project.logo}`}
                                        alt=""
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                            <DialogTitle>
                                Are You Sure You Want To Delete This Project ?
                            </DialogTitle>
                            <p>
                                You Will Lost All The Information and Images Related to This Project.
                            </p>

                            <div className="flex items-center justify-end gap-2">
                                <Button
                                    onClick={() => { setIsOpen(false) }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={() => onDeleteProject()}
                                >
                                    Delete
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AppLayout>
    )
}
