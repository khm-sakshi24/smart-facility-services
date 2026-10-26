package com.smartfacility.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public class QuotationResponseDto {
    private Long id;
    private String quotationNumber;
    private String enquiryReference;
    private String customerName;
    private String propertyLocation;
    private BigDecimal subtotal;
    private BigDecimal gstAmount;
    private BigDecimal grandTotal;
    private Integer validityDays;
    private String status;
    private String terms;
    private List<ItemResponseDto> items;
    private OffsetDateTime createdAt;

    public static class ItemResponseDto {
        private String description;
        private Integer quantity;
        private String unit;
        private BigDecimal unitRate;
        private BigDecimal totalAmount;

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }

        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }

        public BigDecimal getUnitRate() { return unitRate; }
        public void setUnitRate(BigDecimal unitRate) { this.unitRate = unitRate; }

        public BigDecimal getTotalAmount() { return totalAmount; }
        public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuotationNumber() { return quotationNumber; }
    public void setQuotationNumber(String quotationNumber) { this.quotationNumber = quotationNumber; }

    public String getEnquiryReference() { return enquiryReference; }
    public void setEnquiryReference(String enquiryReference) { this.enquiryReference = enquiryReference; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getPropertyLocation() { return propertyLocation; }
    public void setPropertyLocation(String propertyLocation) { this.propertyLocation = propertyLocation; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public BigDecimal getGstAmount() { return gstAmount; }
    public void setGstAmount(BigDecimal gstAmount) { this.gstAmount = gstAmount; }

    public BigDecimal getGrandTotal() { return grandTotal; }
    public void setGrandTotal(BigDecimal grandTotal) { this.grandTotal = grandTotal; }

    public Integer getValidityDays() { return validityDays; }
    public void setValidityDays(Integer validityDays) { this.validityDays = validityDays; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTerms() { return terms; }
    public void setTerms(String terms) { this.terms = terms; }

    public List<ItemResponseDto> getItems() { return items; }
    public void setItems(List<ItemResponseDto> items) { this.items = items; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
