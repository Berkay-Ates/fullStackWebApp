package com.webapp.webapp_api.repository.orderItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.webapp.webapp_api.model.Order;
import com.webapp.webapp_api.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order);

    @Query("SELECT oi FROM OrderItem oi " +
        "JOIN FETCH oi.order o " +
        "JOIN FETCH oi.product p " +
        "WHERE oi.seller.id = :sellerId")
    List<OrderItem> findBySellerIdWithOrderAndProduct(@Param("sellerId") Long sellerId);
}
