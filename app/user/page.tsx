'use client'
import { getUsers } from "@/lib/actions/user-action";
import { useEffect, useState } from "react";

const UserPage = () => {
    const [users, setUsers] = useState<any[]>([]);

    const getUser = async () => {
        const usersResponse = await getUsers();
        if (usersResponse.code === 'success') {
            setUsers(usersResponse.data.data.list);
        }
        console.log(usersResponse)
        return usersResponse;
    }

    useEffect(() => {
        users.length === 0 && getUser();
    }, [])

    return (
        <>
            {users.map((user: any) => (
                <div key={user.id}>{user.userName}</div>
            ))}
        </>
    )
}

export default UserPage;