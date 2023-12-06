
export type LoginRequest = {
    username: string,
    password: string
}

export interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    staffCode: string;
    roleCode: string;
    avatar: string;
    token: string;
}