package com.smartfacility.service;

import com.smartfacility.dto.EnquiryRequestDto;
import com.smartfacility.dto.EnquiryResponseDto;
import com.smartfacility.entity.AuditLog;
import com.smartfacility.entity.Enquiry;
import com.smartfacility.exception.ResourceNotFoundException;
import com.smartfacility.repository.AuditLogRepository;
import com.smartfacility.repository.EnquiryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;
    private final AuditLogRepository auditLogRepository;

    public EnquiryService(EnquiryRepository enquiryRepository, AuditLogRepository auditLogRepository) {
        this.enquiryRepository = enquiryRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public EnquiryResponseDto createPublicEnquiry(EnquiryRequestDto dto, String clientIp) {
        // Generate unique enquiry reference: SFS-YYYYMMDD-XXXX
        String datePart = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);
        int randomPart = ThreadLocalRandom.current().nextInt(1000, 9999);
        String refNumber = "SFS-" + datePart + "-" + randomPart;

        Enquiry enquiry = new Enquiry();
        enquiry.setReferenceNumber(refNumber);
        enquiry.setContactName(dto.getContactName().trim());
        enquiry.setAssociationName(dto.getAssociationName() != null ? dto.getAssociationName().trim() : null);
        enquiry.setEmail(dto.getEmail().trim().toLowerCase());
        enquiry.setPhone(dto.getPhone().replaceAll("[^0-9]", ""));
        enquiry.setLocation(dto.getLocation().trim());
        enquiry.setPropertyType(dto.getPropertyType() != null ? dto.getPropertyType() : "Apartment Association");
        enquiry.setUnits(dto.getUnits());
        if (dto.getServices() != null && !dto.getServices().isEmpty()) {
            enquiry.setServicesRequested(String.join(", ", dto.getServices()));
        }
        enquiry.setPreferredStartDate(dto.getPreferredStartDate());
        enquiry.setNotes(dto.getNotes());
        enquiry.setStatus("NEW");

        Enquiry saved = enquiryRepository.save(enquiry);

        // Audit log
        auditLogRepository.save(new AuditLog(
                "PUBLIC_USER",
                "CREATE_ENQUIRY",
                "Enquiry",
                saved.getReferenceNumber(),
                "New enquiry registered for " + saved.getLocation(),
                clientIp
        ));

        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public Page<EnquiryResponseDto> searchEnquiries(String query, String status, Pageable pageable) {
        return enquiryRepository.searchEnquiries(query, status, pageable)
                .map(this::mapToDto);
    }

    @Transactional(readOnly = true)
    public EnquiryResponseDto getByReference(String referenceNumber) {
        Enquiry enquiry = enquiryRepository.findByReferenceNumber(referenceNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with reference: " + referenceNumber));
        return mapToDto(enquiry);
    }

    @Transactional
    public EnquiryResponseDto updateStatus(Long id, String newStatus, String adminUserEmail, String clientIp) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with ID: " + id));

        String oldStatus = enquiry.getStatus();
        enquiry.setStatus(newStatus.toUpperCase());
        Enquiry updated = enquiryRepository.save(enquiry);

        auditLogRepository.save(new AuditLog(
                adminUserEmail,
                "UPDATE_STATUS",
                "Enquiry",
                enquiry.getReferenceNumber(),
                "Status changed from " + oldStatus + " to " + newStatus,
                clientIp
        ));

        return mapToDto(updated);
    }

    public EnquiryResponseDto mapToDto(Enquiry enquiry) {
        EnquiryResponseDto dto = new EnquiryResponseDto();
        dto.setId(enquiry.getId());
        dto.setReferenceNumber(enquiry.getReferenceNumber());
        dto.setContactName(enquiry.getContactName());
        dto.setAssociationName(enquiry.getAssociationName());
        dto.setEmail(enquiry.getEmail());
        dto.setPhone(enquiry.getPhone());
        dto.setLocation(enquiry.getLocation());
        dto.setPropertyType(enquiry.getPropertyType());
        dto.setUnits(enquiry.getUnits());
        if (enquiry.getServicesRequested() != null && !enquiry.getServicesRequested().isBlank()) {
            dto.setServices(Arrays.asList(enquiry.getServicesRequested().split(",\\s*")));
        } else {
            dto.setServices(Collections.emptyList());
        }
        dto.setPreferredStartDate(enquiry.getPreferredStartDate());
        dto.setNotes(enquiry.getNotes());
        dto.setStatus(enquiry.getStatus());
        dto.setCreatedAt(enquiry.getCreatedAt());
        return dto;
    }
}
