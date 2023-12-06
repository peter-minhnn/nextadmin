'use server'
import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";

const getUsers = requestHandler<any, any>(() => axiosWrapper.get('/user'));

export {
    getUsers
}