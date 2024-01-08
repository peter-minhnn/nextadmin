import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";
import { Inputs } from "@/app/(landing)/contact/page";
import { BaseReponse } from "@/types/base-type";

export const sendMessage = requestHandler<Inputs, BaseReponse>((params?: any) => axiosWrapper.post('/contact', params));