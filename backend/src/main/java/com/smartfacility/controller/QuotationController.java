package com.smartfacility.controller;

import com.smartfacility.dto.QuotationRequestDto;
import com.smartfacility.dto.QuotationResponseDto;
import com.smartfacility.service.QuotationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin/quotations")
@Tag(name = "Admin Quotation Management", description = "Preparation, calculation, and issuing of commercial quotations")
public class QuotationController {

    private final QuotationService quotationService;

    public QuotationController(QuotationService quotationService) {
        this.quotationService = quotationService;
    }

    @PostMapping
    @Operation(summary = "Create Quotation", description = "Prepares and calculates itemized commercial proposal for an enquiry")
    public ResponseEntity<QuotationResponseDto> createQuotation(
            @Valid @RequestBody QuotationRequestDto requestDto,
            Principal principal,
            HttpServletRequest request) {

        String userEmail = principal != null ? principal.getName() : "ADMIN_USER";
        String clientIp = request.getRemoteAddr();

        QuotationResponseDto response = quotationService.createQuotation(requestDto, userEmail, clientIp);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Quotation Details by ID")
    public ResponseEntity<QuotationResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(quotationService.getById(id));
    }
}
