package com.smartfacility.service;

import com.smartfacility.dto.LoginRequestDto;
import com.smartfacility.dto.LoginResponseDto;
import com.smartfacility.entity.AuditLog;
import com.smartfacility.entity.User;
import com.smartfacility.repository.AuditLogRepository;
import com.smartfacility.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;
    private final PasswordEncoder passwordEncoder;
    private final String jwtSecret;
    private final long jwtExpirationMs;

    public AuthService(UserRepository userRepository,
                       AuditLogRepository auditLogRepository,
                       PasswordEncoder passwordEncoder,
                       @Value("${app.jwt.secret}") String jwtSecret,
                       @Value("${app.jwt.expiration-ms}") long jwtExpirationMs) {
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtSecret = jwtSecret;
        this.jwtExpirationMs = jwtExpirationMs;
    }

    public LoginResponseDto authenticate(LoginRequestDto req, String clientIp) {
        String identifier = req.getUsername().trim();
        Optional<User> userOpt = identifier.contains("@")
                ? userRepository.findByEmail(identifier)
                : userRepository.findByUsername(identifier);

        if (userOpt.isEmpty() || !passwordEncoder.matches(req.getPassword(), userOpt.get().getPasswordHash())) {
            auditLogRepository.save(new AuditLog(
                    identifier,
                    "FAILED_LOGIN_ATTEMPT",
                    "User",
                    null,
                    "Bad credentials from IP: " + clientIp,
                    clientIp
            ));
            throw new BadCredentialsException("Invalid username or password");
        }

        User user = userOpt.get();
        if (!Boolean.TRUE.equals(user.getActive())) {
            throw new BadCredentialsException("User account is inactive");
        }

        // Generate JWT token
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        String token = Jwts.builder()
                .subject(user.getEmail())
                .claim("role", user.getRole())
                .claim("username", user.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key)
                .compact();

        auditLogRepository.save(new AuditLog(
                user.getEmail(),
                "SUCCESSFUL_LOGIN",
                "User",
                user.getId().toString(),
                "User logged in successfully",
                clientIp
        ));

        return new LoginResponseDto(token, user.getUsername(), user.getEmail(), user.getRole());
    }
}
