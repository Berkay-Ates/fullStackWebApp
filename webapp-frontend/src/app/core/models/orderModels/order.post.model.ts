import { OrderItemPost } from "../orderItemModels/order_item.post.model";

export interface OrderPost {
    customerId: number;
    totalAmount: number;
    orderItems: Array<OrderItemPost>;

}