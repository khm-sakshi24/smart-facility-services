package com.smartfacility.dto;

public class DashboardStatsDto {
    private long totalEnquiries;
    private long newEnquiries;
    private long siteVisitsPending;
    private long quotedEnquiries;
    private long activeWorkOrders;
    private long completedWorkOrders;

    public DashboardStatsDto(long totalEnquiries, long newEnquiries, long siteVisitsPending, long quotedEnquiries, long activeWorkOrders, long completedWorkOrders) {
        this.totalEnquiries = totalEnquiries;
        this.newEnquiries = newEnquiries;
        this.siteVisitsPending = siteVisitsPending;
        this.quotedEnquiries = quotedEnquiries;
        this.activeWorkOrders = activeWorkOrders;
        this.completedWorkOrders = completedWorkOrders;
    }

    public long getTotalEnquiries() { return totalEnquiries; }
    public long getNewEnquiries() { return newEnquiries; }
    public long getSiteVisitsPending() { return siteVisitsPending; }
    public long getQuotedEnquiries() { return quotedEnquiries; }
    public long getActiveWorkOrders() { return activeWorkOrders; }
    public long getCompletedWorkOrders() { return completedWorkOrders; }
}
