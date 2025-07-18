package com.webapp.webapp_api.dto.orderItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class OrderItemPostDTO {
    private Long id;
    private Long orderId;
    private Long productId;
    private Long sellerId;
    private Long quantity;
    private BigDecimal unitPrice;
    private LocalDateTime orderDate;
}