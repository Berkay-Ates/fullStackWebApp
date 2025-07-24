package com.webapp.webapp_api.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.webapp.webapp_api.utils.ProductCategory;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ProductDTO {
    private Long id; 
    
    @NotBlank(message = "Name cannot be null.")
    private String name;

    @NotBlank(message = "Description cannot be null.")
    private String description;

    @NotBlank(message = "PhotoUrl cannot be null.")
    private String photoUrl;

    @NotNull(message = "Price cannot be null.")
    private BigDecimal price;

    @NotNull(message = "Seller ID cannot be null.")
    private Long sellerId;

    @NotNull(message = "Category cannot be null.")
    private ProductCategory category;

    @NotNull(message = "Stock quantity cannot be null.")
    private Long stockQuantity;

    
    private LocalDateTime updatedAt;
}

