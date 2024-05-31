import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { CiEdit, CiTrash } from "react-icons/ci";

interface Props {
    users: User[];
    onEditUser: (user: User) => void;
    onDeleteUser: (username: string) => void;
}

export function UserList({ users, onEditUser, onDeleteUser }: Props) {
    return (
        <div className="">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Full name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Projects</TableHead>
                        <TableHead>Active Y/N</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.username}>
                            <TableCell className="font-medium max-w-[140px] truncate">{user.username}</TableCell>
                            <TableCell className="overflow-hidden max-w-[200px] truncate text-ellipsis">{user.fullname}</TableCell>
                            <TableCell className="truncate">{user.role}</TableCell>
                            <TableCell className="truncate max-w-[200px]">{user.projects.join(', ')}</TableCell>
                            <TableCell className="max-w-[40px] truncate">{user.activeYn}</TableCell>
                            <TableCell className="max-w-[200px] truncate space-x-3">
                                <Button onClick={() => onEditUser(user)} className="border px-2 py-1 border-black" variant={"outline"}>
                                    <CiEdit className="text-lg text-black"/>
                                </Button>
                                <Button onClick={() => onDeleteUser(user.username || '')} className="border px-2 py-1 border-red-500" variant={"outline"}>
                                    <CiTrash className="text-lg text-red-500"/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
