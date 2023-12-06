import { login } from "@/lib/actions/loginAction"
import { LoginRequest } from "@/types/loginType"

export const authenticate = async (values: LoginRequest) => {
    try {
        return await login(values);
    } catch (error) {
        
    }
}