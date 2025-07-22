package com.webapp.webapp_api.controller.OrderItem;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.webapp_api.dto.orderItem.OrderItemGetDTO;
import com.webapp.webapp_api.service.orderItem.OrderItemService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/orderItem")
public class OrderItemController {

    private final OrderItemService orderItemService;

    public OrderItemController(OrderItemService orderItemService){
        this.orderItemService = orderItemService;
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<OrderItemGetDTO>> getAllOrderItems() {
        List<OrderItemGetDTO> items = orderItemService.getAllOrderItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/getOne/{id}")
    public ResponseEntity<OrderItemGetDTO> getOrderItemById(@PathVariable Long id) {
        OrderItemGetDTO item = orderItemService.getOrderItemById(id);
        return ResponseEntity.ok(item);
    }

}