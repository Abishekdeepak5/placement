package com.PLACEMENTWEBAPP.PlacementWebApp.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.function.Function;
import com.PLACEMENTWEBAPP.PlacementWebApp.Entity.Role;
import org.springframework.stereotype.Service;

@Service
public class TokenGenerator {
    private static final Logger logger = LoggerFactory.getLogger(OTPService.class);



    @Scheduled(fixedRate = 60000) // Run every minute
    public void deleteExpiredOtps() {

        final Logger logger = LoggerFactory.getLogger(OTPService.class);

        LocalDateTime expiryTime = LocalDateTime.now().minusMinutes(3);
//        studentRepository.deleteExpiredOtps(expiryTime);
        logger.info("Expired OTPs deleted at {}", LocalDateTime.now());
    }
    //create Secret Key
    private Key getSiginKey()
    {
        byte[] key= Decoders.BASE64.decode("413F442847284862506553685660597033733676397924422645294840406351");
        return Keys.hmacShaKeyFor(key);
    }

    public String extractUserName(String token)
    {
        return extractClaim(token, Claims::getSubject);
    }


    public <T> T extractClaim(String token, Function<Claims, T> claimsResolvers)
    {
        final Claims claims=extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSiginKey()).build().parseClaimsJws(token).getBody();
    }


    private boolean isTokenExpired(String token){
        return extractClaim(token,Claims::getExpiration).before(new Date());
    }

    //Method to Generate Access Token
    public String generateAccessToken(String email, Long userId, Role role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)
                .claim("role", role.name())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSiginKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    //Method to Generate Refresh Token
    public String generateRefreshToken(String email,Long userId,Role role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)
                .claim("role", role.name())
                .setExpiration(new Date(System.currentTimeMillis() + 604800000))
                .signWith(getSiginKey(),SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            // Extract username from the token
            final String username = extractUserName(token);

            // Ensure token is not expired and username matches
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (Exception e) {
            // Log other validation errors (optional)
            System.out.println("Token validation error: " + e.getMessage());
            return false;
        }
    }
}
