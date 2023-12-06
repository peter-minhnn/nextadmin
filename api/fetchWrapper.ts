'use client'
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../lib/hooks/useLocalStorage";
import { AxiosRequestConfig } from "axios";
import axios from '@/api/axiosConfig';

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

const getHeaderOptions = (method: string = 'GET') => {
    const options = { 'Access-Control-Allow-Origin': '*' };
    switch (method) {
        case 'POST':
        case 'PUT':
            return { ...options, 'Content-Type': 'application/json' }
        default:
            return options;
    }
}

const headers = (method: string = 'GET') => {
    const { getItem } = useLocalStorage('token');
    const headerOptions = getHeaderOptions(method);

    if (!getItem()) {
        return { ...headerOptions };
    }

    return {
        Authorization: `Bearer ${getItem()}`,
        ...headerOptions
    };
};

function get(url: string, params?: any) {
    const response = axios.get(url, {
        method: 'GET',
        headers: headers(),
        params: params ? params : {}
    });
    return response;
}

function post(url: string, body: any) {
    const requestOptions: AxiosRequestConfig = {
        method: 'POST',
        headers: headers(),
        data: body
    };
    const response = axios.post(url, { ...requestOptions });
    return response;
}

function put(url: string, body: any) {
    const requestOptions: AxiosRequestConfig = {
        method: 'PUT',
        headers: headers(),
        data: JSON.stringify(body)
    };
    const response = axios.put(url, requestOptions);
    return response;
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string) {
    const requestOptions: AxiosRequestConfig = {
        method: 'DELETE',
        headers: headers()
    };
    const response = axios.delete(url, requestOptions);
    return response;
}