package com.webapp.webapp_api.controller.Order;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.webapp_api.dto.order.OrderGetDTO;
import com.webapp.webapp_api.dto.order.OrderPostDTO;
import com.webapp.webapp_api.service.order.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService; 

    public OrderController(OrderService orderService){
        this.orderService = orderService;
   }

    @PostMapping("/create")
    public ResponseEntity<OrderGetDTO> createOrder(@Valid @RequestBody OrderPostDTO orderPostDTO) {
        OrderGetDTO createdOrder = orderService.createOrder(orderPostDTO);
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping("getAll")
    public ResponseEntity<List<OrderGetDTO>> getAllOrders() {
        List<OrderGetDTO> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }


    @GetMapping("/getOne/{id}")
    public ResponseEntity<OrderGetDTO> getOrderById(@PathVariable Long id) {
        OrderGetDTO order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

} 
