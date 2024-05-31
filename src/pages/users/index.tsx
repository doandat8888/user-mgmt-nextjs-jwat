import { UserList } from '@/components/UserList';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ModalAddUser from '@/components/ModalAddUser';
import ModalEditUser from '@/components/ModalEditUser';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ManageUser = ({ users: initialUsers }: { users: User[] }) => {

    const [isOpenModalAddUser, setIsOpenModalAddUser] = useState(false);
    const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
    const [users, setUsers] = useState(initialUsers);
    const [userEdit, setUserEdit] = useState<User>();

    const [searchParams, setSearchParams] = useState({
        username: '',
        fullname: '',
        role: '',
        activeYn: ''
    });

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8000/users');
            setUsers(response.data);
        } catch (error) {
            console.log("Error when fetch users: ", error);
        }
    }, []);

    const handleAddUser = async (user: User) => {
        try {
            const response = await axios.post('http://localhost:8000/users/create', {
                ...user
            });
            if (response.status === 201) {
                alert('Add new user successfully');
                fetchUsers();
            }
        } catch (error: any) {
            alert(error.response.data.message);
        }
    }

    const handleEditUser = async (username: string, user: User) => {
        try {
            const response = await axios.patch(`http://localhost:8000/users/update/${username}`, {
                ...user
            });
            if (response.status === 200) {
                alert('Update user successfully');
                fetchUsers();
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
                fetchUsers();
            }
        } catch (error: any) {
            alert(error.response.data.message);
            console.log("Error when delete user: ", error);
        }
    }

    const handleChangeParam = (e: any) => {
        const { id, value } = e.target;
        setSearchParams(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSelectChange = (value: string) => {
        setSearchParams(prevState => ({
            ...prevState,
            activeYn: value
        }));
    };

    const handleSearch = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8000/users/search?username=${searchParams.username}&fullname=${searchParams.fullname}&role=${searchParams.role}&activeYn=${searchParams.activeYn}`)
            if (response.status === 200) {
                setUsers(response.data);
            } else {
                alert(response.data.message);
            }
        } catch (error: any) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className='container py-20'>
            <div className='w-full md:w-[90%] lg:w-[80%] mx-auto space-y-10 '>
                <div className='text-xl sm:text-2xl lg:text-3xl font-bold uppercase text-center w-full'>Manage user</div>
                <div className=' space-y-4 lg:flex lg:space-x-4 lg:space-y-0'>
                    <form onSubmit={handleSearch} className="space-y-4 lg:flex lg:space-x-4 lg:space-y-0">
                        <Input
                            id='username'
                            value={searchParams.username}
                            placeholder="Enter username to search"
                            onChange={handleChangeParam}
                        />
                        <Input
                            id='fullname'
                            value={searchParams.fullname}
                            placeholder="Enter full name to search"
                            onChange={handleChangeParam}
                        />
                        <Input
                            id='role'
                            value={searchParams.role}
                            placeholder="Enter role to search"
                            onChange={handleChangeParam}
                        />
                        <Select value={searchParams.activeYn} onValueChange={handleSelectChange}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select active y/n" />
                            </SelectTrigger>
                            <SelectContent id='activeYn' className="col-span-3">
                                <SelectGroup>
                                    <SelectItem value="Y">Yes</SelectItem>
                                    <SelectItem value="N">No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button
                            className='w-full lg:w-auto'
                            variant={'outline'}
                        >
                            Search
                        </Button>
                    </form>
                    <Button className='w-full lg:w-auto' onClick={() => setIsOpenModalAddUser(true)}>Add</Button>
                </div>
                <UserList
                    onEditUser={(user: User) => { setIsOpenModalEditUser(true); setUserEdit(user) }}
                    users={users}
                    onDeleteUser={handleDeleteUser}
                />
            </div>
            <ModalAddUser
                handleAddUser={handleAddUser}
                isOpen={isOpenModalAddUser}
                onCloseModal={() => setIsOpenModalAddUser(false)}
            />
            <ModalEditUser
                user={userEdit}
                handleEditUser={handleEditUser}
                isOpen={isOpenModalEditUser}
                onCloseModal={() => { setIsOpenModalEditUser(false); setUserEdit(undefined) }}
            />
        </div>
    )
}

export async function getServerSideProps() {
    try {
        let response = await axios.get('http://localhost:8000/users');
        return {
            props: {
                users: response.data
            }
        }
    } catch (error: any) {
        console.error("Error when fetching data from server: ", error);
    }
}

export default ManageUser