package com.webapp.webapp_api.controller.Customer;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.webapp_api.dto.customer.CustomerDTO;
import com.webapp.webapp_api.service.customer.CustomerInformationService;

@RestController
@RequestMapping("/profile/customer")
public class CustomerInformationController {

    private final CustomerInformationService customerInformationService;

    CustomerInformationController(CustomerInformationService customerInformationService){
        this.customerInformationService = customerInformationService;
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<CustomerDTO> getMethodName(@PathVariable Long id) {
        CustomerDTO res =  customerInformationService.getCustomerInformations(id);
        return ResponseEntity.ok(res);
    }


    @PostMapping("/update/{email}")
    public ResponseEntity<CustomerDTO> updateUser(@PathVariable String email,@RequestBody CustomerDTO customerDTO) {
        CustomerDTO res =  customerInformationService.updateCustomer(email, customerDTO);

        return ResponseEntity.ok(res);
    }
    
    
}
