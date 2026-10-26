package com.smartfacility.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "enquiries")
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference_number", nullable = false, unique = true, length = 50)
    private String referenceNumber;

    @Column(name = "contact_name", nullable = false, length = 150)
    private String contactName;

    @Column(name = "association_name", length = 200)
    private String associationName;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false, length = 30)
    private String phone;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(name = "property_type", length = 100)
    private String propertyType;

    @Column(length = 50)
    private String units;

    @Column(name = "services_requested", columnDefinition = "TEXT")
    private String servicesRequested;

    @Column(name = "preferred_start_date")
    private LocalDate preferredStartDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false, length = 50)
    private String status = "NEW";

    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }

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

    public String getServicesRequested() { return servicesRequested; }
    public void setServicesRequested(String servicesRequested) { this.servicesRequested = servicesRequested; }

    public LocalDate getPreferredStartDate() { return preferredStartDate; }
    public void setPreferredStartDate(LocalDate preferredStartDate) { this.preferredStartDate = preferredStartDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
