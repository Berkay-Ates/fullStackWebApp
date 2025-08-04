package com.webapp.webapp_api.service.seller;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.webapp.webapp_api.dto.seller.SellerDTO;
import com.webapp.webapp_api.model.Seller;
import com.webapp.webapp_api.repository.seller.SellerRepository;

@Service
public class SellerInformationService {

    private final SellerRepository sellerRepository;
    private final PasswordEncoder passwordEncoder;

    SellerInformationService(SellerRepository sellerRepository){
        this.sellerRepository = sellerRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public SellerDTO getSellerInformations(Long id){
        Optional<Seller> sellerOptional = sellerRepository.findById(id);
        Seller seller = sellerOptional.orElse(null);

        SellerDTO sellerGetDTO = new SellerDTO();
        sellerGetDTO.setCreatedAt(seller.getCreatedAt());
        sellerGetDTO.setEmail(seller.getEmail());
        sellerGetDTO.setMoney(seller.getMoney());
        sellerGetDTO.setName(seller.getName());
        sellerGetDTO.setPassword(seller.getPassword());
        sellerGetDTO.setPhotoUrl(seller.getPhotoUrl());
        return sellerGetDTO;
    }

    public SellerDTO updateSeller(String email, SellerDTO sellerDTO){
        Optional<Seller> sellerOpt = sellerRepository.findByEmail(email);
        Seller seller = sellerOpt.orElse(null);

        seller.setMoney(sellerDTO.getMoney());
        seller.setName(sellerDTO.getName());
        seller.setPhotoUrl(sellerDTO.getPhotoUrl());

        String rawPassword = sellerDTO.getPassword();
        if (rawPassword != null && !rawPassword.isBlank()) {
            seller.setPassword(passwordEncoder.encode(rawPassword));
        }

        sellerRepository.save(seller);

        return getSellerInformations(seller.getId());        

    }   
}
