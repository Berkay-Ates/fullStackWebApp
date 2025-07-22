package com.webapp.webapp_api.dto.category;

import com.webapp.webapp_api.utils.ProductCategory;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class CategoryDTO {
    private ProductCategory productCategory;
}


