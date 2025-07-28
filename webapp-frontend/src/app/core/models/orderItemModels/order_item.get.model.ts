import { OrderStatus } from "../../../static/enums/order_status";
import { ProductCategory } from "../../../static/enums/product_categories";

export interface OrderItemGet {
    id: bigint;
    orderId: bigint;
    productId: bigint;
    sellerId: bigint;
    orderStatus: OrderStatus;
    quantity: number;
    category: ProductCategory;
    unitPrice: number;
    orderDate: Date;
    upDateTime: Date;
}