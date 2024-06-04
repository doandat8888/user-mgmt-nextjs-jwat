import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import ModalEditUser from "@/components/ModalEditUser"
import axios from "axios"

export const columns: (refreshData: () => void) => ColumnDef<User>[] = (refreshData) => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "fullname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "projects",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Project
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "activeYn",
        header: "Active Y / N",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;
            const [isOpen, setIsOpen] = useState(false);

            const handleEditUser = async (username: string, user: User) => {
                try {
                    const response = await axios.patch(`http://localhost:8000/users/update/${username}`, {
                        ...user
                    });
                    if (response.status === 200) {
                        alert('Update user successfully');
                        refreshData();

                    }
                } catch (error: any) {
                    alert(error.response.data.message);
                    console.log("Error when update user: ", error);
                }
            }

            const handleDeleteUser = async (username: string) => {
                try {
                    const response = await axios.delete(`http://localhost:8000/users/delete/${username}`);
                    if (response.status === 200) {
                        alert('Delete user successfully');
                        refreshData();
                    }
                } catch (error: any) {
                    alert(error.response.data.message);
                    console.log("Error when delete user: ", error);
                }
            }

            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setIsOpen(true)}>Update</DropdownMenuItem>
                            <DropdownMenuItem><p onClick={() => handleDeleteUser(user.username || '')} className="text-red-500">Delete</p></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ModalEditUser
                        isOpen={isOpen}
                        user={user}
                        onCloseModal={() => setIsOpen(false)}
                        handleEditUser={handleEditUser}
                    />
                </div>

            )
        },
    },
]

