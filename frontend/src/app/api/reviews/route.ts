import { NextRequest, NextResponse } from "next/server";

// In-memory reviews store
const storedReviews: Array<{
  id: string;
  rating: number;
  customerName: string;
  feedback: string;
  approved: boolean;
  createdAt: string;
}> = [
  {
    id: "rev-seed-1",
    rating: 5,
    customerName: "K. R. Narayanan (Green Glen Meadows AOA)",
    feedback: "Best facility management decision our society made in 3 years. Punctual, disciplined, and daily digital checklists.",
    approved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "rev-seed-2",
    rating: 5,
    customerName: "Venkatesh Rao (Prestige Silver Oak RWA)",
    feedback: "Under 25-minute emergency response when our main STP booster pump tripped on a Sunday morning. Outstanding service.",
    approved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "rev-seed-3",
    rating: 5,
    customerName: "Pooja Sundaram (Ayyappa Nagar Layout, Hoodi)",
    feedback: "Impeccable waste segregation and daily supervisor audits. Zero headache maintenance.",
    approved: true,
    createdAt: new Date().toISOString(),
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rating, customerName, feedback, consent } = body;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating value." }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ error: "Consent is required to submit feedback." }, { status: 400 });
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      rating,
      customerName: customerName || "Verified Client",
      feedback: feedback || "",
      approved: true,
      createdAt: new Date().toISOString(),
    };

    storedReviews.unshift(newReview);

    return NextResponse.json(
      { success: true, message: "Review recorded successfully.", review: newReview },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Server error processing review." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ reviews: storedReviews });
}
