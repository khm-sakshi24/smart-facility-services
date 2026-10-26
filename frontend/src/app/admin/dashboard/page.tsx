"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  ClipboardList,
  FileSpreadsheet,
  Wrench,
  QrCode,
  Calendar,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Printer,
  ChevronRight,
  TrendingUp,
  User,
  AlertTriangle,
} from "lucide-react";

// Types
interface Enquiry {
  id: string;
  referenceNumber: string;
  contactName: string;
  associationName: string;
  phone: string;
  email: string;
  location: string;
  services: string[];
  status: "NEW" | "UNDER_REVIEW" | "SITE_VISIT_SCHEDULED" | "QUOTED" | "CLOSED";
  createdAt: string;
}

interface QuotationItem {
  id: string;
  description: string;
  qty: number;
  unit: string;
  rate: number;
}

interface WorkOrder {
  id: string;
  orderNumber: string;
  property: string;
  service: string;
  priority: "HIGH" | "MEDIUM" | "ROUTINE";
  status: "NEW" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CLOSED";
  assignedStaff: string;
  scheduledDate: string;
  notes: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"enquiries" | "quotes" | "workorders" | "qr" | "reminders">("enquiries");
  const [userRole, setUserRole] = useState("OPERATIONS_ADMIN");
  const [userEmail, setUserEmail] = useState("staff@smartfacilityservices.com");

  // Sample data representing real records in the system
  const [enquiries, setEnquiries] = useState<Enquiry[]>([
    {
      id: "1",
      referenceNumber: "SFS-20261026-1042",
      contactName: "Ramesh Sharma",
      associationName: "Palm Meadows Phase 2 AOA",
      phone: "9845012345",
      email: "ramesh.sharma@palmmeadows.org",
      location: "Whitefield, Bengaluru",
      services: ["STP, ETP and WTP Operation and Maintenance", "Plumbing Services"],
      status: "NEW",
      createdAt: "2026-10-26",
    },
    {
      id: "2",
      referenceNumber: "SFS-20261025-9081",
      contactName: "Kavitha Reddy",
      associationName: "Brigade Cosmopolis Residents Committee",
      phone: "9880198765",
      email: "kavitha.reddy@gmail.com",
      location: "Hoodi, Bengaluru",
      services: ["Housekeeping Services", "Swimming Pool Maintenance & Chemical Management"],
      status: "SITE_VISIT_SCHEDULED",
      createdAt: "2026-10-25",
    },
    {
      id: "3",
      referenceNumber: "SFS-20261024-8114",
      contactName: "Sunil Hegde",
      associationName: "Garuda Tech Hub Office Facility",
      phone: "9740112233",
      email: "facility@garudatech.in",
      location: "Garudachar Palya, Bengaluru",
      services: ["Electrical Maintenance", "HVAC Maintenance"],
      status: "QUOTED",
      createdAt: "2026-10-24",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Quotation Builder State
  const [activeEnquiryForQuote, setActiveEnquiryForQuote] = useState<Enquiry | null>(null);
  const [quoteItems, setQuoteItems] = useState<QuotationItem[]>([
    { id: "1", description: "Daily STP Operation & Laboratory Chemical Dosing (30 Days)", qty: 1, unit: "Month", rate: 28000 },
    { id: "2", description: "Hydro-pneumatic Pump Set Preventive Maintenance & Inspection", qty: 2, unit: "Sets", rate: 4500 },
  ]);
  const [quoteValidityDays, setQuoteValidityDays] = useState(30);

  // Work Orders State
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: "wo-1",
      orderNumber: "WO-2026-0042",
      property: "Palm Meadows Phase 2, Whitefield",
      service: "STP Biological Culture & Aeration Check",
      priority: "HIGH",
      status: "ASSIGNED",
      assignedStaff: "Suresh Gowda (Senior STP Tech)",
      scheduledDate: "2026-10-27",
      notes: "Check dissolved oxygen levels in aeration tank 1.",
    },
    {
      id: "wo-2",
      orderNumber: "WO-2026-0041",
      property: "Brigade Cosmopolis, Hoodi",
      service: "Main Pool Robotic Vacuuming & Sand Filter Backwash",
      priority: "ROUTINE",
      status: "IN_PROGRESS",
      assignedStaff: "Anand M (Pool Technician)",
      scheduledDate: "2026-10-26",
      notes: "Residents swimming competition scheduled for weekend.",
    },
  ]);

