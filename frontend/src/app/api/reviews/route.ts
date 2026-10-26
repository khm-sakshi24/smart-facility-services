import { NextRequest, NextResponse } from "next/server";

// Fallback in-memory review storage
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
      id: Date.now().toString(),
      rating,
      customerName: customerName || "Verified Client",
      feedback: feedback || "",
      approved: false, // Stored as unapproved until moderated
      createdAt: new Date().toISOString(),
    };

    storedReviews.push(newReview);

    return NextResponse.json(
      { success: true, message: "Review recorded for moderation." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error processing review." }, { status: 500 });
  }
}

export async function GET() {
  // Returns only approved reviews for public display
  const approved = storedReviews.filter((r) => r.approved);
  return NextResponse.json({ reviews: approved });
}
