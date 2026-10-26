package com.smartfacility.controller;

import com.smartfacility.dto.EnquiryRequestDto;
import com.smartfacility.dto.EnquiryResponseDto;
import com.smartfacility.service.EnquiryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/public")
@Tag(name = "Public APIs", description = "Public quotation enquiry submission and service verification")
public class PublicEnquiryController {

    private final EnquiryService enquiryService;

    public PublicEnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping("/enquiries")
    @Operation(summary = "Submit Quotation Enquiry", description = "Public endpoint for customers and associations to submit quote requests")
    public ResponseEntity<EnquiryResponseDto> submitEnquiry(
            @Valid @RequestBody EnquiryRequestDto requestDto,
            HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        EnquiryResponseDto response = enquiryService.createPublicEnquiry(requestDto, clientIp);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/health")
    @Operation(summary = "System Health Check")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Smart Facility Services Backend",
                "timestamp", java.time.OffsetDateTime.now().toString()
        ));
    }
}
