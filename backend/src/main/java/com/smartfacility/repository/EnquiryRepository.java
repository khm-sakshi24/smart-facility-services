package com.smartfacility.repository;

import com.smartfacility.entity.Enquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

    Optional<Enquiry> findByReferenceNumber(String referenceNumber);

    Page<Enquiry> findByStatus(String status, Pageable pageable);

    @Query("SELECT e FROM Enquiry e WHERE " +
           "(:query IS NULL OR :query = '' OR " +
           "LOWER(e.contactName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.associationName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.referenceNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.location) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:status IS NULL OR :status = 'ALL' OR e.status = :status)")
    Page<Enquiry> searchEnquiries(@Param("query") String query,
                                  @Param("status") String status,
                                  Pageable pageable);

    long countByStatus(String status);
}
