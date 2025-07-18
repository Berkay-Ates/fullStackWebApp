package com.webapp.webapp_api.dto.category;

import java.time.LocalDateTime;

import com.webapp.webapp_api.utils.ProductCategory;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class CategoryDTO {
    private Long id; 

    private ProductCategory productCategory;

    private LocalDateTime createdAt;
}


