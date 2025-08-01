import { UserType } from "../../../static/enums/user_types";

export interface UserData {
    userId: number;
    accessToken: string;
    userType: UserType;
    email: string;
    refreshToken?: string;
    expiresAt?: number;
    money: number;
};