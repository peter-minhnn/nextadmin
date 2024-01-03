import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";
import { BaseReponse, CategoryItem } from "@/types/base-type";

export const getCategories = requestHandler<CategoryItem, BaseReponse>((params?: any) => axiosWrapper.get('/categories', params));