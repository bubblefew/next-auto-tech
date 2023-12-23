import { GetSession, SignUp, SingIn } from '@/models/auth.model';
import httpClient from '@/utils/httpClient';

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