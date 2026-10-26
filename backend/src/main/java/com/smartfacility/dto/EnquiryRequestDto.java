package com.smartfacility.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public class EnquiryRequestDto {

    @NotBlank(message = "Contact name is required")
    @Size(max = 150, message = "Contact name cannot exceed 150 characters")
    private String contactName;

    @Size(max = 200, message = "Association name cannot exceed 200 characters")
    private String associationName;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10,14}$", message = "Please provide a valid 10 to 14 digit mobile number")
    private String phone;

    @NotBlank(message = "Property location is required")
    @Size(max = 200, message = "Location cannot exceed 200 characters")
    private String location;

    private String propertyType;
    private String units;
    private List<String> services;
    private LocalDate preferredStartDate;
    private String notes;

    // Getters and Setters
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
}
