export interface Product {
    id: bigint;
    name: string;
    description: string;
    photoUrl: string;
    price: number;
    category: string;
    stockQuantity: number;
    createdAt: Date;
    updatedAt: Date;
    sellerId: bigint;
}
