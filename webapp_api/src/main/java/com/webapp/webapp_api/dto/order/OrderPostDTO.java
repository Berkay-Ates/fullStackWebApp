package com.webapp.webapp_api.dto.order;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import com.webapp.webapp_api.dto.orderItem.OrderItemPostDTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class OrderPostDTO {
    private Long id;
    private Long customerId;
    private BigDecimal totalAmount;
    private List<OrderItemPostDTO> orderItems = new ArrayList<>();    
}