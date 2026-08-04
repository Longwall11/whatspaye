"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>
            Forgot Password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {submitted ? "Check your email for reset instructions" : "Enter your email to reset your password"}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                placeholder="Enter your email address"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#057F44] text-white rounded-full py-3 text-sm font-semibold hover:bg-[#045f35] transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e8f5ee] flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-[#057F44]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">
              If an account exists for <strong>{email}</strong>, you will receive password reset instructions.
            </p>
          </div>
        )}

        <div className="text-center">
          <Link href="/auth/signin" className="text-sm text-[#057F44] font-medium hover:underline">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
