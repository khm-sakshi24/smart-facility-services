"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import { businessInfo } from "@/config/businessInfo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("OPERATIONS_ADMIN");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both credentials.");
      return;
    }

    setIsSubmitting(true);

    // Call authentication endpoint or local session simulation
    try {
      // Small delay to simulate secure authentication & prevent timing attacks
      await new Promise((r) => setTimeout(r, 600));

      // In production, this verifies with Spring Boot backend /api/auth/login
      // For local administrative testing:
      if (email.includes("@") && password.length >= 6) {
        // Store session token in sessionStorage (not local storage)
        sessionStorage.setItem("sfs_admin_token", "session_" + Date.now());
        sessionStorage.setItem("sfs_admin_user", email);
        sessionStorage.setItem("sfs_admin_role", role);
        router.push("/admin/dashboard");
      } else {
        setErrorMessage("Invalid credentials provided. Minimum 6 character password required.");
      }
    } catch {
      setErrorMessage("Authentication service unavailable. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-10 space-y-8 animate-in fade-in">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-forest-900 text-white flex items-center justify-center mx-auto shadow-md border border-emerald-600/40">
            <ShieldCheck className="w-8 h-8 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Staff &amp; Operations Portal</h1>
            <p className="text-xs text-gray-500 font-medium">{businessInfo.name}</p>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Work Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@smartfacilityservices.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Operational Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-white"
            >
              <option value="SUPER_ADMIN">Super Administrator</option>
              <option value="OPERATIONS_ADMIN">Operations &amp; Site Manager</option>
              <option value="SERVICE_STAFF">Technical Field Supervisor</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <span>Access Management Dashboard</span>
              )}
            </button>
          </div>
        </form>

        <div className="pt-2 text-center text-xs text-gray-400 space-y-1">
          <p>Restricted to authorized personnel. Session activities are audited.</p>
          <Link href="/" className="hover:text-forest-800 underline block pt-1">
            Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
