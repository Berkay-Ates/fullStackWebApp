
export interface Customer {
    id: bigint;
    createdAt?: Date;
    email: string;
    isVerified: boolean;
    money: string;
    name: string;
    password?: string; 
    photoUrl: string;
    surname: string;
}