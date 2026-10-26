package com.smartfacility.service;

import com.smartfacility.dto.WorkOrderDto;
import com.smartfacility.entity.AuditLog;
import com.smartfacility.entity.WorkOrder;
import com.smartfacility.exception.ResourceNotFoundException;
import com.smartfacility.repository.AuditLogRepository;
import com.smartfacility.repository.WorkOrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class WorkOrderService {

    private final WorkOrderRepository workOrderRepository;
    private final AuditLogRepository auditLogRepository;

    public WorkOrderService(WorkOrderRepository workOrderRepository, AuditLogRepository auditLogRepository) {
        this.workOrderRepository = workOrderRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public WorkOrderDto createWorkOrder(WorkOrderDto dto, String userEmail, String clientIp) {
        String yearPart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy"));
        int rand = ThreadLocalRandom.current().nextInt(1000, 9999);
        String orderNum = "WO-" + yearPart + "-" + rand;

        WorkOrder wo = new WorkOrder();
        wo.setOrderNumber(orderNum);
        wo.setPropertyName(dto.getPropertyName());
        wo.setServiceCode(dto.getServiceCode());
        wo.setTitle(dto.getTitle());
        wo.setPriority(dto.getPriority() != null ? dto.getPriority() : "ROUTINE");
        wo.setStatus("NEW");
        wo.setAssignedStaff(dto.getAssignedStaff());
        wo.setScheduledDate(dto.getScheduledDate());
        wo.setNotes(dto.getNotes());

        WorkOrder saved = workOrderRepository.save(wo);

        auditLogRepository.save(new AuditLog(
                userEmail,
                "CREATE_WORK_ORDER",
                "WorkOrder",
                saved.getOrderNumber(),
                "Created work order: " + saved.getTitle(),
                clientIp
        ));

        return mapToDto(saved);
    }

    @Transactional
    public WorkOrderDto advanceStatus(Long id, String userEmail, String clientIp) {
        WorkOrder wo = workOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Work order not found with ID: " + id));

        String oldStatus = wo.getStatus();
        String nextStatus;

        switch (oldStatus) {
            case "NEW" -> nextStatus = "ASSIGNED";
            case "ASSIGNED" -> nextStatus = "IN_PROGRESS";
            case "IN_PROGRESS" -> nextStatus = "COMPLETED";
            case "COMPLETED" -> nextStatus = "CLOSED";
            default -> nextStatus = oldStatus;
        }

        wo.setStatus(nextStatus);
        WorkOrder saved = workOrderRepository.save(wo);

        auditLogRepository.save(new AuditLog(
                userEmail,
                "ADVANCE_WORK_ORDER_STATUS",
                "WorkOrder",
                saved.getOrderNumber(),
                "Status transitioned from " + oldStatus + " to " + nextStatus,
                clientIp
        ));

        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public Page<WorkOrderDto> getAll(String status, Pageable pageable) {
        if (status != null && !status.equalsIgnoreCase("ALL")) {
            return workOrderRepository.findByStatus(status.toUpperCase(), pageable).map(this::mapToDto);
        }
        return workOrderRepository.findAll(pageable).map(this::mapToDto);
    }

    public WorkOrderDto mapToDto(WorkOrder wo) {
        WorkOrderDto dto = new WorkOrderDto();
        dto.setId(wo.getId());
        dto.setOrderNumber(wo.getOrderNumber());
        dto.setPropertyName(wo.getPropertyName());
        dto.setServiceCode(wo.getServiceCode());
        dto.setTitle(wo.getTitle());
        dto.setPriority(wo.getPriority());
        dto.setStatus(wo.getStatus());
        dto.setAssignedStaff(wo.getAssignedStaff());
        dto.setScheduledDate(wo.getScheduledDate());
        dto.setNotes(wo.getNotes());
        dto.setCreatedAt(wo.getCreatedAt());
        return dto;
    }
}
