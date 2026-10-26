package com.smartfacility.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

public class QuotationRequestDto {

    @NotNull(message = "Enquiry ID is required")
    private Long enquiryId;

    private Integer validityDays = 30;
    private String terms;

    @NotEmpty(message = "At least one quotation line item is required")
    private List<ItemDto> items;

    public static class ItemDto {
        private String description;
        private Integer quantity;
        private String unit;
        private BigDecimal unitRate;

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }

        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }

        public BigDecimal getUnitRate() { return unitRate; }
        public void setUnitRate(BigDecimal unitRate) { this.unitRate = unitRate; }
    }

    public Long getEnquiryId() { return enquiryId; }
    public void setEnquiryId(Long enquiryId) { this.enquiryId = enquiryId; }

    public Integer getValidityDays() { return validityDays; }
    public void setValidityDays(Integer validityDays) { this.validityDays = validityDays; }

    public String getTerms() { return terms; }
    public void setTerms(String terms) { this.terms = terms; }

    public List<ItemDto> getItems() { return items; }
    public void setItems(List<ItemDto> items) { this.items = items; }
}
