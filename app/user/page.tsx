'use client'
import { getUsers } from "@/lib/actions/user.action";
import { useEffect, useState } from "react";

const UserPage = () => {
    const [users, setUsers] = useState<any[]>([]);

    const getUser = async () => {
        const usersResponse = await getUsers();
        if (usersResponse.code === 'error') return;
        if (!Array.isArray(usersResponse.data.data.list)) return;
        setUsers(usersResponse.data.data.list);
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