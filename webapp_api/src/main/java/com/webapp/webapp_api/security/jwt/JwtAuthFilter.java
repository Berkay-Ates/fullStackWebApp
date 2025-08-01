package com.webapp.webapp_api.security.jwt;

import com.webapp.webapp_api.model.Customer;
import com.webapp.webapp_api.model.Seller;
import com.webapp.webapp_api.repository.customer.CustomerRepository;
import com.webapp.webapp_api.repository.seller.SellerRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtService;
    private final CustomerRepository customerRepository;
    private final SellerRepository sellerRepository;

    public JwtAuthFilter(JwtTokenService jwtService, CustomerRepository customerRepository,SellerRepository sellerRepository) {
        this.jwtService = jwtService;
        this.customerRepository = customerRepository;
        this.sellerRepository = sellerRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                                    throws ServletException, IOException {

        System.out.println("Authorization header: " + request.getHeader("Authorization"));
        System.out.println("Request URI: " + request.getRequestURI());


        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        final String userType;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        userEmail = jwtService.extractEmail(jwt);
        userType = jwtService.extractUserType(jwt);


        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (userType.equals("customer")) {
                Customer customer = customerRepository.findByEmail(userEmail).orElse(null);

                if (customer != null && jwtService.isTokenValid(jwt, customer.getEmail())) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    customer, null, null 
                            );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }

            }else{
                Seller seller = sellerRepository.findByEmail(userEmail).orElse(null);

                if (seller != null && jwtService.isTokenValid(jwt, seller.getEmail())) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    seller, null, null 
                            );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
