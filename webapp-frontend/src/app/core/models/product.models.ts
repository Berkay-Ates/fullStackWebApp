import { ProductCategory } from "../../static/enums/product_categories";

export interface Product {
    id: bigint;
    name: string;
    description: string;
    photoUrl: string;
    price: number;
    category: ProductCategory;
    stockQuantity: number;
    createdAt: Date;
    updatedAt: Date;
    sellerId: bigint;
}
