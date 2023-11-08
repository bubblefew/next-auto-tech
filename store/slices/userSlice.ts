import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '@/models/user.model'
import { RootState } from '@/store/store';
import * as serverService from '@/services/serverService';
import httpClient from '@/utils/httpClient';
import { AxiosRequestConfig } from "axios";
import Router from 'next/router';

interface UserState {
    username: string;
    accessToken: string;
    error?: string;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    user?: UserData;
}

interface SingleProp {
    data: string;
}

const initialState: UserState = {
    username: "",
    accessToken: "",
    isAuthenticated: false,
    isAuthenticating: true,
    user: undefined,
};

interface SignAction {
    username: string;
    password: string;

}

export const signUp = createAsyncThunk(
    "user/signUp",
    async (credentail: SignAction) => {
        // const p1 = new Promise((res) => setTimeout(() => res({ result: "signup ok" }), 1000))
        // return await p1;
        const response = await serverService.signUp(credentail)
        return response
    }
)

export const signIn = createAsyncThunk(
    "user/signin",
    async (credential: SignAction) => {
        const response = await serverService.signIn(credential);
        if (response.result != "ok") {
            throw new Error("login failed");
        }

        // set access token
        httpClient.interceptors.request.use((config) => {
            if (config && config.headers) {
                config.headers["Authorization"] = `Bearer ${response.token}`;
            }

            return config;
        });

        return response;
    }
);

export const signOut = createAsyncThunk("user/signout", async () => {
    await serverService.signOut();
    Router.push("/login");
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: { // sync action
        resetUsername: (state, action: PayloadAction<SingleProp>) => {
            state.username = action.payload.data
        }
    },
    extraReducers: (builder) => { // async action 
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.accessToken = ''
            state.user = undefined
            state.isAuthenticating = true
        }),
            builder.addCase(signIn.fulfilled, (state, action) => {
                state.accessToken = action.payload.token;
                state.isAuthenticated = true;
                state.isAuthenticating = false;
                state.user = action.payload.user
            }),
            builder.addCase(signIn.rejected, (state, action) => {
                state.accessToken = '';
                state.isAuthenticated = false;
                state.isAuthenticating = false;
                state.user = undefined
            }),
            builder.addCase(signOut.fulfilled, (state, action) => {
                state.accessToken = '';
                state.isAuthenticated = false;
                state.isAuthenticating = true;
                state.user = undefined
            });
    }
})

export const { resetUsername } = userSlice.actions
export const userSelector = (store: RootState) => store.user
export const isAuthenticatedSelector = (store: RootState): boolean => store.user.isAuthenicated


export default userSlice.reducer