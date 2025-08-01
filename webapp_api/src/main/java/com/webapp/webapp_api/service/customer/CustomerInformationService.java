package com.webapp.webapp_api.service.customer;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.webapp.webapp_api.dto.customer.CustomerDTO;
import com.webapp.webapp_api.model.Customer;
import com.webapp.webapp_api.repository.customer.CustomerRepository;

@Service
public class CustomerInformationService {
    
    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    CustomerInformationService(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public CustomerDTO getCustomerInformations(Long id){
        Optional<Customer> customerOpt = customerRepository.findById(id);
        System.out.println(customerOpt);

        Customer customer = customerOpt.orElse(null);

        CustomerDTO customerGetDTO = new CustomerDTO();
        customerGetDTO.setCreatedAt(customer.getCreatedAt());
        customerGetDTO.setEmail(customer.getEmail());
        customerGetDTO.setMoney(customer.getMoney());
        customerGetDTO.setName(customer.getName());
        customerGetDTO.setPhotoUrl(customer.getPhotoUrl());
        customerGetDTO.setSurname(customer.getSurname());     
        customerGetDTO.setPhotoUrl(customer.getPhotoUrl());   
        customerGetDTO.setPassword(customer.getPassword());
        return customerGetDTO;
    }

    public CustomerDTO updateCustomer(String email, CustomerDTO customerDTO){
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        Customer customer = customerOpt.orElse(null);

        customer.setMoney(customerDTO.getMoney());
        customer.setName(customerDTO.getName());
        customer.setPhotoUrl(customerDTO.getPhotoUrl());
        customer.setSurname(customerDTO.getSurname());

        String rawPassword = customerDTO.getPassword();
        if (rawPassword != null && !rawPassword.isBlank()) {
            customer.setPassword(passwordEncoder.encode(rawPassword));
        }

        customerRepository.save(customer);

        return getCustomerInformations(customer.getId());        

    }
}
