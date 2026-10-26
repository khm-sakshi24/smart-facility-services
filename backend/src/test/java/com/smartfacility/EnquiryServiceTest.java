package com.smartfacility;

import com.smartfacility.dto.EnquiryRequestDto;
import com.smartfacility.dto.EnquiryResponseDto;
import com.smartfacility.entity.AuditLog;
import com.smartfacility.entity.Enquiry;
import com.smartfacility.repository.AuditLogRepository;
import com.smartfacility.repository.EnquiryRepository;
import com.smartfacility.service.EnquiryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EnquiryServiceTest {

    @Mock
    private EnquiryRepository enquiryRepository;

    @Mock
    private AuditLogRepository auditLogRepository;

    private EnquiryService enquiryService;

    @BeforeEach
    void setUp() {
        enquiryService = new EnquiryService(enquiryRepository, auditLogRepository);
    }

    @Test
    void testCreatePublicEnquiry_GeneratesValidReferenceAndSaves() {
        EnquiryRequestDto requestDto = new EnquiryRequestDto();
        requestDto.setContactName("Ramesh Kumar");
        requestDto.setAssociationName("Palm Meadows AOA");
        requestDto.setEmail("ramesh@palmmeadows.org");
        requestDto.setPhone("9845012345");
        requestDto.setLocation("Whitefield, Bengaluru");
        requestDto.setServices(List.of("STP Operation", "Housekeeping"));

        when(enquiryRepository.save(any(Enquiry.class))).thenAnswer(invocation -> {
            Enquiry e = invocation.getArgument(0);
            e.setId(101L);
            return e;
        });

        EnquiryResponseDto response = enquiryService.createPublicEnquiry(requestDto, "127.0.0.1");

        assertNotNull(response);
        assertEquals(101L, response.getId());
        assertEquals("Ramesh Kumar", response.getContactName());
        assertEquals("Whitefield, Bengaluru", response.getLocation());
        assertTrue(response.getReferenceNumber().startsWith("SFS-"), "Reference should start with SFS-");
        assertEquals("NEW", response.getStatus());

        verify(auditLogRepository).save(any(AuditLog.class));
    }
}
