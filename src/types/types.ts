export interface UserRegisterData{
    fullName: string,
    email: string,
    password: string,
    aboutMe: string,
    country: string,
    birthDate: string,
    phoneNumber: string
}
export interface UserLoginData{
    email: string,
    password: string
}
export interface ResponseUserData{
    token: string
}
export interface UserProfile{
    fullName: string,
    email: string,
    aboutMe: string,
    country: string,
    rating: number,
}
export interface EditProfile{
    fullName: string,
    email: string,
    aboutMe: string,
    country: string,
    birthDate: string,
    phoneNumber: string
}