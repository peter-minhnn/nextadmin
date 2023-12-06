import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";
import { LoginRequest, User } from "@/types/login-type";

export const authenticate = requestHandler<LoginRequest, User>((params?: any) => axiosWrapper.post('/auth/staff', params));