package com.smartfacility.repository;

import com.smartfacility.entity.WorkOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {
    Optional<WorkOrder> findByOrderNumber(String orderNumber);
    Page<WorkOrder> findByStatus(String status, Pageable pageable);
    long countByStatus(String status);
}
