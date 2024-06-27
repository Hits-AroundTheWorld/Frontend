import { instance } from "../api/axios.api";
import { AllUsers, ResponseUserData, UserInfo, UserLoginData, UserProfile, UserRegisterData, UsersFilter} from "../types/types";
import {logout} from "../store/user/userSlice.ts";
import {toast} from "react-toastify";
import axios from "axios";
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
        this.getUnAuthorized()
    },
    async getProfile(): Promise<UserProfile | undefined>{
        const {data} = await instance.get('api/user/profile/my')
        if(data) return data
    },
    async editProfile(userEditProfileData: UserProfile){
        await instance.put('api/user/profile',userEditProfileData)
    },
    async fetchUsers(filters: UsersFilter) {
        try {
          const { data } = await instance.get<AllUsers>('api/user/users', {
            params: filters,
          });
          return data;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
          }
          throw error;
        }
    },
    async getUserProfile(userId: string | null){
      const {data} = await instance.get(`api/user/profile/${userId}`)
      if(data) return data
    },
    getUnAuthorized(): void {
        toast.warning('Необходимо авторизоваться.')
        localStorage.clear();
        logout()
    }
    
}