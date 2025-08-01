package com.webapp.webapp_api.security.jwt;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtTokenService {

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; 
    
    private static final Dotenv dotenv = Dotenv.configure().directory("webapp_api/src/main/resources").load();
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(dotenv.get("JWT_SECRET").getBytes());


    public String generateToken(String email, String usertype) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userType", usertype);

        return Jwts.builder()
            .setClaims(claims)
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(SECRET_KEY)
            .compact();
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String extractUserType(String token) {
        return extractAllClaims(token).get("userType", String.class);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token, String expectedEmail) {
        String email = extractEmail(token);
        return email.equals(expectedEmail) && !isExpired(token);
    }

    private boolean isExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}
