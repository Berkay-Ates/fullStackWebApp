package com.webapp.webapp_api.dto.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.webapp.webapp_api.dto.orderItem.OrderItemGetDTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class OrderGetDTO {
    private Long id;
    private Long customerId;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
    private BigDecimal totalAmount;
    private List<OrderItemGetDTO> orderItems = new ArrayList<>();;
}
