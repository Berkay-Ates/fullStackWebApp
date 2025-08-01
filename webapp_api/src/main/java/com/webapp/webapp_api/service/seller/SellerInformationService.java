package com.webapp.webapp_api.service.seller;

import com.webapp.webapp_api.repository.seller.SellerRepository;

public class SellerInformationService {

    private final SellerRepository sellerRepository;

    SellerInformationService(SellerRepository sellerRepository){
        this.sellerRepository = sellerRepository;
    }
    
}
