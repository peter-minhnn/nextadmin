'use client'
import { useCallback, useEffect, useState } from "react";
import { isValidToken } from "../actions/auth.action";
import { useLocalStorage } from "./use-local-storage";

export default function useTokenAuth() {
    const { getItem: getToken } = useLocalStorage('token');
    const [isValid, setIsValid] = useState<boolean>(false);

    const checkToken = useCallback(async () => {
        const response = await isValidToken({ token: getToken() });
        if (response.code === 'success' && response.data.code === 1) setIsValid(false);
    }, [isValid]);

    useEffect(() => {
        getToken() && checkToken();
    }, [isValid]);

    return { isValid } as const; 
}