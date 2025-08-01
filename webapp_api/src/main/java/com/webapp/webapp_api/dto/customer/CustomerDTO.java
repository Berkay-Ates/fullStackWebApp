package com.webapp.webapp_api.dto.customer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;


@Getter
@Setter
public class CustomerDTO {

    private BigInteger id;

    private LocalDateTime createdAt;

    @Email(message = "Please provide a valid email")
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

    @NotBlank(message = "My last name cannot be left empty")
    private String surname;
  
}
