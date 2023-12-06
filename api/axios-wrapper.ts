import { useLocalStorage } from "../lib/hooks/useLocalStorage";
import axios from '@/api/axios-config';

const getHeaderOptions = (method: string = 'GET', isUseFormData: boolean = false) => {
    const options = { 'Access-Control-Allow-Origin': '*' };

    if (['POST', 'PUT'].includes(method) && !isUseFormData) {
        return { ...options, 'Content-Type': 'application/json' }
    }
    return options;
}

const headerConfigs = (method: string = '', isUseFormData: boolean = false) => {
    const { getItem } = useLocalStorage('token');
    const headerOptions = getHeaderOptions(method, isUseFormData);

    if (!getItem()) {
        return { ...headerOptions };
    }

    return {
        Authorization: `Bearer ${getItem()}`,
        ...headerOptions
    };
};

export const axiosWrapper = {
    get: (url: string, params?: any) => {
        return axios.get(url, {
            headers: headerConfigs('GET'),
            params: params ? params : {}
        })
    },
    post: (url: string, body: any, isUseFormData: boolean = false) => {
        return axios.post(url, body, { headers: headerConfigs('POST', isUseFormData) });
    },
    put: (url: string, body: any, isUseFormData: boolean = false) => {
        return axios.put(url, body, { headers: headerConfigs('PUT', isUseFormData) });
    },
    delete: (url: string) => {
        return axios.delete(url, { headers: headerConfigs('DELETE') });
    },
    uploadFile: (url: string, body: FormData) => {
        return axios.post(url, body, { headers: headerConfigs() });
    }
}