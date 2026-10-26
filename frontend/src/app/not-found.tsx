import React from "react";
import Link from "next/link";
import { ShieldAlert, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-forest-50 text-forest-800 flex items-center justify-center mx-auto">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          The requested page could not be located. It may have moved or the link may have been updated.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-sm shadow transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm border border-gray-300 transition-colors"
        >
          <span>Browse Services Catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
