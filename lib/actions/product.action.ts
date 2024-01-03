import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";
import { BaseReponse } from "@/types/base-type";
import { ProductSearch } from "@/types/product-type";

export const getProducts = requestHandler<ProductSearch, BaseReponse>((params?: any) => axiosWrapper.get('/products', params));
export const getProductItem = requestHandler<{ slug: string }, BaseReponse>((params?: any) => axiosWrapper.get('/product/detail', params));