package com.smartfacility.service;

import com.smartfacility.dto.QuotationRequestDto;
import com.smartfacility.dto.QuotationResponseDto;
import com.smartfacility.entity.AuditLog;
import com.smartfacility.entity.Enquiry;
import com.smartfacility.entity.Quotation;
import com.smartfacility.entity.QuotationItem;
import com.smartfacility.exception.ResourceNotFoundException;
import com.smartfacility.repository.AuditLogRepository;
import com.smartfacility.repository.EnquiryRepository;
import com.smartfacility.repository.QuotationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class QuotationService {

    private final QuotationRepository quotationRepository;
    private final EnquiryRepository enquiryRepository;
    private final AuditLogRepository auditLogRepository;

    public QuotationService(QuotationRepository quotationRepository,
                            EnquiryRepository enquiryRepository,
                            AuditLogRepository auditLogRepository) {
        this.quotationRepository = quotationRepository;
        this.enquiryRepository = enquiryRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public QuotationResponseDto createQuotation(QuotationRequestDto dto, String userEmail, String clientIp) {
        Enquiry enquiry = enquiryRepository.findById(dto.getEnquiryId())
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with ID: " + dto.getEnquiryId()));

        String datePart = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);
        int rand = ThreadLocalRandom.current().nextInt(1000, 9999);
        String quotationNumber = "Q-" + datePart + "-" + rand;

        Quotation quotation = new Quotation();
        quotation.setQuotationNumber(quotationNumber);
        quotation.setEnquiry(enquiry);
        quotation.setValidityDays(dto.getValidityDays() != null ? dto.getValidityDays() : 30);
        quotation.setTerms(dto.getTerms() != null ? dto.getTerms() : "Payment terms: 30 days net. Subject to physical site verification.");
        quotation.setStatus("ISSUED");

        BigDecimal subtotal = BigDecimal.ZERO;
        List<QuotationItem> items = new ArrayList<>();

        for (QuotationRequestDto.ItemDto itemDto : dto.getItems()) {
            QuotationItem item = new QuotationItem();
            item.setDescription(itemDto.getDescription());
            item.setQuantity(itemDto.getQuantity() != null ? itemDto.getQuantity() : 1);
            item.setUnit(itemDto.getUnit() != null ? itemDto.getUnit() : "Unit");
            BigDecimal rate = itemDto.getUnitRate() != null ? itemDto.getUnitRate() : BigDecimal.ZERO;
            item.setUnitRate(rate);

            BigDecimal lineTotal = rate.multiply(BigDecimal.valueOf(item.getQuantity()));
            item.setTotalAmount(lineTotal);
            subtotal = subtotal.add(lineTotal);

            quotation.addItem(item);
        }

        BigDecimal gst = subtotal.multiply(new BigDecimal("0.18")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal grandTotal = subtotal.add(gst);

        quotation.setSubtotal(subtotal);
        quotation.setGstAmount(gst);
        quotation.setGrandTotal(grandTotal);

        Quotation saved = quotationRepository.save(quotation);

        // Mark enquiry status as QUOTED
        enquiry.setStatus("QUOTED");
        enquiryRepository.save(enquiry);

        // Audit Log
        auditLogRepository.save(new AuditLog(
                userEmail,
                "CREATE_QUOTATION",
                "Quotation",
                saved.getQuotationNumber(),
                "Prepared commercial quote for enquiry " + enquiry.getReferenceNumber() + " with Total: INR " + grandTotal,
                clientIp
        ));

        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public QuotationResponseDto getById(Long id) {
        Quotation quotation = quotationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quotation not found with ID: " + id));
        return mapToDto(quotation);
    }

    private QuotationResponseDto mapToDto(Quotation quotation) {
        QuotationResponseDto dto = new QuotationResponseDto();
        dto.setId(quotation.getId());
        dto.setQuotationNumber(quotation.getQuotationNumber());
        if (quotation.getEnquiry() != null) {
            dto.setEnquiryReference(quotation.getEnquiry().getReferenceNumber());
            dto.setCustomerName(quotation.getEnquiry().getContactName());
            dto.setPropertyLocation(quotation.getEnquiry().getLocation());
        }
        dto.setSubtotal(quotation.getSubtotal());
        dto.setGstAmount(quotation.getGstAmount());
        dto.setGrandTotal(quotation.getGrandTotal());
        dto.setValidityDays(quotation.getValidityDays());
        dto.setStatus(quotation.getStatus());
        dto.setTerms(quotation.getTerms());
        dto.setCreatedAt(quotation.getCreatedAt());

        List<QuotationResponseDto.ItemResponseDto> itemDtos = new ArrayList<>();
        for (QuotationItem it : quotation.getItems()) {
            QuotationResponseDto.ItemResponseDto idto = new QuotationResponseDto.ItemResponseDto();
            idto.setDescription(it.getDescription());
            idto.setQuantity(it.getQuantity());
            idto.setUnit(it.getUnit());
            idto.setUnitRate(it.getUnitRate());
            idto.setTotalAmount(it.getTotalAmount());
            itemDtos.add(idto);
        }
        dto.setItems(itemDtos);

        return dto;
    }
}
