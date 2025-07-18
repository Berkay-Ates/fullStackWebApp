
export interface Order {
    id: bigint;
    created_at: Date;
    order_date: Date;
    status: string;
    total_amount: bigint;
    updated_at: Date;
    customer_id: bigint;
    seller_id: bigint;
}