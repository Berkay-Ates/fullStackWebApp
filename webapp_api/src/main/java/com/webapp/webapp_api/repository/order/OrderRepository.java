package com.webapp.webapp_api.repository.order;

import org.springframework.data.jpa.repository.JpaRepository;
import com.webapp.webapp_api.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
}
