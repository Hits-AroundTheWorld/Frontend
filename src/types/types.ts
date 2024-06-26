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