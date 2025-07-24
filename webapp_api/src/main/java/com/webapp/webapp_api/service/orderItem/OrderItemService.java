package com.webapp.webapp_api.service.orderItem;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.webapp.webapp_api.dto.orderItem.OrderItemGetDTO;
import com.webapp.webapp_api.dto.orderItem.OrderItemPostDTO;
import com.webapp.webapp_api.model.Order;
import com.webapp.webapp_api.model.OrderItem;
import com.webapp.webapp_api.model.Product;
import com.webapp.webapp_api.model.Seller;
import com.webapp.webapp_api.repository.orderItem.OrderItemRepository;
import com.webapp.webapp_api.repository.product.ProductRepository;
import com.webapp.webapp_api.repository.seller.SellerRepository;
import com.webapp.webapp_api.utils.OrderStatus;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;

    public OrderItemService(OrderItemRepository orderItemRepository, SellerRepository sellerRepository,
                            ProductRepository productRepository){
        this.orderItemRepository = orderItemRepository;
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
    }    

    public List<OrderItemGetDTO> createOrderItems(List<OrderItemPostDTO> orders, Order order){
        List<OrderItemGetDTO> orderItemGetDTOs = new ArrayList<OrderItemGetDTO>();

        for (OrderItemPostDTO orderItemPostDTO : orders) {
            OrderItem orderItem = new OrderItem();

            // get the seller 
            Optional<Seller> sellerOptional = sellerRepository.findById(orderItemPostDTO.getSellerId());
            Seller seller = sellerOptional.orElse(null);

            Optional<Product> producOptional = productRepository.findById(orderItemPostDTO.getProductId());
            Product product = producOptional.orElse(null);

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(orderItemPostDTO.getQuantity());
            orderItem.setUnitPrice(orderItemPostDTO.getUnitPrice());      
            orderItem.setSeller(seller);    
            orderItem.setStatus(OrderStatus.ORDERED);
            orderItem.setCategory(orderItemPostDTO.getCategory());
            
            orderItem = orderItemRepository.save(orderItem);

            OrderItemGetDTO orderItemGetDTO = new OrderItemGetDTO();
            orderItemGetDTO.setId(orderItem.getId());
            orderItemGetDTO.setOrderDate(orderItem.getCreatedAt());
            orderItemGetDTO.setOrderId(orderItem.getOrder().getId());
            orderItemGetDTO.setProductId(orderItem.getProduct().getId());
            orderItemGetDTO.setQuantity(orderItem.getQuantity());   
            orderItemGetDTO.setSellerId(orderItem.getSeller().getId());
            orderItemGetDTO.setStatus(orderItem.getStatus());
            orderItemGetDTO.setUnitPrice(orderItem.getUnitPrice());
            orderItemGetDTO.setUpDateTime(orderItem.getUpdatedAt());

            orderItemGetDTOs.add(orderItemGetDTO);
        }

        return orderItemGetDTOs;
    }

    public List<OrderItemGetDTO> getAllOrderItems(){
        List<OrderItem> orders = orderItemRepository.findAll();
        List<OrderItemGetDTO> orderItemGetDTOs = new ArrayList<>();

        for (OrderItem orderItem : orders) {
            
            OrderItemGetDTO orderItemGetDTO = new OrderItemGetDTO();
            orderItemGetDTO.setId(orderItem.getId());
            orderItemGetDTO.setOrderDate(orderItem.getCreatedAt());
            orderItemGetDTO.setOrderId(orderItem.getOrder().getId());
            orderItemGetDTO.setProductId(orderItem.getProduct().getId());
            orderItemGetDTO.setQuantity(orderItem.getQuantity());   
            orderItemGetDTO.setSellerId(orderItem.getSeller().getId());
            orderItemGetDTO.setStatus(orderItem.getStatus());
            orderItemGetDTO.setUnitPrice(orderItem.getUnitPrice());
            orderItemGetDTO.setUpDateTime(orderItem.getUpdatedAt());
            orderItemGetDTO.setCategory(orderItem.getCategory());
                
            orderItemGetDTOs.add(orderItemGetDTO);
        }

        return orderItemGetDTOs;
    }

    public OrderItemGetDTO getOrderItemById(Long id){
        Optional<OrderItem> orderOptional = orderItemRepository.findById(id); 
        OrderItem orderItem = orderOptional.orElse(null);

        OrderItemGetDTO orderItemGetDTO = new OrderItemGetDTO();

        orderItemGetDTO.setId(orderItem.getId());
        orderItemGetDTO.setOrderDate(orderItem.getCreatedAt());
        orderItemGetDTO.setOrderId(orderItem.getOrder().getId());
        orderItemGetDTO.setProductId(orderItem.getProduct().getId());
        orderItemGetDTO.setQuantity(orderItem.getQuantity());   
        orderItemGetDTO.setSellerId(orderItem.getSeller().getId());
        orderItemGetDTO.setStatus(orderItem.getStatus());
        orderItemGetDTO.setUnitPrice(orderItem.getUnitPrice());
        orderItemGetDTO.setUpDateTime(orderItem.getUpdatedAt());
        orderItemGetDTO.setCategory(orderItem.getCategory());

        return orderItemGetDTO;  
    }
}
