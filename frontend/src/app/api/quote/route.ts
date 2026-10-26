import { NextRequest, NextResponse } from "next/server";

// Fallback in-memory store for frontend resilience when Spring Boot is in local startup
const localFallbackStore: Record<string, unknown>[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic server-side validation
    const { contactName, associationName, email, phone, location, propertyType, services, consent } = body;

    if (!contactName || !email || !phone || !location || !consent) {
      return NextResponse.json(
        { error: "Missing required fields. Please fill in all required inputs." },
        { status: 400 }
      );
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    // Phone validation (at least 10 digits)
    const phoneClean = phone.replace(/[^0-9]/g, "");
    if (phoneClean.length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    // Generate unique enquiry reference: SFS-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    const referenceNumber = `SFS-${dateStr}-${randomHex}`;

    const enquiryRecord = {
      referenceNumber,
      contactName,
      associationName: associationName || "Not specified",
      email,
      phone,
      location,
      propertyType: propertyType || "Apartment Association",
      units: body.units || "N/A",
      services: services || [],
      preferredStartDate: body.preferredStartDate || null,
      notes: body.notes || "",
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    // Attempt to post to Spring Boot Backend API
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8080";
    let forwardedToBackend = false;

    try {
      const backendRes = await fetch(`${backendUrl}/api/public/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiryRecord),
        cache: "no-store",
        signal: AbortSignal.timeout(3000), // 3s timeout
      });

      if (backendRes.ok) {
        forwardedToBackend = true;
      }
    } catch {
      // Backend not yet reachable - fallback to local storage
      forwardedToBackend = false;
    }

    // Save to local fallback store
    localFallbackStore.push(enquiryRecord);

    return NextResponse.json(
      {
        success: true,
        referenceNumber,
        message: "Enquiry successfully recorded. Our team will contact you shortly.",
        forwardedToBackend,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Server error processing your quotation enquiry. Please try again." },
      { status: 500 }
    );
  }
}
