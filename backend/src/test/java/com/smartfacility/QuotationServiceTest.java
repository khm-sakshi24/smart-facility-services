package com.smartfacility;

import com.smartfacility.dto.QuotationRequestDto;
import com.smartfacility.dto.QuotationResponseDto;
import com.smartfacility.entity.AuditLog;
import com.smartfacility.entity.Enquiry;
import com.smartfacility.entity.Quotation;
import com.smartfacility.repository.AuditLogRepository;
import com.smartfacility.repository.EnquiryRepository;
import com.smartfacility.repository.QuotationRepository;
import com.smartfacility.service.QuotationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuotationServiceTest {

    @Mock
    private QuotationRepository quotationRepository;

    @Mock
    private EnquiryRepository enquiryRepository;

    @Mock
    private AuditLogRepository auditLogRepository;

    private QuotationService quotationService;

    @BeforeEach
    void setUp() {
        quotationService = new QuotationService(quotationRepository, enquiryRepository, auditLogRepository);
    }

    @Test
    void testCreateQuotation_ComputesSubtotalAndGstAccurately() {
        Enquiry enquiry = new Enquiry();
        enquiry.setId(1L);
        enquiry.setReferenceNumber("SFS-20261026-1001");
        enquiry.setContactName("Test Client");
        enquiry.setLocation("Hoodi, Bengaluru");

        when(enquiryRepository.findById(1L)).thenReturn(Optional.of(enquiry));

        QuotationRequestDto.ItemDto item1 = new QuotationRequestDto.ItemDto();
        item1.setDescription("Daily STP Operation");
        item1.setQuantity(1);
        item1.setUnit("Month");
        item1.setUnitRate(new BigDecimal("10000.00"));

        QuotationRequestDto.ItemDto item2 = new QuotationRequestDto.ItemDto();
        item2.setDescription("Booster Pump Inspection");
        item2.setQuantity(2);
        item2.setUnit("Sets");
        item2.setUnitRate(new BigDecimal("2500.00"));

        QuotationRequestDto requestDto = new QuotationRequestDto();
        requestDto.setEnquiryId(1L);
        requestDto.setValidityDays(30);
        requestDto.setItems(List.of(item1, item2));

        when(quotationRepository.save(any(Quotation.class))).thenAnswer(inv -> {
            Quotation q = inv.getArgument(0);
            q.setId(501L);
            return q;
        });

        QuotationResponseDto response = quotationService.createQuotation(requestDto, "admin@test.com", "127.0.0.1");

        assertNotNull(response);
        // Subtotal = 10000 + 2*2500 = 15000
        assertEquals(new BigDecimal("15000.00"), response.getSubtotal());
        // GST 18% = 15000 * 0.18 = 2700.00
        assertEquals(new BigDecimal("2700.00"), response.getGstAmount());
        // Grand total = 17700.00
        assertEquals(new BigDecimal("17700.00"), response.getGrandTotal());
        assertEquals("ISSUED", response.getStatus());
    }
}
