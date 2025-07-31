package com.webapp.webapp_api.repository.orderItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webapp.webapp_api.model.Order;
import com.webapp.webapp_api.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order);
}
