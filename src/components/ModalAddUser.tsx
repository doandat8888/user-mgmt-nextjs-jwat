import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Inter } from "next/font/google";

interface Props {
    isOpen: boolean;
    onCloseModal: () => void;
    handleAddUser: (formData: User) => void;
}


const inter = Inter({ subsets: ['latin'] });

import { ChangeEvent, useState } from 'react';
import ProjectItem from "./ProjectItem";

const ModalAddUser = ({ isOpen, onCloseModal, handleAddUser }: Props) => {

    const [projectName, setProjectName] = useState('');

    const [formData, setFormData] = useState<User>({
        username: '',
        fullname: '',
        role: '',
        projects: [],
        activeYn: 'Y'
    });

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        if (id !== 'projects') {
            setFormData(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const handleSelectChange = (value: string) => {
        setFormData(prevState => ({
            ...prevState,
            activeYn: value
        }));
    };

    const onAddUser = (e: any) => {
        let isEmpty = false;
        for(const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (formData[key] === '' || formData.projects.length === 0) {
                    isEmpty = true;
                    alert('Missing user information');
                    break;
                }
            }
        }
        if(isEmpty === false) {
            handleAddUser(formData);
            onClose();
        }
    };

    const onClose = () => {
        setFormData({
            username: '',
            fullname: '',
            role: '',
            projects: [],
            activeYn: ''
        })
        onCloseModal();
    }

    const onAddProject = () => {
        if (projectName) {
            setFormData(prevState => ({
                ...prevState,
                projects: [...prevState.projects, projectName]
            }));
            setProjectName('');
        }
    };

    const removeProject = (index: number) => {
        setFormData(prevState => {
            const newProjects = [...prevState.projects];
            newProjects.splice(index, 1);
            return {
                ...prevState,
                projects: newProjects
            };
        });
    }


    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className={`sm:max-w-[425px] ${inter.className}`}>
                    <DialogHeader>
                        <DialogTitle>Add new user</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                className="col-span-3"
                                placeholder="Enter username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullname">Name</Label>
                            <Input
                                id="fullname"
                                className="col-span-3"
                                placeholder="Enter full name"
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                className="col-span-3"
                                placeholder="Enter user's role"
                                value={formData.role}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="col-span-full" htmlFor="projects">Projects</Label>
                            <Input
                                className="col-span-3"
                                placeholder="Enter user's projects"
                                value={projectName}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
                            />
                            <Button onClick={onAddProject} className="col-span-1">Add</Button>
                            {formData.projects.length > 0 && formData.projects.map((project, index) => (
                                <ProjectItem key={index} index={index} projectName={project} removeProject={removeProject} />
                            ))}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="col-span-1" htmlFor="activeYn">Active y/n</Label>
                            <Select defaultValue="Yes" value={formData.activeYn} onValueChange={handleSelectChange}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select active y/n"/>
                                </SelectTrigger>
                                <SelectContent className="col-span-3">
                                    <SelectGroup>
                                        <SelectItem value="Y">Yes</SelectItem>
                                        <SelectItem value="N">No</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-end">
                        <div className="flex space-x-4 justify-end">
                            <Button onClick={onAddUser}>Add</Button>
                            <Button onClick={onClose} type="button" variant="secondary">
                                Close
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ModalAddUser;
