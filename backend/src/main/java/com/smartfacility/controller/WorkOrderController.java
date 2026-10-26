package com.smartfacility.controller;

import com.smartfacility.dto.WorkOrderDto;
import com.smartfacility.service.WorkOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin/work-orders")
@Tag(name = "Work Orders & Maintenance", description = "Operational scheduling, assignment, and status lifecycle")
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    public WorkOrderController(WorkOrderService workOrderService) {
        this.workOrderService = workOrderService;
    }

    @PostMapping
    @Operation(summary = "Create Work Order")
    public ResponseEntity<WorkOrderDto> createWorkOrder(
            @Valid @RequestBody WorkOrderDto dto,
            Principal principal,
            HttpServletRequest request) {

        String userEmail = principal != null ? principal.getName() : "ADMIN_USER";
        String clientIp = request.getRemoteAddr();

        WorkOrderDto created = workOrderService.createWorkOrder(dto, userEmail, clientIp);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "List Work Orders")
    public ResponseEntity<Page<WorkOrderDto>> list(
            @RequestParam(required = false, defaultValue = "ALL") String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return ResponseEntity.ok(workOrderService.getAll(status, pageRequest));
    }

    @PutMapping("/{id}/advance-status")
    @Operation(summary = "Advance Work Order Status", description = "Advances through controlled lifecycle: NEW -> ASSIGNED -> IN_PROGRESS -> COMPLETED -> CLOSED")
    public ResponseEntity<WorkOrderDto> advanceStatus(
            @PathVariable Long id,
            Principal principal,
            HttpServletRequest request) {

        String userEmail = principal != null ? principal.getName() : "ADMIN_USER";
        String clientIp = request.getRemoteAddr();

        WorkOrderDto updated = workOrderService.advanceStatus(id, userEmail, clientIp);
        return ResponseEntity.ok(updated);
    }
}
