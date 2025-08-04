package com.webapp.webapp_api.controller.Seller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.webapp_api.dto.seller.SellerDTO;
import com.webapp.webapp_api.service.seller.SellerInformationService;

@RestController
@RequestMapping("/profile/seller")
public class SellerInformationController {

    private final SellerInformationService sellerInformationService;

    SellerInformationController(SellerInformationService sellerInformationService){
        this.sellerInformationService = sellerInformationService;
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<SellerDTO> getSeller(@PathVariable Long id) {
        SellerDTO res =  sellerInformationService.getSellerInformations(id);
        return ResponseEntity.ok(res);
    }


    @PostMapping("/update/{email}")
    public ResponseEntity<SellerDTO> updateSeller(@PathVariable String email,@RequestBody SellerDTO customerDTO) {
        SellerDTO res =  sellerInformationService.updateSeller(email, customerDTO);

        return ResponseEntity.ok(res);
    }
        
}
