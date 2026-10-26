import { NextRequest, NextResponse } from "next/server";

// Fallback in-memory store for contact submissions when Spring Boot is starting
const localContactStore: Record<string, unknown>[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Please fill in your name, phone number, and message." },
        { status: 400 }
      );
    }

    const phoneClean = phone.replace(/[^0-9]/g, "");
    if (phoneClean.length < 10) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    // Generate unique reference
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    const referenceNumber = `SFS-${dateStr}-${randomHex}`;

    const contactRecord = {
      referenceNumber,
      contactName: name,
      associationName: body.propertyType || "General Property Inquiry",
      email: email || "not-provided@client.in",
      phone: phoneClean,
      location: body.location || "Bengaluru",
      propertyType: body.propertyType || "Apartment / Commercial",
      units: body.units || "N/A",
      services: service ? [service] : ["General Inquiry"],
      notes: message,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    // Forward to Spring Boot Backend API if reachable
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8080";
    let forwardedToBackend = false;

    try {
      const backendRes = await fetch(`${backendUrl}/api/public/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactRecord),
        cache: "no-store",
        signal: AbortSignal.timeout(3000),
      });

      if (backendRes.ok) {
        forwardedToBackend = true;
      }
    } catch {
      forwardedToBackend = false;
    }

    localContactStore.push(contactRecord);

    return NextResponse.json(
      {
        success: true,
        referenceNumber,
        message: "Thank you! Your message has been received. The Smart Facility Services team will contact you shortly.",
        forwardedToBackend,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error. Please call or WhatsApp us directly." },
      { status: 500 }
    );
  }
}
