import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
      <Loader2 className="w-8 h-8 text-forest-800 animate-spin" />
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Loading Smart Facility Services...
      </p>
    </div>
  );
}
