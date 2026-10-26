package com.smartfacility.controller;

import com.smartfacility.dto.LoginRequestDto;
import com.smartfacility.dto.LoginResponseDto;
import com.smartfacility.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Secure authentication and session token generation for administrative staff")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @Operation(summary = "Staff Login", description = "Validates staff credentials and issues access token")
    public ResponseEntity<LoginResponseDto> login(
            @Valid @RequestBody LoginRequestDto requestDto,
            HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        LoginResponseDto response = authService.authenticate(requestDto, clientIp);
        return ResponseEntity.ok(response);
    }
}
