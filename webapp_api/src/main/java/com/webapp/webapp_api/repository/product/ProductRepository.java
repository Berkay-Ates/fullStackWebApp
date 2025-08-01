package com.webapp.webapp_api.repository.product;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webapp.webapp_api.model.Product;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySellerId(Long sellerId);
}
