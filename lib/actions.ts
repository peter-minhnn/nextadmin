"use server";
import { signIn } from '@/app/auth'

export const authenticate = async (formData: { email: string, password: string }) => {
    try {
        await signIn("credentials", formData);
    } catch (err) {
        return "Wrong Credentials!";
    }
};