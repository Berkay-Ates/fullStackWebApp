package com.webapp.webapp_api.service.order;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.webapp.webapp_api.dto.order.OrderGetDTO;
import com.webapp.webapp_api.dto.order.OrderPostDTO;
import com.webapp.webapp_api.dto.orderItem.OrderItemGetDTO;
import com.webapp.webapp_api.dto.orderItem.OrderItemPostDTO;
import com.webapp.webapp_api.model.Customer;
import com.webapp.webapp_api.model.Order;
import com.webapp.webapp_api.model.OrderItem;
import com.webapp.webapp_api.model.Product;
import com.webapp.webapp_api.model.Seller;
import com.webapp.webapp_api.repository.customer.CustomerRepository;
import com.webapp.webapp_api.repository.order.OrderRepository;
import com.webapp.webapp_api.repository.orderItem.OrderItemRepository;
import com.webapp.webapp_api.repository.product.ProductRepository;
import com.webapp.webapp_api.repository.seller.SellerRepository;
import com.webapp.webapp_api.utils.OrderStatus;


@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final SellerRepository sellerRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository,
                        CustomerRepository customerRepository,
                        SellerRepository sellerRepository,
                        OrderItemRepository orderItemRepository,
                        ProductRepository productRepository){

        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.sellerRepository = sellerRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }

    public OrderGetDTO createOrder(OrderPostDTO orderPostDTO){
        OrderGetDTO orderGetDTO = new OrderGetDTO();

        Order order = new Order();
        
        // Get the customer
        Optional<Customer> customerOptional = customerRepository.findById(orderPostDTO.getCustomerId());
        Customer customer = customerOptional.orElse(null);
        if (customer ==null) {
            return orderGetDTO;
        }

        order.setCustomer(customer);
        order.setTotalAmount(orderPostDTO.getTotalAmount());

        order = orderRepository.save(order);
        orderGetDTO.setCustomerId(order.getCustomer().getId());
        orderGetDTO.setUpdatedAt(order.getUpdatedAt());
        orderGetDTO.setCreatedAt(order.getCreatedAt());
        orderGetDTO.setTotalAmount(order.getTotalAmount());

        for (OrderItemPostDTO orderItemPostDTO : orderPostDTO.getOrderItems()) {

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);

            // Get product by id 
            Optional<Product> productOptional = productRepository.findById(orderItemPostDTO.getProductId());
            Product product = productOptional.orElse(null);
            orderItem.setProduct(product);

            orderItem.setQuantity(orderItemPostDTO.getQuantity());

            Optional<Seller> sellerOptional = sellerRepository.findById(orderItemPostDTO.getSellerId());
            Seller seller = sellerOptional.orElse(null);
            orderItem.setSeller(seller);
            orderItem.setCategory(orderItemPostDTO.getCategory());
            orderItem.setStatus(OrderStatus.ORDERED);
            orderItem.setUnitPrice(orderItemPostDTO.getUnitPrice());

            orderItem = orderItemRepository.save(orderItem);

            OrderItemGetDTO orderItemGetDTO = new OrderItemGetDTO();
            orderItemGetDTO.setId(orderItem.getId());
            orderItemGetDTO.setCategory(orderItem.getCategory());
            orderItemGetDTO.setUpDateTime(orderItem.getCreatedAt());
            orderItemGetDTO.setOrderDate(orderItem.getCreatedAt());
            orderItemGetDTO.setOrderId(orderItem.getId());
            orderItemGetDTO.setProductId(orderItem.getProduct().getId());
            orderItemGetDTO.setQuantity(orderItem.getQuantity());
            orderItemGetDTO.setSellerId(orderItem.getSeller().getId());
            orderItemGetDTO.setStatus(orderItem.getStatus());
            orderItemGetDTO.setUnitPrice(orderItem.getUnitPrice());
            orderItemGetDTO.setUpDateTime(orderItemGetDTO.getUpDateTime());
            orderGetDTO.getOrderItems().add(orderItemGetDTO);
        }
        
        return orderGetDTO;
    }
    
    public List<OrderGetDTO> getAllOrders(){
        List<OrderGetDTO> ordersGetDTOs = new ArrayList<OrderGetDTO>();

        List<Order> orders = orderRepository.findAll();

        for (Order order : orders) {
            OrderGetDTO orderGetDTO = new OrderGetDTO();
            orderGetDTO.setCreatedAt(order.getCreatedAt());
            orderGetDTO.setCustomerId(order.getCustomer().getId());
            orderGetDTO.setId(order.getId());
            // orderGetDTO.setOrderItems();
            orderGetDTO.setTotalAmount(order.getTotalAmount());
            orderGetDTO.setUpdatedAt(order.getUpdatedAt());
            ordersGetDTOs.add(orderGetDTO);
        }
        return ordersGetDTOs;
    }


    public OrderGetDTO getOrderById(Long id){
         OrderGetDTO orderGetDTO = new OrderGetDTO();

        Optional<Order> orderOptional = orderRepository.findById(id);
        Order order = orderOptional.orElse(null);
            
        orderGetDTO.setCreatedAt(order.getCreatedAt());
        orderGetDTO.setCustomerId(order.getCustomer().getId());
        orderGetDTO.setId(order.getId());
        // orderGetDTO.setOrderItems();
        orderGetDTO.setTotalAmount(order.getTotalAmount());
        orderGetDTO.setUpdatedAt(order.getUpdatedAt());
        
        return orderGetDTO;
    }

}
