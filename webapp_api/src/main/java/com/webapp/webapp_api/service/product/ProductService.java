package com.webapp.webapp_api.service.product;

import java.beans.Transient;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.webapp.webapp_api.dto.product.ProductDTO;
import com.webapp.webapp_api.model.Product;
import com.webapp.webapp_api.model.Seller;
import com.webapp.webapp_api.repository.product.ProductRepository;
import com.webapp.webapp_api.repository.seller.SellerRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;

    public ProductService(ProductRepository productRepository,SellerRepository sellerRepository){
        this.productRepository = productRepository;
        this.sellerRepository = sellerRepository;
    }

    @Transactional
    public ProductDTO create(ProductDTO productDTO) {
        Product product = new Product();

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setPhotoUrl(productDTO.getPhotoUrl());
        product.setSeller(null);
        product.setUpdatedAt(productDTO.getUpdatedAt());

        Seller seller = sellerRepository.getReferenceById(productDTO.getSellerId());
        product.setSeller(seller);

        product.setCategory(productDTO.getCategory());

        product.setPrice(productDTO.getPrice());
        productRepository.save(product);
        return productDTO; 
    }

    public List<ProductDTO> getAllBySeller(Long id) {
        List<Product> products = productRepository.findBySellerId(id);
        List<ProductDTO> dtos = new ArrayList<ProductDTO>();

        for(Product p: products){
            ProductDTO dto = new ProductDTO();
            dto.setCategory(p.getCategory());
            dto.setDescription(p.getDescription());
            dto.setId(p.getId());
            dto.setName(p.getName());
            dto.setPhotoUrl(p.getPhotoUrl());
            dto.setPrice(p.getPrice());
            dto.setSellerId(p.getSeller().getId());
            dto.setStockQuantity(p.getStockQuantity());
            dto.setUpdatedAt(p.getUpdatedAt());
            dtos.add(dto);
        }
        return dtos;
    }

    public List<ProductDTO> getAll() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> dtos = new ArrayList<ProductDTO>();

        for(Product p: products){
            ProductDTO dto = new ProductDTO();
            dto.setCategory(p.getCategory());
            dto.setDescription(p.getDescription());
            dto.setId(p.getId());
            dto.setName(p.getName());
            dto.setPhotoUrl(p.getPhotoUrl());
            dto.setPrice(p.getPrice());
            dto.setSellerId(p.getSeller().getId());
            dto.setStockQuantity(p.getStockQuantity());
            dto.setUpdatedAt(p.getUpdatedAt());
            dtos.add(dto);
        }

        return dtos;
    }


    public ProductDTO getById(Long id) {
        Product product = productRepository.findById(id)
                   .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        ProductDTO productDTO = new ProductDTO();
        productDTO.setCategory(product.getCategory());
        productDTO.setDescription(product.getDescription());
        productDTO.setName(product.getName());
        productDTO.setPhotoUrl(product.getPhotoUrl());
        productDTO.setPrice(product.getPrice());
        productDTO.setSellerId(product.getSeller().getId());
        productDTO.setStockQuantity(product.getStockQuantity());
        productDTO.setUpdatedAt(product.getUpdatedAt());
        productDTO.setCategory(product.getCategory());


        return productDTO;
    }

    @Transactional
    public ProductDTO update(Long id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        existingProduct.setCategory(productDTO.getCategory());

        Seller seller = sellerRepository.getReferenceById(productDTO.getSellerId());
        existingProduct.setSeller(seller);

        existingProduct.setDescription(productDTO.getDescription());
        existingProduct.setName(productDTO.getName());
        existingProduct.setPhotoUrl(productDTO.getPhotoUrl());
        existingProduct.setPrice(productDTO.getPrice());                
        existingProduct.setUpdatedAt(productDTO.getUpdatedAt());
        existingProduct.setStockQuantity(productDTO.getStockQuantity());

        productRepository.save(existingProduct);
        return productDTO; 
    }

    @Transient
    public void delete(Long id) {
        if (!productRepository.existsById(id))
            throw new EntityNotFoundException("Product not found");
        productRepository.deleteById(id);
    }
}
