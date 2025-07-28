import { OrderItemGet } from "../orderItemModels/order_item.get.model";

export interface OrderGet {
    id: bigint;
    customerId: bigint;
    updatedAt: Date;
    createdAt: Date;
    totalAmount: number;
    orderItems: Array<OrderItemGet>;

}