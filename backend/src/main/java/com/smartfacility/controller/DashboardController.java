package com.smartfacility.controller;

import com.smartfacility.dto.DashboardStatsDto;
import com.smartfacility.repository.EnquiryRepository;
import com.smartfacility.repository.WorkOrderRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@Tag(name = "Admin Dashboard Statistics", description = "Real operational summary and pipeline metrics")
public class DashboardController {

    private final EnquiryRepository enquiryRepository;
    private final WorkOrderRepository workOrderRepository;

    public DashboardController(EnquiryRepository enquiryRepository, WorkOrderRepository workOrderRepository) {
        this.enquiryRepository = enquiryRepository;
        this.workOrderRepository = workOrderRepository;
    }

    @GetMapping("/stats")
    @Operation(summary = "Get Dashboard KPI Metrics")
    public ResponseEntity<DashboardStatsDto> getStats() {
        long totalEnquiries = enquiryRepository.count();
        long newEnquiries = enquiryRepository.countByStatus("NEW");
        long siteVisitsPending = enquiryRepository.countByStatus("SITE_VISIT_SCHEDULED");
        long quotedEnquiries = enquiryRepository.countByStatus("QUOTED");

        long activeOrders = workOrderRepository.count() - workOrderRepository.countByStatus("CLOSED");
        long completedOrders = workOrderRepository.countByStatus("COMPLETED") + workOrderRepository.countByStatus("CLOSED");

        return ResponseEntity.ok(new DashboardStatsDto(
                totalEnquiries,
                newEnquiries,
                siteVisitsPending,
                quotedEnquiries,
                activeOrders,
                completedOrders
        ));
    }
}
