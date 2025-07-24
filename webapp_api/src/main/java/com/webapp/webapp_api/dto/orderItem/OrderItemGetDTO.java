package com.webapp.webapp_api.dto.orderItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.webapp.webapp_api.utils.OrderStatus;
import com.webapp.webapp_api.utils.ProductCategory;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class OrderItemGetDTO {
    private Long id;
    private Long orderId;
    private Long productId;
    private Long sellerId;
    private OrderStatus status;
    private Long quantity;
    private ProductCategory category;
    private BigDecimal unitPrice;
    private LocalDateTime orderDate;
    private LocalDateTime upDateTime;
}
