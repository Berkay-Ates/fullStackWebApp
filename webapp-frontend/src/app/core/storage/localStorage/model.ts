import { UserType } from "../../../static/enums/user_types";

export interface UserData {
    accessToken: string;
    userType: UserType;
    email: string;
    refreshToken?: string;
    expiresAt?: number; 
};