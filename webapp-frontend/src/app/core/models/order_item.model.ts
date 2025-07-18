export interface OrderItem{
    id: bigint;
    created_at: Date;
    quantity: bigint;
    unit_price: bigint;
    updated_at: Date;
    order_id: bigint;
    product_id: bigint;
}