import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";

export const getUsers = requestHandler<any, any>(() => axiosWrapper.get('/staff'));