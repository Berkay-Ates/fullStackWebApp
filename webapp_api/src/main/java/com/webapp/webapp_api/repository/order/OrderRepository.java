package com.webapp.webapp_api.repository.order;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webapp.webapp_api.model.Order;

import java.util.List;
import com.webapp.webapp_api.model.Customer;


public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> getByCustomer(Customer customer);

}
