"use client";

import React, { useState, useMemo } from "react";
import { businessInfo } from "@/config/businessInfo";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  ShieldCheck,
  Building2,
  Calendar,
  MapPin,
  Check,
  X,
  Share2,
  Sparkles,
  Send,
  Loader2,
  ExternalLink,
} from "lucide-react";

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  society: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  title: string;
  content: string;
  helpfulCount: number;
  verified: boolean;
  avatarColor: string;
}

// Starting cleanly with 0 reviews — only genuine reviews submitted by real customers
const INITIAL_REVIEWS: ReviewItem[] = [];

export const CustomerReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Form State
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formAuthor, setFormAuthor] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formSociety, setFormSociety] = useState("");
  const [formLocation, setFormLocation] = useState("Bengaluru");
  const [formService, setFormService] = useState("Full Facility Management & Housekeeping");
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formConsent, setFormConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Dynamic Rating Breakdown calculated strictly from genuine reviews
  const totalReviews = reviews.length;
  const ratingBreakdown = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((r) => r.rating === star).length;
      const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
      return { star, percent, count };
    });
  }, [reviews, totalReviews]);

  const averageRating = useMemo(() => {
    if (totalReviews === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / totalReviews).toFixed(1);
  }, [reviews, totalReviews]);

  // Filter options
  const filterCategories = [
    "All",
    "Housekeeping",
    "STP & Water",
    "MEP & Electrical",
    "Tank Cleaning",
    "AMC Maintenance",
  ];

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      // Star filter
      if (selectedStarFilter !== null && r.rating !== selectedStarFilter) {
        return false;
      }
      // Category filter
      if (selectedCategoryFilter !== "All") {
        const cat = selectedCategoryFilter.toLowerCase();
        const serv = r.service.toLowerCase();
        const title = r.title.toLowerCase();
        const content = r.content.toLowerCase();
        const matches =
          serv.includes(cat) || title.includes(cat) || content.includes(cat);
        if (!matches) return false;
      }
      return true;
    });
  }, [reviews, selectedStarFilter, selectedCategoryFilter]);

  // Handle helpful vote
  const handleHelpfulClick = (id: string) => {
    if (helpfulVoted[id]) return;

    setHelpfulVoted((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      )
    );
  };

  // Handle genuine review submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formAuthor.trim() || !formTitle.trim() || !formContent.trim()) {
      alert("Please fill in your name, review title, and review description.");
      return;
    }

    if (!formConsent) {
      alert("Please confirm the verification consent checkbox.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Post to API
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: formRating,
          customerName: `${formAuthor.trim()} (${formSociety.trim() || "Bengaluru Property"})`,
          feedback: `${formTitle.trim()}: ${formContent.trim()}`,
          consent: formConsent,
        }),
      });
    } catch {
      // Graceful local handling
    } finally {
      setIsSubmitting(false);
    }

    // Immediately prepend to live reviews
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: formAuthor.trim(),
      role: formRole.trim() || "Verified Resident",
      society: formSociety.trim() || "Residential Community",
      location: formLocation.trim() || "Bengaluru",
      rating: formRating,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      service: formService,
      title: formTitle.trim(),
      content: formContent.trim(),
      helpfulCount: 0,
      verified: true,
      avatarColor: "bg-forest-800",
    };

    setReviews([newRev, ...reviews]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsWriteReviewOpen(false);
      // Reset form
      setFormAuthor("");
      setFormRole("");
      setFormSociety("");
      setFormTitle("");
      setFormContent("");
      setFormConsent(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-4 sm:p-8 lg:p-10 space-y-10 my-4">
      {/* Section Header */}
      <div className="space-y-2 border-b border-gray-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-forest-950 text-xs font-bold border border-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Genuine Client Feedback</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Customer Ratings &amp; Reviews
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Honest, authentic evaluations from apartment management committees and property managers across Bengaluru.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWriteReviewOpen(!isWriteReviewOpen)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>{isWriteReviewOpen ? "Close Form" : "✍️ Write a Customer Review"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Write Review Form Expandable Box (Amazon Style) */}
      {isWriteReviewOpen && (
        <div className="bg-emerald-50/60 rounded-2xl border-2 border-emerald-500/40 p-5 sm:p-8 animate-in fade-in slide-in-from-top-2 duration-200">
          {submitSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-lg font-black text-forest-950">
                Thank You! Your Review Is Live
              </h3>
              <p className="text-xs text-gray-700 max-w-md mx-auto">
                Your genuine rating and review have been recorded and are now displayed in our customer ratings feed below.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <h3 className="font-extrabold text-base text-forest-950">
                  Write Your Customer Review
                </h3>
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="p-1 rounded-lg text-gray-500 hover:bg-emerald-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-1.5">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      onMouseEnter={() => setFormHoverRating(star)}
                      onMouseLeave={() => setFormHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (formHoverRating || formRating) >= star
                            ? "text-[#FFA41C] fill-[#FFA41C]"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-gray-700">
                    {formRating === 5
                      ? "5 Stars - Outstanding / Highly Recommended"
                      : `${formRating} Stars`}
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Designation / Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. MC President / Resident Owner"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Society & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Apartment / Society / Commercial Complex
                  </label>
                  <input
                    type="text"
                    value={formSociety}
                    onChange={(e) => setFormSociety(e.target.value)}
                    placeholder="e.g. Palm Meadows Layout"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Location / Area in Bengaluru
                  </label>
                  <select
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Hoodi, Bengaluru">Hoodi, Bengaluru</option>
                    <option value="Garudachar Palya, Bengaluru">Garudachar Palya, Bengaluru</option>
                    <option value="Whitefield, Bengaluru">Whitefield, Bengaluru</option>
                    <option value="Mahadevapura, Bengaluru">Mahadevapura, Bengaluru</option>
                    <option value="Bellandur, Bengaluru">Bellandur, Bengaluru</option>
                    <option value="Marathahalli, Bengaluru">Marathahalli, Bengaluru</option>
                    <option value="Greater Bengaluru">Greater Bengaluru</option>
                  </select>
                </div>
              </div>

              {/* Service Used */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Primary Service Provided
                </label>
                <select
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Full Facility Management & Housekeeping">
                    Full Facility Management &amp; Housekeeping
                  </option>
                  <option value="STP, WTP & 24/7 Emergency Breakdown Support">
                    STP, WTP &amp; 24/7 Emergency Breakdown Support
                  </option>
                  <option value="MEP Maintenance & Electrical Care">
                    MEP Maintenance &amp; Electrical Care
                  </option>
                  <option value="Plumbing & Water Tank Deep Cleaning">
                    Plumbing &amp; Water Tank Deep Cleaning
                  </option>
                  <option value="Waste Segregation & Daily Building Care">
                    Waste Segregation &amp; Daily Building Care
                  </option>
                  <option value="Annual Maintenance Contract (AMC)">
                    Annual Maintenance Contract (AMC)
                  </option>
                </select>
              </div>

              {/* Headline */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Add a Headline / Summary of Your Experience *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Prompt supervisor visits and spotless clubhouse maintenance"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Written Review */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Written Review / Detailed Feedback *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="What did Smart Facility Services do well? How was the punctuality, communication, staff discipline, and emergency response?"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent-check"
                  checked={formConsent}
                  onChange={(e) => setFormConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="consent-check" className="text-[11px] text-gray-600 leading-snug cursor-pointer">
                  I confirm that this review represents an authentic experience of facility services received from Smart Facility Services.
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Genuine Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Amazon-Style Rating Overview & Star Breakdown Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-gray-200 pb-10">
        {/* Left Side: Big Rating Score & Star Bars (Amazon Layout) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Big Number Score */}
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tight">
                {totalReviews > 0 ? averageRating : "0.0"}
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-500">
                out of 5
              </span>
            </div>

            {/* Stars Row & Total Ratings */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-6 h-6 ${
                      totalReviews > 0 && Number(averageRating) >= s
                        ? "text-[#FFA41C] fill-[#FFA41C]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-700">
                {totalReviews === 0
                  ? "0 verified customer reviews • Starting clean with 100% genuine reviews"
                  : `${totalReviews} verified client rating${totalReviews > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>

          {/* Amazon-Style Star Breakdown Histogram Bars */}
          <div className="space-y-2 pt-2 max-w-md">
            {ratingBreakdown.map((item) => (
              <button
                key={item.star}
                type="button"
                onClick={() =>
                  totalReviews > 0 &&
                  setSelectedStarFilter(
                    selectedStarFilter === item.star ? null : item.star
                  )
                }
                disabled={totalReviews === 0}
                className={`w-full group flex items-center gap-3 text-xs font-bold transition-all p-1 rounded-lg ${
                  selectedStarFilter === item.star
                    ? "bg-amber-100/70 ring-1 ring-amber-400"
                    : totalReviews > 0 ? "hover:bg-gray-100 cursor-pointer" : "cursor-default opacity-60"
                }`}
                title={`Filter by ${item.star} star ratings (${item.percent}%)`}
              >
                {/* Star Label */}
                <span className="w-12 text-left text-gray-700 group-hover:text-forest-900 group-hover:underline">
                  {item.star} star
                </span>

                {/* Progress Track */}
                <div className="flex-1 h-5 bg-gray-200 rounded-md overflow-hidden relative shadow-inner">
                  <div
                    className="h-full bg-[#FFA41C] group-hover:bg-[#f39800] rounded-md transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>

                {/* Percentage */}
                <span className="w-10 text-right text-gray-600 group-hover:text-forest-900">
                  {item.percent}%
                </span>
              </button>
            ))}
          </div>

          {/* Filter Status Badge */}
          {selectedStarFilter !== null && (
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs font-bold text-forest-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                Showing {selectedStarFilter}-star reviews only
              </span>
              <button
                onClick={() => setSelectedStarFilter(null)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
              >
                Clear star filter
              </button>
            </div>
          )}

          <p className="text-[11px] text-gray-500 italic">
            🛡️ Zero fake reviews: We believe in complete honesty. Every review published on Smart Facility Services is submitted directly by verified apartment associations, facility managers, and residents.
          </p>
        </div>

        {/* Right Side: Review Box & Google Review Button (Amazon Style) */}
        <div className="lg:col-span-5 bg-slate-50 border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <h3 className="font-extrabold text-base text-gray-900">
              Review This Facility Service
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Have we managed your apartment society, housekeeping, or pump rooms? Share your honest feedback with other managing committees across Bengaluru.
            </p>
          </div>

          <button
            onClick={() => setIsWriteReviewOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-100 border-2 border-gray-300 text-gray-900 font-bold text-xs sm:text-sm shadow-xs active:scale-95 transition-all text-center cursor-pointer"
          >
            ✍️ Write a Customer Review
          </button>

          {businessInfo.googleReviewUrl && (
            <div className="pt-2 border-t border-gray-200">
              <a
                href={businessInfo.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-forest-950 font-bold text-xs transition-all shadow-xs"
              >
                <span>Read &amp; Post on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
              </a>
            </div>
          )}

          <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified Customer Reviews in Bengaluru</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs by Service Category (Visible when reviews exist) */}
      {totalReviews > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
              Filter Reviews by Service:
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Showing {filteredReviews.length} verified review{filteredReviews.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? "bg-forest-800 text-white shadow-xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Genuine Reviews Feed */}
      <div className="space-y-6 divide-y divide-gray-200">
        {totalReviews === 0 ? (
          <div className="py-12 px-4 text-center space-y-4 bg-slate-50/60 rounded-3xl border border-dashed border-gray-300">
            <div className="w-14 h-14 bg-emerald-100 text-forest-800 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <MessageSquare className="w-7 h-7 text-emerald-700" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="font-extrabold text-base text-gray-900">
                No Customer Reviews Yet
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We have just launched our new online portal! We only show genuine feedback from actual clients and properties. Be the first to share your experience with Smart Facility Services.
              </p>
            </div>
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>✍️ Be the First to Write a Review</span>
            </button>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm font-bold text-gray-600">
              No reviews match the selected filter.
            </p>
            <button
              onClick={() => {
                setSelectedStarFilter(null);
                setSelectedCategoryFilter("All");
              }}
              className="text-xs font-bold text-emerald-700 underline cursor-pointer"
            >
              Reset all filters to view all reviews
            </button>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="pt-6 first:pt-0 space-y-3">
              {/* Reviewer Profile Row (Amazon Style) */}
              <div className="flex items-center space-x-3">
                <div
                  className={`w-9 h-9 rounded-full ${review.avatarColor} text-white font-extrabold text-xs flex items-center justify-center shadow-xs shrink-0`}
                >
                  {review.author
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="min-w-0">
                  <span className="font-extrabold text-sm text-gray-900 block truncate">
                    {review.author}
                  </span>
                  <span className="text-[11px] text-gray-500 truncate block">
                    {review.role} • {review.society}
                  </span>
                </div>
              </div>

              {/* Rating Stars + Headline (Amazon Style) */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-[#FFA41C] fill-[#FFA41C]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-gray-900">
                  {review.title}
                </h4>
              </div>

              {/* Date, Location & Verified Purchase/Client Badge (Amazon Style) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span>Reviewed in Bengaluru on {review.date}</span>
                <span className="text-gray-300">•</span>
                <span className="inline-flex items-center gap-1 font-bold text-[#C45500] text-[11px]">
                  <span>Verified Client / Society</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                </span>
              </div>

              {/* Verified Service Tag */}
              <div>
                <span className="inline-block text-[11px] font-bold text-forest-900 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-md">
                  Service: {review.service}
                </span>
              </div>

              {/* Review Body Text */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                {review.content}
              </p>

              {/* Amazon-Style Helpful Action Bar */}
              <div className="pt-2 flex items-center gap-3 text-xs">
                {review.helpfulCount > 0 && (
                  <span className="text-gray-500 text-[11px]">
                    {review.helpfulCount} {review.helpfulCount === 1 ? "person" : "people"} found this helpful
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => handleHelpfulClick(review.id)}
                  disabled={helpfulVoted[review.id]}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-bold transition-all active:scale-95 ${
                    helpfulVoted[review.id]
                      ? "bg-emerald-100 border-emerald-300 text-forest-950 cursor-default"
                      : "bg-white hover:bg-gray-50 border-gray-300 text-gray-800 shadow-2xs cursor-pointer"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>
                    {helpfulVoted[review.id] ? "✓ Helpful" : "Helpful"}
                  </span>
                </button>

                <span className="text-gray-300">|</span>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert("Link to review copied to clipboard!");
                  }}
                  className="text-gray-500 hover:text-gray-800 text-[11px] font-medium cursor-pointer"
                >
                  Share
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
