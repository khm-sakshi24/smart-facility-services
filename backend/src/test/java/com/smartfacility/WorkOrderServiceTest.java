package com.smartfacility;

import com.smartfacility.dto.WorkOrderDto;
import com.smartfacility.entity.WorkOrder;
import com.smartfacility.repository.AuditLogRepository;
import com.smartfacility.repository.WorkOrderRepository;
import com.smartfacility.service.WorkOrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WorkOrderServiceTest {

    @Mock
    private WorkOrderRepository workOrderRepository;

    @Mock
    private AuditLogRepository auditLogRepository;

    private WorkOrderService workOrderService;

    @BeforeEach
    void setUp() {
        workOrderService = new WorkOrderService(workOrderRepository, auditLogRepository);
    }

    @Test
    void testAdvanceStatus_TransitionsCorrectlyAcrossLifecycle() {
        WorkOrder wo = new WorkOrder();
        wo.setId(10L);
        wo.setOrderNumber("WO-2026-0001");
        wo.setStatus("NEW");

        when(workOrderRepository.findById(10L)).thenReturn(Optional.of(wo));
        when(workOrderRepository.save(any(WorkOrder.class))).thenAnswer(inv -> inv.getArgument(0));

        // Advance 1: NEW -> ASSIGNED
        WorkOrderDto step1 = workOrderService.advanceStatus(10L, "staff@test.com", "127.0.0.1");
        assertEquals("ASSIGNED", step1.getStatus());

        // Advance 2: ASSIGNED -> IN_PROGRESS
        wo.setStatus("ASSIGNED");
        WorkOrderDto step2 = workOrderService.advanceStatus(10L, "staff@test.com", "127.0.0.1");
        assertEquals("IN_PROGRESS", step2.getStatus());

        // Advance 3: IN_PROGRESS -> COMPLETED
        wo.setStatus("IN_PROGRESS");
        WorkOrderDto step3 = workOrderService.advanceStatus(10L, "staff@test.com", "127.0.0.1");
        assertEquals("COMPLETED", step3.getStatus());

        // Advance 4: COMPLETED -> CLOSED
        wo.setStatus("COMPLETED");
        WorkOrderDto step4 = workOrderService.advanceStatus(10L, "staff@test.com", "127.0.0.1");
        assertEquals("CLOSED", step4.getStatus());
    }
}
