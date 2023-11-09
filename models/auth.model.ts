import { UserData } from '@/models/user.model';

export type SignUp = {
    result: string,
    error?: string
}

export type SingIn = {
    user: any;
    result: string,
    token: string,
    error?: string
}
export interface GetSession {
    result: string;
    error?: string;
    user?: UserData;
}

