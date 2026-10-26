package com.smartfacility.dto;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public class EnquiryResponseDto {
    private Long id;
    private String referenceNumber;
    private String contactName;
    private String associationName;
    private String email;
    private String phone;
    private String location;
    private String propertyType;
    private String units;
    private List<String> services;
    private LocalDate preferredStartDate;
    private String notes;
    private String status;
    private OffsetDateTime createdAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public String getContactName() { return contactName; }
    public void setContactName(String contactName) { this.contactName = contactName; }

    public String getAssociationName() { return associationName; }
    public void setAssociationName(String associationName) { this.associationName = associationName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPropertyType() { return propertyType; }
    public void setPropertyType(String propertyType) { this.propertyType = propertyType; }

    public String getUnits() { return units; }
    public void setUnits(String units) { this.units = units; }

    public List<String> getServices() { return services; }
    public void setServices(List<String> services) { this.services = services; }

    public LocalDate getPreferredStartDate() { return preferredStartDate; }
    public void setPreferredStartDate(LocalDate preferredStartDate) { this.preferredStartDate = preferredStartDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
