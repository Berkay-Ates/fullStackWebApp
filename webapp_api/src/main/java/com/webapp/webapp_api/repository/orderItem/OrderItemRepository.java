package com.webapp.webapp_api.repository.orderItem;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webapp.webapp_api.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
}
