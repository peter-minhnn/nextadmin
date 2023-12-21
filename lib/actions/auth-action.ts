import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";
import { BaseReponse } from "@/types/base-type";
import { LoginRequest } from "@/types/login-type";

export const authenticate = requestHandler<LoginRequest, BaseReponse>((params?: any) => axiosWrapper.post('/auth/staff', params));
export const isValidToken = requestHandler<{ token: string }, BaseReponse>((params?: any) => axiosWrapper.post('/auth/valid-token', params));