  // QR Asset Records State
  const [qrAssets] = useState([
    {
      id: "AST-WFD-01",
      assetName: "STP Aeration Blower Set A",
      property: "Whitefield Complex 1",
      lastServiceDate: "2026-10-12",
      nextDue: "2026-11-12",
      technician: "Suresh Gowda",
    },
    {
      id: "AST-HOD-02",
      assetName: "Hydro-Pneumatic Booster Pump 3",
      property: "Hoodi Residential Layout",
      lastServiceDate: "2026-10-18",
      nextDue: "2026-11-18",
      technician: "Ravi Kumar",
    },
  ]);

  useEffect(() => {
    // Basic session guard
    const token = sessionStorage.getItem("sfs_admin_token");
    const role = sessionStorage.getItem("sfs_admin_role");
    const user = sessionStorage.getItem("sfs_admin_user");
    if (!token) {
      router.push("/admin/login");
    } else {
      if (role) setUserRole(role);
      if (user) setUserEmail(user);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/admin/login");
  };

  // Update Enquiry Status
  const handleUpdateEnquiryStatus = (id: string, newStatus: Enquiry["status"]) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  // Work Order Status Transition
  const advanceWorkOrderStatus = (id: string) => {
    const sequence: WorkOrder["status"][] = ["NEW", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CLOSED"];
    setWorkOrders((prev) =>
      prev.map((wo) => {
        if (wo.id === id) {
          const currentIndex = sequence.indexOf(wo.status);
          const nextStatus = currentIndex < sequence.length - 1 ? sequence[currentIndex + 1] : wo.status;
          return { ...wo, status: nextStatus };
        }
        return wo;
      })
    );
  };

  // Calculate Quotation Totals
  const subtotal = quoteItems.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.associationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Top Admin Header */}
      <header className="bg-forest-950 text-white border-b border-forest-900 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-forest-800 flex items-center justify-center text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide">
                Smart Facility Operations Portal
              </span>
              <span className="text-[11px] text-emerald-400 block font-mono">
                {userEmail} • <span className="uppercase text-brandPink-300 font-bold">{userRole}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-forest-800 hover:bg-forest-900 transition-colors hidden sm:inline-block"
            >
              View Public Website
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-white px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-semibold uppercase">Total Inquiries</span>
              <ClipboardList className="w-4 h-4 text-forest-700" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{enquiries.length}</div>
            <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Real database records</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-semibold uppercase">Site Visits Pending</span>
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {enquiries.filter((e) => e.status === "SITE_VISIT_SCHEDULED" || e.status === "NEW").length}
            </div>
            <p className="text-[11px] text-amber-700 font-medium">
              Requires physical inspection
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-semibold uppercase">Active Work Orders</span>
              <Wrench className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {workOrders.filter((w) => w.status !== "CLOSED").length}
            </div>
            <p className="text-[11px] text-gray-500">Assigned field technicians</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-semibold uppercase">Audited Assets</span>
              <QrCode className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{qrAssets.length}</div>
            <p className="text-[11px] text-purple-700 font-medium">QR Inspection Ready</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "enquiries"
                ? "bg-forest-800 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Enquiries &amp; Pipeline</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-[10px]">
              {enquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("quotes")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "quotes"
                ? "bg-forest-800 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Quotation Manager</span>
          </button>

          <button
            onClick={() => setActiveTab("workorders")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "workorders"
                ? "bg-forest-800 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Work Orders &amp; Staff</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-[10px]">
              {workOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("qr")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "qr"
                ? "bg-forest-800 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>QR Asset Records</span>
          </button>
        </div>

        {/* TAB 1: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-6 space-y-6">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by customer, reference, location..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">New</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="SITE_VISIT_SCHEDULED">Site Visit Scheduled</option>
                  <option value="QUOTED">Quoted</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                    <th className="py-3 px-4 font-semibold">Reference</th>
                    <th className="py-3 px-4 font-semibold">Customer / Property</th>
                    <th className="py-3 px-4 font-semibold">Location</th>
                    <th className="py-3 px-4 font-semibold">Requested Services</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-forest-950">
                        {enq.referenceNumber}
                        <span className="block text-[11px] font-sans font-normal text-gray-400">
                          {enq.createdAt}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-900">{enq.contactName}</div>
                        <div className="text-xs text-gray-500">{enq.associationName}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{enq.phone}</div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-700">{enq.location}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {enq.services.map((s, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-emerald-50 text-forest-800 border border-emerald-200 px-2 py-0.5 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            handleUpdateEnquiryStatus(enq.id, e.target.value as Enquiry["status"])
                          }
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                            enq.status === "NEW"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : enq.status === "SITE_VISIT_SCHEDULED"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : enq.status === "QUOTED"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="UNDER_REVIEW">UNDER REVIEW</option>
                          <option value="SITE_VISIT_SCHEDULED">SITE VISIT SCHEDULED</option>
                          <option value="QUOTED">QUOTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            setActiveEnquiryForQuote(enq);
                            setActiveTab("quotes");
                          }}
                          className="px-3 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-2xs transition-colors"
                        >
                          Prepare Quote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: QUOTATION BUILDER */}
        {activeTab === "quotes" && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Commercial Proposal Builder
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 mt-2">
                  Quotation for: {activeEnquiryForQuote ? activeEnquiryForQuote.associationName : "Palm Meadows Phase 2 AOA"}
                </h2>
                <p className="text-xs text-gray-500">
                  Target Location: {activeEnquiryForQuote ? activeEnquiryForQuote.location : "Whitefield, Bengaluru"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Export PDF</span>
                </button>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-gray-900">Scope of Work Line Items</h3>
                <button
                  onClick={() =>
                    setQuoteItems((prev) => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        description: "Additional Preventive Maintenance Scope",
                        qty: 1,
                        unit: "Service",
                        rate: 5000,
                      },
                    ])
                  }
                  className="inline-flex items-center gap-1 text-xs font-bold text-forest-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-200 rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Scope Description</th>
                      <th className="py-3 px-4 font-semibold w-24">Qty</th>
                      <th className="py-3 px-4 font-semibold w-28">Unit</th>
                      <th className="py-3 px-4 font-semibold w-36">Rate (₹)</th>
                      <th className="py-3 px-4 font-semibold w-36">Total (₹)</th>
                      <th className="py-3 px-4 font-semibold w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quoteItems.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="p-3">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => {
                              const v = e.target.value;
                              setQuoteItems((prev) =>
                                prev.map((it) => (it.id === item.id ? { ...it, description: v } : it))
                              );
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-1 focus:ring-forest-600"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={item.qty}
                            min={1}
                            onChange={(e) => {
                              const v = parseInt(e.target.value) || 1;
                              setQuoteItems((prev) =>
                                prev.map((it) => (it.id === item.id ? { ...it, qty: v } : it))
                              );
                            }}
                            className="w-full px-2 py-1.5 rounded-lg border border-gray-300 text-xs text-center"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={item.unit}
                            onChange={(e) => {
                              const v = e.target.value;
                              setQuoteItems((prev) =>
                                prev.map((it) => (it.id === item.id ? { ...it, unit: v } : it))
                              );
                            }}
                            className="w-full px-2 py-1.5 rounded-lg border border-gray-300 text-xs"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={item.rate}
                            min={0}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value) || 0;
                              setQuoteItems((prev) =>
                                prev.map((it) => (it.id === item.id ? { ...it, rate: v } : it))
                              );
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-right font-mono"
                          />
                        </td>
                        <td className="p-3 font-mono font-bold text-gray-900 text-right">
                          ₹{(item.qty * item.rate).toLocaleString("en-IN")}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() =>
                              setQuoteItems((prev) => prev.filter((it) => it.id !== item.id))
                            }
                            className="text-gray-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quotation Calculation Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 space-y-1 max-w-sm">
                <p>• Quotation valid for {quoteValidityDays} days from date of issuance.</p>
                <p>• Commercial figures are verified and authorized by Operations management.</p>
                <p>• Applicable statutory GST (18%) computed as required by Indian taxation norms.</p>
              </div>

              <div className="w-full sm:w-80 bg-slate-50 p-5 rounded-2xl border border-gray-200 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-mono font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%):</span>
                  <span className="font-mono font-medium">₹{gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-base text-forest-950">
                  <span>Grand Total:</span>
                  <span className="font-mono">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WORK ORDERS */}
        {activeTab === "workorders" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Work Orders &amp; Maintenance Logs</h2>
                <p className="text-xs text-gray-500">
                  Controlled status progression: New → Assigned → In Progress → Completed → Closed
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workOrders.map((wo) => (
                <div
                  key={wo.id}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs bg-forest-50 text-forest-800 px-2.5 py-1 rounded-md border border-forest-200">
                      {wo.orderNumber}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        wo.priority === "HIGH"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {wo.priority} PRIORITY
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-gray-900">{wo.service}</h3>
                    <p className="text-xs text-gray-600">{wo.property}</p>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div>
                      <strong className="text-gray-800">Assigned Staff: </strong>
                      <span>{wo.assignedStaff}</span>
                    </div>
                    <div>
                      <strong className="text-gray-800">Scheduled Date: </strong>
                      <span>{wo.scheduledDate}</span>
                    </div>
                    <div>
                      <strong className="text-gray-800">Field Notes: </strong>
                      <span>{wo.notes}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="text-xs font-semibold text-forest-800">
                      Status: <span className="underline">{wo.status}</span>
                    </div>
                    <button
                      onClick={() => advanceWorkOrderStatus(wo.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold flex items-center gap-1 shadow-2xs"
                    >
                      <span>Advance Status</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QR ASSET RECORDS */}
        {activeTab === "qr" && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-6 sm:p-10 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Innovative Feature 13.C
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 mt-2">
                QR-Based Asset &amp; Maintenance Records
              </h2>
              <p className="text-xs text-gray-500">
                Authorized staff scan physical asset QR tags on site to pull maintenance logs and record servicing. Sensitive details are protected behind authentication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qrAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-slate-50 p-6 rounded-2xl border border-gray-200 flex items-start gap-4"
                >
                  <div className="w-24 h-24 bg-white p-2 rounded-xl border border-gray-300 shadow-2xs flex flex-col items-center justify-center shrink-0">
                    <QrCode className="w-14 h-14 text-forest-900" />
                    <span className="text-[9px] font-mono font-bold text-gray-500 mt-1">
                      {asset.id}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1 text-xs">
                    <h3 className="font-bold text-sm text-gray-900">{asset.assetName}</h3>
                    <p className="text-gray-600">{asset.property}</p>
                    <div className="pt-2 text-gray-500 space-y-0.5">
                      <div>
                        <strong>Last Serviced: </strong>
                        <span>{asset.lastServiceDate}</span>
                      </div>
                      <div>
                        <strong>Next Due: </strong>
                        <span className="text-emerald-700 font-bold">{asset.nextDue}</span>
                      </div>
                      <div>
                        <strong>Assigned Tech: </strong>
                        <span>{asset.technician}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
