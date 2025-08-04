package com.webapp.webapp_api.dto.seller;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerDTO {

    private BigInteger id;

    private LocalDateTime createdAt;

    @NotBlank(message = "Email cannot be empty")
    private String email;

    private boolean isVerified;

    @NotBlank(message = "Balance information cannot be left empty")
    private BigDecimal money;

    @NotBlank(message = "The name cannot be left empty")
    private String name;

    private String password; 

    @NotBlank(message = "Photo URL cannot be left empty")
    private String photoUrl;
    
}
