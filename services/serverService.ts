import { GetSession, SignUp, SingIn } from '@/models/auth.model';
import { ProductData } from '@/models/product.model';
import httpClient from '@/utils/httpClient';
import axios from 'axios';

type signProps = {
    username: string,
    password: string
}

export const signUp = async (user: signProps): Promise<SignUp> => {
    console.log(user);

    const res = await httpClient.post('/authen/register', user);
    return res.data;
}

export const signIn = async (user: signProps): Promise<SingIn> => {

    const { data: response } = await httpClient.post<SingIn>('/auth/signin', user, {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    });

    return response;
}

export async function signOut() {
    const response = await httpClient.get(`/auth/signout`, {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    });
    return response.data;
}


export const getSession = async (): Promise<GetSession> => {
    const response = await httpClient.get(`/auth/session`, {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    });

    return response.data;
};

export const getProducts = async (keyword?: string): Promise<ProductData[]> => {
    if (keyword) {
        return (await httpClient.get(`/stock/product/keyword/${keyword}`)).data;
    } else {
        return (await httpClient.get(`/stock/product`)).data;
    }
};

export const deleteProduct = async (id?: string): Promise<void> => {
    await httpClient.delete(`/stock/product/${id}`);
};

export const doGetStockById = async (id: string) => {
    const response = await httpClient.get(`/stock/product/${id}`);
    return response.data;
};


export const editProduct = async (data: FormData): Promise<void> => {
    await httpClient.put(`/stock/product`, data);
};
