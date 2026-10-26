package com.smartfacility.controller;

import com.smartfacility.dto.EnquiryResponseDto;
import com.smartfacility.service.EnquiryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/enquiries")
@Tag(name = "Admin Enquiry Management", description = "Administrative review, filtering, and status updates for customer enquiries")
public class AdminEnquiryController {

    private final EnquiryService enquiryService;

    public AdminEnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @GetMapping
    @Operation(summary = "Search and Filter Enquiries")
    public ResponseEntity<Page<EnquiryResponseDto>> listEnquiries(
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "ALL") String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction) {

        Sort sort = direction.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        Page<EnquiryResponseDto> result = enquiryService.searchEnquiries(query, status, pageRequest);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/ref/{referenceNumber}")
    @Operation(summary = "Get Enquiry by Reference Number")
    public ResponseEntity<EnquiryResponseDto> getByRef(@PathVariable String referenceNumber) {
        return ResponseEntity.ok(enquiryService.getByReference(referenceNumber));
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update Enquiry Status")
    public ResponseEntity<EnquiryResponseDto> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            Principal principal,
            HttpServletRequest request) {

        String newStatus = body.getOrDefault("status", "UNDER_REVIEW");
        String userEmail = principal != null ? principal.getName() : "ADMIN_USER";
        String clientIp = request.getRemoteAddr();

        EnquiryResponseDto updated = enquiryService.updateStatus(id, newStatus, userEmail, clientIp);
        return ResponseEntity.ok(updated);
    }
}
