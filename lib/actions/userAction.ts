import { fetchWrapper } from "@/api/fetchWrapper";
import { requestHandler } from "@/api/requestHandler";

const getUsers = requestHandler<any, any>(() => fetchWrapper.get('api/user'));

export {
    getUsers
}