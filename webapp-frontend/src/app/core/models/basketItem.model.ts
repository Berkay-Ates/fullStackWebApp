import { Product } from "./product.models";

export interface BasketItem {
    product: Product;
    quantity: number;
}
