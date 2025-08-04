
export interface Seller {
    id: bigint;
    createdAt?: Date;
    email: string;
    isVerified: boolean;
    money: string;
    name: string;
    password?: string;
    photoUrl: string;
}
