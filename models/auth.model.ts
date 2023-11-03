import { UserData } from '@/models/user.model';

export type SignUp = {
    result: string,
    error?: string
}

export type SingIn = {
    result: string,
    token: string,
    error?: string
}

