package com.webapp.webapp_api.controller.Product;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.webapp_api.dto.product.ProductDTO;
import com.webapp.webapp_api.service.product.ProductService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService){ 
        this.productService = productService;
    }

    @PostMapping("/create")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO product = productService.create(productDTO);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.update(id, productDTO ) ;
        return ResponseEntity.ok(updatedProduct);
    }

    @PatchMapping("/patch/{id}")
    public ResponseEntity<ProductDTO> patchUpdateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.update(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getAll")
    public List<ProductDTO> getAllProducts(){
        List<ProductDTO> products = productService.getAll();
        return products;
    }

    @GetMapping("/getAllBySeller/{id}")
    public List<ProductDTO> getAllProducts(@PathVariable Long id){
        List<ProductDTO> products = productService.getAllBySeller(id);
        return products;
    }

    @GetMapping("/getOne/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO productDto = productService.getById(id);
        return ResponseEntity.ok(productDto);
    }

}
