import { instance } from "../api/axios.api";
import {ResponseUserData, UserLoginData, UserProfile, UserRegisterData} from "../types/types";
export const AuthService = {
    async registration(userRegisterData: UserRegisterData): Promise<ResponseUserData | undefined>{
        const {data} = await instance.post<UserRegisterData, {data: ResponseUserData}>('api/user/register', userRegisterData)
        return data
    },
    async login(userLoginData: UserLoginData): Promise<ResponseUserData | undefined>{
        const {data} = await instance.post<UserLoginData, {data: ResponseUserData}>('api/user/login', userLoginData)
        return data
    },
    async logout(){
        await instance.post('api/user/logout')
    },
    async getProfile(): Promise<UserProfile | undefined>{
        const {data} = await instance.get('api/user/profile/my')
        if(data) return data
    },
}