import { NextRequest, NextResponse } from "next/server";

// In-memory reviews store — starting clean with 0 reviews
const storedReviews: Array<{
  id: string;
  rating: number;
  customerName: string;
  feedback: string;
  approved: boolean;
  createdAt: string;
}> = [];

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
