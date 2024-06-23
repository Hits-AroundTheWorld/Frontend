export interface UserRegisterData{
    fullName: string,
    birthDate: string,
    email: string,
    password: string,
    confirmPassword: string
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
    birthDate: string,
}