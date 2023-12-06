'use client'
import { fetchWrapper } from "@/api/fetchWrapper";
import { requestHandler } from "@/api/requestHandler";
import { LoginRequest, User } from "@/types/loginType";

export const login = requestHandler<any, User>((params?: any) => fetchWrapper.post('api/auth/staff', params));