import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";
import { BaseReponse } from "@/types/base-type";

export const getUsers = requestHandler<Object | any, BaseReponse>(() => axiosWrapper.get('/staff'));