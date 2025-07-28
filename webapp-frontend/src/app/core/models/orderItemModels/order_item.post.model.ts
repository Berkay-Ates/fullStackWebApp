import { ProductCategory } from "../../../static/enums/product_categories";

export interface OrderItemPost {
    productId: bigint;
    sellerId: bigint;
    quantity: number;
    category: ProductCategory;
    unitPrice: number;
}