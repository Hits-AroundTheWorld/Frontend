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
    id: string,
    fullName: string,
    email: string,
    aboutMe: string,
    country: string,
    birthDate: string,
    phoneNumber: string,
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

export interface Country {
    id: string;
    ru: string;
}
export interface TripModel{
    tripId: string,
    tripName: string,
    tripMiniDescription: string,
    startXCoordinate: number,
    startYCoordinate: number,
    finishXCoordinate: number,
    finishYCoordinate: number,
    startDate: string,
    endDate: string,
    isPublic: boolean,
    tripFounderId: string,
    tripFounderFullName: string,
    invitationLink: string,
    maxBudget: number,
    maxPeopleCount: 0,
    peopleCountNow: 0,
    createdTime: string
}
export interface PaginationInformation{
    page: number,
    size: number,
    current: number
}
export interface PublicTrip{
    trips: TripModel[],
    pagination: PaginationInformation
}
export interface TripFilter {
    tripName?: string;
    tripDate?: string;
    personId?: string;
    size: number;
    page?: number;
    requestSorting?: Sorting;
  }
export interface MyTripsFilter {
    tripName?: string;
    tripDate?: string;
    isOwner?: boolean;
    size: number;
    page?: number;
    requestSorting?: Sorting;
}
export interface MyRequests{
    tripId: string,
    tripName: string,
    status: UserRequestStatus
}
export enum UserRequestStatus{
    InQueue = "InQueue",
    Approved = "Approved",
    Rejected = "Rejected",
    DeletedRequest = "DeletedRequest",
    LeftFromTrip = "LeftFromTrip"
}
export enum Sorting{
    CreateDesc = "CreateDesc",
    CreateAsc = "CreateAsc"
}


export interface CreateTripModal{
    tripName: string,
    tripMiniDescription: string,
    startDate: string,
    endDate: string,
    maxBudget: number,
    isPublic: boolean,
    maxPeopleCount: number
}
export interface InviteCode{
    inviteCode: string
}
export interface UserInfo{
    id: string,
    fullName: string,
    birthDate: string,
    phoneNumber: string,
    email: string,
    rating: number,
    aboutMe: string,
    country: string,
    userId: string
}
export interface AllUsers{
    users: UserInfo[],
    pagination: PaginationInformation
}
export interface UsersFilter{
    fullName?: string,
    email?: string,
    country?: string,
    maxAge?: number,
    minAge?: number,
    size: number;
    page?: number;
}
export interface RequestInfo{
    tripId: string,
    tripName: string,
    userId: string,
    userName: string,
    status: UserRequestStatus
}
export interface Requests{
    requests: RequestInfo[],
    pagination: PaginationInformation
}
export interface RequestFilter{
    page?: number,
    size: number,
    tripId: string,
}
export interface ChangeUserStatus{
    tripid: string,
    userId: string,
    status: UserRequestStatus
}
export interface Memebers{
    users: UserProfile[]
}